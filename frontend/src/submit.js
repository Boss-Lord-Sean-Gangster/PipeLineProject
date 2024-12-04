import { useState } from "react";
import axios from "axios";
import { isDAG } from "./utils";

export const SubmitButton = ({ nodes, edges }) => {
  const [alert, setAlert] = useState(null);
  const result = isDAG(nodes,edges); 

  const handleSubmit = async () => {
    try {
      const payload = { nodes, edges };

      // Sending the POST request to our fastapi server
            const response = await axios.post("http://127.0.0.1:8000/pipelines/parse", payload);

      const { num_nodes, num_edges } = response.data;

      // Here we are setting the alert message for user to see 
      setAlert( <>
        <strong>Pipeline Details:</strong>
        <br />
        Number of Nodes: {num_nodes}
        <br />
        Number of Edges: {num_edges}
        <br/>
        {result? 'is DAG':'is not DAG'}
      </>);
      setTimeout(() => setAlert(null), 5000);
    } catch (error) {
      console.error("Error submitting data:", error);
      setAlert("An error occurred while submitting the data. Please try again.");
      
      // Hide the alert after 5 seconds
      setTimeout(() => setAlert(null), 5000);
    }
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
      }}
    >
      <button
        type="submit"
        className="px-6 py-2 mt-2 text-white font-bold rounded-full bg-gradient-to-r from-purple-500 to-pink-500 shadow-md hover:opacity-90"
        onClick={handleSubmit}
      >
        Submit
      </button>

      {/* Custom Alert */}
      {alert && (
        <div
          style={{
            position: "fixed",
            top: "20px",
            right: "20px",
            padding: "15px",
            backgroundColor: "#2E3A4D",
            color: "white",
            borderRadius: "8px",
            boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
            zIndex: 1000,
            animation: "fadeIn 0.5s ease-in-out",
          }}
        >
          {alert}
        </div>
      )}

      {/*for fade-in effect of our custom alert box */}
      <style>
        {`
          @keyframes fadeIn {
            from {
              opacity: 0;
              transform: translateY(10%);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
        `}
      </style>
    </div>
  );
};
