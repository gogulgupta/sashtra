import { useRef } from "react";

export default function Location(){
  const frame = useRef();

  const loadMap = () => {
    if(!navigator.geolocation){
      alert("Location not supported");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      pos => {
        const { latitude, longitude } = pos.coords;
        frame.current.src =
          `https://www.google.com/maps?q=${latitude},${longitude}&z=16&output=embed`;
      },
      err => {
        alert("❌ Location permission denied");
      }
    );
  };

  const sendSMS = () => {
    navigator.geolocation.getCurrentPosition(pos=>{
      const { latitude, longitude } = pos.coords;
      const msg = `My location: https://maps.google.com/?q=${latitude},${longitude}`;
      window.location.href =
        `sms:8923484333?body=${encodeURIComponent(msg)}`;
    });
  };

  return (
    <>
      <h2>📍 Live Location</h2>

      {/* CLICK TO LOAD */}
      <button
        onClick={loadMap}
        style={{marginBottom:10,background:"#38bdf8"}}
      >
        📍 Load My Location
      </button>

      <iframe
        ref={frame}
        title="map"
        style={{width:"100%",height:"100%",border:0,borderRadius:"12px"}}
      />

      <button
        onClick={sendSMS}
        style={{marginTop:10,background:"#22c55e"}}
      >
        📩 Send Message
      </button>
    </>
  );
}
