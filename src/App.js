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
    </div>
  );
}

export default App;
