import type { Metadata } from "next";
import { Toaster } from "@/components/ui/toaster";
import { Inter } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";

import "@stream-io/video-react-sdk/dist/css/styles.css";
import "react-datepicker/dist/react-datepicker.css";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Vmeet",
  description: "Video and audio meeting app",
  icons: {
    icon: "/icons/logo.png",
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <ClerkProvider appearance={{
        layout: {
          logoImageUrl: "/icons/logo.png",
          socialButtonsVariant: "iconButton"
        },
        variables: {
          colorText: "#fff",
          colorBackground: "#1c1f2e",
          colorInputText: "#fff",
          colorInputBackground: "#252A41",
          colorPrimary: "#830EF9",
        }
      }
      }>
        <body className={`${inter.className} bg-dark-2`}>
          {children}
          <Toaster />
        </body>
      </ClerkProvider>
    </html>
  );
}
