import type { Metadata } from "next";
import { Space_Grotesk, DM_Sans } from "next/font/google";
import "./globals.css";

const dmSans = DM_Sans({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-heading",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Bagas Prabowo – Full Stack Developer",
  description: "I build beautiful, performant, and scalable web applications with modern technologies. Turning ideas into elegant digital experiences.",
  verification: {
    google: "5wnbZ4cuIbWkjAVo7_s0gHxeCW_VBQ-LSE1Y_N-quNw",
  },
  icons: {
    icon: [{ url: "/Icon.png", type: "image/png" }],
    shortcut: "/Icon.png",
    apple: "/Icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${dmSans.variable} ${spaceGrotesk.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
