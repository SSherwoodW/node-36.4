const fs = require("fs");

const axios = require("axios");

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

async function webCat(url) {
    try {
        const response = await axios.get(url);
        console.log(response.data);
    } catch (error) {
        console.error("Error fetching URL:", error);
    }
}

// get path argument from the command line
const args = process.argv.slice(2);
if (args.length !== 1) {
    console.error("Usage: node step2.js <file_path/url>");
} else {
    const input = args[0];
    if (input.startsWith("http://") || input.startsWith("https://")) {
        webCat(input);
    } else {
        cat(input);
    }
}
