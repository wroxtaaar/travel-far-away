import { useState } from "react";

const initialItems = [
  { id: 1, description: "Passports", quantity: 2, packed: true },
  { id: 2, description: "Socks", quantity: 12, packed: false },
  { id: 3, description: "Charger", quantity: 1, packed: false }
];

export default function App() {
  return (
    <div className="app">
      <Logo />
      <Form />
      <PackingList />
      <Stats />
    </div>
  );
}

function Logo() {
  return <h1>🌴 Far Away 👜</h1>;
}



function Form() {
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState(1);
  const arr = Array.from({ length: 20 }, (_, i) => i + 1);


  function handleSubmit(e) {
    e.preventDefault();

    if(!description) return;

    const newItem = {id: Date.now(), description, quantity, packed:false};
    initialItems.push(newItem);
    setDescription("");
    setQuantity(1);
    console.log(newItem);
    console.log(initialItems);

  }
  

  return (
    <form className="add-form" onSubmit={handleSubmit}>
      <h3>What do you need from your 😍 trip?</h3>
      <select value={quantity} onChange={(e) => {
          // console.log(e.target.value);
          setQuantity(e.target.value);
        }}>
        {arr.map((num) => (<option value={num} key={num}> {num} </option> ))}
      </select>
      <input
        type="text"
        placeholder="Items..."
        value={description}
        onChange={(e) => {
          // console.log(e.target);
          setDescription(e.target.value);
        }}
      />
      <button>Add</button>
    </form>
  );
}

function PackingList() {
  console.log(initialItems)

  return (
    <div className="list">
      <ul>
        {initialItems.map((item) => (
          <Item item={item} key={item.id} />
        ))}
      </ul>
    </div>
  );
}

function Item({ item }) {
  return (
    <li>
      <span style={item.packed ? { textDecoration: "line-through" } : {}}>
        {item.quantity} {item.description}
      </span>
      <button>❌</button>
    </li>
  );
}

function Stats() {
  return (
    <footer className="stats">
      <em>💼 You have X items on your list, and you already packed X (X%)</em>
    </footer>
  );
}
