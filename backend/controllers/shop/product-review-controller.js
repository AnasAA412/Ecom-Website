const addProductReview = async (req, res) => {
  try {
    const { productId, userId, userName, reviewMessage, reviewValue } =
      req.body;
  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: "Error ",
    });
  }
};

const getProductReview = async (req, res) => {
  try {
  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: "Error ",
    });
  }
};

module.exports = { addProductReview, getProductReview };
