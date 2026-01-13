export default function Login({setUser,setPanel}){

  const firebaseConfig={
    apiKey:"AIzaSyDJGImQAhi5Iot4e9VbYabRCUH69E5qiH0",
    authDomain:"sasthra-6767c.firebaseapp.com",
    projectId:"sasthra-6767c",
    messagingSenderId:"840242086368",
    appId:"1:840242086368:web:86ef2c82e61a2ff58ceb85"
  };

  if(!window.firebase.apps.length){
    window.firebase.initializeApp(firebaseConfig);
  }
  const auth=window.firebase.auth();

  const loginEmail=()=>{
    const e=document.getElementById("email").value;
    const p=document.getElementById("password").value;
    auth.signInWithEmailAndPassword(e,p)
      .then(r=>{setUser(r.user);setPanel("home");})
      .catch(err=>alert(err.message));
  };

  const loginGoogle=()=>{
    const p=new window.firebase.auth.GoogleAuthProvider();
    auth.signInWithPopup(p)
      .then(r=>{setUser(r.user);setPanel("home");})
      .catch(err=>alert(err.message));
  };

  return (
    <>
      <h2>👤 Login</h2>
      <input id="email" type="email" placeholder="Email"/>
      <input id="password" type="password" placeholder="Password"/>
      <button onClick={loginEmail}>Login with Email</button>
      <button onClick={loginGoogle}>Login with Google</button>
    </>
  );
}
