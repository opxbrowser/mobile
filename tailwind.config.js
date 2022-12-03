const colors = require("tailwindcss/colors");

module.exports = {
  content: ["./src/**/*.{jsx,js}"],
  theme: {
    ...colors,
    extend: {
      colors: {
        primary: {
          DEFAULT: "#8A4FFF",
          200: "#F7F6FF",
          400: "#C3BEF7",
        },
        dark: {
          DEFAULT: "#070600",
          400: "#B5B4C2",
          500: "#505050",
        },
        gray: {
          DEFAULT: "#F5F5F5",
        },
      },
      fontFamily: {
        wLight: "WorkSans_300Light",
        wRegular: "WorkSans_400Regular",
        wMeidum: "WorkSans_500Medium",
        wSemibold: "WorkSans_600SemiBold",
        wBold: "WorkSans_700Bold",
      },
    },
  },
  plugins: [],
  corePlugins: require("tailwind-rn/unsupported-core-plugins"),
};
