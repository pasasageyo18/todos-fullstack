import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Create Todo",
  description: "Create Todo",
};

export default async function CreateLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div>{children}</div>;
}
