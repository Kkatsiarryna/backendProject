import {Request, Response, Router} from "express";
import {addressesRepository} from "../repositiries/addresses-repository";

export const addressesRouter = Router()



addressesRouter.get('/', (req: Request, res: Response) => {
    const addresses = addressesRepository.getAddresses()
    res.send(addresses)
})

addressesRouter.get('/:id', (req: Request, res: Response) => {
    let address = addressesRepository.getAddressesById(+req.params.id)
    if(address){
        res.send(address)
    }else {
        res.send(404)
    }
})