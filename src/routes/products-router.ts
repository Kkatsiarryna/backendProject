import {Request, Response, Router} from "express";
import {productsRepository} from "../repositiries/products-repository";

//презентационный слой

// Создание экземпляра маршрутизатора
export const productsRouter = Router()

// Маршрут для получения продуктов с фильтрацией по названию
productsRouter.get('/', (req: Request, res: Response) => {
    const foundProducts = productsRepository.findProducts(req.query.title?.toString())
    res.send(foundProducts)
    // if(req.query.title){
    //     let searchString = req.query.title.toString()
    //     res.send(products.filter(el => el.title.indexOf(searchString) > -1))
    // }else{
    //     res.send(products)
    // }
})

productsRouter.get('/:id', (req: Request, res: Response) => {
    let product = productsRepository.getProductById(+req.params.id)
    if(product){
        res.send(product)
    }else {
        res.sendStatus(404)
    }
})

productsRouter.post('/', (req: Request, res: Response) => {
    const newProduct = productsRepository.createProduct(req.body.title)
    res.status(201).send(newProduct)
})

productsRouter.put('/:id', (req: Request, res: Response) => {
    let product = productsRepository.updateProduct(+req.params.id, req.body.title)
    if(product){
        res.send(product)
    }else {
        res.sendStatus(404)
    }
})

productsRouter.delete('/:id', (req: Request, res: Response) => {
    const isDeleted = productsRepository.deleteProduct(+req.params.id)
    if(isDeleted){
        res.sendStatus(204)
    } else {
        res.sendStatus(404)
    }

})
