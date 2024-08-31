/** @type {import('tailwindcss').Config} */
export default {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
        extend: {
            backgroundColor: {
                primary: "#ffffff",
            },
            colors: {
                primary: "#ffffff", // Thêm màu nền chính
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
