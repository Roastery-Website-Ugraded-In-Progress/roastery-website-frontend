import React from "react";
import Header from "./Header";
import { Link } from "react-router-dom";
function Note({ admin, isValid, nameOfTheUser, setIsValid, setNameOfTheUser, email}){
  console.log("Boolean admin: "+admin);
  const backgroundImage="https://lkxdeoexdxrizzkblvac.supabase.co/storage/v1/object/public/product-images/coffee%20and%20beans.png";
  return(
    <div>
      <Header isValid={isValid} nameOfTheUser={nameOfTheUser} setIsValid={setIsValid} setNameOfTheUser={setNameOfTheUser} email={email}/>
      <div style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: "1800px 600px",
        width: "100%",
        height:"600px",
        backgroundRepeat: "no-repeat",
        display:"flex",
        flexDirection:"column",
      }}>
        <div className="noteContent">
          
          <p>FRESHLY ROASTED<br/>
            COFFEE</p>
            <p style={{
              fontSize:"30px",
            }}>
              Discover the flavor of our freshly roasted coffee.<br/>
              Each batch is carefully crafted to ensure<br/>
              the highest quality.<br/>
            </p>
          <Link to="/shop"><button>SHOP NOW</button></Link>
        </div>
      </div>
        <div className="aboutContactUs">
            <p id="about" style={{
              fontSize:"45px",
              fontWeight:"bold",
            }}>About Golden Nuts</p>
            <p>Welcome to Golden Bean Roastery! We are a small, family-owned coffee roastery<br/>
              dedicated to sourcing and roasting the highest quality coffee beans. Our passion<br/>
              for coffee is reflected in every cup</p>
            <p id="contactUs" style={{
              fontSize:"35px",
              fontWeight:"bold",
            }}>
              Contact Us
            </p>
            <p>25/810677<br/>+961 78933282</p>
        </div>
    </div>
  );
}
export default Note;