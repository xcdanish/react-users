/* eslint-disable no-unused-vars */
// Loader.js
import React from "react";
import { Container } from "react-bootstrap";
import { motion } from "framer-motion";

const Loader = () => {
  return (
    <Container
      fluid
      className="d-flex justify-content-center align-items-center"
      style={{ height: "100vh", background: "#f0f0f0" }}
    >
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        style={{ position: "relative" }}
      >
        {/* Outer Circle */}
        <motion.div
          style={{
            border: "5px solid #3498db",
            borderRadius: "50%",
            width: "100px",
            height: "100px",
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          }}
          animate={{
            rotate: 360,
          }}
          transition={{
            repeat: Infinity,
            repeatType: "loop",
            duration: 2,
            ease: "linear",
          }}
        />

        {/* Inner Circle */}
        <motion.div
          style={{
            border: "5px solid #e74c3c",
            borderRadius: "50%",
            width: "40px",
            height: "40px",
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          }}
          animate={{
            y: ["0%", "20%", "0%"], // Bouncing effect
          }}
          transition={{
            repeat: Infinity,
            repeatType: "loop",
            duration: 0.6,
            ease: "easeInOut",
          }}
        />
      </motion.div>
    </Container>
  );
};

export default Loader;
