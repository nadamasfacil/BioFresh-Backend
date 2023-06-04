const app = require('./src/app.js');
const { getAllCategoriesHelpers } = require('./src/controllers/categoriesControllers.js');
const { getAllDeliveriesHelpers } = require('./src/controllers/deliveriesControllers.js');
const { getAllProductsFile } = require('./src/controllers/productsController.js');
const { createAdmin } = require('./src/controllers/usersControllers.js');
const { conn } = require('./src/db.js');

// Syncing all the models at once.
conn.sync({ force: true }).then( async () => {  // cambio a alter en lugar de force
    await getAllCategoriesHelpers();
    await getAllDeliveriesHelpers();
    await getAllProductsFile(); // cargo todos los productos del arreglo productsArray en helpers
    await createAdmin(); // crea el admin por default
    app.listen(process.env.PORT, () => {
        console.log('Servidor corriendo en el puerto' , process.env.PORT);
    });
});