const Cart = require("../../models/Cart");
const Product = require("../../models/Product");

const addToCart = async (req, res) => {
  try {
    const { userId, productId, quantity } = req.body;

    //check the product

    if (!userId || !productId || quantity <= 0) {
      return res.status(400).json({
        success: false,
        message: "Invalid data provided",
      });
    }

    //find the product and check the product avaliable in our app.
    const product = await Product.findById(productId);

    //if the product is not return or available
    if (!product) {
      return res.status(404).json({
        success: false,
        message: "product not found!",
      });
    }

    //find if the user cart any product
    let cart = await Cart.findOne({ userId });

    //if there is no card in the cart
    if (!cart) {
      cart = new Cart({ userId, items: [] });
    }

    //if the user is to cart any product , so next time added only the quantity not that product
    const findCurrentProductIndex = cart.items.findIndex(
      (item) => item.productId.toString() === productId
    );

    if (findCurrentProductIndex === -1) {
      cart.items.push({ productId, quantity });
    } else {
      cart.items[findCurrentProductIndex].quantity += quantity;
    }

    await cart.save();

    res.status(200).json({
      success: true,
      data: cart,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Error",
    });
  }
};

const fetchCartItems = async (req, res) => {
  try {
    // get the user id
    const { userId } = req.params;

    //check if the user id is not present
    if (!userId) {
      return res.status(400).json({
        success: false,
        message: "User id is mandatory",
      });
    }
    // once get user id then find the cart
    const cart = await Cart.findOne({ userId }).populate({
      path: "item.productId",
      select: "image title price salePrice",
    });

    //if we can't get the cart
    if (!cart) {
      return res.status(404).json({
        success: false,
        message: "Cart not found!",
      });
    }

    //when added a product into cart, Now this item present in your cart but,
    //at the same time Admin that created this product deleted this cart item.
    // so what will happen this cart is not present from the admin side in your database

    const validateItems = cart.items.filter(
      (productItem) => productItem.productId
    );

    if (validateItems.length < cart.items.length) {
      cart.items = validateItems;
      await cart.save();
    }

    const populateCartItems = validateItems.map((item) => ({
      productId: item.productId._id,
      image: item.productId.image,
      title: item.productId.title,
      price: item.productId.price,
      salePrice: item.productId.salePrice,
      quantity: item.productId.quantity,
    }));

    res.status(200).json({
      success: true,
      data: {
        ...cart._doc,
        items: populateCartItems,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Error",
    });
  }
};

const updateCartItemQuantity = async (req, res) => {
  try {
    //

    const { userId, productId, quantity } = req.body;

    if (!userId || !productId || quantity <= 0) {
      return res.status(404).json({
        success: false,
        message: "Invalid data provided!",
      });
    }

    //find the cart
    const cart = await Cart.findOne({ userId });

    //if we can't get the cart
    if (!cart) {
      return res.status(404).json({
        success: false,
        message: "Cart not found!",
      });
    }

    //then get item index
    const findCurrentProductIndex = cart.items.findIndex(
      (item) => item.productId.toString() === productId
    );

    //it the item is not presented
    if (findCurrentProductIndex === -1) {
      return res.status(404).json({
        success: false,
        message: "Cart is not presented!",
      });
    }

    //item update
    cart.items[findCurrentProductIndex].quantity = quantity;
    await cart.save();

    await cart.populate({
      path: "items.productId",
      select: "image title price salePrice",
    });

    const populateCartItems = cart.items.map((item) => ({
      productId: item.productId ? item.productId._id : null,
      image: item.productId ? item.productId.image : null,
      title: item.productId ? item.productId.title : "Product not found",
      price: item.productId ? item.productId.price : null,
      salePrice: item.productId ? item.productId.salePrice : null,
      quantity: item.productId.quantity,
    }));

    res.status(200).json({
      success: true,
      data: {
        ...cart._doc,
        items: populateCartItems,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Error",
    });
  }
};

const deleteCartItem = async (req, res) => {
  try {
    const { userId, productId } = req.params;

    if (!userId || !productId) {
      return res.status(404).json({
        success: false,
        message: "Invalid data provided!",
      });
    }

    //find the cart
    const cart = await Cart.findOne({ userId }).populate({
      path: "item.productId",
      select: "image title price salePrice",
    });

    //if we can't get the cart
    if (!cart) {
      return res.status(404).json({
        success: false,
        message: "Cart not found!",
      });
    }

    //filter the item which item we want to delete
    cart.items = cart.items.filter(
      (item) => item.productId._id.toString() !== productId
    );
    await cart.save();

    await Cart.populate({
      path: "item.productId",
      select: "image title price salePrice",
    });

    const populateCartItems = cart.items.map((item) => ({
      productId: item.productId ? item.productId._id : null,
      image: item.productId ? item.productId.image : null,
      title: item.productId ? item.productId.title : "Product not found",
      price: item.productId ? item.productId.price : null,
      salePrice: item.productId ? item.productId.salePrice : null,
      quantity: item.productId.quantity,
    }));

    res.status(200).json({
      success: true,
      data: {
        ...cart._doc,
        items: populateCartItems,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Error",
    });
  }
};

module.exports = {
  addToCart,
  fetchCartItems,
  updateCartItemQuantity,
  deleteCartItem,
};
