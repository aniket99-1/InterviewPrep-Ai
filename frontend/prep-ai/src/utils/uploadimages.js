import { API_PATHS } from "./apiPaths";
import axiosInstance from "./axiosinstance";
import axios from "axios";

export const uploadImage = async (imageFile) => {
   
        const formData = new FormData();
        formData.append("image", imageFile);
 try {
        const response = await axiosInstance.post(API_PATHS.IMAGE.UPLOAD, formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });

        return response.data;
    } catch (error) {
        console.error("Error uploading image:", error);
        throw error;
    }
};
