import axiosInstance from "@/lib/axiosInstance";
import MockAdapter from "axios-mock-adapter";
const mockAxios = new MockAdapter(axiosInstance, {
    onNoMatch: "throwException",
});
beforeAll(() => {
    mockAxios.reset();
});
export default mockAxios;
