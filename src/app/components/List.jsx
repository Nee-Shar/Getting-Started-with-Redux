"use client";
import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { addtoList } from "../Features/Lister/listSlice";
import { useSelector } from "react-redux";
import {
  removeFromList,
  updateList,
  addFromAPI,
} from "../Features/Lister/listSlice";

function List() {
  const [nameV, setName] = useState("");
  const [catV, setCat] = useState("");
  const [Id, setId] = useState(null);

  const dispatch = useDispatch();

  const Lists = useSelector((state) => state.Lists);

  function addToListHandler(e) {
    e.preventDefault();

    //Dispatch uses Reducers to update the state
    dispatch(addtoList({ Name: nameV, category: catV }));

    setName("");
    setCat("");
  }

  async function addDataFromApi() {
    fetch("https://randomuser.me/api/")
      .then((res) => res.json())
      .then((data) => {
        const Name =
          data.results[0].name.first + " " + data.results[0].name.last;
        const Category = data.results[0].gender;
        dispatch(addFromAPI({ Name: Name, category: Category }));
      });

    dispatch(addFromAPI());
  }
  function editEntryHandler(e) {
    e.preventDefault();
    dispatch(updateList({ id: Id, Name: nameV, category: catV }));
    setName("");
    setId(null);
    setCat("");
  }

  return (
    <div className="mt-[5rem]">
      <div class=" m-4 grid sm:grid-cols-12 gap-4">
        <div className="sm:col-span-2 col-span-1 sm:block hidden"></div>
        <div className="sm:col-span-8 bg-black-200 sm:mx-auto mx-auto sm:text-3xl  text-center text-2xl">
          Friend list
          <button
            className="btn m-4"
            onClick={() => document.getElementById("my_modal_5").showModal()}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-3 w-3"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
              />
            </svg>
            Add Custom
          </button>
          <button
            className="btn btn-outline btn-warning m-2"
            onClick={addDataFromApi}
          >
            Add Random
          </button>
          <dialog
            id="my_modal_5"
            className="modal modal-middle sm:modal-middle"
          >
            <div className="modal-box">
              <h3 className="font-bold text-lg">Add Another Entry</h3>
              <p className="py-4">
                <form onSubmit={addToListHandler}>
                  <label className="input input-bordered flex items-center gap-2">
                    Name
                    <input
                      type="text"
                      className="grow"
                      placeholder="Name"
                      value={nameV}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </label>
                  <label className="input input-bordered flex items-center gap-2">
                    Gender
                    <input
                      type="text"
                      className="grow"
                      placeholder="Male/Female"
                      value={catV}
                      onChange={(e) => setCat(e.target.value)}
                    />
                  </label>
                  <button className="btn btn-info m-4" type="submit">
                    Add
                  </button>
                </form>
              </p>
              <div className="modal-action">
                <form method="dialog">
                  <button className="btn">Close</button>
                </form>
              </div>
            </div>
          </dialog>
          {/* Edit Dialog */}
          <dialog
            id="my_modal_4"
            className="modal modal-middle sm:modal-middle"
          >
            <div className="modal-box">
              <h3 className="font-bold text-lg">Edit Entry</h3>
              <p className="py-4">
                <form onSubmit={editEntryHandler}>
                  <label className="input input-bordered  items-center gap-2 sm:hidden hidden ">
                    Id
                    <input
                      type="text"
                      className="grow "
                      placeholder="Name"
                      value={Id}
                      onChange={(e) => setName(e.target.value)}
                      disabled={true}
                    />
                  </label>
                  <label className="input input-bordered flex items-center gap-2">
                    Name
                    <input
                      type="text"
                      className="grow"
                      placeholder="Name"
                      value={nameV}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </label>
                  <label className="input input-bordered flex items-center gap-2">
                    Gender
                    <input
                      type="text"
                      className="grow"
                      placeholder="Cat"
                      value={catV}
                      onChange={(e) => setCat(e.target.value)}
                    />
                  </label>
                  <button className="btn btn-info m-4" type="submit">
                    Edit
                  </button>
                </form>
              </p>
              <div className="modal-action">
                <form method="dialog">
                  <button className="btn">Close</button>
                </form>
              </div>
            </div>
          </dialog>
          <br />
          <ul className="menu  grid sm:grid-cols-12 gap-4 menu-horizontal bg-base-300  m-4 sm:text-1xl">
            {Lists.map((l) => (
              <li
                key={l.id}
                className="sm:col-span-6  md:col-span-4 col-span-1 m-4 sm:text-1xl sm:border-r-2 sm:border-info "
              >
                <a>
                  Name : {l.Name} <br /> Gender: {l.category}
                </a>

                <div className="grid">
                  <button
                    className="btn btn-circle"
                    onClick={() => dispatch(removeFromList({ id: l.id }))}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-3 w-3 animate-pulse"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                  <button
                    className="btn btn-circle"
                    onClick={() => {
                      document.getElementById("my_modal_4").showModal();
                      setName(l.Name);
                      setCat(l.category);
                      setId(l.id);
                    }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      className="bi bi-pencil-fill animate-pulse"
                      viewBox="0 0 16 16"
                    >
                      <path d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.5.5 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11z" />
                    </svg>
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>

        <div className="sm:col-span-2 col-span-1 sm:block hidden"></div>
      </div>
    </div>
  );
}

export default List;
