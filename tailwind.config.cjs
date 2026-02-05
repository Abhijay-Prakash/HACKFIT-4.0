module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        paladins: ["paladins", "ui-sans-serif", "system-ui"],
        raceguard: ["raceguard", "ui-sans-serif", "system-ui"],
        progress: ["progress", "ui-sans-serif", "system-ui"],
        hacked: ["hacked", "ui-sans-serif", "system-ui"],
      },
    },
  },
  plugins: [],
};
