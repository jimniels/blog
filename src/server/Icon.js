import { readFile } from "./utils.js";

/**
 *
 * @param {string} id
 * @returns
 */
export const Icon = (id) => {
  const svg = readFile(`./svgs/${id}.svg`);
  return svg;
};
