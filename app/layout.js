import "./globals.css";
import { Poppins } from "next/font/google";
import AuthProvider from "./api/auth/AuthProvider";

const poppins = Poppins({
  weight: ["400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
});

export const metadata = {
  title: "Next Auth Örnek Projesi",
  description: "Next Auth kullanak geliştirdiğim projedir",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <AuthProvider>
        <body className={poppins.className}>{children}</body>
      </AuthProvider>
    </html>
  );
}
