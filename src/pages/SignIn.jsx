import { useState } from "react";
import {Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { useAppContext } from "../context/AppContext";

const SignIn = () => {
  const { currentUser, error, loading, signInStart, signInSuccess, signInFailure } = useAppContext();

  const navigate = useNavigate();

  //function to handle form submission
const [formData, setFormData] = useState({});

// const [error, setError] = useState(null);
// const [loading, setLoading] = useState(false);  



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
        signInStart();

        // let's check form data
        if (!(formData.email && formData.password)) {
          toast.error("Please fill in all fields");
        
          
          return; // stop further execution if validation fails
        }


        const res = await fetch("/api/auth/signin", {
          method: "POST",
          headers: {    "Content-Type": "application/json" },
          body: JSON.stringify(formData)
        });
        const data = await res.json();
        if(data.success===false){
          signInFailure(data.message); 
          toast.error("Login failed: " + data.message);
          
          return
        }
        signInSuccess(data.user);
        navigate("/");
        
      } catch (error) {
        
        toast.error("Login Failed: " + error.message);
        signInFailure(error.message);
        toast.error("Login Failed Again: " + error.message);
      }
    
  }
  currentUser && console.log(currentUser);
  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl text-center font-semibold my-7">Sign In</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        
    
    <input onChange={handleChange} className="border p-3 rounded-lg" type="email" placeholder="email" id="email" />
    <input onChange={handleChange} className="border p-3 rounded-lg" type="password" placeholder="password" id="password" />
    <button className="bg-slate-700 text-white p-3 rounded-lg hover:opacity-90 uppercase" >Login</button>
      </form>
      <div className="flex gap-2 mt-5 justify-between">
        <p>Dont have an account?</p>
        <Link to="/sign-up">
          <span className="text-blue-700">Sign Up</span>
        </Link>
      </div>
      <ToastContainer />
    </div>
  )
}

export default SignIn;