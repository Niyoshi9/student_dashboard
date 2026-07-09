import React,{useState} from "react";
import {supabase} from "./supabase";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password
    });
    if (error) {
      console.error("Error logging in:", error);
    }
    else {
      alert("Login Successful");
    }
  };
  const handleSignup = async () => {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
  });

  if (error) {
    alert(error.message);
    return;
  } 
    if (data.user) {
    await supabase
      .from("profiles")
      .insert({
        id: data.user.id,
        email: data.user.email,
      });
  
  
  
}


  
    alert("Signup successful! You can now login.");
  
};

  return (
    <>
        <div className="login-container">
           <div className="login-card">
                <h1>Student Dashboard</h1>
                <input 
                type="email"
                placeholder="Enter Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                />
                <input
                type="password"
                placeholder="Enter Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                />
                <button onClick={handleLogin}>Login</button>
                <button
                    className="signup-btn"
                    onClick={handleSignup}
                >
                  Sign Up
                </button>
           </div>
        </div>
    </>
  );
}