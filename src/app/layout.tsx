import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "AI Business IQ",
  description: "What's your AI Business IQ? Take the 5-minute assessment and get a personalized course tailored to your score.",
  icons: {
    icon: [
      { url: "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><rect width='100' height='100' rx='22' fill='%23071426'/><text y='72' x='50' text-anchor='middle' font-size='52' font-weight='800' font-family='system-ui,sans-serif' fill='%231f7bff'>IQ</text></svg>" },
    ],
  },
  openGraph: {
    title: "AI Business IQ",
    description: "What's your AI Business IQ? Take the 5-minute assessment and get a personalized course tailored to your score.",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className="font-sans">{children}</body>
    </html>
  );
}
