const toDateForHumans = (d, options = {}) =>
  d.toLocaleString(
    "en-US",
    {
      year: "numeric",
      month: "short",
      day: "numeric",
      timeZone: "UTC",
      ...options
    }
  );

const toDateForComputers = (d) => d.toISOString().substring(0, 10);

module.exports = {
  toDateForHumans,
  toDateForComputers
};
