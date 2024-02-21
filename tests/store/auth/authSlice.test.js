import {
    authenticatedState,
    initialState,
    notAuthenticatedState,
} from "../../__fixtures__/authStates";
import { testUserCredentials } from "../../__fixtures__/testUser";
import {
    authSlice,
    checking,
    clearErrorMessage,
    onLogin,
    onLogout,
} from "./../../../src/store/auth/authSlice";

describe("Pruebas en authSlice", () => {
    test("debe de regresar el estado inicial", () => {
        expect(authSlice.getInitialState()).toEqual(initialState);
    });

    test("debe de validar el estado inicial como checking", () => {
        const state = authSlice.reducer(
            initialState,
            onLogin(testUserCredentials)
        );
        const Newstate = authSlice.reducer(state, checking());

        expect(Newstate).toEqual(initialState);
    });

    test("debe de realizar un login", () => {
        const state = authSlice.reducer(
            initialState,
            onLogin(testUserCredentials)
        );

        expect(state).toEqual({
            status: "authenticated",
            user: testUserCredentials,
            errorMessage: undefined,
        });
    });

    test("debe de realizar el logout", () => {
        const state = authSlice.reducer(authenticatedState, onLogout());

        expect(state).toEqual(notAuthenticatedState);
    });

    test("debe de realizar el logout con mensaje", () => {
        const errorMessage = "not valid credentials";
        const state = authSlice.reducer(
            authenticatedState,
            onLogout(errorMessage)
        );

        expect(state).toEqual({
            ...notAuthenticatedState,
            errorMessage,
        });
    });

    test("debe de limpiar el mensajede error", () => {
        const errorMessage = "not valid credentials";
        const state = authSlice.reducer(
            authenticatedState,
            onLogout(errorMessage)
        );
        const Newstate = authSlice.reducer(state, clearErrorMessage());

        expect(Newstate.errorMessage).toBe(undefined);
    });
});
