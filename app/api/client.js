import { create } from "apisauce";

// http://192.168.100.5:8000/properties/
// http://applemaster.co.ke:8000/
// http://192.168.100.5:8000/
const apiClient = create({ baseURL: "http://192.168.0.108:8000/" });

export default apiClient;
