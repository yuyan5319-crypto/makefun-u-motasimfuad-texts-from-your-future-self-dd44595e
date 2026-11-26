// Texts From Your Future Self — make.fun bounty entry.
//
// Writes one funny text message, sent back by the writer's future self,
// to $MAKEFUN_OUTPUT_DIR/entry.txt (default /output/entry.txt).
// The gate requires 1-200 characters of UTF-8 text, not only whitespace.
import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const TEXT =
  "It's you from next Tuesday. That 'quick nap' at 4 p.m.? You just woke up. " +
  "The leftovers are gone, the plant is judging you, and you missed the entire " +
  "group-chat drama. Worth it, honestly.";

// Fail loudly instead of shipping an invalid entry: the gate requires
// 1-200 characters, not only whitespace. [...TEXT] counts code points,
// matching the gate's character count for this plain-ASCII text.
const length = [...TEXT].length;
if (length < 1 || length > 200 || TEXT.trim().length === 0) {
  throw new Error(`entry text is ${length} characters, outside the 1-200 gate`);
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, "entry.txt"), TEXT + "\n", "utf8");
