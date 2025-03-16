"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.productsRouter = void 0;
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const inputValidationMiddleware_1 = require("../middlewares/inputValidationMiddleware");
const products_service_1 = require("../domain/products-service");
//презентационный слой
// Создание экземпляра маршрутизатора
exports.productsRouter = (0, express_1.Router)();
// Маршрут для получения продуктов с фильтрацией по названию
exports.productsRouter.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const foundProductsPromise = products_service_1.productsService.findProducts((_a = req.query.title) === null || _a === void 0 ? void 0 : _a.toString());
    const foundProducts = yield foundProductsPromise;
    res.send(foundProducts);
    // if(req.query.title){
    //     let searchString = req.query.title.toString()
    //     res.send(products.filter(el => el.title.indexOf(searchString) > -1))
    // }else{
    //     res.send(products)
    // }
}));
exports.productsRouter.get('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let product = yield products_service_1.productsService.getProductById(+req.params.id);
    if (product) {
        res.send(product);
    }
    else {
        res.sendStatus(404);
    }
}));
const titleValidation = (0, express_validator_1.body)('title').trim().isLength({ min: 3, max: 30 }).withMessage('Title should be from 3 to 30 symbols');
exports.productsRouter.post('/', 
//Input validation, express-validator
titleValidation, inputValidationMiddleware_1.inputValidationMiddleware, 
//В Express обработчик маршрута ожидает, что он будет возвращать void
(req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const newProduct = yield products_service_1.productsService.createProduct(req.body.title);
    res.status(201).send(newProduct);
}));
exports.productsRouter.put('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let result = yield products_service_1.productsService.updateProduct(+req.params.id, req.body.title);
    if (result) {
        let product = yield products_service_1.productsService.getProductById(+req.params.id);
        res.send(product);
    }
    else {
        res.sendStatus(404);
    }
}));
exports.productsRouter.delete('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const isDeleted = yield products_service_1.productsService.deleteProduct(+req.params.id);
    if (isDeleted) {
        res.sendStatus(204);
    }
    else {
        res.sendStatus(404);
    }
}));
