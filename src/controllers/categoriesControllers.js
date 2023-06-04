const {Categories} = require('../db');
const {categoriesArray} = require('../helpers/categoriesArray')

const getAllCategoriesHelpers = async () => {
    for (let i = 0; i < categoriesArray.length; i++) {
        await Categories.create(categoriesArray[i]);
    };
    const categArray = await Categories.findAll();
}

const getAllCategoriesController = async () => {
    return await Categories.findAll();
}

const getCategorieByIdController = async(categId) => {
    return await Categories.findByPk(categId);
}

const postCategorieController = async(categorie) => {
    let newCategorie = await Categories.create(categorie);
    const idCategorie = newCategorie.id;
    newCategorie = await Categories.findByPk(idCategorie);
    if(newCategorie === null) {
        return null;
    } else {
        return newCategorie;
    }
}

const deleteCategorieController = async (idCategorie, active) => {
    let deleteCategorie = await Categories.findByPk(idCategorie);
    if(deleteCategorie === null) return null;
    deleteCategorie.status = active;
    deleteCategorie.save();
    return deleteCategorie;
}

const putCategorieController = async (id,name,description)=>{
    let putCategorie = await Categories.findByPk(id)
    putCategorie.name = name
    putCategorie.description = description
    putCategorie.save()
    return putCategorie
}

module.exports = {
    getAllCategoriesHelpers,
    getAllCategoriesController,
    getCategorieByIdController,
    postCategorieController,
    deleteCategorieController,
    putCategorieController
}