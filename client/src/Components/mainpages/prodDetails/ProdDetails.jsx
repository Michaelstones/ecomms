import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { GlobalsState } from "../../../GlobalsState";
import ProductItem from "../utils/ProductItem";

const ProdDetails = () => {
  const state = useContext(GlobalsState);
  const [singleprod, setSingleProd] = useState([]);
  const [singleprod2, setSingleProd2] = useState([]);
  // const { products } = state.products.data;
  const prod = state.products.prod;
  const product = prod[0].products;
  const setProduct = prod[1];
  const { addToCart } = state?.userApi;
  const [updateId, setUpdateId] = useState("");
  // console.log(addToCart);
  let { id } = useParams();
  const token = state.token[0];

  const refresh = () => {
    setTimeout(() => {
      window.location.reload();
    }, 1500);
    // console.log("ji");
  };

  const allFunc = (singleprod2) => {
    addToCart(singleprod2);
    refresh();
  };

  useEffect(() => {
    if (id) {
      product?.forEach((element) => {
        if (element._id === id) {
          return setSingleProd(element);
        }
      });
    }
  }, [id, singleprod2, product]);

  useEffect(() => {
    if (id) {
      const prod = async () => {
        const nProd = await axios.get(`/api/v1/products/${id}`, {
          headers: { Authorization: token },
        });
        setSingleProd2(nProd.data.product);
      };
      prod();
    }
  }, [id, singleprod2]);

  if (singleprod.length === 0) return null;
  return (
    <>
      <div className="detail">
        <img src={singleprod2?.images?.url} alt="" />
        <div className="box-detail">
          <div className="row">
            <h2>{singleprod2[1]?.title}</h2>
            <h6>#id: {singleprod2?.product_id}</h6>
          </div>
          <span>$ {singleprod2?.price}</span>
          <p>{singleprod2?.description}</p>
          <p>{singleprod2?.content}</p>
          <p>Sold: {singleprod2?.sold}</p>
          <Link
            to="/cart"
            className="cart"
            onClick={() => allFunc(singleprod2)}
          >
            Buy Now
          </Link>
        </div>
      </div>

      <div>
        <h2>Related products</h2>
        <div className="products">
          {product.map((product) => {
            return product.category === singleprod.category ? (
              <ProductItem key={product._id} product={product} />
            ) : null;
          })}
        </div>
      </div>
    </>
  );
};

export default ProdDetails;
