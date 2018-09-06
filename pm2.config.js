module.exports = {
  apps: [
    {
      name: "BreakfastBot",
      script: "./node_modules/ts-node/dist/bin.js",
      args: "./src/index.ts",
      watch: true,
      ignore_watch: ["node_modules"],
    },
  ],
};
