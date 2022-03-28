import { UserIcon } from "@sanity/icons";

export default {
  name: "person",
  title: "Person",
  type: "document",
  icon: UserIcon,
  fields: [
    {
      name: "firstName",
      title: "First name",
      type: "string",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "lastName",
      title: "Last name",
      type: "string",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "email",
      title: "Email",
      type: "string",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "files",
      title: "Files",
      type: "array",
      of: [
        {
          type: "file",
        },
      ],
    },
  ],
};
