import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
    subsets: ["latin"],
    variable: "--font-inter",
});

export const metadata: Metadata = {
    title: "Medicord - Your AI-Powered Medicine Companion",
    description: "Find detailed medicine information, substitutes, dosage guidelines, and AI-powered health advice. Your intelligent healthcare companion.",
    keywords: ["medicine", "healthcare", "AI health advisor", "drug information", "medicine substitutes", "dosage", "side effects"],
    authors: [{ name: "Medicord Team" }],
    openGraph: {
        title: "Medicord - Your AI-Powered Medicine Companion",
        description: "Find detailed medicine information, substitutes, and AI-powered health advice",
        type: "website",
    },
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" className="dark">
            <body className={`${inter.variable} antialiased`}>
                {children}
            </body>
        </html>
    );
}
