import axiosMock from "@/__mocks__/axiosMock";
import { getCurrentUser } from "../user";

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
});
