import { create } from "apisauce";

const apiClient = create({ baseURL: "http://192.168.0.104:8000/" });

export default apiClient;
