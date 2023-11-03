import { mongooseAdapter } from "@payloadcms/db-mongodb";
import { lexicalEditor } from "@payloadcms/richtext-lexical";
import { webpackBundler } from "@payloadcms/bundler-webpack";
import { buildConfig } from "payload/config";
import path from "path";
import Users from "./cms/collections/Users";
import Admins from "./cms/collections/Admins";

export default buildConfig({
  serverURL: process.env.PAYLOAD_PUBLIC_SERVER_URL || "http://localhost:3000",
  admin: {
    user: Admins.slug,
    bundler: webpackBundler(),
  },
  editor: lexicalEditor({}),
  db: mongooseAdapter({
    url: process.env.MONGO_URL ?? false,
    connectOptions: {
      dbName: process.env.MONGO_DBNAME,
    },
  }),
  collections: [
    Admins,
    Users,
  ],
  typescript: {
    outputFile: path.resolve(__dirname, "cms/payload-types.ts"),
  },
});
