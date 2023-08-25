import { Sidebar } from "@/components/Sidebar";
import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Golf Leaderboard",
  description: "Created by Augusto Marinaro for Henry",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Sidebar />
        <main className="content">{children}</main>
      </body>
    </html>
  );
}
