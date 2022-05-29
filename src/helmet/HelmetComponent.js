import React from "react";
import { Helmet, HelmetProvider } from "react-helmet-async";

export function HelmetComponent() {
  return (
    <HelmetProvider>
      <Helmet>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Electrolize&family=Gothic+A1:wght@100;200;300;400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        />
      </Helmet>
    </HelmetProvider>
  );
}
