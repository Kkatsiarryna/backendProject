"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.productsRouter = void 0;
const express_1 = require("express");
const products_repository_1 = require("../repositiries/products-repository");
const express_validator_1 = require("express-validator");
const inputValidationMiddleware_1 = require("../middlewares/inputValidationMiddleware");
//презентационный слой
// Создание экземпляра маршрутизатора
exports.productsRouter = (0, express_1.Router)();
// Маршрут для получения продуктов с фильтрацией по названию
exports.productsRouter.get('/', (req, res) => {
    var _a;
    const foundProducts = products_repository_1.productsRepository.findProducts((_a = req.query.title) === null || _a === void 0 ? void 0 : _a.toString());
    res.send(foundProducts);
    // if(req.query.title){
    //     let searchString = req.query.title.toString()
    //     res.send(products.filter(el => el.title.indexOf(searchString) > -1))
    // }else{
    //     res.send(products)
    // }
});
exports.productsRouter.get('/:id', (req, res) => {
    let product = products_repository_1.productsRepository.getProductById(+req.params.id);
    if (product) {
        res.send(product);
    }
    else {
        res.sendStatus(404);
    }
});
const titleValidation = (0, express_validator_1.body)('title').trim().isLength({ min: 3, max: 30 }).withMessage('Title should be from 3 to 30 symbols');
exports.productsRouter.post('/', 
//Input validation, express-validator
titleValidation, inputValidationMiddleware_1.inputValidationMiddleware, 
//В Express обработчик маршрута ожидает, что он будет возвращать void
(req, res) => {
    const newProduct = products_repository_1.productsRepository.createProduct(req.body.title);
    res.status(201).send(newProduct);
});
exports.productsRouter.put('/:id', (req, res) => {
    let product = products_repository_1.productsRepository.updateProduct(+req.params.id, req.body.title);
    if (product) {
        res.send(product);
    }
    else {
        res.sendStatus(404);
    }
});
exports.productsRouter.delete('/:id', (req, res) => {
    const isDeleted = products_repository_1.productsRepository.deleteProduct(+req.params.id);
    if (isDeleted) {
        res.sendStatus(204);
    }
    else {
        res.sendStatus(404);
    }
});
