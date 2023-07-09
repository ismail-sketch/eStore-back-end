import slugify from 'slugify'
import Category from '../models/Category.js'

const createCategories = (categories, parentId = null) => {
    const categoryList = []
    let category
    if(parentId === null) {
        category = categories.filter(cat => cat.parentId === undefined)
    } else {
        category = categories.filter(cat => cat.parentId === parentId)
    }

    for(let cate of category) {
        categoryList.push({
            _id: cate.id,
            name: cate.name,
            slug: cate.slug,
            children: createCategories(categories, cate.id)
        })
    }
    return categoryList
}

export const addCategory = async (req, res) => {
    try {

        const categoryObj = {
            name: req.body.name,
            slug: slugify(req.body.name),
        }

        if(req.file) {
            categoryObj.categoryImage = `${process.env.API}/uploads/` + req.file.filename
        }

        if(req.body.parentId) {
            categoryObj.parentId = req.body.parentId
        }

        const cat = await new Category(categoryObj)


        cat.save()
        .then(() => {
            res.status(201).json({message: 'Категория успешно создана', cat})
        })
        .catch(err => {
            res.status(400).json({err})
        })

    } catch (err) {
        console.log(err)
    }

}

export const getCategories = async (req, res) => {
    try {
       const categories = await Category.find()
       if(!categories) {
         return res.status(400).json({message: 'Категории не найдены'})
       }

       const categoryList = createCategories(categories)

       return res.status(200).json({message: 'Категории успешно получены', categoryList})

    } catch (err) {
        console.log(err);
    }
}