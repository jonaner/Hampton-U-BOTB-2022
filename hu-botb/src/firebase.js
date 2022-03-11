import { initializeApp } from "firebase/app";
import {
    ​​  getFirestore,
    ​​  query,
    ​​  getDocs,
    ​​  collection,
    ​​  where,
    ​​  addDoc,
    ​​} from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAAzUy7SRbq69U3jw23PqwE3srSyuh9RLQ",
    authDomain: "hu-botb.firebaseapp.com",
    projectId: "hu-botb",
    storageBucket: "hu-botb.appspot.com",
    messagingSenderId: "809601251887",
    appId: "1:809601251887:web:f7cebc43c12e54c959a4da"
  };

  const app = ​​initializeApp(firebaseConfig);
  ​​const auth = getAuth(app);
  ​​const db = getFirestore(app);

  const loginEmailAndPassword = async (email,password) => {
      try {
        await signInWithEmailAndPassword(auth, email, password);
      } catch(err) {
        console.error(err);
        alert(err.message);
      }
  }

  const registerEmailAndPassword = async (name, email, password) => {
      try {
          const response = await createUserWithEmailAndPassword(auth, email, password);
          const user = response.user;
          const q = query(collection(db, "users"), where("uid", "==", user.uid));
          const docs = await getDocs(q);
          if (docs.docs.length === 0) {
            await addDoc(collection(db, "users"), {
                uid: user.uid,
                name,
                authProvider: "local",
                email,
            });
          }
      } catch {
        console.error(err);
        alert(err.message);
      }
  }

  const sendPasswordReset = async (email) => {
      try {
        await sendPasswordResetEmail(auth, email);
        alert("Password reset link sent!");
      } catch {
        console.error(err);
        alert(err.message);
      }
  }

  const logout = () => {
    signOut(auth);
  };

  export {
    auth,
    db,
    loginEmailAndPassword,
    registerEmailAndPassword,
    sendPasswordReset,
    logout,
  };