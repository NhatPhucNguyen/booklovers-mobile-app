import { createGroup, deleteGroup, editGroup, joinGroup } from "@/apis/group";
import axiosMock from "@/__mocks__/axiosMock";
describe("group API", () => {
    const input = {
        name: "Test Group",
        description: "This is a test group",
    };
    describe("createGroup", () => {
        it("should create a new group", async () => {
            axiosMock.onPost("/groups").reply(200,{groupId: "123"});
            const result = await createGroup(input);

            expect(result).toBe("123");
        });
        it("should throw an error if fail to create group", async () => {
            axiosMock.onPost("/groups").reply(400);
            expect(createGroup(input)).rejects.toThrow();
        });
    });
    describe("editGroup", () => {
        const editInput = {...input,groupId: "123"}
        it("should edit a group", async () => {
            axiosMock.onPut(`/groups/${editInput.groupId}`).reply(200);
            const result = await editGroup(editInput);

            expect(result).toBe(true);
        });
        it("should throw an error if fail to edit group", async () => {
            axiosMock.onPut(`/groups/${editInput.groupId}`).reply(400);
            expect(editGroup(editInput)).rejects.toThrow();
        });
    });
    describe("deleteGroup", () => {
        it("should delete a group", async () => {
            axiosMock.onDelete(`/groups/123`).reply(200);
            const result = await deleteGroup("123");

            expect(result).toBe(true);
        });
        it("should throw an error if fail to delete group", async () => {
            axiosMock.onDelete(`/groups/123`).reply(400);
            expect(deleteGroup("123")).rejects.toThrow();
        });
    });
    describe("joinGroup", () => {
        it("should join a group", async () => {
            axiosMock.onPost(`/groups/123/join`).reply(200);
            const result = await joinGroup("123");

            expect(result).toBe(true);
        });
        it("should throw an error if fail to join group", async () => {
            axiosMock.onPost(`/groups/123/join`).reply(400);
            expect(joinGroup("123")).rejects.toThrow();
        });
    });
});
