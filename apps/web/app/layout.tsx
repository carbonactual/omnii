import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "BUNK — Property, properly connected",
  description: "Property, housing, accommodation, investment, and property operations within Carbon Actual."
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
