import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  Navigate,
} from "react-router-dom";
import Header from "./Header";
import Note from "./Note";
import UserProducts from "./UserProducts";
import SignIn from "./SignIn";
import SignUp from "./SignUp";
import DisplayProducts from "./DisplayProducts";
import DisplaySpecificProducts from "./displaySpecificProducts";
import Item from "./Item";
import AddProduct from "./AddProduct";
function App(){
const [isValid, setIsValid]=useState(false);
const [nameOfTheUser, setNameOfTheUser]=useState("");
const [email, setEmail]=useState("");
const [admin, setAdmin]=useState(false);
useEffect(()=>{
  if(email==="hasanatwi00@gmail.com")
    setAdmin(true);
  else
    setAdmin(false);
},[email]);
return (
<Router>
  <div>
    <Routes>
      <Route
        path="/addToCart"
        element={ <AddProduct />}
      />
      <Route  
        path="/"
        element={ <Note admin={admin} nameOfTheUser={nameOfTheUser} isValid={isValid} setIsValid={setIsValid} setNameOfTheUser={setNameOfTheUser} email={email}/> }
      />
      <Route
        path="/cart"
        element={ <UserProducts admin={admin} email={email} nameOfTheUser={nameOfTheUser}/>}
      />
      <Route
        path="/sign_up"
        element= { <SignUp isValid2={isValid} setIsValid2={setIsValid} setNameOfTheUser2={setNameOfTheUser} setEmail2={setEmail}/>}
      />
      <Route
        path="/sign_in"
        element= { <SignIn isValid2={isValid} setIsValid2={setIsValid} setNameOfTheUser2={setNameOfTheUser} setEmail2={setEmail}/>}
      />
      <Route
        path="/shop"
        element={ <DisplayProducts admin={admin} isValid={isValid} nameOfTheUser={nameOfTheUser} email={email}/>}
      />
      <Route
        path="/displaySpecificProducts/:title"
        element={ <DisplaySpecificProducts admin={admin} isValid={isValid} nameOfTheUser={nameOfTheUser} email={email}  />}
      />
      <Route
        path="/item/:name_of_the_category/:title"
        element={ <Item admin={admin} isValid={isValid} nameOfTheUser={nameOfTheUser} email={email}/>}
      />
    </Routes>
  </div>
</Router>
);
}
export default App;