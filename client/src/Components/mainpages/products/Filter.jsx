import { useContext } from "react";
import { GlobalsState } from "../../../GlobalsState";

const Filter = () => {
  const state = useContext(GlobalsState);
  const [category] = state.CategoryApi.cat;

  const prod = state.products.prod;
  //   const product = prod[0].products;
  //   const setProduct = prod[1];
  const [sort, setSort] = state.products.sor;
  const [categor, setCategor] = state.products.cat;
  const [search, setSearch] = state.products.search;
  //   const [page, setPage] = useState(0);
  //   const [result, setResult] = useState();

  const handleCategory = (e) => {
    setCategor(e.target.value);
    setSearch("");
  };

  return (
    <div className="filter_menu">
      <div className="row">
        <span>Filters: </span>
        <select name="category" value={categor} onChange={handleCategory}>
          <option value="">All Products</option>
          {category.map((category) => (
            <option value={"category=" + category._id} key={category._id}>
              {category.name}
            </option>
          ))}
        </select>
      </div>

      <input
        type="text"
        value={search}
        placeholder="Enter your search!"
        onChange={(e) => setSearch(e.target.value.toLowerCase())}
      />

      <div className="row sort">
        <span>Sort By: </span>
        <select value={sort} onChange={(e) => setSort(e.target.value)}>
          <option value="">Newest</option>
          <option value="sort=oldest">Oldest</option>
          <option value="sort=-sold">Best sales</option>
          <option value="sort=-price">Price: Hight-Low</option>
          <option value="sort=price">Price: Low-Hight</option>
        </select>
      </div>
    </div>
  );
};

export default Filter;
