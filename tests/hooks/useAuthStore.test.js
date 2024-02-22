import { configureStore } from "@reduxjs/toolkit";
import { authSlice } from "../../src/store";
import { renderHook, act, waitFor } from "@testing-library/react";
import { useAuthStore } from "../../src/hooks";
import { Provider } from "react-redux";
import {
    initialState,
    notAuthenticatedState,
    authenticatedState,
} from "./../__fixtures__/authStates";
import { testUserCredentials } from "./../__fixtures__/testUser";
import { calendarApi } from "../../src/api";

const getMockStore = initialState => {
    return configureStore({
        reducer: {
            auth: authSlice.reducer,
        },
        preloadedState: {
            auth: { ...initialState },
        },
    });
};

describe("Pruebas en useAuthStore", () => {
    beforeEach(() => localStorage.clear());

    test("debe de regresar los valores por defecto", () => {
        const MockStore = getMockStore({ ...initialState });

        const { result } = renderHook(() => useAuthStore(), {
            wrapper: ({ children }) => (
                <Provider store={MockStore}>{children}</Provider>
            ),
        });

        expect(result.current).toEqual({
            status: "checking",
            user: {},
            errorMessage: undefined,
            startLogin: expect.any(Function),
            startRegister: expect.any(Function),
            checkAuthToken: expect.any(Function),
            startLogout: expect.any(Function),
        });
    });

    test("startLogin debe de realizar el login", async () => {
        const mockStore = getMockStore({ ...notAuthenticatedState });
        const { result } = renderHook(() => useAuthStore(), {
            wrapper: ({ children }) => (
                <Provider store={mockStore}>{children}</Provider>
            ),
        });

        await act(async () => {
            await result.current.startLogin(testUserCredentials);
        });

        const { errorMessage, status, user } = result.current;

        expect({ errorMessage, status, user }).toEqual(authenticatedState);

        expect(localStorage.getItem("token")).toEqual(expect.any(String));
        expect(localStorage.getItem("token-init-date")).toEqual(
            expect.any(String)
        );
    });

    test("startLogin debe de fallar el login", async () => {
        const mockStore = getMockStore({ ...notAuthenticatedState });
        const { result } = renderHook(() => useAuthStore(), {
            wrapper: ({ children }) => (
                <Provider store={mockStore}>{children}</Provider>
            ),
        });

        await act(async () => {
            await result.current.startLogin({
                email: "algo@gmail.com",
                password: "124s",
            });
        });

        const { errorMessage, status, user } = result.current;

        expect(localStorage.getItem("token")).toBe(null);
        expect({ errorMessage, status, user }).toEqual({
            errorMessage: expect.any(String),
            status: "not-authenticated",
            user: {},
        });

        await waitFor(() =>
            expect(result.current.errorMessage).toBe(undefined)
        );
    });

    test("startRegister debe de crear un usuario", async () => {
        const newUser = {
            email: "algo@gmail.com",
            password: "1245678s",
            name: "userTestingJest",
        };

        const mockStore = getMockStore({ ...notAuthenticatedState });
        const { result } = renderHook(() => useAuthStore(), {
            wrapper: ({ children }) => (
                <Provider store={mockStore}>{children}</Provider>
            ),
        });

        const spy = jest.spyOn(calendarApi, "post").mockReturnValue({
            data: {
                ok: true,
                uid: "ACCOUNT_ID",
                name: "kevin",
                token: "TOKEN",
            },
        });

        await act(async () => {
            await result.current.startRegister(newUser);
        });

        const { errorMessage, status, user } = result.current;

        expect({ errorMessage, status, user }).toEqual({
            errorMessage: undefined,
            status: "authenticated",
            user: { name: "kevin", uid: "ACCOUNT_ID" },
        });

        spy.mockRestore();
    });

    test("startRegister debe de fallar la creación", async () => {
        const mockStore = getMockStore({ ...notAuthenticatedState });
        const { result } = renderHook(() => useAuthStore(), {
            wrapper: ({ children }) => (
                <Provider store={mockStore}>{children}</Provider>
            ),
        });

        await act(async () => {
            await result.current.startRegister(testUserCredentials);
        });

        const { errorMessage, status, user } = result.current;

        expect({ errorMessage, status, user }).toEqual({
            errorMessage:
                "This email already exists, please login or create a new account",
            status: "not-authenticated",
            user: {},
        });
    });

    test("checkAuthToken debe de fallar si no hay token", async () => {
        const mockStore = getMockStore({ ...initialState });
        const { result } = renderHook(() => useAuthStore(), {
            wrapper: ({ children }) => (
                <Provider store={mockStore}>{children}</Provider>
            ),
        });

        await act(async () => {
            await result.current.checkAuthToken();
        });

        const { errorMessage, status, user } = result.current;

        expect({ errorMessage, status, user }).toEqual({
            errorMessage: undefined,
            status: "not-authenticated",
            user: {},
        });
    });
    test("checkAuthToken debe de autenticar el usuario si hay token", async () => {
        const { data } = await calendarApi.post("/auth", testUserCredentials);
        localStorage.setItem("token", data.token);

        const mockStore = getMockStore({ ...initialState });
        const { result } = renderHook(() => useAuthStore(), {
            wrapper: ({ children }) => (
                <Provider store={mockStore}>{children}</Provider>
            ),
        });

        await act(async () => {
            await result.current.checkAuthToken();
        });

        const { errorMessage, status, user } = result.current;

        expect({ errorMessage, status, user }).toEqual({
            errorMessage: undefined,
            status: "authenticated",
            user: { name: "kevin", uid: "65d3d89c12245cdced9620ab" },
        });
    });
});
