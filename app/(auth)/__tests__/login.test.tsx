import { render } from "@testing-library/react-native";
import Login from "../login";
jest.mock('@fortawesome/react-native-fontawesome', () => ({
    FontAwesomeIcon: ''
}))
describe("Login component", () => {
    it("should render the login form with the correct accessibility label", () => {
        const { getByLabelText,getByText,getByRole } = render(<Login />);
        
        const emailInput = getByLabelText("email");
        const passwordInput = getByLabelText("password");
        const rememberMeCheckbox = getByText("Remember me");
        const loginButton = getByRole("button");
        
        expect(emailInput).toBeDefined();
        expect(passwordInput).toBeDefined();
        expect(rememberMeCheckbox).toBeDefined();
        expect(loginButton).toBeDefined();
        expect(getByText("Discover your favorite books with us!")).toBeDefined();
        expect(getByText("Create account")).toBeDefined();
        expect(getByText("Forgot password?")).toBeDefined();
    });
});