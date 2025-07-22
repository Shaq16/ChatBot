const express = require("express");
const cors = require("cors");
const fetch = require("node-fetch"); // Optional depending on Node version
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.post("/api/message", async (req, res) => {
    try {
        const response = await fetch(process.env.API_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${process.env.API_KEY}`
            },
            body: JSON.stringify(req.body)
        });
        const data = await response.json();
        res.json(data);
    } catch (error) {
        console.error("API error:", error);
        res.status(500).json({ error: "Something went wrong." });
    }
});

app.listen(PORT, () => {
    console.log(`✅ Server running at http://localhost:${PORT}`);
});
