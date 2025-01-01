import type { Metadata } from "next";
import { Geist, Geist_Mono, Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";
import { AuthProvider } from "./components/AuthProvider";
import { Navbar } from "./components/Navbar";
import Footer from "./components/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Italian_dir",
  description: "Directoory delle startup italiane.",
};

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <AuthProvider>
      <html lang='it'>
        <body
          className={`${geistSans.variable} ${geistMono.variable} ${inter.className} antialiased`}
        >
          <Navbar />
          <div className='container max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8'>
            {children}
          </div>

          <Toaster richColors theme='light' closeButton />
          <Footer />
        </body>
      </html>
    </AuthProvider>
  );
}
