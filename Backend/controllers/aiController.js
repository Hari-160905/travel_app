const axios = require("axios");

exports.travelAssistant = async (req, res) => {
  const { message } = req.body;

  try {
    // ✅ 🔥 STRONG PROMPT (FORMAT CONTROL)
    const prompt = `
You are a smart travel assistant.

User Query: ${message}

IMPORTANT: Follow this format strictly.

----------------------------------------

Best Tourist Places Near [Location]

🏞️ Nature & Scenic Spots
📍 Place Name
Short 1–2 line description
👉 Distance or highlight

🛕 Temples & Spiritual Places
📍 Place Name
Short 1–2 line description
👉 Distance or highlight

🏛️ Nearby Cities (if relevant)
📍 City Name
Short description
👉 Distance

🎯 Quick Suggestions

⏱️ Half Day Trip
List places

🗓️ 1 Day Trip
List places

🌄 Weekend Trip
List places

----------------------------------------

RULES:
- ❌ No paragraphs
- ❌ No long explanations
- ❌ No unnecessary text
- ✅ Use bullet style
- ✅ Keep it clean and readable
- ✅ Use emojis exactly as shown
`;

    // ✅ MODEL (LATEST WORKING)
    const model = "gemini-2.5-flash";

    // ✅ API URL
    const apiUrl = `https://generativelanguage.googleapis.com/v1/models/${model}:generateContent?key=${process.env.GEMINI_API_KEY}`;

    const response = await axios.post(apiUrl, {
      contents: [{ parts: [{ text: prompt }] }]
    });

    // ✅ SAFE RESPONSE
    const reply =
      response.data?.candidates?.[0]?.content?.parts?.[0]?.text ||
      "No response";

    res.json({ reply });

  } catch (err) {
    console.error("❌ Gemini Error Detail:", err.response?.data || err.message);

    res.status(500).json({
      error: "Gemini failed",
      details:
        err.response?.data?.error?.message ||
        "Model issue or API limit reached"
    });
  }
};