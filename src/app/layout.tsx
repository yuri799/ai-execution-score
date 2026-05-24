import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "AI Business IQ",
  description: "What's your AI Business IQ? Take the 5-minute assessment and get a personalized course tailored to your score.",
  openGraph: {
    title: "AI Business IQ",
    description: "What's your AI Business IQ? Take the 5-minute assessment and get a personalized course tailored to your score.",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
