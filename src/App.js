import { useState } from "react";

const initialItems = [
  { id: 1, description: "Passports", quantity: 2, packed: false },
  { id: 2, description: "Socks", quantity: 12, packed: false },
  { id: 3, description: "Charger", quantity: 1, packed: false }
];

export default function App() {
  const [items, setItems] = useState(initialItems);

  function handleNewItem(newItem) {
    setItems([...items, newItem]);
    // setItems([...initialItems, newItem]);
  }

  function handleDeleteItems(id) {
    setItems(items.filter((item) => item.id !== id));
  }

  function handleCheckedItems(id) {
    setItems(
      items.map((item) =>
        item.id === id ? { ...item, packed: !item.packed } : item
      )
    );
  }

  return (
    <div className="app">
      <Logo />
      <Form onAddItems={handleNewItem} />
      <PackingList
        items={items}
        onDeleteItem={handleDeleteItems}
        onCheckedItem={handleCheckedItems}
      />
        <Stats items = {items}/>
    </div>
  );
}

function Logo() {
  return <h1>🌴 Far Away 👜</h1>;
}

function Form({ onAddItems }) {
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState(1);
  // const [items, setItems] = useState([]);

  const arr = Array.from({ length: 20 }, (_, i) => i + 1);

  function handleSubmit(e) {
    e.preventDefault();
    // console.log(items);

    if (!description) return;

    const newItem = { id: Date.now(), description, quantity, packed: false };
    onAddItems(newItem);
    // items.push(newItem);

    setDescription("");
    setQuantity(1);
  }

  return (
    <form className="add-form" onSubmit={handleSubmit}>
      <h3>What do you need from your 😍 trip?</h3>
      <select
        value={quantity}
        onChange={(e) => {
          // console.log(e.target.value);
          setQuantity(e.target.value);
        }}
      >
        {arr.map((num) => (
          <option value={num} key={num}>          
            {num}
          </option>
        ))}
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

function PackingList({ items, onDeleteItem, onCheckedItem }) {
  // console.log(initialItems)

  const arr = [...items];

  return (
    <div className="list">
      <ul>
        {arr.map((item) => (
          <Item
            item={item}
            key={item.id}
            onDeleteItem={onDeleteItem}
            onCheckedItem={onCheckedItem}
          />
        ))}
      </ul>
    </div>
  );
}

function Item({ item, onDeleteItem, onCheckedItem }) {
  return (
    <li>
      <input
        type="checkbox"
        value={item.packed}
        onChange={() => onCheckedItem(item.id)}
      />
      <span style={item.packed ? { textDecoration: "line-through" } : {}}>
        {item.quantity} {item.description}
      </span>
      <button onClick={() => onDeleteItem(item.id)}>❌</button>
    </li>
  );
}

function Stats({items}) {

    if(!items.length) 
      return (
        <footer className="stats"> 
        
        <em>Start adding somme items to your list</em>
        </footer>
      );

  const numItems = items.length;
  const numPacked = items.filter((item) => item.packed).length;
  const packedPercent = Math.round(numPacked/numItems * 100) ;

  return (
    <footer className="stats">
      
      {/* { packedPercent === 100 ? <em>You have packed everything</em> : 
        <em>💼 You have {numItems} items on your list, and you already packed {numPacked} ({packedPercent}%)</em>
        } */}

    <em>
      { packedPercent === 100 ? 
      "You have packed everything": 
       `💼 You have ${numItems} items on your list, and you already packed ${numPacked} (${packedPercent}%)`
       }
      </em>
        
    </footer>
  );
}
