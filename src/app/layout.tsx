import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import AllProvider from "./Provider";
import { getServerSession } from "next-auth";
import { nextauthOptions } from "@/lib/nextauthOptions";
import Navbar from "@/components/navbar/Navbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Welcome to my page",
  description: "Welcome",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(nextauthOptions);
  return (
    <html lang="en">
      <body className={inter.className}>
        <AllProvider session={session}>
          <Navbar />
          {children}
        </AllProvider>
      </body>
    </html>
  );
}
