exports.handler = async function (event, context) {
  const {
    headers: { cookie, referer },
    rawUrl,
    queryStringParameters: { fidelity },
  } = event;

  console.log(event);

  const { origin } = new URL(rawUrl);

  // If there's a cookie present, unset it and then redirect back here with
  // the same request for a new cookie
  const regex = /fidelity-(low|med)=active/;
  if (cookie && regex.test(cookie)) {
    const [_, value] = regex.exec(cookie);
    return {
      statusCode: 303,
      headers: {
        Location: rawUrl,
        "Set-Cookie": `fidelity-${value}=; path=/; expires Thu, 01 Jan 1970 00:00:00 GMT;`,
      },
    };
  }

  // If there's no cookie present, set one with the appropriate request
  const Location =
    referer.includes("//blog.jim-nielsen.com") ||
    referer.includes("//localhost")
      ? referer
      : "https://blog.jim-nielsen.com";
  if (fidelity === "low" || fidelity === "med") {
    console.log(`Set cookie \`fidelity-${fidelity}=active`);
    return {
      statusCode: 303,
      headers: {
        Location,
        "Set-Cookie": `fidelity-${fidelity}=active; path=/;`,
      },
    };
  }

  // fidelity=* or no query params will just redirect to the preferences page
  return {
    statusCode: 303,
    headers: {
      Location,
    },
  };
};
