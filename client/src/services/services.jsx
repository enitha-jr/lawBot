import axios from "axios";

const LLM_API_URL = import.meta.env.VITE_LLM_API_URL;

// Create axios instance for LLM API
const chatInstance = axios.create({
  baseURL: LLM_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Send chat prompt
const getAIResponse = async (prompt, uploadedFileName = null) => {
  try {
    console.log("Sending prompt to LLM API:", prompt);
    const response = await chatInstance.post("/chat", {
      prompt,
      file: uploadedFileName,
    });
    return response.data;
  } catch (error) {
    console.error(
      "Error fetching AI response:",
      error.response?.data || error.message
    );
    throw error;
  }
};

// Upload file
const uploadFile = async (file) => {
  try {
    const formData = new FormData();
    formData.append("file", file);

    console.log("Uploading file:", file.name);
    const response = await axios.post(`${LLM_API_URL}/upload`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    console.log("Upload response:", response.data);
    return response.data;// Expected: { filename: "abc.pdf" }
  } catch (error) {
    console.error(
      "Error uploading file:",
      error.response?.data || error.message
    );
    throw error;
  }
};

const services = {
  getAIResponse,
  uploadFile,
};

export default services;
