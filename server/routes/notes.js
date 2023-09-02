const express = require("express");

const router = express.Router(); // Create an instance of Express Router

// Create a route handler for saving a new note
router.post("/", async (req, res) => {
  try {
    res.status(201).json({ "response": "Success" });
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

module.exports = router; // Export the router for use in server.js
