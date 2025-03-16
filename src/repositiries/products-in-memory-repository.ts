
//data access layer
export type ProductType ={
    id: number
    title: string
}

const products: ProductType[] = [
    {id: 1, title: 'tomato'},
    {id: 2, title: 'orange'},
    {id: 23, title: 'apple'}
]
export const productsRepository = {
    async findProducts(title: string | null | undefined): Promise<ProductType[]>{
        if(title){
            let filteredProducts = products.filter(el => el.title.indexOf(title) > -1)
            return filteredProducts
        } else {
            return products
        }
    },
    async getProductById(id: number): Promise<ProductType | null>{
        let product =  products.find(el => el.id === id)
        if(product){
            return product
        } else {
            return null
        }
    },
    async createProduct(title: string): Promise<ProductType> {
        const newProduct = {
            id: +(new Date()),
            title:  title,
        }
        products.push(newProduct)
        return newProduct
    },
    async updateProduct(id: number, title: string): Promise<ProductType | null> {
        let product = products.find(el => el.id === id)
        if(product){
            product.title = title
            return product
        } else {
            return null
        }
    },
    async deleteProduct(id: number): Promise<boolean>{
        for( let i =0; i < products.length; i++){
            if( products[i].id === id ){
                products.splice(i, 1)
                return true;
            }
        }
        return false
    }
}