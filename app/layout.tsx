import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import ToasterProvider from "@/components/providers/ToasterProvider";

import "./globals.css";

import { Navbar } from "@/components/navbar/navbar";
import { RegisterModal } from "@/components/modals/register-modal";
import { LoginModal } from "@/components/modals/login-modal";
import { RentModal } from "@/components/modals/rent-modal";

import getCurrentUser from "@/actions/get-current-user";
import { SearchModal } from "@/components/modals/search-modal";
import { FooterMenu } from "@/components/footer/footer-menu";

const font = Montserrat({
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
    <html lang="en" suppressHydrationWarning>
      <body className={`${font.className} bg-background`} suppressHydrationWarning>
        <ToasterProvider />
        <RentModal />
        <RegisterModal />
        <LoginModal />
        <SearchModal />
        <Navbar currentUser={currentUser} />

        <div className="pb-20 pt-28">{children}</div>

        <FooterMenu />
      </body>
    </html>
  );
}
