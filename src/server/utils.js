const jim = (strings, ...values) => {
  let out = "";
  strings.forEach((string, i) => {
    const value = values[i];

    // Array
    if (Array.isArray(value)) {
      out += string + value.join("");
      // String
    } else if (typeof value === "string") {
      out += string + value;
      // Number
    } else if (typeof value === "number") {
      out += string + String(value);
      // object
    } else if (typeof value === "object") {
      out += string + value;
      // undefined, null, boolean
    } else {
      out += string;
    }
  });
  return out;
};

const toDateUI = date => {
  return date.toLocaleString("en-US", {
    timeZone: "UTC",
    year: "numeric",
    month: "short",
    day: "numeric"
  });
};
const toDateUIMin = date => toDateUI(date).split(",")[0];
const toDateISO = date => {
  return date.toISOString().slice(0, 10);
};

module.exports = {
  jim,
  toDateUI,
  toDateUIMin,
  toDateISO
};
