import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "HASS Home",
  description: "Premium kitchens and wardrobes made in Qatar to European standards.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
