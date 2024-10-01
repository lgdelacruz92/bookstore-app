import { exec } from "child_process";
const [migrationScriptFile] = process.argv.slice(2);
if (migrationScriptFile) {
  exec(
    `tsc ${migrationScriptFile} && node ${migrationScriptFile.replace(
      ".ts",
      ".js"
    )}`,
    (error, stdout, stderr) => {
      if (error) {
        console.error(`Error executing command: ${error}`);
        return;
      }

      if (stderr) {
        console.error(`Standard error: ${stderr}`);
        return;
      }

      console.log(`Command output: ${stdout}`);
    }
  );
}
