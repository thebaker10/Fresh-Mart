import express from "express"
import { search } from "./Database"

const app = express()


app.get("/search/:productName", async (request, response) => {
    const rows = await search(request.params.productName)
    response.json(rows)
})




app.listen(5050, () => console.log("search working on port 5050"))