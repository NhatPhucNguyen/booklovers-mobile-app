import { User } from "@/apis/user";
import ModalContextProvider from "@/context/ModalContext";
import { render, waitFor } from "@testing-library/react-native";
import * as ReactQuery from "react-query";
import { QueryClient, QueryClientProvider } from "react-query";
import UserDetail from "../[userId]";
import axiosMock from "@/__mocks__/axiosMock";
jest.mock("expo-router", () => ({
    useLocalSearchParams: jest.fn().mockReturnValue({ userId: "test" }),
}));
jest.mock("../../../../lib/storage", () => ({
    getData: jest.fn().mockResolvedValue("token"),
}));
jest.mock("jwt-decode", () => ({
    jwtDecode: jest.fn().mockReturnValue({ id: "test" }),
}));
jest.mock("expo-router", () => ({
    useLocalSearchParams: jest.fn().mockReturnValue({ userId: "test" }),
}));
jest.mock("../../../../apis/user", () => {
    return {
        getUserById: jest
            .fn()
            .mockResolvedValueOnce({ id: "test", name: "test" } as User),
    };
});
jest.mock("../../../../apis/group", () => ({
    getGroups: jest.fn().mockResolvedValue([]),
}));
describe("UserDetail", () => {
    const client = new QueryClient({
        defaultOptions: {
            queries: {
                retry: false,
            },
        },
    });
    it("should render key elements", async () => {
        const { getByLabelText, getByText } = render(
            <QueryClientProvider client={client}>
                <ModalContextProvider>
                    <UserDetail />
                </ModalContextProvider>
            </QueryClientProvider>
        );
        await waitFor(() => {
            expect(getByLabelText("actions")).toBeDefined();
            expect(getByLabelText("edit")).toBeDefined();
            expect(getByText("Groups Joined")).toBeDefined();
            expect(getByText("Activities")).toBeDefined();
            expect(getByText("Connections")).toBeDefined();
        });
    });
    it("should render the user detail", async () => {
        const { getByText } = render(
            <QueryClientProvider client={client}>
                <ModalContextProvider>
                    <UserDetail />
                </ModalContextProvider>
            </QueryClientProvider>
        );
        await waitFor(() => {
            expect(getByText("test")).toBeDefined();
        });
    });
    it("should render the user not found", async () => {
        const { getByText } = render(
            <QueryClientProvider client={client}>
                <ModalContextProvider>
                    <UserDetail />
                </ModalContextProvider>
            </QueryClientProvider>
        );
        await waitFor(() => {
            expect(getByText("User not found")).toBeDefined();
        });
    });
});
