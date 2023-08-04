import { Inter } from "next/font/google";
import TosterContext from "./context/TosterContext";
import AuthContext from "./context/AuthContext";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "ChitChatPalace",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthContext>
          <TosterContext />
          {children}
        </AuthContext>
      </body>
    </html>
  );
}
