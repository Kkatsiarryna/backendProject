import express, {NextFunction, Request, Response} from "express"
import {productsRouter} from "./routes/products-router";
import {addressesRouter} from "./routes/addresses-router";
import {runDB} from "./repositiries/db";

const app = express()
const port = 3001

//Express middleware, chain of responsibility
const blablaMiddleware = (req: Request, res: Response, next: NextFunction) => {
    // @ts-ignore
    req.blabla = 'hello'
    next()
}

// const authGuardMiddleware = (req: Request, res: Response, next: NextFunction) => {
//     if(req.query.token === '123'){
//         next()
//     } else {
//         res.sendStatus(401)
//     }
// }


// For parsing application/json
app.use(express.json());

app.use(blablaMiddleware)
// app.use(authGuardMiddleware)

app.use('/products', productsRouter)
app.use('/addresses', addressesRouter)


app.get('/blabla', (req:Request, res: Response) => {
    // @ts-ignore
    const blabla = req.blabla
    res.send({value: blabla})
})



const startApp = async () => {
    await runDB()
    app.listen(port, () => {
        console.log(`Example app listening on port ${port}`)
    })
}

startApp()