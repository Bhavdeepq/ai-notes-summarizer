import { useState } from "react";
import axios from "axios";
import { useDropzone } from "react-dropzone";
import { ClipLoader } from "react-spinners";
import ReactMarkdown from "react-markdown";

function App() {
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const onDrop = (acceptedFiles) => {
    const selectedFile = acceptedFiles[0];

    if (!selectedFile) return;

    // Only PDF
    if (selectedFile.type !== "application/pdf") {
      alert("Only PDF files allowed");
      return;
    }

    // Max 10MB
    if (selectedFile.size > 10 * 1024 * 1024) {
      alert("File size must be under 10MB");
      return;
    }

    // Empty file
    if (selectedFile.size === 0) {
      alert("Empty PDF not allowed");
      return;
    }

    setFile(selectedFile);
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "application/pdf": [".pdf"],
    },
    multiple: false,
    maxSize: 10 * 1024 * 1024,
  });

  const uploadFile = async () => {
    if (!file) {
      alert("Choose a PDF first");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    setLoading(true);
    setMessage("");

    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/api/upload/",
        formData
      );

      setMessage(response.data.summary);
    } catch (error) {
      console.log(error);

      setMessage(
        error.response?.data?.error ||
        error.response?.data?.summary ||
        "Upload failed"
      );
    }

    setLoading(false);
  };

  const copySummary = () => {
    navigator.clipboard.writeText(message);
    alert("Summary copied!");
  };

  const downloadSummary = () => {
    const element = document.createElement("a");

    const fileBlob = new Blob([message], {
      type: "text/plain",
    });

    element.href = URL.createObjectURL(fileBlob);
    element.download = "AI_Summary.txt";

    document.body.appendChild(element);
    element.click();
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#f1f5f9",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "20px",
        fontFamily: "Arial",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "850px",
          background: "white",
          padding: "35px",
          borderRadius: "20px",
          boxShadow: "0 8px 25px rgba(0,0,0,0.1)",
        }}
      >
        <h1
          style={{
            textAlign: "center",
            color: "#2563eb",
            marginBottom: "10px",
          }}
        >
          AI Notes Summarizer
        </h1>

        <p
          style={{
            textAlign: "center",
            color: "gray",
            marginBottom: "25px",
          }}
        >
          Upload your PDF and get AI-generated notes
        </p>

        <div
          {...getRootProps()}
          style={{
            border: "2px dashed #2563eb",
            padding: "40px",
            borderRadius: "15px",
            textAlign: "center",
            cursor: "pointer",
            background: isDragActive ? "#eff6ff" : "#f8fafc",
            transition: "0.3s",
          }}
        >
          <input {...getInputProps()} />

          {isDragActive ? (
            <p>Drop PDF here...</p>
          ) : (
            <p>
              Drag & drop PDF here
              <br />
              or click to browse
              <br />
              <span
                style={{
                  color: "gray",
                  fontSize: "14px",
                }}
              >
                PDF only • Max size: 10MB
              </span>
            </p>
          )}

          {file && (
            <p
              style={{
                marginTop: "10px",
                color: "#2563eb",
                fontWeight: "bold",
              }}
            >
              Selected: {file.name}
            </p>
          )}
        </div>

        <div
          style={{
            textAlign: "center",
            marginTop: "20px",
          }}
        >
          <button
            onClick={uploadFile}
            disabled={loading}
            style={{
              background: "#2563eb",
              color: "white",
              border: "none",
              padding: "12px 25px",
              borderRadius: "10px",
              cursor: "pointer",
              fontSize: "16px",
              fontWeight: "bold",
            }}
          >
            {loading ? "Generating..." : "Upload & Summarize"}
          </button>
        </div>

        {loading && (
          <div
            style={{
              textAlign: "center",
              marginTop: "25px",
            }}
          >
            <ClipLoader size={40} />
            <p style={{ marginTop: "10px" }}>
              Generating AI summary...
            </p>
          </div>
        )}

        {message && (
          <div
            style={{
              marginTop: "30px",
              padding: "25px",
              background: "#f8fafc",
              borderRadius: "15px",
              boxShadow: "0 2px 10px rgba(0,0,0,0.08)",
              lineHeight: "1.9",
              color: "#1e293b",
              fontSize: "17px",
            }}
          >
            <h3 style={{ marginBottom: "15px" }}>
              AI Summary
            </h3>

            <div
              style={{
                display: "flex",
                gap: "10px",
                marginBottom: "20px",
                flexWrap: "wrap",
              }}
            >
              <button
                onClick={copySummary}
                style={{
                  background: "#16a34a",
                  color: "white",
                  border: "none",
                  padding: "10px 16px",
                  borderRadius: "8px",
                  cursor: "pointer",
                  fontWeight: "bold",
                }}
              >
                Copy Summary
              </button>

              <button
                onClick={downloadSummary}
                style={{
                  background: "#2563eb",
                  color: "white",
                  border: "none",
                  padding: "10px 16px",
                  borderRadius: "8px",
                  cursor: "pointer",
                  fontWeight: "bold",
                }}
              >
                Download TXT
              </button>
            </div>

            <ReactMarkdown
              components={{
                h1: ({ node, ...props }) => (
                  <h1
                    style={{
                      color: "#2563eb",
                      marginBottom: "15px",
                    }}
                    {...props}
                  />
                ),

                h2: ({ node, ...props }) => (
                  <h2
                    style={{
                      color: "#7c3aed",
                      marginTop: "20px",
                      marginBottom: "10px",
                    }}
                    {...props}
                  />
                ),

                strong: ({ node, ...props }) => (
                  <strong
                    style={{
                      color: "#0f172a",
                      fontWeight: "700",
                    }}
                    {...props}
                  />
                ),

                li: ({ node, ...props }) => (
                  <li
                    style={{
                      marginBottom: "8px",
                    }}
                    {...props}
                  />
                ),
              }}
            >
              {message}
            </ReactMarkdown>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;