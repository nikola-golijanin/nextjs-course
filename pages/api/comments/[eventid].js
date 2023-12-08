import fs from "fs";
import { buildFilePath, extractData } from "../../../helpers/api-util";

export default function commentsHandler(req, res) {
  const eventid = req.query["eventid"];

  if (req.method === "POST") {
    const { email, name, text } = req.body;

    if (!isInputValid(email, name, text)) {
      res.status(422).json({ message: "Invalid input" });
      return;
    }

    const newComment = {
      id: eventid,
      email,
      name,
      text,
    };

    try {
      const filePath = buildFilePath("comments.json");
      const data = extractData(filePath);
      data.push(newComment);
      fs.writeFileSync(filePath, JSON.stringify(data));

      res.status(201).json({
        message: "Added new comment",
        comment: newComment,
      });
    } catch (error) {
      res.status(500).json(error.message);
    }
  }

  if (req.method === "GET") {
    try {
      const filePath = buildFilePath("comments.json");
      const data = extractData(filePath);
      const comments = data.filter((c) => c.id === eventid);
      return res.status(200).json({ comments: comments });
    } catch (error) {
      res.status(500).json({ comments: [] });
    }
  }
}

function isInputValid(email, name, text) {
  if (
    !email ||
    !email.includes("@") ||
    !name ||
    name.trim() === "" ||
    !text ||
    text.trim() === ""
  ) {
    return false;
  }
  return true;
}
