import { useContext, useState } from "react";
import { GlobalsState } from "./../../../GlobalsState";
import axios from "axios";

const Category = () => {
  const state = useContext(GlobalsState);
  const { cat } = state.CategoryApi;
  const call = state.CategoryApi.call;
  const cb = call[0];
  const setCB = call[1];
  const token = state.token;
  const toke = token[0];
  const category = cat[0];
  // const setCategory = cat[1];
  const [categories, setCategories] = useState("");
  const [onEdit, setOnEdit] = useState(false);
  const [Id, setID] = useState("");

  let createCategory = async (e) => {
    e.preventDefault();

    try {
      if (onEdit) {
        const resp = await axios.put(
          `/api/v1/category/${Id}`,
          { name: categories },
          {
            headers: { Authorization: toke },
          }
        );
        alert(resp.data.msg);
      } else {
        const resp = await axios.post(
          "/api/v1/category",
          { name: categories },
          {
            headers: { Authorization: toke },
          }
        );
        alert(resp.data.msg);
      }
      //   setCB((prev) => !prev);
      //   window.location.reload(true);
      setCategories("");
    } catch (error) {
      alert(error.response.data.msg);
    }
  };

  const deleteCategory = async (id) => {
    try {
      const res = await axios.delete(`/api/v1/category/${id}`, {
        headers: { Authorization: toke },
      });
      alert(res.data.msg);
      setCB(!cb);
    } catch (err) {
      alert(err.response.data.msg);
    }
  };

  const editCategory = async (id, name) => {
    setID(id);
    setCategories(name);
    setOnEdit(true);
  };

  return (
    <div className="categories">
      <form onSubmit={createCategory}>
        <label htmlFor="category">Category</label>
        <input
          type="text"
          name="category"
          value={categories}
          required
          onChange={(e) => setCategories(e.target.value)}
        />

        <button type="submit">{onEdit ? "Update" : "Create"}</button>
      </form>

      <div className="col">
        {category.map((category) => (
          <div className="row" key={category._id}>
            <p>{category.name}</p>
            <div>
              <button onClick={() => editCategory(category._id, category.name)}>
                Edit
              </button>
              <button onClick={() => deleteCategory(category._id)}>
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Category;
