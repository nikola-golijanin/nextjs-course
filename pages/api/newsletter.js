import fs from "fs";
import path from "path";

export default function newsletterHandler(req, res) {
  if (req.method === "POST") {
    const email = req.body["email"];

    if (!email || !email.includes("@")) {
      res.status(422).json({ message: "Invalid email address" });
      return;
    }
    const filePath = buildNewsletterPath();
    const data = extractNewsletter(filePath);
    data.push({ id: new Date().toISOString(), email: email });
    fs.writeFileSync(filePath, JSON.stringify(data));

    res.status(201).json({
      message: `subscribed to newsletter with email: ${email}`,
      email: email,
    });
  }
}

export function buildNewsletterPath() {
  return path.join(process.cwd(), "data", "newsletter.json");
}

export function extractNewsletter(filePath) {
  const fileData = fs.readFileSync(filePath);
  const data = JSON.parse(fileData);
  return data;
}
