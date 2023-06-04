const {  getAllFavoritesDB , getFavoritesForUserDB, changeFavoriterDB} = require("../controllers/favoritesControllers")

const getAllFavoritesHandler = async (req, res) => {
    try {
       const allFavoritesDB = await getAllFavoritesDB();
        res.status(200).json(allFavoritesDB);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

const getFavoritesForUserHandler=async(req,res)=>{
    try {
        const {user}=req.params
        const allFavoritesUserDB = await getFavoritesForUserDB(user);
        res.status(200).json(allFavoritesUserDB);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}
const postChangeFavoriteHandler=async(req,res)=>{
    try {
        const {userEmail,productId}=req.body;
        const allFavoritesUserDB = await changeFavoriterDB(userEmail,productId);
        res.status(200).json(allFavoritesUserDB);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}
module.exports = {
    getFavoritesForUserHandler,
    getAllFavoritesHandler,
    postChangeFavoriteHandler
}

