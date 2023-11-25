import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Home Todo",
  description: "Home",
};

export default async function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div>{children}</div>;
}
