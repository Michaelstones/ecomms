import { useState, useContext } from "react";
import { GlobalsState } from "../../../GlobalsState";
import Loading from "../utils/Loading/Loading";
import ProductItem from "./../utils/ProductItem";
import Filter from "./Filter";
import LoadMore from "./LoadMore";
import axios from "axios";
const Products = () => {
  const state = useContext(GlobalsState);
  const token = state.token[0];
  const call = state.products.call;
  const callback = call[0];
  const setCallback = call[1];
  const prod = state.products.prod;
  const product = prod[0].products;
  // const setProduct = prod[1];
  const [loading, setLoading] = useState(false);
  const { isAdmin } = state.userApi;
  const admin = isAdmin[0];
  const [isCheck, setIsCheck] = useState(false);
  const [check, setCheck] = useState(false);

  // const h = "https://ecommerceapiiii.herokuapp.com";
  const deleteProduct = async (id, public_id) => {
    try {
      setLoading(true);

      const destroyImg = axios.post(
        `https://ecommerceapiiii.herokuapp.com/api/v1/upload/destroy`,
        { public_id },
        {
          headers: { Authorization: token },
        }
      );
      const deleteProduct = axios.delete(
        `https://ecommerceapiiii.herokuapp.com/api/v1/products/${id}`,
        {
          headers: { Authorization: token },
        }
      );

      await destroyImg;
      await deleteProduct;
      setLoading(false);
      setCallback(!callback);
      window.location.reload(true);
    } catch (err) {
      alert(err.response.data.msg);
    }
  };

  const handleCheck = (id) => {
    product.forEach((product) => {
      if (product._id === id) {
        product.checked = !check;
      }
    });

    setCheck(!check);
  };

  const checkAll = () => {
    product.forEach((product) => {
      return (product.checked = !isCheck);
    });
    setIsCheck(!isCheck);
  };

  const deleteAll = () => {
    product.forEach((product) => {
      if (product.checked) deleteProduct(product._id, product.images.public_id);
    });
  };

  if (loading) return <Loading />;
  if (!product) return <Loading />;

  return (
    <>
      <Filter />
      {admin && (
        <div className="delete-all">
          <span>Select all</span>
          <input type="checkbox" checked={isCheck} onChange={checkAll} />
          <button onClick={deleteAll}>Delete ALL</button>
        </div>
      )}

      <div className="products">
        {product?.map((product) => {
          return (
            <div key={product?._id}>
              <ProductItem
                product={product}
                handleCheck={handleCheck}
                deleteProduct={deleteProduct}
                loading={loading}
              />
            </div>
          );
        })}
      </div>
      <LoadMore />
      {product?.length === 0 && <Loading />}
    </>
  );
};

export default Products;
