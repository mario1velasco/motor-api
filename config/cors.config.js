// Configuration options: https://www.npmjs.com/package/cors#configuration-options

const originsAllowed = process.env.CORS_ORIGINS || [
  'http://localhost:8080',
];

module.exports = {
  origin: function (origin, cb) {
    const allowed = originsAllowed.indexOf(origin) !== -1;
    cb(null, allowed);
  },
  credentials: true,
}