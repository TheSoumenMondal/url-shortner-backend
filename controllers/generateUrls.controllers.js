import { nanoid } from "nanoid";
import URL from "../models/url.models.js";

export async function generateUrl(req, res) {
  const url = req.body.url;

  if (!url) {
    return res.status(400).json({ error: "Please enter a valid URL" });
  }

  const shortId = nanoid(6);

  try {
    const newUrl = await URL.create({
      shortId: shortId,
      redirectUrl: url,
      visitHistory: [],
    });

    res.status(201).json(newUrl);
  } catch (error) {
    console.error("Error creating URL:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

export async function redirectToOriginalUrl(req, res) {
  const shortId = req.params.shortId;

  try {
    const url = await URL.findOneAndUpdate(
      { shortId },
      { $push: { visitHistory: { timeStamp: Date.now() } } },
      { new: true }
    );

    if (!url) {
      return res.status(404).json({ error: "Short URL not found" });
    }

    res.redirect(url.redirectUrl); 
  } catch (error) {
    console.error("Error during redirection:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
