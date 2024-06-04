import React from "react";
import { render, waitFor } from "@testing-library/react-native";
import Index from "../index";

describe("Index Page", () => {
    it("renders correctly", async () => {
        const { getByLabelText, getByRole } = render(<Index />);
        await waitFor(() => {
            const container = getByLabelText("container");
            const logo = getByLabelText("logo");
            const backgroundImage = getByLabelText("backgroundImage");
            const button = getByRole("button");
            expect(container).toBeDefined();
            expect(logo).toBeDefined();
            expect(backgroundImage).toBeDefined();
            expect(button).toBeDefined();
        });
    });
});
