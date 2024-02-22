import { render, screen } from "@testing-library/react";
import { FabDelete } from "../../../src/calendar/components/FabDelete";
import { Provider } from "react-redux";
import { store } from './../../../src/store/store';

describe("Pruebas en componente <FabDelete/>", () => {
    test("debe de mostrar le componente correctamente", () => {
        render(
            <Provider store={ store }>
                <FabDelete />
            </Provider>
        );

        screen.debug();
    });
});
