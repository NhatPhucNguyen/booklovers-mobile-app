import { cleanup } from "@testing-library/react-native";
jest.mock("@react-native-async-storage/async-storage", () =>
    require("@react-native-async-storage/async-storage/jest/async-storage-mock")
);
jest.mock("@fortawesome/react-native-fontawesome", () => ({
    FontAwesomeIcon: "",
}));
afterEach(() => {
    cleanup();
});
