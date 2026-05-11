const app = require("./app")

require("dotenv").config({ quiet: true });

// If process.env.PORT is undefined, use 3000 instead
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`)
})