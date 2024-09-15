import axios from "axios";

const CLOUDINARY_UPLOAD_URL =
  "https://console.cloudinary.com/console/c-fce4956b1e3005335df103a381b108/media_library/search?q=%7B%22accessTypes%22%3A%5B%22public%22%5D%7D&view_mode=mosaic";
const UPLOAD_PRESET = "CTaaHgRb-Q-hXT5RzFAuDAohwGY";

export const uploadImageToCloudinary = async (file: any) => {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", UPLOAD_PRESET);

  try {
    const response = await axios.post(CLOUDINARY_UPLOAD_URL, formData);
    return response.data;
  } catch (error) {
    console.error("Error uploading image:", error);
    throw error;
  }
};
