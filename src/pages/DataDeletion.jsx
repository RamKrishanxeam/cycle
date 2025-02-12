import React, { useState } from "react";
import Layout from "../layout/Layout";
import SplitPane, { Pane } from "split-pane-react";
import "split-pane-react/esm/themes/default.css";


const DataDeletion = () => {
  // const [leftWidth, setLeftWidth] = useState(50); // Default: 50% width
  // const [isResizing, setIsResizing] = useState(false);

  // const handleMouseDown = () => {
  //   setIsResizing(true);
  // };

  // const handleMouseMove = (e) => {
  //   if (!isResizing) return;

  //   const newWidth = (e.clientX / window.innerWidth) * 100; // Convert to percentage
  //   if (newWidth >= 100) {
  //     setLeftWidth(100); // Full left section
  //   } else if (newWidth <= 0) {
  //     setLeftWidth(0); // Full right section
  //   } else {
  //     setLeftWidth(newWidth);
  //   }
  // };

  // const handleMouseUp = () => {
  //   setIsResizing(false);
  // };
  const [sizes, setSizes] = useState(["50%", "auto"]);
  return (
    <Layout>
      <div className="container-fluid vh-100 p-5">
        <SplitPane
          split="vertical"
          sizes={sizes}
          onChange={setSizes}
          sashClassName={() => <div className="custom-sash" />}
        >
          <div className="split-left"></div>
          <div className="split-right"></div>
        </SplitPane>
      </div>
      {/* <div
        className="container-fluid d-flex vh-100"
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        style={{ position: "relative", overflow: "hidden" }}
      >
        <div
          className="split-left"
          style={{
            width: `${leftWidth}%`,
            transition: isResizing ? "none" : "0.3s ease",
            overflow: "hidden",
          }}
        ></div>
        <div
          className="split-bar"
          onMouseDown={handleMouseDown}
          style={{
            position: "absolute",
            left: `${leftWidth}%`,
            width: "15px",
            height: "100%",
            backgroundColor: "#3C3530",
            cursor: "col-resize",
            zIndex: 10,
          }}
        ></div>
        <div
          className="split-right flex-fill"
          style={{
            width: `${100 - leftWidth}%`,
            transition: isResizing ? "none" : "0.3s ease",
            overflow: "hidden",
          }}
        ></div>
      </div> */}
    </Layout>
  );
};

export default DataDeletion;
