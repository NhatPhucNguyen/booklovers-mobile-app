import { render } from "@testing-library/react-native";
import Register from "../register";

jest.mock('@fortawesome/react-native-fontawesome', () => ({
    FontAwesomeIcon: ''
}))
describe("Register component", () => {
    it("should render the register form with the required input", () => {
        const { getByLabelText,getByText,getByRole } = render(<Register />);
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
    })
})