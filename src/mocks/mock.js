import {faker} from "@faker-js/faker";

const { database, commerce, random, image } = faker;

export const generateProduct = ()=>{
    return {
        id: database.mongodbObjectId(),
        title: commerce.product(),
        price: parseFloat(commerce.price()),
        stock: parseInt(random.numeric(2)),
        image: image.imageUrl(),
        code: random.alphaNumeric(5),
        description: commerce.productDescription(),
    }
};