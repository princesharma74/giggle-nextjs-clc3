import type { Metadata } from "next";
import { Urbanist } from "next/font/google";
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider";
import { ModalProvider } from "@/providers/modal-provider";
import { Toaster } from "@/components/ui/toaster";
import { SessionProvider } from "next-auth/react";

const font = Urbanist({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Codebuddy - Your coding companion",
  description: "You are no longer a lonely coder. Let's improve together.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
      <html lang="en">
        <body className={font.className}>
          {/* Add Providers below */}
          <SessionProvider>
          <ModalProvider/>
          <Toaster/>
          <ThemeProvider
              attribute="class"
              defaultTheme="system"
              enableSystem
              disableTransitionOnChange
            >
            {children}
          </ThemeProvider>
          </SessionProvider>
        </body>
      </html>
  );
}
