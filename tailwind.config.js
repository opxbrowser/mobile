module.exports = {
  content: [],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#8A4FFF",
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
    },
  },
  plugins: [],
  corePlugins: require("tailwind-rn/unsupported-core-plugins"),
};
