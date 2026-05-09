const app = require("./app")

require("dotenv").config({ quiet: true });
const PORT = process.env.PORT

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`)
})
//run {npm run dev} to start server with nodemon