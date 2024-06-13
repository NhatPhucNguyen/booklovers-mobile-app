import axiosMock from "@/__mocks__/axiosMock";
import { getCurrentUser, getUserById } from "../user";

describe("User API", () => {
    it("should return current user data", async () => {
        const user = {
            name: "name",
            email: "email",
        };
        axiosMock.onGet("/users/current").reply(200, user);
        const data = await getCurrentUser();
        expect(data).toEqual(user);
    });
    it("should throw an error if API call fails", async () => {
        axiosMock.onGet("/users/current").reply(500);
        await expect(getCurrentUser()).rejects.toThrow();
    });
    it("should return user data by id", async () => {
        const userId = "123";
        const user = {
            id: userId,
            name: "John Doe",
            email: "john.doe@example.com",
        };
        axiosMock.onGet(`/users/${userId}`).reply(200, user);
        const data = await getUserById(userId);
        expect(data).toEqual(user);
    });
    it("should throw an error if API call fails", async () => {
        const userId = "123";
        axiosMock.onGet(`/users/${userId}`).reply(500);
        await expect(getUserById(userId)).rejects.toThrow();
    });
});
