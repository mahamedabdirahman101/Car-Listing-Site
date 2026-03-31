import { useState } from "react";
import {Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

const SignUp = () => {
  const navigate = useNavigate();

  //function to handle form submission
const [formData, setFormData] = useState({});

const [error, setError] = useState(null);
const [loading, setLoading] = useState(false);  



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
        setLoading(true);
        setError(null);

        // let's check form data
        if (!(formData.username && formData.email && formData.password)) {
          toast.error("Please fill in all fields");
          setLoading(false);
          return; // stop further execution if validation fails
        }


        const res = await fetch("/api/auth/signup", {
          method: "POST",
          headers: {    "Content-Type": "application/json" },
          body: JSON.stringify(formData)
        });
        const data = await res.json();
        if(data.success===false){
          setError(data.message);
          toast.error("Registration failed: " + data.message);
          setLoading(false);
          return
        }
        navigate("/sign-in");
        
      } catch (error) {
        setError(error.message);
        toast.error("Registration Failed: " + error.message);
        setLoading(false);
        toast.error("Registration Failed Again: " + error.message);
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
      <ToastContainer />
    </div>
  )
}

export default SignUp;