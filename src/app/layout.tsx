import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import { dark } from "@clerk/themes";
import Providers from "@/context/Providers";
import { Toaster } from "sonner";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "alpaca",
  description: "Talk with your PDF",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider
      appearance={{
        baseTheme: dark,
      }}
    >
      <Providers>
        <html lang="en">
          <body className={` bg-black ${inter.className}`}>
            <Toaster richColors />
            {children}
          </body>
        </html>
      </Providers>
    </ClerkProvider>
  );
}
