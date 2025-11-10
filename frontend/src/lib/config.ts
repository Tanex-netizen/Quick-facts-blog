const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:4000";
const CLOUDINARY_UPLOAD_PRESET = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET || "";
const CLOUDINARY_CLOUD_NAME = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || "";

export const appConfig = {
  apiBaseUrl: API_BASE_URL.replace(/\/$/, ""),
  cloudinary: {
    preset: CLOUDINARY_UPLOAD_PRESET,
    cloudName: CLOUDINARY_CLOUD_NAME,
  },
};
