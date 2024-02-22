import { render, screen } from "@testing-library/react";
import { AppRouter } from "../../src/router/AppRouter";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";
import { useAuthStore } from "../../src/hooks";
import { store } from "../../src/store";

jest.mock("./../../src/hooks/useAuthStore");


jest.mock("react-modal", () => ({
    ...jest.requireActual("react-modal"),
    setAppElement: () => {},
}));

describe("Pruebas en <AppRouter />", () => {
    
    const mockCheckAuthToken = jest.fn();

    beforeEach( () => jest.clearAllMocks() ); 

    test("debe de mostrar la pantalla de carga y llamar checkAuthToken", () => {

        useAuthStore.mockReturnValue({
            status: 'checking',
            checkAuthToken: mockCheckAuthToken
        });

        render(
            <Provider store={store}>
                <MemoryRouter>
                    <AppRouter />
                </MemoryRouter>
            </Provider>
        );

        expect( screen.getByText('Loading...') ).toBeTruthy();

        expect( mockCheckAuthToken ).toHaveBeenCalled();
    });
});
