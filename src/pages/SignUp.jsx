import { useState } from "react";
import {Link } from "react-router-dom";

const SignUp = () => {

  //function to handle form submission
const [formData, setFormData] = useState({});

// function to manage changes of the input elements
const handleChange = (e) => {  
    setFormData({
      ...formData, 
      [e.target.id]: e.target.value 
    })
  }

  console.log(formData);

  const handleSubmit = async (e) => {
   
    e.preventDefault();
      try { 
        const res = await fetch("/api/auth/signup", {
          method: "POST",
          headers: {    "Content-Type": "application/json" },
          body: JSON.stringify(formData)
        });
        const data = await res.json();
        if(data.success===false){
          return
        }
        console.log(data);
      } catch (error) {
        console.log(error);
      }
    
  }
  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl text-center font-semibold my-7">Sign Up</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        
    <input onChange={handleChange} className="border p-3 rounded-lg" type="text" placeholder="username" id="username" />
    <input onChange={handleChange} className="border p-3 rounded-lg" type="email" placeholder="email" id="email" />
    <input onChange={handleChange} className="border p-3 rounded-lg" type="password" placeholder="password" id="password" />
    <button className="bg-slate-700 text-white p-3 rounded-lg hover:opacity-90 uppercase" >Sign Up</button>
      </form>
      <div className="flex gap-2 mt-5 justify-between">
        <p>Have an account?</p>
        <Link to="/sign-in">
          <span className="text-blue-700">Sign In</span>
        </Link>
      </div>
    </div>
  )
}

export default SignUp;