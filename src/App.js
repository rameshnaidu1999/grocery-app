import React, { useState, useEffect } from "react";
import List from "./components/List";
import Alert from "./components/Alert";
import "bootstrap/dist/css/bootstrap.min.css";

const getLocalStorage = () => {
  let list = localStorage.getItem("groceryappList");
  if (list) {
    return JSON.parse(localStorage.getItem("groceryappList"));
  } else {
    return [];
  }
};

function App() {
  const [name, setName] = useState("");
  const [list, setList] = useState(getLocalStorage());
  const [isEditing, setIsEditing] = useState(false);
  const [editID, setEditID] = useState(null);
  const [alert, setAlert] = useState({ show: false, msg: "", type: "" });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("hello world");
    if (!name) {
      // display error
      setAlert({ show: true, msg: "please Enter item", type: "warning" });
    } else if (name && isEditing) {
      // deal with edit
      setList(
        list.map((item) => {
          if (item.id === editID) {
            return { ...item, title: name };
          }
          return item;
        })
      );
      setName("");
      setEditID(null);
      setIsEditing(false);
      showAlert(true, "success", "item updated");
    } else {
      // show alert
      showAlert(true, "success", "item added to List");
      const newItem = { id: new Date().getTime().toString(), title: name };
      setList([...list, newItem]);
      setName("");
    }
  };

  const showAlert = (show = false, type = "", msg = "") => {
    setAlert({ show, type, msg });
  };

  const clearList = () => {
    showAlert(true, "danger", "List deleted");
    setList([]);
  };

  const removeListItem = (id) => {
    showAlert(true, "danger", "Item Deleted");
    setList(list.filter((item) => item.id !== id));
  };

  const editItem = (id) => {
    const specificItem = list.find((item) => item.id === id);
    setIsEditing(true);
    setEditID(id);
    setName(specificItem.title);
  };

  useEffect(() => {
    localStorage.setItem("groceryappList", JSON.stringify(list));
  }, [list]);

  return (
    <div className="container-sm my-3">
      <h5 className="text-center text-success">Grocery List</h5>

      <div className="card mt-2 border-success">
        <form class="row g-3 mx-4 mt-2">
          {alert.show && (
            <Alert {...alert} removeAlert={showAlert} lits={list} />
          )}
          <div class="col-auto">
            <label for="inputPassword2" class="visually-hidden">
              Password
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              class="form-control"
              id="inputPassword2"
              placeholder="add items"
            />
          </div>
          <div class="col-auto">
            <button
              type="submit"
              class="btn btn-primary mb-3  value={name} "
              onClick={handleSubmit}
            >
              {isEditing ? "Edit to Cart" : "Submit to Cart"}
            </button>
          </div>
        </form>

        {list.length > 0 && (
          <>
            <List
              items={list}
              removeItem={removeListItem}
              editItem={editItem}
            />
            <button
              className="btn btn-outline-danger  mx-5 my-2"
              type="button"
              onClick={clearList}
            >
              {" "}
              clear all
            </button>
          </>
        )}
      </div>
    </div>
  );
}

export default App;
