import { render } from "@testing-library/react-native";
import React from "react";
import NavigationLink from "../NavigationLink";

describe("NavigationLink", () => {
    it("renders correctly", () => {
        const { getByText } = render(
            <NavigationLink href="/home">Home</NavigationLink>
        );
        const link = getByText("Home");
        expect(link).toBeDefined();
    });
});
