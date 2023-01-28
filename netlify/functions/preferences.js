// `?fidelity=(low|med)` the default being 'high'
exports.handler = async function (event, context) {
  const {
    headers: { cookie, referer },
    rawUrl,
    queryStringParameters: { fidelity },
  } = event;

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

  // If there's no cookie present, set one if one of the enumerated fidelity
  // values was requested, i.e. ?fidelity=low
  // Once set, send them back to the original location
  const Location =
    referer.includes("//blog.jim-nielsen.com") ||
    referer.includes("//localhost") ||
    referer.includes("netlify.app")
      ? referer
      : "https://blog.jim-nielsen.com";
  if (fidelity === "low" || fidelity === "med") {
    return {
      statusCode: 303,
      headers: {
        Location,
        "Set-Cookie": `fidelity-${fidelity}=active; path=/;`,
      },
    };
  }

  // Default behaviour is to send back to the original location (default
  // fidelity is 'high' and has no cookie)
  return {
    statusCode: 303,
    headers: {
      Location,
    },
  };
};
