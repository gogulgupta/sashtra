import { useEffect, useState } from "react";

const TOKEN="Fy9DrMSPlw60Kq42yxmO-5CBU0iqRfKN";
const VPIN={ RELAY:"V1", BUZZER:"V2", STEP:"V4", TEMP:"V6" };

export default function Home({user}) {
  const [steps,setSteps]=useState(0);
  const [temp,setTemp]=useState("--");
  const [relay,setRelay]=useState(0);
  const [buzzer,setBuzzer]=useState(0);
  const [toast,setToast]=useState(false);

  const apiGet=(pin,cb)=>{
    fetch(`https://blynk.cloud/external/api/get?token=${TOKEN}&${pin}`)
    .then(r=>r.text()).then(d=>cb(Number(d)));
  }
  const apiSet=(pin,val)=>{
    fetch(`https://blynk.cloud/external/api/update?token=${TOKEN}&${pin}=${val}`);
  }

  const refresh=()=>{
    apiGet(VPIN.STEP,d=>setSteps(d));
    apiGet(VPIN.TEMP,c=>{
      let f=(c*9/5)+32;
      setTemp(f.toFixed(1));
    });
    apiGet(VPIN.RELAY,d=>setRelay(d));
    apiGet(VPIN.BUZZER,d=>setBuzzer(d));
  };

  useEffect(()=>{
    refresh();
    const t=setInterval(refresh,2000);
    return ()=>clearInterval(t);
  },[]);

  const triggerRelay=()=>{
    setRelay(1); apiSet(VPIN.RELAY,1); setToast(true);
    setTimeout(()=>{
      setRelay(0); apiSet(VPIN.RELAY,0); setToast(false);
    },5000);
  };

  const toggleBuzzer=()=>{
    const v=buzzer?0:1;
    setBuzzer(v); apiSet(VPIN.BUZZER,v);
  };

  return (
    <>
      <div className="header">
        <h2>Hybrid Smart Shoes</h2>
        <div className="user-name">{user && "Welcome, "+(user.displayName||user.email)}</div>
        <div className="goal">87%</div>
        <div className="sub">Daily Goal</div>
      </div>

      <div className="model-wrap">
        <div className="model-card" onClick={triggerRelay}>
          <model-viewer
            src="https://modelviewer.dev/shared-assets/models/Astronaut.glb"
            camera-controls>
          </model-viewer>
        </div>
      </div>

      {toast && <div className="toast">⚡ RELAY ON (5s)</div>}

      <div className="grid">
        <div className="card">
          <div className="label">Temperature</div>
          <div className="value">{temp} °F</div>
        </div>
        <div className="card">
          <div className="label">Steps</div>
          <div className="value">{steps}</div>
        </div>

        <div className="card full">
          <div className="label">Relay Control</div>
          <div className={`switch ${relay?"on":""}`} onClick={triggerRelay}></div>
        </div>

        <div className="card full">
          <div className="label">Blink / Buzzer</div>
          <div className={`switch ${buzzer?"on":""}`} onClick={toggleBuzzer}></div>
        </div>
      </div>
    </>
  );
}
