import { watch } from "fs";
import { exec } from "child_process";
import { join } from "path";

const constantsPath = join(process.cwd(), "src", "constants.ts");

console.log("Watching for changes to src/constants.ts");

watch(constantsPath, (eventType) => {
  if (eventType === "change") {
    console.log(
      "\nDetected change in constants.ts, regenerating statistics..."
    );
    exec("pnpm run stats:generate", (error, stdout, stderr) => {
      if (error) {
        console.error(`❌ Error: ${error.message}`);

        return;
      }
      if (stderr) {
        console.error(`stderr: ${stderr}`);

        return;
      }
      console.log(stdout);
      console.log("Watching for changes to src/constants.ts");
    });
  }
});
