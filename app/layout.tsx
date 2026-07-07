import type { Metadata } from "next";
import "yet-another-react-lightbox/styles.css";
import "./globals.css";

export const metadata: Metadata = {
  title: "Weds by Artsy | Wedding Photography Gallery",
  description:
    "An editorial wedding photography gallery portfolio for Weds by Artsy.",
  icons: {
    icon: "data:,",
  },
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
