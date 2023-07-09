import Cart from '../models/Cart.js';

export const addItemToCart = async (req, res) => {

  const cartOne = await Cart.findOne({ user: req.user.id });

  if (cartOne) {
    // Если корзина уже есть, обновить кол-во товара
    const product = req.body.cartItems.product
    const item = cartOne.cartItems.find(c => c.product == product)
    let condition, update


    if(item) {
      condition = {user: req.user.id,'cartItems.product': product}
      update =  { $set:
        {
          "cartItems.$": {...req.body.cartItems,quantity: item.quantity + req.body.cartItems.quantity}
        }
        }

      await Cart.findOneAndUpdate(condition, update)

      res.status(201).json({ cart: cartOne });
    }else {
      condition = {user: req.user.id}
      update = {
        $push: {
          cartItems: req.body.cartItems,
        },
      }

      await Cart.findOneAndUpdate(condition, update)

      res.status(201).json({ cart: cartOne });
    }
  } else {

    // Если корзины нет, то создать новую корзину
    const cart = new Cart({
      user: req.user.id,
      cartItems: [req.body.cartItems],
    });

    cart
      .save()
      .then(() => {
        res.status(201).json({ message: 'Товар в корзине!', cart });
      })
      .catch((err) => {
        res.status(400).json({ err });
      });
  }
};
