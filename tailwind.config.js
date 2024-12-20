
/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        font1: '"Oswald", sans-serif',
        font2: "inter-regular",
        font3: '"Oswald", sans-serif',
        font4: '"Barlow Condensed", sans-serif',
        font5: '"SFMono-Regular", "Menlo", "Monaco", "Consolas", "Liberation Mono", "Courier New", monospace',
        font6: 'system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", "Noto Sans", "Liberation Sans", Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji',
      },
      gridTemplateColumns: {
        gridLayout: "1fr 300px",
        gridLayout2: "300px 1fr",
        gridTopNav: "2fr 1fr",
        gridOrder: "auto 1fr",
        gridCartItem: "auto 125px",
        gridProductDetail: "1.5fr 2fr",
        gridOrder: "1.5fr 2fr",

      },
      transitionDuration: {
        "1s": "0.3s",
      },
      transitionTimingFunction: {
        "ease-in-out": "ease-in-out",
      },
      backgroundColor: {
        primary: "#ffffff",
        purple: "rgba(115, 103, 240, 0.08)",
      },
      colors: {
        primary: "#5d596c",
        ghost: "#6f6b7d",
        purple: "#7367f0",
        bodyColor: "#fff",
        mainColor1: "#D12525",
        mainColor2: "#00813D",
        mainColor3: "#FFB936",
        textColor1: "#212121",
        textColor2: "#5C5C5B",
        textColor3: "#fff",
        borderColor1: "#D9D9D9",
        borderColor2: "#ffffff2b",
        btnColor1: "#1C2539",
        btnColor2: "#030734",
        btnColor3: "#FF9F0D",
        bgColor1: "#F4F1EA",
        bgColor2: "#DF0A0A0D",
      },
      borderColor: {
        primary: "#5d596c",
        ghost: "#6f6b7d",
        purple: "#7367f0",
      },
      dropShadow: {
        primary: "0 0.125rem 0.25rem rgba(165, 163, 174, 0.3)",
      },
      borderRadius: {
        primary: "0.375rem",
      },
      transitionProperty: {
        height: "height",
        spacing: "margin, padding",
        opacity: "opacity",
        transform: "transform",
      },
      keyframes: {
        slideIn: {
          "0%": { opacity: 0, transform: "translateX(-20%)" },
          "100%": { opacity: 1, transform: "translateX(0)" },
        },
        slideOut: {
          "0%": { opacity: 1, transform: "translateX(0)" },
          "100%": { opacity: 0, transform: "translateX(20%)" },
        },
      },
      animation: {
        slideIn: "slideIn 0.5s ease-in-out forwards",
        slideOut: "slideOut 0.5s ease-in-out forwards",
      },
    },
  },
  plugins: [],
};
