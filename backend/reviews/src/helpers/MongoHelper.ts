import mongodb from "mongodb";

export let mongo = {
    products: null,
};

async function initMongo () {
    const dbName = "shop";
    const client = new mongodb.MongoClient(`mongodb://mongo:27017/${dbName}`);

    await client.connect();

    mongo.products = client.db(dbName).collection("products");
}

try {
    await initMongo();
} catch (error) {
    console.error ("Error while initializing resources: ", error);
    process.exit(1);
}