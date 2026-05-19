import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "AI Execution Score",
  description: "Assess your AI readiness and get a personalized execution roadmap.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
