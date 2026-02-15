module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        paladins: ["paladins", "ui-sans-serif", "system-ui"],
        raceguard: ["raceguard", "ui-sans-serif", "system-ui"],
        progress: ["progress", "ui-sans-serif", "system-ui"],
        hacked: ["hacked", "ui-sans-serif", "system-ui"],
        geist: ["Geist", "sans-serif"],
        roboto: ["Roboto", "sans-serif"],
        money: ["Money", "ui-sans-serif", "system-ui"],
        nokiakokia: ["NokiaKokia", "ui-sans-serif", "system-ui"],
        origintech: ["OriginTech", "ui-sans-serif", "system-ui"],
        cyberalert: ["CyberAlert", "ui-sans-serif", "system-ui"],
        racespace: ["RaceSpace", "ui-sans-serif", "system-ui"],
      },
      colors: {
        bgBlack: "#0a0a0a",
        lime: "#93cd2d",
        acid: "#d4e21c",
        yellow: "#e1ce10",
        deepBlue: "#1b759f",
        sage: "#8cb798",
        cyan: "#32bbd2",
      },
    },
  },
  plugins: [],
};
