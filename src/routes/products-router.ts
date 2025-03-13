import {Request, Response, Router} from "express";

const products = [{id: 1, title: 'tomato'}, {id: 2, title: 'orange'}, {id: 23, title: 'apple'}]

// Создание экземпляра маршрутизатора
export const productsRouter = Router()

// Маршрут для получения продуктов с фильтрацией по названию
productsRouter.get('/', (req: Request, res: Response) => {
    if(req.query.title){
        let searchString = req.query.title.toString()
        res.send(products.filter(el => el.title.indexOf(searchString) > -1))
    }else{
        res.send(products)
    }
})

productsRouter.get('/tomato', (res: Response) => {
    let tomato = products.find(el => el.title === 'tomato')
    res.send(tomato)
})

// productsRouter.get('/:productTitle', (req: Request, res: Response) => {
//     let product = products.find(el => el.title === req.params.productTitle)
//     if(product){
//         res.send(product)
//     }else {
//         res.send(404)
//     }
// })

productsRouter.get('/:id', (req: Request, res: Response) => {
    let product = products.find(el => el.id === +req.params.id)
    if(product){
        res.send(product)
    }else {
        res.sendStatus(404)
    }
})

productsRouter.post('/', (req: Request, res: Response) => {
    const newProduct = {
        id: +(new Date()),
        title:  req.body.title
    }
    products.push(newProduct)
    res.status(201).send(newProduct)
})

productsRouter.put('/:id', (req: Request, res: Response) => {
    let product = products.find(el => el.id === +req.params.id)
    if(product){
        product.title = req.body.title
        res.send(product)
    }else {
        res.sendStatus(404)
    }
})

productsRouter.delete('/:id', (req: Request, res: Response) => {
    for( let i =0; i < products.length; i++){
        if( products[i].id === +req.params.id ){
            products.splice(i, 1)
            res.send(204)
            return;
        }
    }
    res.sendStatus(404)
})
