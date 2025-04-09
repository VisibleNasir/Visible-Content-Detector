const path = require("path");

const handleText = (req, res) => {
  const { text } = req.body;

  // Later: Run Python model here
  console.log("Received text:", text);

  res.json({
    success: true,
    message: "Text analyzed (placeholder)",
    isHarmful: false,
  });
};

const handleFileUpload = (req, res) => {
  const file = req.file;

  if (!file) {
    return res.status(400).json({ error: "No file uploaded" });
  }

  console.log("Received file:", file.path);

  // Later: Pass `file.path` to Python model
  res.json({
    success: true,
    message: "File received",
    filename: file.filename,
    isHarmful: false,
  });
};

module.exports = {
  handleText,
  handleFileUpload,
};
