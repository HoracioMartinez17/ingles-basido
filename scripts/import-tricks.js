#!/usr/bin/env node

/**
 * SCRIPT: Import tricks from Markdown table format
 *
 * Usage:
 *   npm run import-tricks --input tricks-material.md --output tricks-advanced.js --start-id 6
 *
 * Markdown format expected:
 * | Título (emoji) | Categoría | Explicación | Ejemplos (EN/PRON) |
 * |---|---|---|---|
 * | ✨ El truco | grammar | Explicación... | EN: X | PRON: Y |
 */

const fs = require("fs");
const path = require("path");

// Parse command line arguments
const args = process.argv.slice(2);
const inputFile = args.find((arg) => arg.startsWith("--input"))?.split("=")[1];
const outputFile = args.find((arg) => arg.startsWith("--output"))?.split("=")[1];
const startId = parseInt(
  args.find((arg) => arg.startsWith("--start-id"))?.split("=")[1] || "1",
);

if (!inputFile || !outputFile) {
  console.error(
    "Usage: node import-tricks.js --input=<file> --output=<file> --start-id=<num>",
  );
  process.exit(1);
}

// Read Markdown file
const filePath = path.join(process.cwd(), inputFile);
let content;
try {
  content = fs.readFileSync(filePath, "utf8");
} catch (error) {
  console.error(`Error reading file: ${error.message}`);
  process.exit(1);
}

// Parse Markdown table
function parseTable(markdownContent) {
  const lines = markdownContent.split("\n");
  const tricks = [];

  // Find table start (line with |---|
  let tableStart = -1;
  for (let i = 0; i < lines.length; i++) {
    if (lines[i].includes("|---|")) {
      tableStart = i + 1;
      break;
    }
  }

  if (tableStart === -1) {
    throw new Error("No table separator found (|---|)");
  }

  // Parse data rows
  for (let i = tableStart; i < lines.length; i++) {
    const line = lines[i].trim();

    // Stop at empty lines or non-pipe lines
    if (!line || !line.startsWith("|")) break;

    // Extract cells
    const cells = line
      .split("|")
      .map((cell) => cell.trim())
      .filter((cell) => cell.length > 0);

    if (cells.length < 4) continue;

    const [titleRaw, category, explanation, examplesRaw] = cells;

    // Parse title (extract emoji)
    const emojiMatch = titleRaw.match(/[\p{Emoji}]/u);
    const emoji = emojiMatch ? emojiMatch[0] : "✨";
    const title = titleRaw.replace(/[\p{Emoji}]/gu, "").trim();

    // Parse examples - expecting format: "EN: text | PRON: text"
    const examples = [];
    const exampleBlocks = examplesRaw.split("|");

    for (let j = 0; j < exampleBlocks.length; j += 3) {
      const enBlock = exampleBlocks[j]?.trim();
      const pronBlock = exampleBlocks[j + 1]?.trim();

      if (enBlock?.startsWith("EN:") && pronBlock?.startsWith("PRON:")) {
        examples.push({
          english: enBlock.replace("EN:", "").trim(),
          pronunciation: pronBlock.replace("PRON:", "").trim(),
          spanish: "(context)", // Placeholder
        });
      }
    }

    if (title && category) {
      tricks.push({
        title,
        emoji,
        category: category.toLowerCase(),
        explanation,
        examples,
        tips: "",
      });
    }
  }

  return tricks;
}

try {
  const parsedTricks = parseTable(content);
  console.log(`✓ Parsed ${parsedTricks.length} tricks`);

  // Generate ES module code
  const trickObjects = parsedTricks
    .map((trick, index) => {
      const id = startId + index;
      return `  {
    id: ${id},
    title: "${trick.title.replace(/"/g, '\\"')}",
    emoji: "${trick.emoji}",
    explanation: "${trick.explanation.replace(/"/g, '\\"')}",
    examples: [
${trick.examples
  .map(
    (ex) => `      {
        spanish: "(context)",
        english: "${ex.english.replace(/"/g, '\\"')}",
        pronunciation: "${ex.pronunciation.replace(/"/g, '\\"')}",
      }`,
  )
  .join(",\n")}
    ],
    tips: "${trick.tips}",
    category: "${trick.category}",
  }`;
    })
    .join(",\n");

  const output = `// Generated tricks from Markdown import (${new Date().toISOString()})
const tricks = [
${trickObjects}
];

export default tricks;
`;

  // Write output file
  const outputPath = path.join(process.cwd(), outputFile);
  fs.writeFileSync(outputPath, output);
  console.log(`✓ Wrote ${parsedTricks.length} tricks to ${outputFile}`);
} catch (error) {
  console.error(`Error: ${error.message}`);
  process.exit(1);
}
