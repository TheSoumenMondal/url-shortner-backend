import express from "express";
import { generateUrl, redirectToOriginalUrl } from "../controllers/generateUrls.controllers.js";
import URL from "../models/url.models.js";
const router = express.Router();

router.post("/", generateUrl);

router.get("/:shortId", redirectToOriginalUrl);

router.get('/analytics/:shortId', async (req, res) => {
  try {
    const url = await URL.findOne({ shortId: req.params.shortId });
    if (!url) {
      return res.status(404).json({ error: "Short URL not found" });
    }
    const visitHistory = url.visitHistory;
    const visitCount = visitHistory.length;
    res.json({
      "Visit Count": visitCount,
      "Analytics" : visitHistory,
    });
  } catch (error) {
    console.error("Error fetching analytics:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

export default router;
