"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var child_process_1 = require("child_process");
var migrationScriptFile = process.argv.slice(2)[0];
if (migrationScriptFile) {
    (0, child_process_1.exec)("tsc ".concat(migrationScriptFile, " && node ").concat(migrationScriptFile.replace(".ts", ".js")), function (error, stdout, stderr) {
        if (error) {
            console.error("Error executing command: ".concat(error));
            return;
        }
        if (stderr) {
            console.error("Standard error: ".concat(stderr));
            return;
        }
        console.log("Command output: ".concat(stdout));
    });
}
