require("dotenv").config();
require("colors");
const { createDocument, getAllDocument, getSingleDocument } = require("./utils/appwrite");
const express = require("express");
const cors = require("cors");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({ origin: process.env.FRONTEND_URL }));

app.get("/api/notes/:perPageDocuments/:pageNo", async (req, res) => {
  try {
    const perPageDocuments = req.params.perPageDocuments;
    const pageNo = req.params.pageNo;
    const response = await getAllDocument(perPageDocuments, pageNo);
    return res.json(response);
  } catch (error) {
    console.error('Error fetching data:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.get("/api/note/:id", async (req, res) => {
  try {
    const documentId = req.params.id;
    const response = await getSingleDocument(documentId);
    return res.json({ message: response.message, data: response.data });
  } catch (error) {
    console.error(`Error fetching particular note data:`, error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.post("/api/notes", async (req, res) => {
  const { title, content } = req.body;
  try {
    const response = await createDocument({ title, content });
    return res.json({ message: response.message, data: response.data });
  } catch (error) {
    console.error('Error saving data:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`.bgCyan);
});