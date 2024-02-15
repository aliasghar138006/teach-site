import { Inter } from "next/font/google";
import "./globals.css";
import Layout from "@/components/layout/Layout";
import localFont from "next/font/local";

const inter = Inter({ subsets: ["latin"] });

const pinarFont = localFont({
  src: "../../public/fonts/pinar.ttf",
});

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={pinarFont.className}>
        <Layout>{children}</Layout>
      </body>
    </html>
  );
}
