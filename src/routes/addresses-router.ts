import {Request, Response, Router} from "express";

export const addressesRouter = Router()

const addresses = [{id: 1, value: '0x1234567890'}, {id: 2, value: '0x1234567890'}, {id: 3, value: '0x1234567890'}]

addressesRouter.get('/', (req: Request, res: Response) => {
    res.send(addresses)
})

addressesRouter.get('/:id', (req: Request, res: Response) => {
    let address = addresses.find(el => el.id === +req.params.id)
    if(address){
        res.send(address)
    }else {
        res.send(404)
    }
})