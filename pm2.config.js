module.exports = {
  apps: [
    {
      name: "BreakfastBot",
      script: "ts-node src/index.ts",
      watch: true,
      ignore_watch: ["node_modules"],
    },
  ],
};
