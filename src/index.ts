import express, {Request, Response} from "express"
import {productsRouter} from "./routes/products-router";
import {addressesRouter} from "./routes/addresses-router";

const app = express()
const port = 3001




// For parsing application/json
app.use(express.json());

app.use('/products', productsRouter)
app.use('/addresses', addressesRouter)







app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})