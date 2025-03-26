export default async function handler(req, res) {
  const { prompt } = req.body;

  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`,
    },
    body: JSON.stringify({
      model: "gpt-4-turbo",
      messages: [
        { role: "system", content: "You are Architect Helper, an AI assistant for architects." },
        { role: "user", content: prompt },
      ],
      max_tokens: 1000
    }),
  });

  const data = await response.json();
  res.status(200).json({ reply: data.choices[0].message.content });
}
