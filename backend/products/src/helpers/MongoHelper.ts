import mongodb from "mongodb";

export const mongo = {
    products: null,
    reviews: null,
};

async function initMongo(): Promise<void> {
    const dbName = "shop";
    const client = new mongodb.MongoClient(`mongodb://mongo:27017/${dbName}`);

    await client.connect();

    mongo.products = client.db(dbName).collection("products");
    mongo.reviews = client.db(dbName).collection("reviews");
}

try {
    await initMongo();
} catch (error) {
    console.error ("Error while initializing resources: ", error);
    process.exit(1);
}