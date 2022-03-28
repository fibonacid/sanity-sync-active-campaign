import { client } from "../../lib/sanity";

export default async function handler(req, res) {
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
}
