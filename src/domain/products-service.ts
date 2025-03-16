import {productsRepository} from '../repositiries/products-db-repository'
import {ProductType} from "../repositiries/db";


//Business Logic Layer

export const productsService = {
    async findProducts(title: string | null | undefined): Promise<ProductType[]>{
         return await productsRepository.findProducts(title)
    },
    async getProductById(id: number): Promise<ProductType | null>{
        return await productsRepository.getProductById(id)
    },
    async createProduct(title: string): Promise<ProductType> {
        const newProduct = {
            id: +(new Date()),
            title:  title,
        }
        const createdProduct =  await productsRepository.createProduct(newProduct)
        return createdProduct
    },
    async updateProduct(id: number, title: string): Promise<boolean> {
        return await productsRepository.updateProduct(id, title)
    },
    async deleteProduct(id: number): Promise<boolean>{
        return await productsRepository.deleteProduct(id)
    }
}