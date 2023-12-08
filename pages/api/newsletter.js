import fs from "fs";
import path from "path";
import { buildFilePath, extractData } from "../../helpers/api-util";

export default function newsletterHandler(req, res) {
  if (req.method === "POST") {
    const email = req.body["email"];

    if (!email || !email.includes("@")) {
      res.status(422).json({ message: "Invalid email address" });
      return;
    }
    try {
      const filePath = buildFilePath("newsletter.json");
      const data = extractData(filePath);
      data.push({ id: new Date().toISOString(), email: email });
      fs.writeFileSync(filePath, JSON.stringify(data));
    } catch (error) {
      res.status(500).json(error.message);
    }

    res.status(201).json({
      message: `subscribed to newsletter with email: ${email}`,
      email: email,
    });
  }
}
