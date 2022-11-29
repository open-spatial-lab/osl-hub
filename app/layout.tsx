import { styled } from "@stitches/react";
import { Footer } from "../components/Footer";
import { Navigation } from "../components/Navigation";
import { Providers } from "../components/Providers";
import '../styles/bootstrap-grid.css';
import '../styles/bootstrap-utils.css';
import "../styles/spectrum.css";
import "../styles/normalize.css";
import "../styles/globals.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html>
      <head />
      <body>
        <Providers>
          <Navigation />
          {children}
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
