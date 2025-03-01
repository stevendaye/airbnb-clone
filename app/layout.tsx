import type { Metadata } from "next";
import { Nunito } from "next/font/google";
import "./globals.css";
import { Navbar } from "./components/navbar/navbar";

const font = Nunito({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Airbnb Clone",
  description: "Lightweight Clone of Airbnb",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={font.className}>
        <Navbar />
        {children}
      </body>
    </html>
  );
}
