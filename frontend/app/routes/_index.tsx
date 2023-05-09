import type { V2_MetaFunction } from "@remix-run/node";
import type { LinksFunction } from "@remix-run/node";

import { Story } from "~/models/part";
import stylesUrl from "~/styles/index.css";

export const links: LinksFunction = () => [
  { rel: "stylesheet", href: stylesUrl },
];
export const meta: V2_MetaFunction = () => {
  return [{ title: "Build Your Own Adventure" }];
};

export default function Index() {
  return (
    <div>
      <Story />
    </div>
  );
}
