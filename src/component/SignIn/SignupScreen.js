import React from 'react'
import "./SignupScreen.css"
import { useRef } from 'react';
import { auth,db} from '../../firebase';

import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { setDoc, doc } from "firebase/firestore"; 

function SignupScreen() {
    const emailRef = useRef(null);
    const passwordRef = useRef(null);
  

    // const auth = getAuth();
   
   const register = (e) => {
     e.preventDefault();
     createUserWithEmailAndPassword(
       auth,
       emailRef.current.value,
       passwordRef.current.value
     )
       .then((authUser) => {
         // After successfully creating the user, add an empty list to Firestore
          // const userEmail = emailRef.current.value;
        writeData(authUser.user.email);
         
       })
       .catch((error) => alert(error.message));
       
   };
    const signIn =(e)=>{
        e.preventDefault();
      signInWithEmailAndPassword(
        auth,
        emailRef.current.value,
        passwordRef.current.value
       ).then((authUser)=>{
       }).catch((error)=>(
        alert(error.message)
       ))
    }

    
    const writeData = async (email) => {
      await setDoc(doc(db, "user",email), {
        savedShows: [],
      });
    };
  return (
    <div className="signupScreen">
      <form action="">
        <h1>Sign In</h1>
        <input ref = {emailRef} type="email" placeholder="use test@test.com" />
        <input ref = {passwordRef} type="password" placeholder="Password" />
        <button type="submit" onClick={signIn}> Sign In</button>
        <h4>
          <span className="signupScreen__gray">New to Netflix ? </span>

          <span className='signupScreen__link ' onClick={register}>Sign Up now.</span>
        </h4>
      </form>
    </div>
  );
}

export default SignupScreen;