import { useState } from "react";

export default function Decrypt(){
  const [enc,setEnc]=useState("");
  const [key,setKey]=useState("");
  const [out,setOut]=useState("");

  const decrypt=async()=>{
    try{
      const data=Uint8Array.from(atob(enc),c=>c.charCodeAt(0));
      const keyBuf=new TextEncoder().encode(key).slice(0,16);
      const k=await crypto.subtle.importKey("raw",keyBuf,{name:"AES-CBC"},false,["decrypt"]);
      const iv=new Uint8Array(16);
      const res=await crypto.subtle.decrypt({name:"AES-CBC",iv},k,data);
      setOut(new TextDecoder().decode(res));
    }catch{
      setOut("❌ Decryption failed");
    }
  };

  return (
    <>
      <h2>🔐 AES Decryption</h2>
      <textarea onChange={e=>setEnc(e.target.value)} placeholder="Encrypted text"/>
      <input type="password" onChange={e=>setKey(e.target.value)} placeholder="Secret key"/>
      <button onClick={decrypt}>Decrypt</button>
      <div className="msg">{out}</div>
    </>
  );
}
