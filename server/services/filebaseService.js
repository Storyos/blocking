const axios = require("axios");

exports.uploadToFilebase = async (inputData) => {
  try {
    const response = await axios.post(
      "https://api.filebase.io/v1/ipfs",
      inputData,
      {
        headers: {
          Authorization: `Bearer ${process.env.FILEBASE_API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );
    return response.data.url;
  } catch (error) {
    console.error("Error uploading to Filebase:", error);
    throw new Error("Failed to upload data to Filebase");
  }
};
