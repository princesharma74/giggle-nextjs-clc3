import type { Metadata } from "next";
import { Urbanist } from "next/font/google";
import "./globals.css"
import Navbar from "@/components/navbar/navbar";
import Footer from "@/components/footer/footer";
import { ThemeProvider } from "@/components/theme-provider";
import { ModalProvider } from "@/providers/modal-provider";
import { Toaster } from "@/components/ui/toaster";
import { ClerkProvider } from "@clerk/nextjs"

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
    <ClerkProvider>
      <html lang="en">
        <body className={font.className}>
          {/* Add Providers below */}
          <ModalProvider/>
          <Toaster/>
          <ThemeProvider
              attribute="class"
              defaultTheme="system"
              enableSystem
              disableTransitionOnChange
            >

            <Navbar/>
            {children}
            <Footer/>
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
