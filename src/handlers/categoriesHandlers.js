const {
  getAllCategoriesController,
  getCategorieByIdController,
  postCategorieController,
  deleteCategorieController,
  putCategorieController,
} = require("../controllers/categoriesControllers.js");
const { categoriesArray } = require("../helpers/categoriesArray.js");

const getAllCategoriesHandler = async (req, res) => {
  const { name } = req.query;
  try {
    let categories = await getAllCategoriesController();
    if (name) {
      let categoriesName = await categories.filter((c) =>
        c.name.toLowerCase().includes(name.toLowerCase())
      );
      if (categoriesName.length === 0) {
        return res.status(404).send("Categorie not found");
      } else {
        return res.status(200).send(categoriesName);
      }
    } else {
      res.status(200).send(categories);
    }
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const getCategorieByIdHandler = async (req, res) => {
  const { idCategorie } = req.params;
  try {
    const categories = await getAllCategoriesController();
    if (!idCategorie) {
      res.status(404).send("Couldn't find the categorie's name by its ID");
    } else {
      const categorie = await categories.find(
        (c) => c.id.toString() === idCategorie
      );
      res.status(200).json(categorie);
    }
  } catch (error) {
    res.status(404).send({ error: error.message });
  }
};

const postCategorieHandler = async (req, res) => {
  const { name, description } = req.body;
  try {
    const categorie = {
      name: name,
      description: description,
    };
    const categoriePosted = await postCategorieController(categorie);
    if (categoriePosted === null) {
      throw Error("No se puede crear el producto");
    } else {
      res.status(200).json(categoriePosted);
    }
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

const deleteCategorieHanlder = async (req, res) => {
  const body = req.body;
  console.log(body);
  try {
    const idCategorie = body.id;
    const active = body.active;
    const categorieResult = await deleteCategorieController(
      idCategorie,
      active
    );
    if (categorieResult === null) {
      throw Error("No se puede actualizar el producto o no se ha encontrado");
    } else {
      res.status(200).json(categorieResult);
    }
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

const putCategorieHandler = async (req, res) => {
const {id,name,description} = req.body
  try {
    const modificacion = await putCategorieController(id, name, description);
    if (modificacion) res.status(200).send(modificacion);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

module.exports = {
  getAllCategoriesHandler,
  getCategorieByIdHandler,
  postCategorieHandler,
  deleteCategorieHanlder,
  putCategorieHandler,
};
