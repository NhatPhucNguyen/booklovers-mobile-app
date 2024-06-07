import axiosMock from "../../__mocks__/axiosMock";
import { login, logout, register, verifyToken } from "../auth";
describe("Auth API", () => {
    describe("login", () => {
        test("should return access token", async () => {
            const token = "token";
            axiosMock.onPost("/users/login").reply(201, {
                accessToken: token,
            });
            const { accessToken } = await login("email", "password");
            expect(accessToken).toEqual(token);
        });
        test("should return error message", async () => {
            const errorMessage = "error";
            axiosMock.onPost("/users/login").reply(400, {
                message: errorMessage,
            });
            const { error } = await login("email", "password");
            expect(error).toEqual(errorMessage);
        });
    });
    describe("register", () => {
        const registerData = {
            name: "name",
            email: "email",
            password: "password",
            confirmPassword: "password",
        };
        test("should return success", async () => {
            axiosMock.onPost("/users/register").reply(201);
            const { success } = await register(registerData);
            expect(success).toBeTruthy();
        });
        test("should return error message", async () => {
            const errorMessage = "error";
            axiosMock.onPost("/users/register").reply(400, {
                message: errorMessage,
            });
            const { error } = await register(registerData);
            expect(error).toEqual(errorMessage);
        });
    });
    describe("logout", () => {
        test("should return success", async () => {
            axiosMock.onDelete("/users/logout").reply(200);
            const { success } = await logout();
            expect(success).toBeTruthy();
        });
        test("should return error message", async () => {
            const errorMessage = "error";
            axiosMock.onDelete("/users/logout").reply(400, {
                message: errorMessage,
            });
            const { error } = await logout();
            expect(error).toEqual(errorMessage);
        });
    });
    describe("verifyToken", () => {
        test("should return success", async () => {
            axiosMock.onGet("/users").reply(200);
            const { success } = await verifyToken();
            expect(success).toBeTruthy();
        });
        test("should return error message", async () => {
            const errorMessage = "error";
            axiosMock.onGet("/users").reply(400, {
                message: errorMessage,
            });
            const { error } = await verifyToken();
            expect(error).toEqual(errorMessage);
        });
    });
});
