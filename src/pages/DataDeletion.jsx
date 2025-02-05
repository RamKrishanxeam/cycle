import React from "react";

const DataDeletion = () => {
  return (
    <div className="container mt-5">
      <h1>Data Deletion Request</h1>
      <p>If you want to delete your data, please send an email to:</p>
      <p>
        <strong>Email:</strong>{" "}
        <a href="mailto:support@example.com">support@example.com</a>
      </p>
      <p>Include your account details so we can process your request.</p>
    </div>
  );
};

export default DataDeletion;
