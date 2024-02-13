import {Link} from "react-router-dom";
import React from 'react'

const  Public = () => {
  return (
   <section className="public">
   <header>
       <h1>Welcome to <span className="nowrap">Vishal G. Traders!</span></h1>
   </header>
   <main className="public__main">
       <p>Located in Beautiful Downtown Dharashiv City,
         Vishal G. Traders provides a trained staff ready to built your Home and Materials which required for the construction.</p>
       <address className="public__addr">
           Vishal G. Traders<br />
           Sanja chouke<br />
           Dharashiv City, Pin code 413508<br />
           <a href="tel:9767176108">(+91) 9767176108</a>
       </address>
       <br />
       <p>Owner: Vishal V. Giri</p>
   </main>
   <footer>
       <Link to="/login">Labor Login</Link>
   </footer>
</section>
  )
}

export default Public;
