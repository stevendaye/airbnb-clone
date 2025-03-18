import type { Metadata } from "next";
import { Nunito } from "next/font/google";
import ToasterProvider from "./providers/ToasterProvider";

import "./globals.css";

import { Navbar } from "./components/navbar/navbar";
import { RegisterModal } from "./components/modals/register-modal";
import { LoginModal } from "./components/modals/login-modal";
import { RentModal } from "./components/modals/rent-modal";

import getCurrentUser from "./actions/getCurrentUer";

const font = Nunito({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Airbnb Clone",
  description: "Lightweight Clone of Airbnb",
  icons: {
    icon: [
      {
        media: "(prefers-color-scheme: dark)",
        url: "/logo.png",
        href: "/logo.png",
      },
      {
        media: "(prefers-color-scheme: light)",
        url: "/logo.png",
        href: "/logo.png",
      },
    ],
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const currentUser = await getCurrentUser();

  return (
    <html lang="en">
      <body className={font.className}>
        <ToasterProvider />
        <RentModal />
        <RegisterModal />
        <LoginModal />
        <Navbar currentUser={currentUser} />
        {children}
      </body>
    </html>
  );
}
