import {MongoClient} from "mongodb";

export type ProductType ={
    id: number
    title: string
}

const mongoUri = process.env.MONGODB_URI || 'mongodb://localhost:27017'; //строка подключения к бд

export const client = new MongoClient(mongoUri);

const db = client.db("shop")

export const productsCollection = db.collection<ProductType>("products");


export const runDB = async () => {
    try {
        //Connect the client to the server
        await client.connect()

        //Establish and verify connection
        await client.db("products").command({ping: 1})
        console.log("Connected successfully to mongo server")
    } catch {
        console.log("Can't connect to mongo server")
        await client.close()
    }
}