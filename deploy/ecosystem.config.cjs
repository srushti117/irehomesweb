module.exports = {
  apps: [
    {
      name: "irehomes",
      script: "dist/index.js",
      cwd: "/var/www/irehomesweb",
      env: {
        NODE_ENV: "production",
        PORT: 3001,
      },
      instances: 1,
      autorestart: true,
      max_restarts: 10,
    },
  ],
};
