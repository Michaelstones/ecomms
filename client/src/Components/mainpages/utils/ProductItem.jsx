import BtnRender from "./BtnRender";
import { useContext, useState } from "react";
import axios from "axios";
import { GlobalsState } from "./../../../GlobalsState";
import Loading from "./Loading/Loading";

const ProductItem = ({ product, handleCheck, loading, deleteProduct }) => {
  const state = useContext(GlobalsState);
  const { isAdmin } = state.userApi;
  const admin = isAdmin[0];

  if (loading) {
    return (
      <div className="product_card">
        <Loading />
      </div>
    );
  }
  return (
    <div className="product_card">
      {admin && (
        <input
          type="checkbox"
          checked={product.checked}
          onChange={() => handleCheck(product._id)}
        />
      )}
      <img src={product?.images?.url} alt={product?.title} />
      <div className="product_box">
        <h1 title={product?.title}>{product?.title}</h1>
        <span>$ {product?.price}</span>
        <p>{product?.description}</p>
      </div>
      <BtnRender
        product={product}
        isiAdmin={admin}
        deleteProduct={deleteProduct}
      />
    </div>
  );
};

export default ProductItem;
