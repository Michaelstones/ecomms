import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { GlobalsState } from "../../../GlobalsState";

function BtnRender({ product, isiAdmin, deleteProduct }) {
  const state = useContext(GlobalsState);
  const [disab, setDisab] = useState(false);
  const { addToCart } = state?.userApi;
  return (
    <div className="row_btn">
      {isiAdmin ? (
        <>
          <Link
            id="btn_buy"
            to="#!"
            onClick={() =>
              deleteProduct(product?._id, product?.images?.public_id)
            }
          >
            Delete
          </Link>
          <Link id="btn_view" to={`/edit_product/${product?._id}`}>
            Edit
          </Link>
        </>
      ) : (
        <>
          <Link id="btn_buy" to="#!" onClick={() => addToCart(product)}>
            <button
              style={{
                all: "inherit",
                textAlign: "center",
                display: "inline-block",
              }}
              onClick={() => setDisab(true)}
              disabled={disab}
            >
              Buy
            </button>
          </Link>

          <Link id="btn_view" to={`detail/${product?._id}`}>
            <button
              style={{
                all: "inherit",
                textAlign: "center",
                display: "inline-block",
              }}
            >
              View
            </button>
          </Link>
        </>
      )}
    </div>
  );
}

export default BtnRender;
