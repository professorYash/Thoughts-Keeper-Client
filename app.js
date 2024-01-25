require("dotenv").config();
require("colors");
const { createDocument, getAllDocument } = require("./utils/appwrite");
const express = require("express");
const cors = require("cors");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.get("/api/notes", async (req, res) => {
  try {
    const response = await getAllDocument();
    return res.json(response);
  } catch (error) {
    console.error('Error fetching data:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.post("/api/notes", async (req, res) => {
  const { title, content } = req.body;
  try {
    const response = await createDocument({ title, content });
    return res.json({ message: response.message });
  } catch (error) {
    console.error('Error saving data:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`.bgCyan);
});