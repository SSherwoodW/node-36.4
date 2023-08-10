const fs = require("fs");

function cat(path) {
    fs.readFile(path, "utf8", (err, data) => {
        if (err) {
            console.error("Error reading file:", err);
            process.exit(1);
        }
        console.log(data);
        // console.log(process.argv[0]);
        // console.log(process.argv[1]);
        // console.log(`argv2: ${process.argv[2]}`);
        // console.log(`process: ${process}`);
        // console.log(`process.argv: ${process.argv}`);
    });
}

// get path argument from the command line
const args = process.argv.slice(2);
if (args.length !== 1) {
    console.error("Usage: node step1.js <file_path>");
} else {
    const filePath = args[0];
    cat(filePath);
}
