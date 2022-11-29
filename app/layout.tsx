import { styled } from "@stitches/react";
import { Footer } from "../components/Footer";
import { Navigation } from "../components/Navigation";
import { Providers } from "../components/Providers";
import '../styles/bootstrap-grid.css';
import '../styles/bootstrap-utils.css';
import "../styles/spectrum.css";
import "../styles/normalize.css";
import "../styles/globals.css";
import { LayoutWrapper } from "../components/LayoutWrapper";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html>
      <head />
      <body>
        <LayoutWrapper>
        <Providers>
          <div>
            <Navigation />
            {children}
          </div>
          {/* <Footer /> */}
        </Providers>
      </LayoutWrapper>
      </body>
    </html>
  );
}
