import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vite";
import { park } from "./src/data/attractions.ts";
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    {
      name: "park-metadata",
      transformIndexHtml() {
        return [
          {
            tag: "meta",
            attrs: {
              name: "description",
              content: `${park.tagline}. Explore slides, a wave pool and family fun. Open ${park.hours}. Plan your visit to ${park.name}.`,
            },
          },
          {
            tag: "meta",
            attrs: {
              property: "og:title",
              content: `${park.name} | More splash. More happy.`,
            },
          },
          {
            tag: "meta",
            attrs: { property: "og:description", content: park.tagline },
          },
          { tag: "meta", attrs: { property: "og:type", content: "website" } },
          { tag: "meta", attrs: { property: "og:locale", content: "en_IN" } },
          {
            tag: "meta",
            attrs: { property: "og:image", content: "/images/10.webp" },
          },
          { tag: "meta", attrs: { name: "theme-color", content: "#e1f5f4" } },
          {
            tag: "script",
            attrs: { type: "application/ld+json" },
            children: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "AmusementPark",
              name: park.name,
              description: park.tagline,
              address: {
                "@type": "PostalAddress",
                addressLocality: "Nashik",
                addressRegion: "Maharashtra",
                addressCountry: "IN",
              },
              openingHoursSpecification: {
                "@type": "OpeningHoursSpecification",
                dayOfWeek: [
                  "Monday",
                  "Tuesday",
                  "Wednesday",
                  "Thursday",
                  "Friday",
                  "Saturday",
                  "Sunday",
                ],
                opens: "10:00",
                closes: "17:00",
              },
            }),
          },
        ];
      },
    },
  ],
  resolve: { dedupe: ["react", "react-dom", "three"] },
  optimizeDeps: {
    include: [
      "react",
      "react-dom/client",
      "three",
      "zustand",
      "framer-motion",
      "@react-three/fiber",
      "@react-three/drei",
      "@react-three/postprocessing",
      "gsap",
      "gsap/ScrollTrigger",
      "lenis",
    ],
  },
  server: { host: "localhost", port: 5173, strictPort: true },
  build: {
    rolldownOptions: {
      output: {
        codeSplitting: {
          includeDependenciesRecursively: false,
          groups: [
            {
              name: "react-runtime",
              test: /node_modules[\\/](react|react-dom|scheduler|react-is|react-reconciler|use-sync-external-store)[\\/]/,
            },
            {
              name: "three-renderer",
              test: /node_modules[\\/]three[\\/]build[\\/]three\.module\.js/,
            },
            {
              name: "three",
              test: /node_modules[\\/](three|three-stdlib)[\\/]/,
            },
            {
              name: "react-three",
              test: /node_modules[\\/](@react-three|postprocessing)[\\/]/,
            },
            {
              name: "motion",
              test: /node_modules[\\/](gsap|framer-motion|motion-dom|motion-utils|lenis)[\\/]/,
            },
          ],
        },
      },
    },
  },
});

