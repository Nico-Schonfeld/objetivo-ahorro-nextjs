import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.scss";
import { ThemeProvider } from "@/components/theme-provider";
import ReduxProvider from "@/redux/provider";
import { ViewTransitions } from "next-view-transitions";
import moment from "moment";
import { Toaster } from "@/components/ui/sonner";
const inter = Inter({ subsets: ["latin"] });

const year = moment().format("YYYY");

export const metadata: Metadata = {
  title: `Ahorro Objetivo ${year}`,
  description: "...",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ViewTransitions>
      <html lang="es" suppressHydrationWarning>
        <body className={inter.className}>
          <ThemeProvider
            attribute="class"
            defaultTheme="light"
            enableSystem
            disableTransitionOnChange
          >
            <ReduxProvider>
              {children} <Toaster />
            </ReduxProvider>
          </ThemeProvider>
        </body>
      </html>
    </ViewTransitions>
  );
}
