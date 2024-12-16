/** @type {import('tailwindcss').Config} */
import tailwindAnimate from "tailwindcss-animate";
export default {
  darkMode: ["class"],
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        font1: 'Oswald", sans-serif',
        font2: "inter-regular",
        font3: 'Oswald", sans-serif',
        font4: 'Barlow Condensed", sans-serif',
        font5:
          'SFMono-Regular", "Menlo", "Monaco", "Consolas", "Liberation Mono", "Courier New", monospace',
        font6:
          'system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", "Noto Sans", "Liberation Sans", Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji',
      },
      gridTemplateColumns: {
        gridLayout: "1fr 300px",
        gridLayout2: "300px 1fr",
        gridTopNav: "2fr 1fr",
        gridOrder: "1.5fr 2fr",
        gridCartItem: "auto 125px",
        gridProductDetail: "1.5fr 2fr",
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
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
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
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        border: "hsl(var(--border))",
        bodyColor: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        chart: {
          1: "hsl(var(--chart-1))",
          2: "hsl(var(--chart-2))",
          3: "hsl(var(--chart-3))",
          4: "hsl(var(--chart-4))",
          5: "hsl(var(--chart-5))",
        },
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
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      transitionProperty: {
        height: "height",
        spacing: "margin, padding",
        opacity: "opacity",
        transform: "transform",
      },
      keyframes: {
        slideIn: {
          "0%": {
            opacity: 0,
            transform: "translateX(-20%)",
          },
          "100%": {
            opacity: 1,
            transform: "translateX(0)",
          },
        },
        slideOut: {
          "0%": {
            opacity: 1,
            transform: "translateX(0)",
          },
          "100%": {
            opacity: 0,
            transform: "translateX(20%)",
          },
        },
      },
      animation: {
        slideIn: "slideIn 0.5s ease-in-out forwards",
        slideOut: "slideOut 0.5s ease-in-out forwards",
      },
    },
  },
  plugins: [tailwindAnimate],
};
