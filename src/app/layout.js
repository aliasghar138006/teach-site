import { Inter } from "next/font/google";
import "./globals.css";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "video-react/dist/video-react.css";
import Layout from "@/components/layout/Layout";
import localFont from "next/font/local";

const inter = Inter({ subsets: ["latin"] });

const pinarFont = localFont({
  src: "../../public/fonts/pinar.ttf",
});

export const metadata = {
  title: "صفحه اصلی سایت",
  description: "توضیحات صفحه اصلی سایت",
  icon: "./logo.ico",
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
