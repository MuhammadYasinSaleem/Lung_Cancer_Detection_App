import React, { useState } from "react";
import axios from "axios";

const AI_Doctor = () => {
  const [file, setFile] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [preview, setPreview] = useState(null);
  const [dragActive, setDragActive] = useState(false);

  const handleChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      setResult(null);
      createPreview(selectedFile);
    }
  };

  const createPreview = (file) => {
    if (file.type.includes("image")) {
      const reader = new FileReader();
      reader.onload = () => setPreview(reader.result);
      reader.readAsDataURL(file);
    } else {
      setPreview(null);
    }
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const droppedFile = e.dataTransfer.files[0];
      setFile(droppedFile);
      setResult(null);
      createPreview(droppedFile);
    }
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

      setResult(response.data);
    } catch (error) {
      let errorMessage = "An error occurred during prediction.";
      if (error.response) {
        errorMessage = error.response.data.message || JSON.stringify(error.response.data);
      } else if (error.request) {
        errorMessage = "No response from server. Please try again later.";
      } else {
        errorMessage = error.message;
      }
      setResult({ error: errorMessage });
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setFile(null);
    setResult(null);
    setPreview(null);
  };

  return (
    <div className="dashboard-container">
      {/* Sidebar */}
      <div className="sidebar">
        <h1 className="logo">DIAGNOSENSE</h1>
        <nav className="nav-menu">
          <div className="nav-item">Dashboard</div>
          <div className="nav-item">Profile</div>
          <div className="nav-item active">AI Doctor</div>
          <div className="nav-item">ChatBot</div>
        </nav>
      </div>

      {/* Main Content */}
      <div className="main-content">
        <div className="upload-container">
          <h2 className="upload-title">Upload a chest scan for instant analysis</h2>
          
          <div 
            className={`upload-area ${dragActive ? "drag-active" : ""}`}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
          >
            {!file ? (
              <div className="upload-content">
                <p className="upload-text">Drag & drop your file here</p>
                <label className="browse-button">
                  Browse Files
                  <input 
                    type="file" 
                    accept=".jpg,.jpeg,.png,.dcm,.dicom"
                    onChange={handleChange}
                    hidden
                  />
                </label>
                <p className="file-types">Supported formats: JPG, PNG, DICOM</p>
              </div>
            ) : (
              <div className="file-preview-container">
                {preview ? (
                  <div className="image-preview-wrapper">
                    <img src={preview} alt="Upload preview" className="image-preview" />
                  </div>
                ) : (
                  <div className="dicom-preview">
                    <div className="dicom-icon">
                      <svg viewBox="0 0 24 24">
                        <path d="M14,2H6A2,2 0 0,0 4,4V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V8L14,2M18,20H6V4H13V9H18V20Z" />
                      </svg>
                    </div>
                    <p className="dicom-filename">{file.name}</p>
                    <p className="dicom-filesize">{(file.size / 1024).toFixed(2)} KB</p>
                  </div>
                )}
                <div className="button-group">
                  <button 
                    className="analyze-button" 
                    onClick={handleUpload} 
                    disabled={loading}
                  >
                    {loading ? (
                      <>
                        <span className="spinner"></span>
                        Analyzing...
                      </>
                    ) : (
                      "Analyze Scan"
                    )}
                  </button>
                  <button className="clear-button" onClick={resetForm}>
                    Clear
                  </button>
                </div>
              </div>
            )}
          </div>

          {result && (
            <div className={`result-container ${result.error ? "error" : ""}`}>
              {result.error ? (
                <div className="error-result">
                  <h3 className="result-title">Error</h3>
                  <p className="error-message">{result.error}</p>
                  <button className="try-again-button" onClick={resetForm}>
                    Try Again
                  </button>
                </div>
              ) : (
                <>
                  <h3 className="result-title">Analysis Results</h3>
                  <div className="result-details">
                    <div className="result-item">
                      <span className="result-label">Prediction:</span>
                      <span className={`result-value ${result.result?.toLowerCase().replace(/\s+/g, '-')}`}>
                        {result.result}
                      </span>
                    </div>
                    <div className="result-item">
                      <span className="result-label">Confidence:</span>
                      <div className="confidence-meter">
                        <div 
                          className="confidence-bar" 
                          style={{ width: `${result.confidence * 100}%` }}
                        ></div>
                        <span className="confidence-value">
                          {(result.confidence * 100).toFixed(2)}%
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="recommendation">
                    <h4>Next Steps</h4>
                    <p>
                      This analysis is not a definitive diagnosis. Please consult with a medical professional 
                      for proper evaluation and treatment options.
                    </p>
                  </div>
                </>
              )}
            </div>
          )}

          <div className="disclaimer">
            <p>
              <strong>Note:</strong> This tool is for informational purposes only and should not replace 
              professional medical advice.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AI_Doctor;