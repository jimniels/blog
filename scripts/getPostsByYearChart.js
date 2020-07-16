import fetch from "node-fetch";

// Play around with this stuff here
// https://export.highcharts.com

const options = {
  width: "600",
  scale: false,
  constr: "Chart",
  styledMode: false,
  type: "image/png",
  infile: {
    title: { text: "" },
    colors: ["#ff0000"],
    yAxis: { title: "" },
    xAxis: {
      categories: [
        "2012",
        "2013",
        "2014",
        "2015",
        "2016",
        "2017",
        "2018",
        "2019",
        "2020",
      ],
    },
    series: [
      {
        data: [5, 29, 7, 14, 12, 20, 26, 45, 33],
        type: "line",
        name: "Posts Per Year",
      },
    ],
  },
};

export default function main() {
  return fetch("https://export.highcharts.com/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(options),
  }).then((res) => {
    if (!res.ok) {
      throw new Error(
        `Failed to retrieve posts-by-year image. ${response.statusText}`
      );
    }
    return res.buffer();
  });
}

// main().then(console.log);
