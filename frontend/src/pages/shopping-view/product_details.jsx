import { StarIcon } from "lucide-react";

import { useDispatch, useSelector } from "react-redux";
import { addToCart, fetchCartItems } from "@/store/shop/cart-slice";

import {
  fetchProductDetails,
  setProductDetails,
} from "@/store/shop/products-slice";

import { useEffect, useState } from "react";
import { addReview, getReviews } from "@/store/shop/review-slice";

import { useToast } from "@/hooks/use-toast";
import { Avatar } from "radix-ui";
import { Button } from "@/components/ui/button";
import { Input } from "@material-tailwind/react";
import { Separator } from "@radix-ui/react-dropdown-menu";
import { Label } from "@/components/ui/label";
import StarRatingComponent from "@/components/common/star-rating";
import { useLocation, useParams } from "react-router-dom";

function ProductDetails() {
  const [reviewMsg, setReviewMsg] = useState("");
  const [rating, setRating] = useState(0);
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { cartItems } = useSelector((state) => state.shopCart);
  const { reviews } = useSelector((state) => state.shopReview);
  const { product } = useSelector((state) => state.productDetails);
  const [productSummary, setProductSummary] = useState({
    _id: "",
    image: "",
    title: "",
    description: "",
    category: "",
    brand: "",
    salePrice: "",
    totalStock: "",
  });
  const { toast } = useToast();

  const productId = useParams().id;
  console.log(productId, "myid");

  function handleRatingChange(getRating) {
    //console.log(getRating, "getRating");

    setRating(getRating);
  }

  function handleAddToCart(getCurrentProductId, getTotalStock) {
    let getCartItems = cartItems.items || [];

    if (getCartItems.length) {
      const indexOfCurrentItem = getCartItems.findIndex(
        (item) => item.productId === getCurrentProductId
      );
      if (indexOfCurrentItem > -1) {
        const getQuantity = getCartItems[indexOfCurrentItem].quantity;
        if (getQuantity + 1 > getTotalStock) {
          toast({
            title: `Only ${getQuantity} quantity can be added for this item`,
            variant: "destructive",
          });

          return;
        }
      }
    }
    dispatch(
      addToCart({
        userId: user?.id,
        productId: getCurrentProductId,
        quantity: 1,
      })
    ).then((data) => {
      if (data?.payload?.success) {
        dispatch(fetchCartItems(user?.id));
        toast({
          title: "Product is added to cart",
        });
      }
    });
  }

  //   function handleDialogClose() {
  //     setOpen(false);
  //     dispatch(setProductDetails());
  //     setRating(0);
  //     setReviewMsg("");
  //   }

  function handleAddReview() {
    dispatch(
      addReview({
        productId: productId?._id,
        userId: user?.id,
        userName: user?.userName,
        reviewMessage: reviewMsg,
        reviewValue: rating,
      })
    ).then((data) => {
      if (data?.payload?.success) {
        setRating(0);
        setReviewMsg("");
        dispatch(getReviews(productId?._id));
        toast({
          title: "Review added successfully!",
        });
      }
    });
  }

  //   function handleGetProductDetails() {
  //     dispatch(
  //       fetchProductDetails({
  //         productId: productId?._id,
  //       })
  //     ).then((data) => {
  //       if (data.payload.success) {
  //         dispatch(setProductDetails(productId?._id));
  //       }
  //     });
  //   }

  useEffect(() => {
    if (productId !== null) dispatch(getReviews(productId));
  }, [productId]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await dispatch(fetchProductDetails(productId));
      console.log("redux", response);
      setProductSummary(response?.payload?.data);
    };

    fetchData();

    //setProductSummary(response.data);
    // dispatch(setProductDetails(response.data.data));
  }, [dispatch, productId]);

  // console.log(reviews, "reviews");

  //console.log(product, "products");

  const averageReview =
    reviews && reviews.length > 0
      ? reviews.reduce((sum, reviewItem) => sum + reviewItem.reviewValue, 0) /
        reviews.length
      : 0;

  return (
    <div className="p-20">
      <div className="grid grid-cols-2 gap-8 sm:p-12 max-w-[90vw] sm:max-w-[80vw] lg:max-w-[70vw]">
        <div className="relative overflow-hidden rounded-lg">
          <img
            src={productSummary.image}
            alt={productSummary.brand}
            width={600}
            height={600}
            className="aspect-square w-full object-contain"
          />
        </div>
        <div className="">
          <div>
            <h1 className="text-2xl font-extrabold">{productSummary.title}</h1>
            <p className="text-muted-foreground text-1xl mb-5 mt-4">
              {productSummary.description}
            </p>
          </div>
          <div className="flex items-center justify-between">
            <p
              className={`text-3xl font-bold text-primary ${
                productSummary.salePrice > 0 ? "line-through" : ""
              }`}
            >
              ${productSummary.price}
            </p>
            {productSummary.salePrice > 0 ? (
              <p className="text-2xl font-bold text-muted-foreground">
                ${productSummary.salePrice}
              </p>
            ) : null}
          </div>
          <div className="flex items-center gap-2 mt-2">
            <div className="flex items-center gap-0.5">
              <StarRatingComponent rating={averageReview} />
            </div>
            <span className="text-muted-foreground">
              ({averageReview.toFixed(2)})
            </span>
          </div>
          <div className="mt-5 mb-5">
            {productSummary.totalStock === 0 ? (
              <Button className="w-full opacity-60 cursor-not-allowed">
                Out of Stock
              </Button>
            ) : (
              <Button
                className="w-full"
                onClick={() =>
                  handleAddToCart(productSummary._id, productSummary.totalStock)
                }
              >
                Add to Cart
              </Button>
            )}
          </div>
          <Separator />
          <div className="max-h-[300px] overflow-auto">
            <h2 className="text-xl font-bold mb-4">Reviews</h2>
            <div className="grid gap-6">
              {reviews && reviews.length > 0 ? (
                reviews.map((reviewItem) => (
                  <div className="flex gap-4">
                    <Avatar className="w-10 h-10 border">
                      <AvatarFallback>
                        {reviewItem?.userName[0].toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <div className="grid gap-1">
                      <div className="flex items-center gap-2">
                        <h3 className="font-bold">{reviewItem?.userName}</h3>
                      </div>
                      <div className="flex items-center gap-0.5">
                        <StarRatingComponent rating={reviewItem?.reviewValue} />
                      </div>
                      <p className="text-muted-foreground">
                        {reviewItem.reviewMessage}
                      </p>
                    </div>
                  </div>
                ))
              ) : (
                <h1>No Reviews</h1>
              )}
            </div>
            <div className="mt-10 flex-col flex gap-2">
              <Label>Write a review</Label>
              <div className="flex gap-1">
                <StarRatingComponent
                  rating={rating}
                  handleRatingChange={handleRatingChange}
                />
              </div>
              <Input
                name="reviewMsg"
                value={reviewMsg}
                onChange={(event) => setReviewMsg(event.target.value)}
                placeholder="Write a review..."
              />
              <Button
                onClick={handleAddReview}
                disabled={reviewMsg.trim() === ""}
              >
                Submit
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetails;
