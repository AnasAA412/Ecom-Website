import React, { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import CommonForm from "@/components/common/form";
import { addProductFormElements } from "@/config";
import ProdutImageUpload from "@/components/admin-view/image-upload";
import { useDispatch, useSelector } from "react-redux";
import {
  addNewProduct,
  editProduct,
  fetchAllProducts,
  deleteProduct,
} from "@/store/admin/product-slice";
import { useToast } from "@/hooks/use-toast";
import { useGlobalState } from "./mainform";

// const initialFormData = {
//   image: null,
//   title: "",
//   description: "",
//   category: "",
//   brand: "",
//   price: "",
//   salePrice: "",
//   totalStock: "",
// };

const AdminProducts = () => {
  const { formData, setFormData, initialFormData } = useGlobalState();
  const [imageFile, setImageFile] = useState(null);
  const { currentEditedId, setCurrentEditedId } = useGlobalState();
  const [uploadedImageUrl, setUploadedImageUrl] = useState("");
  const [imageLoadingState, setImageLoadingState] = useState(false);

  const { productList } = useSelector((state) => state.adminProducts);
  const dispatch = useDispatch();
  const { toast } = useToast();

  function onSubmit(event) {
    event.preventDefault();

    currentEditedId !== null
      ? dispatch(editProduct({ id: currentEditedId, formData })).then(
          (data) => {
            console.log(data, "edit");

            if (data?.payload?.success) {
              dispatch(fetchAllProducts());
              setFormData(initialFormData);
              setCurrentEditedId(null);
              toast({
                title: "Edited Successfully!",
              });
            }
          }
        )
      : dispatch(
          addNewProduct({
            ...formData,
            image: uploadedImageUrl,
          })
        ).then((data) => {
          console.log(data);
          if (data?.payload?.success) {
            dispatch(fetchAllProducts());
            setImageFile(null);
            setFormData(initialFormData);
            toast({
              title: "Product added Successfully!",
            });
          }
        });
  }

  function isFormValid() {
    return Object.keys(formData)
      .map((key) => formData[key] !== "")
      .every((item) => item);
  }

  useEffect(() => {
    dispatch(fetchAllProducts());
  }, [dispatch]);
  console.log(productList, uploadedImageUrl, "formData");
  console.log(formData);

  return (
    <div>
      <div className="py-6">
        <ProdutImageUpload
          imageFile={imageFile}
          setImageFile={setImageFile}
          uploadedImageUrl={uploadedImageUrl}
          setUploadedImageUrl={setUploadedImageUrl}
          setImageLoadingState={setImageLoadingState}
          imageLoadingState={imageLoadingState}
          isEditMode={currentEditedId !== currentEditedId}
        />
        <CommonForm
          formData={formData}
          onSubmit={onSubmit}
          setFormData={setFormData}
          buttonText={currentEditedId !== null ? "Edit" : "Add"}
          formControls={addProductFormElements}
          isBtnDisabled={!isFormValid()}
        />
      </div>
    </div>
  );
};

export default AdminProducts;
