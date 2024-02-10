const pg = require("pg");
const client = new pg.Client({
    user: "testi",
    host: "localhost",
    database: "fsopen",
    password: "testi12345",
    port: 5432,
});
async function printBlogs() {
    try {
        await client.connect();
        const result = await client.query("SELECT * FROM blogs");
        console.log("Blogs in the database:");
        result.rows.forEach((row) => {
            console.log(`${row.author}: '${row.title}', ${row.likes} likes`);
        });
    }
    catch (error) {
        console.error("Error fetching blogs:", error);
    }
    finally {
        await client.end();
    }
}
printBlogs();
