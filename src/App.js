import React from "react";
import { useState, useEffect } from "react";
//import logo from './logo.svg';
///import NameChange from "./components/NameChange";
//import Counter from "./components/Counter";
import Item from "./components/Item";
import Header from "./components/Header";
import SearchItem from "./components/SearchItem";
import apiRequest from "./components/ApiRequest";
import AddList from "./components/AddList";
import Footer from "./components/Footer";
import "./App.css";

function App() {
  const API_URL = "http://localhost:5000/items";
  const [items, setItems] = useState([]);
  const [newItem, setNewItem] = useState("");
  const [search, setSearch] = useState("");
  const [fetchError, setFetchError] = useState(null);
  const [isLoading, setIsloading] = useState(true);

  useEffect(() => {
    //localStorage.setItem("shoppinglist", JSON.stringify(items));
    const fetchItems = async () => {
      try {
        const response = await fetch(API_URL);
        if (!response.ok) throw Error("Did not received expected data");
        const listItems = await response.json();
        setItems(listItems);
        setFetchError(null);
      } catch (err) {
        setFetchError(err.message);
      } finally {
        setIsloading(false);
      }
    };

    setTimeout(() => {
      (async () => await fetchItems())();
    }, 2000);
  }, []);

  const addItem = async (item) => {
    const id = Math.floor(Math.random() * 100) + 1;
    const myNewItem = { id, checked: false, item };
    const listItems = [...items, myNewItem];
    setItems(listItems);

    const postOptions = {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(myNewItem),
    };
    const result = apiRequest(API_URL, postOptions).json;
    if (result) setFetchError(result);
  };

  const handleChange = async (id) => {
    const listItems = items.map((item) =>
      item.id === id ? { ...item, checked: !item.checked } : item
    );
    setItems(listItems);

    const myItem = listItems.filter((item) => item.id === id);
    const upDateOptions = {
      method: "PATCH",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({ checked: myItem[0].checked }),
    };
    const reqUrl = `${API_URL}/${id}`;
    const result = await apiRequest(reqUrl, upDateOptions).json;
    if (result) setFetchError(result);
  };
  const handleDelete = async (id) => {
    const listItems = items.filter((item) => item.id !== id);
    setItems(listItems);

    const deleteOptions = {
      method: "DELETE",
    };
    const reqUrl = `${API_URL}/${id}`;
    const result = await apiRequest(reqUrl, deleteOptions).json;
    if (result) setFetchError(result);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!newItem) return;
    addItem(newItem);
    setNewItem("");
  };

  return (
    <div className="App">
      {/* <NameChange /> */}
      {/* <Counter /> */}
      <Header title="Zelle STORE" />

      <AddList
        newItem={newItem}
        setNewItem={setNewItem}
        handleSubmit={handleSubmit}
      />
      <SearchItem search={search} setSearch={setSearch} />
      <main>
        {isLoading && <p>Loading Items ...</p>}
        {fetchError && <p style={{ color: "red" }}>{`Error:${fetchError}`}</p>}
        {!fetchError && !isLoading && (
          <Item
            handleChange={handleChange}
            items={items.filter((item) =>
              item.item.toLowerCase().includes(search.toLowerCase())
            )}
            handleDelete={handleDelete}
          />
        )}
      </main>
      <Footer />
    </div>
  );
}

export default App;
