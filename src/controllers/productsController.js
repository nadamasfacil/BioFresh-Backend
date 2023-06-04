const { Op } = require('sequelize');
const { Products, Categories, Favorites, Ratings, OrdersDetails } = require('../db');
const { productsArray } = require('../helpers/productsArray');

const getAllProductsFile = async () => {
  let product, category, idProduct;
  for (let i = 0; i < productsArray.length; i++) {
    product = await Products.create(productsArray[i]);
    category = await Categories.findOne({
      where: {
        name: { [Op.substring]: productsArray[i].arrayCategories[0]}
      }
    });
    product.setCategories(category.id);
    idProduct = product.id
    product = await Products.findByPk(idProduct,{ 
      include: [{ 
        model: Categories,
        attributes: ['id', 'name'],
        through: {
          attributes: [],
        }
      }]});
  };
  const prodArray = await Products.findAll();
};

const getAllProducts = async () => {
  return await Products.findAll({ 
    include: [{ 
      model: Categories,
      attributes: ['id', 'name'],
      through: {
        attributes: [],
      }
    }]});
};

const getProductsByName = async (name) => {
  return await Products.findAll({ 
    where: { name: {[Op.substring]: `${name}` }},
    include: [{ 
      model: Categories,
      attributes: ['id', 'name'],
      through: {
        attributes: [],
      }
    }]});
};

const getProductById = async(prodId) => {
  return await Products.findByPk(prodId,{
    include: [{ 
      model: Categories,
      attributes: ['id', 'name'],
      through: {
        attributes: [],
      }
    }]});
};

const getProductsByCategory = async (category, order) => {
  let products = [];
  let productsFilter = [];
  let categoryFound = '';
  if (category === 'All') {
    products = await getAllProducts();
  } else {
    categoryFound = await Categories.findByPk(category);
    if (categoryFound === null) return [];
    products = await categoryFound.getProducts();
  };
  if (products.length === null) return [];
  if (order) {
    if (order === "AtoZ") productsFilter = products.sort((a,b) =>  a.name.localeCompare(b.name));
    else if (order === "ZtoA") productsFilter = products.sort((a,b) => b.name.localeCompare(a.name));
    else if (order === "Lower") {
      console.log('entre a Lower');
      productsFilter = products.sort((a,b) => 
      {
        if ( a.price > b.price ) return 1;
        else if( a.price < b.price) return -1;
        else return 0;
      });
    } 
    else if (order === "Higher") {
      console.log('entre a Higher');
      productsFilter = products.sort((a,b) => 
      {
        if ( a.price < b.price) return 1;
        else if ( a.price > b.price) return -1;
        else return 0;
      });
    }
    else {
      console.log('igual');
      productsFilter = products;
    }
  };
  return products;
};

const postProduct = async (product, categories) => {
  let productPost = await Products.create(product);
  const idProduct = productPost.id;
  productPost = await Products.findByPk(idProduct, { include: {
    model: Categories, 
    attributes : ['id', 'name'],
    through: {
      attributes: [],
    },
  }});
  if (productPost === null) return null;
  
  productPost.setCategories(categories);
  return productPost;
};

const putProduct = async (product, categories) => {
  const idProduct = product.id;
  let productPut = await Products.findByPk(idProduct);
  if (productPut === null) return null;
  productPut.name = product.name;
  productPut.image = product.image;
  productPut.description = product.description;
  productPut.price = product.price;
  productPut.stock = product.stock;
  productPut.tax = product.tax;
  productPut.status = product.status;
  productPut.save();

  productPut.setCategories(categories);
  return productPut;
};

const deleteProduct = async (idProduct, active) => {
  let productDelete = await Products.findByPk(idProduct);
  if (productDelete === null) return null;
  productDelete.status = active;
  productDelete.save();
  return productDelete;
};

module.exports = {
  getAllProductsFile,
  getAllProducts,
  getProductsByName,
  getProductById,
  getProductsByCategory,
  postProduct,
  putProduct,
  deleteProduct,
}