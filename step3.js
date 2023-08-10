const fs = require("fs");

const axios = require("axios");

// helper for cat functions
function writeFile(outputFile, data) {
    fs.writeFile(outputFile, data, (writeErr) => {
        if (writeErr) {
            console.error("Error writing to file:", writeErr);
        } else {
            console.log(`File ${outputFile} written successfully.`);
        }
    });
}

function catReadorWrite(path, outputFile) {
    fs.readFile(path, "utf8", (err, data) => {
        if (err) {
            console.error("Error reading file:", err);
            process.exit(1);
        }
        if (outputFile) {
            writeFile(outputFile, data);
        } else {
            console.log(data);
        }
    });
}

async function webCatReadorWrite(url, outputFile) {
    try {
        const response = await axios.get(url);
        const data = response.data;
        console.log(response.data);
        if (outputFile) {
            writeFile(outputFile, data);
        } else {
            console.log(data);
        }
    } catch (error) {
        console.error("Error fetching URL:", error.code);
        process.exit(1);
    }
}

// get path argument from the command line
const args = process.argv.slice(2);
if (args.length < 1) {
    console.error(
        "Usage: node step3.js [--out output-filename.txt] <file_path/url>"
    );
} else {
    let outputFile = null;
    let input = null;

    if (args[0] === "--out") {
        if (args.length < 3) {
            console.error(
                "Usage: node step3.js [--out output-filename.txt] <file_path/url>"
            );
            process.exit(1);
        }
        outputFile = args[1];
        input = args[2];
    } else {
        input = args[0];
    }

    if (input.startsWith("http://") || input.startsWith("https://")) {
        if (outputFile) {
            webCatReadorWrite(input, outputFile);
        } else {
            webCatReadorWrite(input);
        }
    } else {
        if (outputFile) {
            catReadorWrite(input, outputFile);
        } else {
            catReadorWrite(input);
        }
    }
}
