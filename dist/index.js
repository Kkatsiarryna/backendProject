"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const products_router_1 = require("./routes/products-router");
const addresses_router_1 = require("./routes/addresses-router");
const app = (0, express_1.default)();
const port = 3001;
//Express middleware, chain of responsibility
const blablaMiddleware = (req, res, next) => {
    // @ts-ignore
    req.blabla = 'hello';
    next();
};
const authGuardMiddleware = (req, res, next) => {
    if (req.query.token === '123') {
        next();
    }
    else {
        res.sendStatus(401);
    }
};
// For parsing application/json
app.use(express_1.default.json());
app.use(blablaMiddleware);
app.use(authGuardMiddleware);
app.use('/products', products_router_1.productsRouter);
app.use('/addresses', addresses_router_1.addressesRouter);
app.get('/blabla', (req, res) => {
    // @ts-ignore
    const blabla = req.blabla;
    res.send({ value: blabla });
});
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
