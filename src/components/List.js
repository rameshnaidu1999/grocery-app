import React, { useState, useEffect } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";

function List({ items, removeItem, editItem }) {
  return (
    <div className="container">
      <h5 className="text-center">List</h5>
      {items.map((item) => {
        const { id, title } = item;
        return (
          <article key={id}>
            <div class="d-flex w-100 justify-content-between">
              <h5 class="mb-1">{title}</h5>
              <small>
                {" "}
                <button type="button" onClick={() => editItem(id)}>
                  {" "}
                  <FaEdit />{" "}
                </button>{" "}
              </small>
              <small>
                {" "}
                <button type="button" onClick={() => removeItem(id)}>
                  {" "}
                  <FaTrash />{" "}
                </button>{" "}
              </small>
            </div>
          </article>
        );
      })}
    </div>
  );
}

export default List;
