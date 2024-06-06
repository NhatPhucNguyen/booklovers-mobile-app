import { cleanup, fireEvent, render, userEvent } from "@testing-library/react-native";
import Login from "../login";
describe("Login component", () => {
    const user = userEvent.setup({
        delay: 500,
    });
    it("should render the login form with the correct accessibility label", () => {
        const { getByLabelText, getByText, getByRole } = render(<Login />);

        const emailInput = getByLabelText("email");
        const passwordInput = getByLabelText("password");
        const rememberMeCheckbox = getByText("Remember me");
        const loginButton = getByRole("button");

        expect(emailInput).toBeDefined();
        expect(passwordInput).toBeDefined();
        expect(rememberMeCheckbox).toBeDefined();
        expect(loginButton).toBeDefined();
        expect(
            getByText("Discover your favorite books with us!")
        ).toBeDefined();
        expect(getByText("Create account")).toBeDefined();
        expect(getByText("Forgot password?")).toBeDefined();
    });
    it("should change the input value when typing", () => {
        const email = "email@gmail.com";
        const password = "password";
        const { getByLabelText } = render(<Login />);
        const emailInput = getByLabelText("email");
        const passwordInput = getByLabelText("password");

        fireEvent.changeText(emailInput, email);
        fireEvent.changeText(passwordInput, password);

        expect(emailInput.props.value).toBe(email);
        expect(passwordInput.props.value).toBe(password);
    });
    it("should render the error message when the input is invalid", async () => {
        const { getByLabelText, getByRole, getAllByLabelText } = render(
            <Login />
        );
        const emailInput = getByLabelText("email");
        const passwordInput = getByLabelText("password");
        const loginButton = getByRole("button");

        fireEvent.changeText(emailInput, "invalidEmail");
        fireEvent.changeText(passwordInput, "");
        await user.press(loginButton);

        const errors = getAllByLabelText("error-message");
        expect(errors).toHaveLength(2);
    });
});
