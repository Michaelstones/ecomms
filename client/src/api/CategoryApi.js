import { useEffect, useState } from "react";
import axios from "axios";

const CategoryApi = () => {
  const [category, setCategory] = useState([]);
  const [cb, setCb] = useState(true);

  useEffect(() => {
    const getCat = async () => {
      const res = await axios.get(
        `https://ecommerceapiiii.herokuapp.com//api/v1/category`
      );
      //   console.log(res);
      setCategory(res.data.categories);
    };
    getCat();
  }, []);
  //   console.log(category);
  return {
    cat: [category, setCategory],
    call: [cb, setCb],
  };
};

export default CategoryApi;
