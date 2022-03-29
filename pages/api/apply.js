import { client } from "../../lib/sanity";
import nc from "next-connect";
import { formDataMiddleware } from "../../lib/middleware";

export const config = {
  api: {
    // tell next.js to skip body parsing.
    bodyParser: false,
  },
};

const handler = nc();
handler.use(formDataMiddleware);

handler.post(async function handler(req, res) {
  console.log(req.body);
  console.log(req.files);

  const doc = {
    _type: "person",
    firstName: "",
    lastName: "",
    email: "",
    files: [],
  };
  const person = await client.create(doc);
  console.log("Person created, id: ", person?._id);

  res.status(200).send("Thank you!");
});

export default handler;
