import {Request, Response, Router} from "express";

import {body} from "express-validator";
import {inputValidationMiddleware} from "../middlewares/inputValidationMiddleware";
import {ProductType} from "../repositiries/db";
import {productsService} from "../domain/products-service"

//презентационный слой

// Создание экземпляра маршрутизатора
export const productsRouter = Router()

// Маршрут для получения продуктов с фильтрацией по названию
productsRouter.get('/', async (req: Request, res: Response) => {
    const foundProductsPromise: Promise<ProductType[]> = productsService.findProducts(req.query.title?.toString())
    const foundProducts = await foundProductsPromise
    res.send(foundProducts)

    // if(req.query.title){
    //     let searchString = req.query.title.toString()
    //     res.send(products.filter(el => el.title.indexOf(searchString) > -1))
    // }else{
    //     res.send(products)
    // }
})

productsRouter.get('/:id', async (req: Request, res: Response) => {
    let product = await productsService.getProductById(+req.params.id)
    if(product){
        res.send(product)
    }else {
        res.sendStatus(404)
    }
})

const titleValidation = body('title').trim().isLength({min:3, max: 30}).withMessage('Title should be from 3 to 30 symbols')

productsRouter.post('/',
    //Input validation, express-validator
    titleValidation,
    inputValidationMiddleware,
        //В Express обработчик маршрута ожидает, что он будет возвращать void
        async (req: Request, res: Response) => {
            const newProduct = await productsService.createProduct(req.body.title)
            res.status(201).send(newProduct)
        }
)

productsRouter.put('/:id', async (req: Request, res: Response) => {
    let result = await productsService.updateProduct(+req.params.id, req.body.title)
    if(result) {
        let product = await productsService.getProductById(+req.params.id)
        res.send(product)
    } else {
        res.sendStatus(404)
    }
})

productsRouter.delete('/:id', async (req: Request, res: Response) => {
    const isDeleted = await productsService.deleteProduct(+req.params.id)
    if(isDeleted){
        res.sendStatus(204)
    } else {
        res.sendStatus(404)
    }

})
