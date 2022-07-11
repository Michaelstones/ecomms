import { useContext } from "react";
import { GlobalsState } from "../../../GlobalsState";

const LoadMore = () => {
  const state = useContext(GlobalsState);
  const [result, setResult] = state.products.resul;
  const [page, setPage] = state.products.page;

  return (
    <div className="load_more">
      {result > page * 9 ? (
        ""
      ) : (
        <button onClick={() => setPage((page) => page + 1)}>LoadMore</button>
      )}
    </div>
  );
};

export default LoadMore;
