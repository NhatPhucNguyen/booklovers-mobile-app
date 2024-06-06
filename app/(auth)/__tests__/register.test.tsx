import {
    fireEvent,
    render,
    userEvent
} from "@testing-library/react-native";
import Register from "../register";

describe("Register component", () => {
    const user = userEvent.setup({
        delay: 500,
    });
    it("should render the register form with the required input", () => {
        const { getByLabelText, getByText, getByRole } = render(<Register />);
        const name = getByLabelText("name");
        const emailInput = getByLabelText("email");
        const passwordInput = getByLabelText("password");
        const confirmPasswordInput = getByLabelText("confirmPassword");
        const signUpButton = getByRole("button");

        expect(name).toBeDefined();
        expect(emailInput).toBeDefined();
        expect(passwordInput).toBeDefined();
        expect(confirmPasswordInput).toBeDefined();
        expect(signUpButton).toBeDefined();
        expect(getByText("Already have an account?")).toBeDefined();
    });
    it("should change the input value when typing", () => {
        const { getByLabelText } = render(<Register />);
        const name = getByLabelText("name");
        const emailInput = getByLabelText("email");
        const passwordInput = getByLabelText("password");
        const confirmPasswordInput = getByLabelText("confirmPassword");

        fireEvent.changeText(name, "John Doe");
        fireEvent.changeText(emailInput, "test@gmail.com");
        fireEvent.changeText(passwordInput, "password");
        fireEvent.changeText(confirmPasswordInput, "password");

        expect(name.props.value).toBe("John Doe");
        expect(emailInput.props.value).toBe("test@gmail.com");
        expect(passwordInput.props.value).toBe("password");
        expect(confirmPasswordInput.props.value).toBe("password");
    });
    it("Should redner the error message when the input is invalid", async () => {
        const { getByLabelText, getByRole, getAllByLabelText } = render(
            <Register />
        );
        const name = getByLabelText("name");
        const emailInput = getByLabelText("email");
        const passwordInput = getByLabelText("password");
        const confirmPasswordInput = getByLabelText("confirmPassword");
        const signUpButton = getByRole("button");

        fireEvent.changeText(name, "Jo");
        fireEvent.changeText(emailInput, "invalidEmail");
        fireEvent.changeText(passwordInput, "invalidPassword");
        fireEvent.changeText(confirmPasswordInput, "notMatchPassword");

        await user.press(signUpButton);

        const errors = getAllByLabelText("error-message");
        expect(errors).toHaveLength(4);
    });
});
