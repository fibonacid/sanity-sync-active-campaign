import nc from "next-connect";
import { isValidRequest } from "@sanity/webhook";

const handler = nc();

const secret = process.env.SANITY_WEBHOOK_SECRET;

handler.post(async function handler(req, res) {
  if (!isValidRequest(req, secret)) {
    res.status(401).json({ success: false, message: "Invalid signature" });
    return;
  }

  const person = req.body;
  console.log(person);

  res.end();
});

export default handler;
