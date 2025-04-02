import React, { useEffect, useState } from "react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { PencilIcon, UserPlusIcon } from "@heroicons/react/24/solid";
import { useBetween } from "use-between";
import {
  Card,
  CardHeader,
  Input,
  Typography,
  Button,
  CardBody,
  Chip,
  CardFooter,
  Tabs,
  TabsHeader,
  Tab,
  Avatar,
  IconButton,
  Tooltip,
} from "@material-tailwind/react";
import { useDispatch, useSelector } from "react-redux";
import { deleteProduct, fetchAllProducts } from "@/store/admin/product-slice";
import ReadMoreArea from "@foxeian/react-read-more";
import { useNavigate } from "react-router-dom";
import { useGlobalState } from "./mainform";

const TABS = [
  {
    label: "All",
    value: "all",
  },
  {
    label: "Monitored",
    value: "monitored",
  },
  {
    label: "Unmonitored",
    value: "unmonitored",
  },
];

const TABLE_HEAD = ["Product", "Category", "Price", "Brand", "Total Stock"];

const AllProducts = () => {
  const { productList } = useSelector((state) => state.adminProducts);
  const { currentEditedId, setCurrentEditedId } = useGlobalState();
  const { formData, setFormData } = useGlobalState();
  const navigate = useNavigate();

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAllProducts());
  }, []);

  console.log(productList);

  function handleDelete(getCurrentProductId) {
    console.log(getCurrentProductId);
    dispatch(deleteProduct(getCurrentProductId)).then((data) => {
      if (data?.payload?.success) {
        dispatch(fetchAllProducts());
      }
    });
  }

  return (
    <Card className="h-full w-full">
      {/* <CardHeader floated={false} shadow={false} className="rounded-none">
        <div className="mb-8 flex items-center justify-between gap-8">
          <div>
            <Typography variant="h5" color="blue-gray">
              Members list
            </Typography>
            <Typography color="gray" className="mt-1 font-normal">
              See information about all members
            </Typography>
          </div>
          <div className="flex shrink-0 flex-col gap-2 sm:flex-row">
            <Button variant="outlined" size="sm">
              view all
            </Button>
            <Button className="flex items-center gap-3" size="sm">
              <UserPlusIcon strokeWidth={2} className="h-4 w-4" /> Add member
            </Button>
          </div>
        </div>
        <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
          <Tabs value="all" className="w-full md:w-max">
            <TabsHeader>
              {TABS.map(({ label, value }) => (
                <Tab key={value} value={value}>
                  &nbsp;&nbsp;{label}&nbsp;&nbsp;
                </Tab>
              ))}
            </TabsHeader>
          </Tabs>
          <div className="w-full md:w-72">
            <Input
              label="Search"
              icon={<MagnifyingGlassIcon className="h-5 w-5" />}
            />
          </div>
        </div>
      </CardHeader> */}
      <CardBody className="overflow-scroll px-0 ">
        <table className="mt-4 w-full min-w-max table-auto text-left ">
          <thead>
            <tr>
              {TABLE_HEAD.map((head) => (
                <th
                  key={head}
                  className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4"
                >
                  <Typography
                    variant="small"
                    color="black"
                    className="font-mono leading-none "
                  >
                    {head}
                  </Typography>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="py-4">
            {productList && productList.length > 0 ? (
              productList.map((products) => {
                return (
                  <tr key={products?._id}>
                    <td>
                      <div className="flex items-center gap-3">
                        <Avatar
                          src={products?.image}
                          alt={products?.title}
                          size="md"
                        />
                        <div className="flex flex-col">
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-medium"
                          >
                            {products?.title}
                          </Typography>
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal opacity-70 "
                          >
                            <ReadMoreArea
                              lettersLimit={50}
                              collapseLabel="Read less"
                              expandLabel="Read more"
                              style={{
                                display: "flex",
                                flexDirection: "column",
                              }}
                              className="flex flex-col"
                            >
                              {products?.description}
                            </ReadMoreArea>
                          </Typography>
                        </div>
                      </div>
                    </td>

                    <td>
                      <div className="flex flex-col">
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-thin opacity-90"
                        >
                          {products?.category}
                        </Typography>
                      </div>
                    </td>
                    <td>
                      <div className="w-max">
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-medium "
                        >
                          {products?.salePrice}
                        </Typography>
                      </div>
                    </td>
                    <td>
                      <div className="flex flex-col">
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-thin opacity-90"
                        >
                          {products?.brand}
                        </Typography>
                      </div>
                    </td>

                    <td>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-mono"
                      >
                        {products?.totalStock}
                      </Typography>
                    </td>
                    <td>
                      <Button
                        className="px-3  bg-blue-50"
                        variant="outlined"
                        onClick={() => {
                          setCurrentEditedId(products?._id);
                          setFormData(products);
                          navigate("/admin/products");
                        }}
                      >
                        Edit
                      </Button>
                    </td>
                    <td>
                      <Button
                        className="px-1 bg-red-500 text-white"
                        variant="outlined"
                        onClick={() => handleDelete(products?._id)}
                      >
                        Delete
                      </Button>
                    </td>
                  </tr>
                );
              })
            ) : (
              <p>No Data Available here</p>
            )}
          </tbody>
        </table>
      </CardBody>
      <CardFooter className="flex items-center justify-between border-t border-blue-gray-50 p-4">
        <Typography variant="small" color="blue-gray" className="font-normal">
          Page 1 of 10
        </Typography>
        <div className="flex gap-2">
          <Button variant="outlined" size="sm">
            Previous
          </Button>
          <Button variant="outlined" size="sm">
            Next
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};

export default AllProducts;
