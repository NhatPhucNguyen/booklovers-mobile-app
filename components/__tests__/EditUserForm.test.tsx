import { act, render, screen, userEvent } from "@testing-library/react-native";
import EditUserForm from "../EditUserForm";
import { User } from "@/apis/user";
import { QueryClient, QueryClientProvider } from "react-query";
import ModalContextProvider from "@/context/ModalContext";

describe("EditUserForm", () => {
    const user = userEvent.setup();
    const client = new QueryClient();
    const mockUser = {
        name: "mockName",
        headline: "mockHeadline",
        about: "mockAbout",
        location: "mockLocation",
    } as User;
    test("renders form fields", () => {
        const { getByLabelText, getByRole } = render(
            <ModalContextProvider>
                <QueryClientProvider client={client}>
                    <EditUserForm user={mockUser} />
                </QueryClientProvider>
            </ModalContextProvider>
        );
        const loginButton = getByRole("button");
        // Assert that the form fields are rendered
        expect(getByLabelText("name")).toBeDefined();
        expect(getByLabelText("headline")).toBeDefined();
        expect(getByLabelText("about")).toBeDefined();
        expect(getByLabelText("location")).toBeDefined();
        expect(loginButton).toBeDefined();
    });

    test("handle change correctly", async () => {
        const { getByLabelText } = render(
            <ModalContextProvider>
                <QueryClientProvider client={client}>
                    <EditUserForm user={mockUser} />
                </QueryClientProvider>
            </ModalContextProvider>
        );
        const nameInput = getByLabelText("name");
        const headlineInput = getByLabelText("headline");
        const aboutInput = getByLabelText("about");
        const locationInput = getByLabelText("location");

        // reset all input fields
        await user.clear(nameInput);
        await user.clear(headlineInput);
        await user.clear(aboutInput);
        await user.clear(locationInput);
        // Change the value of the input fields
        await user.type(nameInput, "John Doe");
        await user.type(headlineInput, "Software Developer");
        await user.type(aboutInput, "I love coding");
        await user.type(locationInput, "Lagos");

        // Assert that the input fields have the correct value
        expect(nameInput.props.value).toBe("John Doe");
        expect(headlineInput.props.value).toBe("Software Developer");
        expect(aboutInput.props.value).toBe("I love coding");
        expect(locationInput.props.value).toBe("Lagos");
    });
    test("should render the error message when name is invalid", async () => {
        const { getByLabelText, getByRole } = render(
            <ModalContextProvider>
                <QueryClientProvider client={client}>
                    <EditUserForm user={mockUser} />
                </QueryClientProvider>
            </ModalContextProvider>
        );
        const nameInput = getByLabelText("name");
        await user.clear(nameInput);

        const loginButton = getByRole("button");
        await user.press(loginButton);
        expect(screen.getByText("Name is required")).toBeDefined();
    });
});
