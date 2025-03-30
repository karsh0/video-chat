import { BACKEND_URL } from "@/lib/config";
import axios from "axios";

export async function getUser() {
    try {
        const token = localStorage.getItem("token");
        if (!token) throw new Error("No token found");

        const response = await axios.get(`${BACKEND_URL}/user`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        return response.data.user;
    } catch (error) {
        console.error("Error fetching user:", error);
        return null;
    }
}
