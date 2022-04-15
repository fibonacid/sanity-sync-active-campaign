import nc from "next-connect";
import { isValidRequest } from "@sanity/webhook";

const handler = nc();

const secret = process.env.SANITY_WEBHOOK_SECRET;

const acAccountName = process.env.ACTIVE_CAMPAIGN_ACCOUNT_NAME;
const acApiToken = process.env.ACTIVE_CAMPAIGN_API_TOKEN;
const acApiBaseUrl = `https://${acAccountName}.api-us1.com/api/3`;

// id of previously created custom field to store
// the sanity Id of a given contact within active campaign.
const acCustomFieldForSanityId =
  process.env.ACTIVE_CAMPAIGN_CUSTOM_FIELD_FOR_SANITY_ID;

const acHeaders = new Headers();
acHeaders.append("Api-Token", acApiToken);
acHeaders.append("Accept", "application/json");
acHeaders.append("Content-Type", "application/json");

handler.post(async function handler(req, res) {
  if (!isValidRequest(req, secret)) {
    res.status(401).json({ success: false, message: "Invalid signature" });
    return;
  }

  const person = req.body;

  if (person?.email) {
    const contact = {
      email: person.email,
      firstName: person?.firstName,
      lastName: person?.lastName,
      fieldValues: [],
    };

    if (person?._id && acCustomFieldForSanityId) {
      // Store sanity id inside an active campaign custom field.
      // This id can be used to add links to a profile page on the website
      // inside transactional emails like this:
      // http://localhost:3000/profile/%SANITY_ID%
      contact.fieldValues.push({
        field: acCustomFieldForSanityId,
        value: person._id,
      });
    }

    const res = await fetch(acApiBaseUrl + "/contacts", {
      method: "POST",
      headers: acHeaders,
      body: JSON.stringify({
        email: person.email,
        firstName: person?.firstName,
        lastName: person?.lastName,
      }),
    });
    const data = await res.json();
    if (data?.id) {
      console.log("contact created. id:", data.id);
    }
  }

  res.end();
});

export default handler;
