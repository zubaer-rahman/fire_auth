import './App.css';
import { initializeApp } from "firebase/app";
import { firebaseConfig } from './firebase.config';
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut } from 'firebase/auth';
import { useState } from 'react';

const app = initializeApp(firebaseConfig);

function App() {
  const provider = new GoogleAuthProvider ();
  const auth = getAuth();

  const [user, setUser] = useState({
    isSignedIn: false,
    name:'',
    email:'',
    img:''

  });

  const handleSignIn = () => {
    signInWithPopup(auth, provider)
    .then(res=> {
        const {displayName, email, photoURL} = res.user;
        const signedInUser = {
          isSignedIn: true,
          name: displayName,
          email: email,
          img: photoURL
        }
        setUser(signedInUser);
       })
  }
  const handleSignOut = () => {
    signOut(auth)
    .then(() => {
       const signedOutUser = {
         isSignedIn: false,
         name:'',
         email:'',
         img:''
       }
       setUser(signedOutUser)
    });
  }
  const handleSubmit = () => {

  }
  const handleBlur = (event) => {
     let isFormValid = true;
     event.target.name === "email"? isFormValid = /\S+@\S+\.\S+/.test(event.target.value) :  
     event.target.name === "password"? isFormValid = /(?=.*[0-9])/.test(event.target.value) :
                                       isFormValid = true;

    if  (isFormValid) {
      const newUserInfo = {...user};
      newUserInfo[event.target.name] = event.target.value;
      setUser(newUserInfo);
    }                                     
  }

  return (
    <div className='App'>
      {
        user.isSignedIn? <button onClick={handleSignOut}> Sign Out </button> : <button onClick={handleSignIn}>Sign In</button>
      }
      {
        user.isSignedIn && <div>
        <h4>{user.name}</h4>
        <p>{user.email}</p>
        <img src={user.img} alt="not found" />
      </div>
      }

      <h1> Our Own Authentication </h1>
      <p> name: {user.name} </p>
      <p> email: {user.email} </p>
      <p> password: {user.password} </p>
      <form onSubmit={handleSubmit}>
        <input type="text" onBlur={handleBlur} name='name' placeholder='your name' />
        <br />
        <input type="email" onBlur={handleBlur} name='email' placeholder='email' required />
        <br />
        <input type="password" onBlur={handleBlur} name='password' placeholder='password' required />
        <br />
        <input type="submit" value="Submit" />
      </form>
    </div>
  );
}

export default App;
