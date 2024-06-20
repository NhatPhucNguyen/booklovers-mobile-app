import React from "react";
import { render } from "@testing-library/react-native";
import FormController from "../forms/FormController";
import { Text } from "react-native";
describe("FormController", () => {
    it("renders children and label correctly", () => {
        const labelText = "Test Label";
        const { getByText } = render(
            <FormController label={labelText}>
                <Text>Test Children</Text>
            </FormController>
        );

        const labelElement = getByText(labelText);
        const childrenElement = getByText("Test Children");

        expect(labelElement).toBeDefined();
        expect(childrenElement).toBeDefined();
    });
});
