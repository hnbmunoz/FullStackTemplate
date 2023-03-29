import React, { useState } from "react";
import { AiFillEyeInvisible, AiFillEye } from "react-icons/ai";

const SignIn = () => {
  const [showPassword, setShowPassword] = useState(false);

  const eyeClick = (e: any) => {
    setShowPassword(!showPassword);
    e.preventDefault();
  };

  return (
    <>
      <form action="/authentications/signIn" className="auth-form" method="post">
        <div>Log In</div>
        <input name="username_email" placeholder="Username/Email" type="text" className="auth-input"/>
        <div>
          <input name="password" placeholder="Password" type={showPassword ? "text" : "password"} className="auth-input"/>
          <button className="eye-button" onClick={eyeClick}>
            {!showPassword ? (
              <AiFillEyeInvisible color="808080" />
            ) : (
              <AiFillEye color="dc143c" />
            )}
          </button>
        </div>
        <button className="auth-btn">Log In</button>
      </form>
    </>
  );
};

const SignUp = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const eyeClick = (e: any) => {
    setShowPassword(!showPassword);
    e.preventDefault();
  };

  const eyeConfirmClick = (e: any) => {
    setShowConfirmPassword(!showConfirmPassword);
    e.preventDefault();
  };

  const handleRegister = () => {

  }

  return (
    <>
      <div className="warning">

      </div>
      <form action="/authentications/signUp" className="auth-form" method="post">
        <div>Create New User Account</div>      
        <input name="first_name" placeholder="First Name" type="text" className="auth-input"/>      
        <input name="last_name" placeholder="LastName" type="text" className="auth-input"/>    
        <input name="username" placeholder="Username" type="text" className="auth-input"/>
        <input name="email" placeholder="Email" type="email" className="auth-input"/>
        <div>
          <input name="password" placeholder="Password" type={showPassword ? "text" : "password"} className="auth-input"/>
          <button className="eye-button" onClick={eyeClick}>
            {!showPassword ? (
              <AiFillEyeInvisible color="808080" />
            ) : (
              <AiFillEye color="dc143c" />
            )}
          </button>
        </div>
        <div>
          <input name="confirm_password" placeholder="Confirm Password" type={showConfirmPassword ? "text" : "password"} className="auth-input"/>
          <button className="eye-button" onClick={eyeConfirmClick}>
            {!showConfirmPassword ? (
              <AiFillEyeInvisible color="808080" />
            ) : (
              <AiFillEye color="dc143c" />
            )}
          </button>
        </div>
        <div></div>
        <button className="auth-btn" onClick={handleRegister}>Register</button>
      </form>
    </>
  );
};

const Authentication = () => {
  const [register, setRegister] = useState(false);
  const handleButton = () => {
    setRegister(!register);
  };
  return (
    <div style={{display: "flex", flexDirection: "column", width: "fit-content"}}>

      <div className="authentication-modal">
        {register ? <SignUp /> : <SignIn />}       
      </div>
      <button className="auth-state" onClick={handleButton}>{register ? "Already have an account? Sign In" :"New User? Sign Up"} </button>
    </div>
  );
};

export default Authentication;
