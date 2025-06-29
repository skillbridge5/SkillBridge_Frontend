import type React from "react";
import type { Metadata } from "next";
import { Inter, Montserrat, Poppins } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { NextIntlClientProvider } from "next-intl";
import { notFound } from "next/navigation";

// Initialize Inter font with various weights
const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

// Initialize Montserrat font with various weights
const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
});

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "SkillBridge - Your Future Begins With One Click",
  description: "Bridging Gaps, Building Skills, Transforming Futures",
};


export function generateStaticParams() {
  return [{ locale: "en" }, { locale: "am" }];
}

export default function RootLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  let messages;
  try {
    messages = require(`../../messages/${locale}.json`);
  } catch (error) {
    notFound();
  }
  return (
    <html
      lang={locale}
      className={`${montserrat.variable} ${inter.variable} ${poppins.variable}`}
      suppressHydrationWarning
    >
      <body className='antialiased'>
        <ThemeProvider attribute='class' defaultTheme='light' enableSystem>
          <NextIntlClientProvider locale={locale} messages={messages}>
            {children}
          </NextIntlClientProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
