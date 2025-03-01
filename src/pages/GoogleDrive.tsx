import { useCallback, useEffect, useState } from "react";
import axios from "axios";
import Layout from "../layout/Layout";

const GoogleDrive = () => {
  const [file, setFile] = useState<File | null>(null);
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0] || null;
    setFile(selectedFile);
  };
  const [accessToken, setAccessToken] = useState<string | null>(null);

  useEffect(() => {
    const userDetails = localStorage.getItem("userGoogleAndFacebook");
    if (userDetails) {
      const parsedDetails = JSON.parse(userDetails);
      setAccessToken(parsedDetails?.oAuth_token);
    }
  }, []);

  const uploadFileToGoogleDriveFolder = useCallback(async () => {
    const metadata = {
      name: file?.name,
      mimeType: file?.type,
      parents: ["12OrPTSkN23exH8ri7oto9hwZ0FamjgNu"],
    };

    const form = new FormData();
    form.append(
      "metadata",
      new Blob([JSON.stringify(metadata)], { type: "application/json" })
    );
    form.append("media", file as Blob);

    try {
      const response = await axios.post(
        "https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart",
        form,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "multipart/related",
          },
        }
      );

      console.log("File uploaded successfully:", response);
      if (response.data) {
        setFile(null);
        return response.data;
      }
    } catch (error) {
      console.error("Error uploading file:", error);
    }
  }, [accessToken, file]);

  return (
    <>
      <Layout>
        <div className="bg-black flex items-center justify-center min-h-screen">
          <div className="bg-white p-8 rounded-xl shadow-xl max-w-md w-full">
            <h2 className="text-2xl font-semibold text-gray-800 text-center mb-6">
              Upload Your File
            </h2>

            <div className="flex flex-col items-center justify-center p-6 border-2 border-dashed border-gray-300 rounded-xl hover:border-blue-500 transition-all duration-300">
              <svg
                className="w-16 h-16 text-blue-500 mb-4 transition-all duration-300"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 4v16m8-8H4"
                />
              </svg>

              <input
                id="file-upload"
                type="file"
                className="hidden"
                onChange={handleFileChange}
              />

              <label
                htmlFor="file-upload"
                className="text-gray-600 cursor-pointer text-center hover:text-blue-600 transition-all duration-300"
              >
                <span className="block text-xl font-medium">
                  Drag & Drop your file here
                </span>
                <span className="block text-sm text-gray-400">
                  Or click to browse
                </span>
              </label>

              {file && (
                <div className="mt-3 text-gray-700 text-sm font-medium">
                  {file?.name}
                </div>
              )}
            </div>

            <button
              onClick={() => {
                if (accessToken) {
                  uploadFileToGoogleDriveFolder();
                }
              }}
              className="w-full mt-6 py-2 px-4 bg-[#f8673b] text-white font-semibold rounded-lg hover:bg-blue-600 transition-all duration-300"
              disabled={!file}
            >
              Upload
            </button>
          </div>
        </div>
      </Layout>
    </>
  );
};
export default GoogleDrive;
