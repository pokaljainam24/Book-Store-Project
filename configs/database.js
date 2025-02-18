const { default: mongoose } = require("mongoose");

mongoose.connect('mongodb+srv://pokaljainam:12345@cluster0.7ui20.mongodb.net/book-store-project');

const db = mongoose.connection;

db.on('connected', (err) => {
    if (err) {
        console.log(err.message);
    } else {
        console.log("Database Connected Properly...");
    }
});

module.exports = db;