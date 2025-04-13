import type React from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import MUIProvider from "@/components/mui-provider";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { Box } from "@mui/material";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Image Gallery",
  description: "A responsive image gallery application",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en'>
      <body className={inter.className}>
        <MUIProvider>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              minHeight: "100vh",
            }}
          >
            <Navbar />
            <Box component='main' sx={{ flexGrow: 1 }}>
              {children}
            </Box>
            <Footer />
          </Box>
        </MUIProvider>
      </body>
    </html>
  );
}
