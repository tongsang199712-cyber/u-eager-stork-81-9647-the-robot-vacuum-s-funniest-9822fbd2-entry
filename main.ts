// make.fun bounty: The Robot Vacuum's Funniest Excuse
// (u-eager-stork-81-9647-the-robot-vacuum-s-funniest-9822fbd2)
//
// The entry is a single line, at most 120 characters, in which a robot
// vacuum explains why it missed a spot. An AI judge reads the lines in
// pairs and the funniest excuse takes the reward.
//
// This program writes exactly that one line to /output/entry.txt —
// no trailing newline, no extra whitespace — so the sealed gate scorer
// sees UTF-8 text of 1-120 characters, one single line.
//
// The line itself (94 characters):
//   "Sorry, I missed that spot — I was under the couch rethinking my
//   life choices and the dust won."
// It speaks in the vacuum's own voice, owns up to the failure, and its
// humour comes straight from a vacuum's world: the couch, the dust,
// and a machine making peace with losing to both.

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";

const LINE =
  "Sorry, I missed that spot — I was under the couch rethinking my life choices and the dust won.";

// Gate: /output/entry.txt must be UTF-8 text of 1 to 120 characters,
// not only whitespace, one single line, no trailing newline.
if (LINE.length < 1 || LINE.length > 120) {
  throw new Error(`Line length ${LINE.length} is outside 1-120 characters.`);
}
if (LINE.trim().length === 0) {
  throw new Error("Line must not be only whitespace.");
}
if (LINE.includes("\n") || LINE.includes("\r")) {
  throw new Error("Line must be a single line with no newline characters.");
}

mkdirSync("/output", { recursive: true });
writeFileSync("/output/entry.txt", LINE, "utf8");

// Read the file back and compare byte-for-byte: the gate must see
// exactly the line above, with no trailing newline and no extra bytes.
const readBack = readFileSync("/output/entry.txt", "utf8");
if (readBack !== LINE) {
  throw new Error(
    `Read-back mismatch: expected ${JSON.stringify(LINE)}, got ${JSON.stringify(readBack)}.`,
  );
}
if (readBack.length < 1 || readBack.length > 120) {
  throw new Error(`Read-back length ${readBack.length} is outside 1-120 characters.`);
}
if (readBack.includes("\n") || readBack.includes("\r")) {
  throw new Error("Read-back contains a newline; the entry must be a single line.");
}

console.log(`Wrote ${LINE.length} characters to /output/entry.txt:`);
console.log(LINE);
