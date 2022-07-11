import useFetch from "../Components/mainpages/utils/useFetch";
import { useState, useEffect } from "react";
const ProductsApi = () => {
  const [product, setProduct] = useState([]);
  const [callback, setCallback] = useState(false);
  const [sort, setSort] = useState("p");
  const [categor, setCategory] = useState("");
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(0);
  const [result, setResult] = useState(0);

  const { data, isLoading } = useFetch(
    `/api/v1/products?limi=${
      page * 9
    }&${categor}&${sort}&title[regex]=${search}`
  );
  console.log(data.result);
  useEffect(() => {
    setProduct(data);
    setResult(data.result);
  }, [data]);
  return {
    isLoading,
    data,
    prod: [product, setProduct],
    call: [callback, setCallback],
    sor: [sort, setSort],
    cat: [categor, setCategory],
    search: [search, setSearch],
    page: [page, setPage],
    resul: [result, setResult],
  };
};

export default ProductsApi;
