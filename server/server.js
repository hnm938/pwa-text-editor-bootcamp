const express = require("express");
const app = express();
const port = process.env.PORT || 3000; // Choose a suitable port

// Middleware for parsing JSON request bodies
app.use(express.json());

// Define your API routes here
app.use("/api/notes", require("./routes/notes")); // Create this route file

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
