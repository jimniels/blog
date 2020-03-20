// https://www.w3.org/Help/abuse-info/re-reqs.html

// Look at the build directory and validate every HTML file
// @TODO only validate one icon .html file
import fs from "fs";
import path from "path";
import https from "https";
const __dirname = path.dirname(new URL(import.meta.url).pathname);
let BASE_DIR = "";

try {
  const relativeDir = process.argv[2];

  if (!relativeDir) {
    console.log(
      "Error: You have to specify a directory relative to this file."
    );
    process.exit();
  }

  const dir = path.join(__dirname, relativeDir);
  if (!fs.statSync(dir).isDirectory()) {
    console.log("Error: The directory you specified does not exist: ", dir);
    process.exit();
  }

  BASE_DIR = dir;

  main();
} catch (e) {
  console.error(e);
}

async function main() {
  // const files = getAllHtmlFiles(basename);
  const files = [path.join(BASE_DIR, "index.html")];

  const validations = await Promise.all(files.map(validate));

  const errors = validations.filter(({ status }) => status !== "VALID");
  if (errors.length === 0) {
    console.log("Everything is valid!");
    return;
  }

  const networkErrors = validations.filter(
    ({ status }) => status === "NETWORK_ERROR"
  );
  if (networkErrors.length) {
    networkErrors.forEach(({ file }) => {
      logFile(file);
      console.log("Could not validate file. Network error.");
    });
  }

  const validationErrors = validations.filter(
    ({ status }) => status === "INVALID"
  );
  validationErrors.forEach(({ file, messages }) => {
    logFile(file);
    messages.forEach(msg => {
      switch (msg.type) {
        case "error":
          console.log("====> " + msg.type);
          break;
        case "info":
          console.log("====> " + msg.type);
          break;
        default:
          console.log("====> " + msg.type);
      }
      console.log(msg.message);
      console.log(msg.extract);
      console.log("");
    });
  });
}

/**
 * Log a file in a consistent manner
 * @param {string} file
 */
function logFile(file) {
  console.log();
  console.log("====> " + file + " ========================================");
  console.log();
}

/**
 * Validate a file with our validator service.
 * @param {string} file - absolute file path
 * @returns {Validation}
 *
 * @typedef {Object} Validation
 * @property {string} file - path relative to the given directory
 * @property {("VALID"|"INVALID"|"NETWORK_ERROR")} status
 * @property {Array.<ValidationMessage>} message
 *
 * Example:
 * {
 *   file: "/index.html",
 *   status: "VALID" | INVALID | NETWORK_ERROR
 *   messages: [] | [<ValidationMessages>]
 * }
 */
function validate(file) {
  let options = {
    host: "validator.w3.org",
    path: "/nu/?out=json",
    method: "POST",
    headers: {
      "User-Agent": "node-http",
      "Content-Type": "text/html",
      charset: "utf-8"
    }
  };

  /**
   * The validation API will give us back a response like this:
   * https://github.com/validator/validator/wiki/Output-»-JSON
   *
   * @typedef {Object} ValidationMessage
   * @property {("error"|"info"|"non-document-error")} type
   * @property {string} message
   * @property {string} extract
   *
   * Example:
   * {
   *   messages: [
   *     {
   *       type: "error",
   *       message: "..."
   *       extract: "..."
   *     }
   *   ]
   * }
   */

  let out = {
    status: "",
    messages: [],
    file: file.replace(BASE_DIR, "")
  };

  return new Promise((resolve, reject) => {
    const req = https.request(options, res => {
      let data = "";
      res.on("data", chunk => {
        data += chunk;
      });
      res.on("end", () => {
        if (res.statusCode < 200 || res.statusCode >= 300) {
          resolve({ ...out, status: "NETWORK_PROBLEM" });
          return;
        }

        // @TODO could get an error here if user-agent isn't set, might get HTML as response
        const json = JSON.parse(data);
        resolve({
          ...out,
          status: json.messages.length === 0 ? "VALID" : "INVALID",
          messages: json.messages
        });
      });
    });
    req.on("error", err => {
      resolve({ ...out, status: "NETWORK_ERROR" });
    });
    req.write(fs.readFileSync(file).toString());
    req.end();
  });
}

/**
 * Recursively get absolute paths to all .html files for a given directory
 * @param {string} dirPath
 * @param {Array.<string>} arrayOfFiles
 */
function getAllHtmlFiles(dirPath, arrayOfFiles) {
  const files = fs.readdirSync(dirPath);

  arrayOfFiles = arrayOfFiles || [];

  files.forEach(function(file) {
    if (fs.statSync(dirPath + "/" + file).isDirectory()) {
      arrayOfFiles = getAllHtmlFiles(dirPath + "/" + file, arrayOfFiles);
    } else if (path.extname(file) === ".html") {
      arrayOfFiles.push(path.join(__dirname, dirPath, "/", file));
    }
  });

  return arrayOfFiles;
}
