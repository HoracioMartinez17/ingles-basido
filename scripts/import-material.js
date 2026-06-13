#!/usr/bin/env node

import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, "..");

function parseArgs(argv) {
  const args = {
    input: path.join(projectRoot, "material.md"),
    output: null,
    deck: "advanced",
    startId: 1,
  };

  for (let i = 2; i < argv.length; i += 1) {
    const arg = argv[i];
    const next = argv[i + 1];

    if (arg === "--input" && next) {
      args.input = path.resolve(projectRoot, next);
      i += 1;
    } else if (arg === "--output" && next) {
      args.output = path.resolve(projectRoot, next);
      i += 1;
    } else if (arg === "--deck" && next) {
      args.deck = next;
      i += 1;
    } else if (arg === "--start-id" && next) {
      args.startId = Number(next) || 1;
      i += 1;
    }
  }

  return args;
}

function isDivider(line) {
  return /^\s*\|?\s*:?-{3,}:?\s*(\|\s*:?-{3,}:?\s*)+\|?\s*$/.test(line);
}

function parseTable(text) {
  const rows = [];
  const lines = text
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean);

  for (const line of lines) {
    if (!line.includes("|")) continue;
    if (/^frente\b/i.test(line)) continue;
    if (isDivider(line)) continue;

    const cells = line
      .replace(/^\|/, "")
      .replace(/\|$/, "")
      .split("|")
      .map((cell) => cell.trim());

    if (cells.length < 3) continue;

    rows.push({
      spanish: cells[0],
      english: cells[1],
      pronunciation: cells[2],
      subdeck: cells[3] || "service",
    });
  }

  return rows;
}

async function main() {
  const args = parseArgs(process.argv);
  const raw = await fs.readFile(args.input, "utf8");
  const rows = parseTable(raw);

  if (!rows.length) {
    console.error(
      "No se encontraron filas. Usa una tabla Markdown con columnas: Frente | Dorso | Pronunciación | Subdeck.",
    );
    process.exit(1);
  }

  const phrases = rows.map((row, index) => ({
    id: args.startId + index,
    english: row.english,
    spanish: row.spanish,
    pronunciation: row.pronunciation,
    deck: args.deck,
    subdeck: row.subdeck,
  }));

  const output = `// Generated from ${path.basename(args.input)}\nconst phrases = ${JSON.stringify(
    phrases,
    null,
    2,
  )};\n\nexport default phrases;\n`;

  if (args.output) {
    await fs.mkdir(path.dirname(args.output), { recursive: true });
    await fs.writeFile(args.output, output, "utf8");
    console.log(`Generado: ${args.output}`);
  } else {
    console.log(output);
  }

  const counts = phrases.reduce((accumulator, phrase) => {
    accumulator[phrase.subdeck] = (accumulator[phrase.subdeck] || 0) + 1;
    return accumulator;
  }, {});

  console.log("\nResumen por subdecks:");
  Object.entries(counts).forEach(([subdeck, count]) => {
    console.log(`- ${subdeck}: ${count}`);
  });
}

main().catch((error) => {
  console.error(error.message);
  process.exit(1);
});
