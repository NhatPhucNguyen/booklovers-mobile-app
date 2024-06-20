import { render } from "@testing-library/react-native";
import React from "react";
import AuthFormInput from "../forms/AuthFormInput";
jest.mock('@fortawesome/react-native-fontawesome', () => ({
    FontAwesomeIcon: ''
}))
describe("AuthFormInput", () => {
    it("renders correctly", () => {
        const { getByLabelText } = render(<AuthFormInput />);
        const input = getByLabelText("textInput");
        expect(input).toBeDefined();
    });
});