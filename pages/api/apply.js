import { client } from "../../lib/sanity";
import nc from "next-connect";
import { formDataMiddleware } from "../../lib/middleware";
import { readFile } from "fs/promises";

export const config = {
  api: {
    // tell next.js to skip body parsing.
    bodyParser: false,
  },
};

const handler = nc();
handler.use(formDataMiddleware);

handler.post(async function handler(req, res) {
  const { body, files } = req;

  // multiparty converts every field into an array
  const [firstName] = body.firstName || [];
  const [lastName] = body.lastName || [];
  const [email] = body.email || [];

  const doc = {
    _type: "person",
    firstName,
    lastName,
    email,
    files: [],
  };

  doc.files = files?.files?.map(async (file) => {
    // Read file and store as a buffer
    const buffer = await readFile(file?.path);
    // Upload buffer to sanity
    const asset = await client.assets.upload("file", buffer, {
      filename: file?.originalFilename || undefined,
    });
    console.log("File uploaded, id:", asset?._id);
    // Reference asset inside the document
    const reference = {
      _type: "file",
      asset: {
        _type: "reference",
        _ref: asset?._id || null,
      },
    };
    return reference;
  });

  // Wait until all file promises have completed
  await Promise.all(doc.files);

  const person = await client.create(doc);
  console.log("Person created, id: ", person?._id);

  res.status(200).send("Thank you!");
});

export default handler;
