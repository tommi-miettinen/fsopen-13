const pg = require("pg");
const fs = require("fs");
const client = new pg.Client({
    user: "testi",
    host: "localhost",
    database: "fsopen",
    password: "testi12345",
    port: 5432,
});
async function executeCommandsFromFile() {
    try {
        await client.connect();
        const sql = fs.readFileSync("commands.sql", "utf8");
        await client.query(sql);
        console.log("SQL commands executed successfully.");
    }
    catch (error) {
        console.error("Error executing SQL commands:", error);
    }
    finally {
        await client.end();
    }
}
executeCommandsFromFile();
