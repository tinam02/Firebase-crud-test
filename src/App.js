import "./App.css";
import { useState, useEffect } from "react";
import { db } from "./firebase-config";
import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  doc,
  deleteDoc,
} from "firebase/firestore";
function App() {
  const [newName, setNewName] = useState(""); //form
  const [newAge, setNewAge] = useState(0);
  const [users, setUsers] = useState([]);
  const usersCollectionRef = collection(db, "users");

  const createUser = async () => {
    await addDoc(usersCollectionRef, { name: newName, age: Number(newAge) }); //takes in reference to collection and i objekat koji se dodaje
  };
  const updateUser = async (id, age) => {
    const userDoc = doc(db, "users", id); //knows which doc to update
    const newFields = { age: age + 1 };
    await updateDoc(userDoc, newFields);
  };
  const deleteUser = async (id) => {
    const userDoc = doc(db, "users", id); //knows which doc to update
    await deleteDoc(userDoc);
  };

  useEffect(() => {
    // when page renders
    const getUsers = async () => {
      const data = await getDocs(usersCollectionRef);
      setUsers(
        data.docs.map((doc) => ({
          //  vraca samo ime i godine
          ...doc.data(),
          id: doc.id,
        }))
      );
      console.log(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };
    getUsers();
  }, []);

  return (
    <div className="App">
      <input
        onChange={(e) => {
          setNewName(e.target.value);
        }}
        type="text"
        placeholder="ime. . ."
      />
      <input
        onChange={(e) => {
          setNewAge(e.target.value);
        }}
        type="number"
        placeholder="godine. . ."
      />

      <button onClick={createUser}>Create User</button>

      {users.map((user) => {
        return (
          <div key={user.id}>
            <h1>Name: {user.name}</h1>
            <h1>Age: {user.age}</h1>
            <small>id: {user.id}</small>
            <br></br>
            <small>{user.test ? "test: " + user.test : ""}</small>
            <br />
            <button
              onClick={() => {
                updateUser(user.id, user.age);
              }}
            >
              Increase age
            </button>
            <button
              onClick={() => {
                deleteUser(user.id);
              }}
            >
              Delete user
            </button>
            <hr />
          </div>
        );
      })}
    </div>
  );
}

export default App;
