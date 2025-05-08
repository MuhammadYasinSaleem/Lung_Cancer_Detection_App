import React, { useState } from "react";
import axios from "axios";

const FileUpload = () => {
  const [file, setFile] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFile(e.target.files[0]);
    setResult(null); // Clear previous result
  };

  const handleUpload = async () => {
    if (!file) {
      alert("Please select a file first.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      setLoading(true);
      const response = await axios.post("http://127.0.0.1:8000/predict", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      console.log("Prediction response:", response.data);
      setResult(response.data);
    } catch (error) {
      if (error.response) {
        console.error("Server error:", error.response.data);
        setResult({ error: error.response.data });
      } else if (error.request) {
        console.error("No response from server:", error.request);
        setResult({ error: "No response from server." });
      } else {
        console.error("Error setting up request:", error.message);
        setResult({ error: error.message });
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: "1rem", fontFamily: "Arial, sans-serif" }}>
      <h2>Lung Cancer Prediction</h2>
      <input
        type="file"
        accept=".jpg,.jpeg,.png,.dcm,.dicom"
        onChange={handleChange}
      />
      <br /><br />
      <button onClick={handleUpload} disabled={loading}>
        {loading ? "Uploading..." : "Upload and Predict"}
      </button>

      {result && !result.error && (
        <div style={{ marginTop: "1rem", padding: "1rem", border: "1px solid #ccc", borderRadius: "8px" }}>
          <h3>Prediction Result</h3>
          <p><strong>Type:</strong> {result.result}</p>
          <p><strong>Confidence:</strong> {(result.confidence * 100).toFixed(2)}%</p>
        </div>
      )}

      {result?.error && (
        <div style={{ marginTop: "1rem", color: "red" }}>
          <h4>Error</h4>
          <pre>{JSON.stringify(result.error, null, 2)}</pre>
        </div>
      )}
    </div>
  );
};

export default FileUpload;
