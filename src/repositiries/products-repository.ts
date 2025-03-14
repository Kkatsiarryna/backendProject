
//data access layer

const products = [
    {id: 1, title: 'tomato'},
    {id: 2, title: 'orange'},
    {id: 23, title: 'apple'}
]
export const productsRepository = {
    findProducts(title: string | null | undefined){
        if(title){
            let filteredProducts = products.filter(el => el.title.indexOf(title) > -1)
            return filteredProducts
        } else {
            return products
        }
    },
    getProductById(id: number){
        return products.find(el => el.id === id)
    },
    createProduct(title: string) {
        const newProduct = {
            id: +(new Date()),
            title:  title,
        }
        products.push(newProduct)
        return newProduct
    },
    updateProduct(id: number, title: string) {
        let product = products.find(el => el.id === id)
        if(product){
            product.title = title
            return product
        }
    },
    deleteProduct(id: number){
        for( let i =0; i < products.length; i++){
            if( products[i].id === id ){
                products.splice(i, 1)
                return true;
            }
        }
        return false
    }
}