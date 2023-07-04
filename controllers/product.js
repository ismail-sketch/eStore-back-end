
import shortid from 'shortid'
import Product from '../models/Product.js'
import slugify from 'slugify'

export const createProduct = (req, res) => {

    // res.status(200).json({file: req.files, body: req.body})
    const {
        name,
        price,
        description,
        category,
        quantity,
        createdBy
    } = req.body

    let productPictures = []

    if(req.files.length > 0) {
       productPictures = req.files.map(file => {
           return {img: file.filename}
        })
    }

    const product = new Product({
        name: name,
        slug: slugify(name),
        price,
        description,
        productPictures,
        category,
        quantity,
        createdBy: req.user.id
       })

    product.save()
    .then(() => {
        res.status(201).json({message: 'Товар успешно добавлен', product})
    })
    .catch(err => {
        res.status(400).json({err})
    })
}