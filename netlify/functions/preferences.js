// @TODO Location

exports.handler = async function (event, context) {
  const {
    rawUrl,
    queryStringParameters: { fidelity },
  } = event;

  const { origin } = new URL(rawUrl);
  const Location = origin + "/preferences";

  if (fidelity === "low") {
    console.log("Set cookie for low");
    return {
      statusCode: 303,
      headers: {
        Location,
        "Set-Cookie": "fidelity-low=active; path=/; ",
      },
    };
  }

  if (fidelity === "high") {
    return {
      statusCode: 303,
      headers: {
        Location,
        "Set-Cookie":
          "fidelity-low=;  path=/; expires Thu, 01 Jan 1970 00:00:00 GMT;",
      },
    };
  }

  return {
    statusCode: 303,
    headers: {
      Location,
    },
  };
};
