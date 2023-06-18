const Article = require('../models/Article');

exports.getArtcles = async(req, res)=>{
    try {
        const articles = await Article.find().populate({path:'users', select: 'name'});
        res.status(200).json({message:"Article fetched successfully", articles});
    } catch (error) {
        res.status(400).json({message: error.message});
    }
    

}


exports.addArticle = async(req, res)=>{
    try {
        const { title, users } = req.body;
        const newArticle = new Article({  title, users });
        const addArticleData = await newArticle.save();
        res.status(200).json({message:"Article added successful"});
    } catch (error) {
        res.status(400).json({message: error.message});
    }
}