import { render, screen, fireEvent } from "@testing-library/react";
import { FabDelete } from "../../../src/calendar/components/FabDelete";
import { useCalendarStore } from "../../../src/hooks";

jest.mock("./../../../src/hooks/useCalendarStore");

describe("Pruebas en componente <FabDelete/>", () => {

    const mockStartDeletingEvent = jest.fn();

    beforeEach( () => jest.clearAllMocks() );

    test("debe de mostrar le componente correctamente", () => {
        useCalendarStore.mockReturnValue({
            activeEvent: false,
        });

        render(<FabDelete />);

        const btn = screen.getByTestId("btn-delete");
        
        expect(btn.classList).toContain("rounded-full");
        expect(btn.classList).toContain("bg-red-400");
        expect(btn.classList).toContain("fixed");
        expect(btn.classList).toContain("bottom-6");
        expect(btn.classList).toContain("left-6");
        expect(btn.classList).toContain("text-md");
        expect(btn.classList).toContain("p-3");
        expect(btn.classList).toContain("hover:bg-red-600");
        expect(btn.classList).toContain("none");
        expect(btn.classList).toContain("transition-all");
        expect(btn.classList).toContain("duration-200");
        expect(btn.classList).toContain("hover:scale-105");
        expect(btn.classList).toContain("hidden");
    });

    test("debe de mostrar un boton si hay un evento activo", () => {
        useCalendarStore.mockReturnValue({
            activeEvent: true,
        });
        
        render(<FabDelete />);
        
        const btn = screen.getByTestId("btn-delete");
        
        expect(btn.classList).not.toContain("hidden");
    });

    test("debe de llamar startDeletingEvent si hay evento activo", () => {
        useCalendarStore.mockReturnValue({
            activeEvent: true,
            startDeleteEvent: mockStartDeletingEvent
        });
        
        render(<FabDelete />);
        
        const btn = screen.getByTestId("btn-delete");
        fireEvent.click( btn );

        expect( mockStartDeletingEvent ).toHaveBeenCalled();
    });
});
