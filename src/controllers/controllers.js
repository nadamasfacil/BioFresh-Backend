const { Products , Ratings } = require('../db.js');

const getAllProducts = async (req, res) => {
    try {
        console.log("Estoy en el controller de Products")
        const productsFromDb = await Products.findAll({ include : { model: Ratings }});
        if(productsFromDb.length === 0) throw Error("No hay productos en la DB");
        res.status(200).json(productsFromDb);
    } catch (error) {
        console.error('Error al mostrar los Products de la DB:', error);
        res.status(400).json({ error: error.message });
    }
}

const searchProduct = async (name) => {
    const search = await Products.findAll ({ where: { name }})
    if (search) return search
    else throw Error("Product did not found");
};

const addProductsDB = async (arrayProducts) => {
    return await Products.bulkCreate(arrayProducts)
};

const getFavorites = async () => {
    return await Products.findAll({ where : { productFavorite : true }}) // productFavorite seria la relación de la tabla de producto con favorito
}

module.exports = {
    getAllProducts,
    searchProduct,
    addProductsDB,
    getFavorites
}