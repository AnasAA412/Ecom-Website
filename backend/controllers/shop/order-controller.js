const createOrder = async (req, res) => {
  try {
    const {
      userId,
      cartItems,
      addressInfo,
      orderStatus,
      paymentMethod,
      paymentStatus,
      totalAmount,
      orderDate,
      orderUpdateDate,
      paymentId,
      payerId,
    } = req.body;

    const create_payment_json = {
      payer: {
        payment_method: "paypal",
      },
      redirect_urls: {
        return_url: "http://localhost:5005/shop/paypal-return",
        cancel_url: "http://localhost:5005/shop/paypal-cancel",
      },

      transactions: [
        {
          item_list: {
            items: cartItems.map((item) => ({
              name: item.title,
              sku: item.productId,
              price: item.price.toFixed(2),
              currency: "USD",
              quantity: item.quantity,
            })),
          },
        },
      ],
    };
  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: "Some Error occured!",
    });
  }
};

const capturePayment = async (req, res) => {
  try {
  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: "Some Error occured!",
    });
  }
};

module.export = { createOrder, capturePayment };
