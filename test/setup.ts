import { cleanup } from "@testing-library/react-native";
jest.mock("@react-native-async-storage/async-storage", () =>
    require("@react-native-async-storage/async-storage/jest/async-storage-mock")
);
jest.mock("@fortawesome/react-native-fontawesome", () => ({
    FontAwesomeIcon: "",
}));
process.env.EXPO_PUBLIC_GG_API_KEY = "test-key";
afterEach(() => {
    cleanup();
});
