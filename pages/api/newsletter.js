export default function newsletterHandler(req, res) {
  if (req.method === "POST") {
    const email = req.body["email"];

    if (!email || !email.includes("@")) {
      res.status(422).json({ message: "Invalid email address" });
      return;
    }
    res.status(201).json({
      message: `subscribed to newsletter with email: ${email}`,
      email: email,
    });
  }
}
