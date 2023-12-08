export default function commentsHandler(req, res) {
  const eventid = req.query["eventid"];

  if (req.method === "POST") {
    const { email, name, text } = req.body;

    if (!isInputValid(email, name, text)) {
      res.status(422).json({ message: "Invalid input" });
      return;
    }

    const newComment = {
      email,
      name,
      text,
    };
    res.status(201).json({
      message: "Added new comment",
      comment: newComment,
    });
  }

  if (req.method === "GET") {
    const dummy = [
      { id: "c1", name: "nikola", text: "new comment" },
      { id: "c12", name: "pero", text: "newaaaaaaaaaa comment" },
    ];
    return res.status(200).json({ comments: dummy });
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
