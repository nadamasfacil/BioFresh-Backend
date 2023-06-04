const { Router } = require("express");
// Requerir todos los handlers

// ejemplo: const handlerUsers = require('../handlers/handlerUsers)
// Requerir todos los middlewares para validar datos
const { getUsersHandler , postUserHandler , loginUserHandler , updateUserDBHandler, userPasswordUpdateDBHandler , loginUserGoogleHandler, deleteUserHandler } = require("../handlers/usersHandlers.js");

// ejemplo: const helperUsers = require('../helpers/handlerUsers)

const usersRouter = Router();
// Especificar todas las peticiones
// ejemplo: usersRouter.get('/users', helperUser, handlerUser)
usersRouter.get("/", getUsersHandler);

//Post router para la creación del usuario
usersRouter.post("/", postUserHandler);

//Post router para el inicio de sesión por usuario en la DB
usersRouter.post("/login", loginUserHandler);

//Post router para el inicio de sesión con google
usersRouter.post("/login/google", loginUserGoogleHandler);

//Put router para modificar los datos del usuario
usersRouter.put("/", updateUserDBHandler);

//Put router para modificar la contraseña del usuario
usersRouter.put("/forgotpassword", userPasswordUpdateDBHandler);

usersRouter.delete("/delete",deleteUserHandler)

/*usersRouter.get("/userOrders") */
// usersRouter.get("/userOrders", getUserOrders);

module.exports = usersRouter;
