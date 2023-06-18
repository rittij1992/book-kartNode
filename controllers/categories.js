const Category = require('../models/Category');

exports.getCategories = async (req, res) => {
    try {
        const limit = 4;
        const page = parseInt(req.query.page) || 1;
        const offset = (page - 1) * limit;
        const catCount = await Category.countDocuments();
        const totalPages = Math.ceil(catCount / limit);

        const catSearchData = req.query.catSearchData;
        const regex = new RegExp(catSearchData, "i");
        const data = await Category.find({ categoryName: { $regex: regex } })
        .skip(offset)
        .limit(limit)
        const allData = await Category.find();
        res.status(200).json({ 
            message: 'Category fetched successfully',
            data,
            allData,
            totalPages
        });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.getCategory = async (req, res) => {
    try {
        const categoryId = req.params.id;
        const data = await Category.findById(categoryId);
        res.status(200).json({message: 'Category fetched successfully', data});
    } catch (error) {
        res.status(400).json({message: error.message});
    }
};

exports.addCategory = async (req, res)=>{
    try {
        const {categoryName} = req.body;
        const category = new Category({categoryName});
        const newCategory = await category.save();
        res.status(200).json({message:'Category added successfully', newCategory});
    } catch (error) {
        res.status(400).json({message: error.message});
    }
};

exports.updateCategory = async (req, res)=>{
    try {
        const categoryId = req.params.id;
        const {categoryName} = req.body;
        const updatedCat = await Category.findByIdAndUpdate(categoryId, {categoryName});
        res.status(200).json({message: 'Category updated successfully', updatedCat})
    } catch (error) {
        res.status(400).json({message: error.message})
    }
};

exports.deleteCategory = async (req, res)=>{
    try {
        const delCategoryId = req.params.id;
        const delCategory = await Category.findByIdAndDelete(delCategoryId);
        res.status(200).json({message: 'Category deleted successfully', delCategory});
    } catch (error) {
        res.status(400).json({message: error.message});
    }
};