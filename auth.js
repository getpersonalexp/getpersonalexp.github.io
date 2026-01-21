import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

const firebaseConfig = {
  apiKey: "PASTE_API_KEY",
  authDomain: "PASTE_AUTH_DOMAIN",
  projectId: "PASTE_PROJECT_ID",
  appId: "PASTE_APP_ID"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

function validEmail(email){
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

window.checkEmail = () => {
  const email=document.getElementById("auth-email").value;
  const msg=document.getElementById("auth-msg");
  if(!validEmail(email)){
    msg.textContent="Enter a valid email first";
    msg.style.color="red";
    return;
  }
  document.getElementById("password-box").style.display="block";
};

window.login = async () => {
  const email=document.getElementById("auth-email").value;
  const password=document.getElementById("auth-password").value;
  const msg=document.getElementById("auth-msg");
  try{
    await signInWithEmailAndPassword(auth,email,password);
  }catch{
    msg.textContent="Invalid password";
    msg.style.color="red";
  }
};

window.signup = async () => {
  const email=document.getElementById("email").value;
  const password=document.getElementById("password").value;
  const msg=document.getElementById("msg");
  try{
    await createUserWithEmailAndPassword(auth,email,password);
    msg.textContent="Account created. You can log in.";
    msg.style.color="lime";
  }catch(e){
    msg.textContent=e.message;
    msg.style.color="red";
  }
};

window.logout = async () => {
  await signOut(auth);
  window.location.href="index.html";
};

onAuthStateChanged(auth,user=>{
  const path=window.location.pathname;
  if(user && path.endsWith("index.html")){
    window.location.href="home.html";
  }
  if(!user && path.endsWith("home.html")){
    window.location.href="index.html";
  }
});
