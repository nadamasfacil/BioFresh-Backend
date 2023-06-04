const { createUser , getAllUsersDB, loginUser , updateUserDB, loginUserGoogle, getUser, deleteUserDB , updateUserPasswordDB } = require("../controllers/usersControllers.js")

//Handler para crear un usuario mediante el formulario del front

const postUserHandler = async (req, res) => {
    const { email , password , firstname , lastname , address , cp , city , country , phone,adminType } = req.body;
    try {
        const newUser = await createUser( email , password , firstname , lastname , address , cp , city , country , phone ,adminType)
        res.status(200).send(newUser);
    } catch (error) {
        res.status(400).json({ error : error.message });
    }
};

//Handler para obtener 1 user especifico o todos los users de la DB

const getUsersHandler = async (req, res) => {
    try {
        const { email } = req.query;
        
        const userDB = email ? await getUser(email) : await getAllUsersDB();
        res.status(200).json(userDB);
    } catch (error) {
        res.status(404).json({ error: error.message });
    }
};

//Handler para loguear con el usuario y contraseña de la DB

const loginUserHandler = async (req, res) => {
    const { email , password } = req.body;
    try {
        const user = await loginUser( email , password );
        if (user) res.status(200).send(user);
    } catch (error) {
        res.status(400).json({ error : error.message});
    }
};

//Handler para loguearse con la auth de Google

const loginUserGoogleHandler = async (req, res) => {
    const { email , firstname , lastname } = req.body;
    try {
        const userGoogle = await loginUserGoogle( email , firstname , lastname );
        res.status(200).send(userGoogle);
    } catch (error) {
        res.status(400).json({ error : error.message });
    }
};

//Handler para modificar datos del usuario en la DB

const updateUserDBHandler = async (req,res) => {
    const { email , password , firstname , lastname , address , cp , city , country , phone, customerStatus, adminType } = req.body;
    try {
        const userUpdate = await updateUserDB( email , password , firstname , lastname , address , cp , city , country , phone, customerStatus, adminType );
        res.status(201).json(userUpdate);
    } catch (error) {
        res.status(400).json({ error : error.message});
    }
};

const userPasswordUpdateDBHandler = async (req,res) => {
    const { email , token , password } = req.body;
    try {
        const userPasswordUpdate = await updateUserPasswordDB ( email , token , password );
        res.status(201).json(userPasswordUpdate);
    } catch (error) {
        res.status(400).json({ error : error.message })
    }
};

const deleteUserHandler =async (req,res)=>{
  const {email,status} = req.body
  try {
    const userDelete = await deleteUserDB(email,status) 
    if(userDelete)res.status(200).send("operacion exitosa")
  } catch (error) {
    res.status(400).send("se encontro un error" + error.message)
  }
}

// const getUserOrders = async (req, res) => {
//     const { userEmail } = req.body;
//     try {
//         const userOrders = getUserOrdersDB(userEmail);
//         res.status(200).json(userOrders);
//     } catch (error) {
//         res.status(400).json({ error : error.message })
//     }
// };

module.exports = {
    postUserHandler,
    getUsersHandler,
    loginUserHandler,
    loginUserGoogleHandler,
    updateUserDBHandler,
    userPasswordUpdateDBHandler,
    deleteUserHandler
};