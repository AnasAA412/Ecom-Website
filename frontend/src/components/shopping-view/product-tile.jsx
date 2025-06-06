import { Card, CardContent, CardFooter } from "../ui/card";
import { Button } from "../ui/button";
import { brandOptionsMap, categoryOptionsMap } from "@/config";
import { Badge } from "../ui/badge";
import { useNavigate } from "react-router-dom";

function ShoppingProductTile({
  product,
  handleGetProductDetails,
  handleAddtoCart,
}) {
  const navigate = useNavigate();
  return (
    <Card className="w-70 max-w-sm mx-8 border-none ">
      <div onClick={() => navigate(`/shop/product/${product?._id}`)}>
        <div className="relative ">
          <img
            src={product?.image}
            alt={product?.title}
            className="w-full h-[200px] object-contain rounded-t-lg"
          />
          {product?.totalStock === 0 ? (
            <Badge className="absolute top-2 left-2 bg-red-500 hover:bg-red-600">
              Out Of Stock
            </Badge>
          ) : product?.totalStock < 10 ? (
            <Badge className="absolute top-2 left-2 bg-red-500 hover:bg-red-600">
              {`Only ${product?.totalStock} items left`}
            </Badge>
          ) : product?.salePrice > 0 ? (
            <Badge className="absolute top-2 left-2 bg-red-500 hover:bg-red-600">
              Sale
            </Badge>
          ) : null}
        </div>
        <CardContent className="p-4 ">
          <h2 className="text-balance font-medium mb-2 ">{product?.title}</h2>
          <div className="flex justify-between items-center mb-2 ">
            <span className="text-balance text-muted-foreground">
              {categoryOptionsMap[product?.category]}
            </span>
            <span className="text-balance text-muted-foreground">
              {brandOptionsMap[product?.brand]}
            </span>
          </div>
          <div className="flex justify-between items-center mb-2 ">
            <div>
              <span
                className={`${
                  product?.salePrice > 0 ? "line-through" : ""
                } text-balance font-semibold text-primary`}
              >
                {product?.price}
              </span>
              {product?.salePrice > 0 ? (
                <span className="text-lg font-semibold text-primary">
                  ${product?.salePrice}
                </span>
              ) : null}
            </div>

            <div>
              {product?.totalStock === 0 ? (
                <Button className="w-full opacity-60 cursor-not-allowed">
                  Out Of Stock
                </Button>
              ) : (
                <Button
                  onClick={() =>
                    handleAddtoCart(product?._id, product?.totalStock)
                  }
                  className=""
                >
                  Add cart
                </Button>
              )}
            </div>
          </div>
        </CardContent>
      </div>
    </Card>
  );
}

export default ShoppingProductTile;
