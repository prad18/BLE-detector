import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";

function App() {
  const [destination, setDestination] = useState("");
  const [userLocation, setUserLocation] = useState([19.0748, 72.8856]);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const zone = params.get("zone");
    if (zone) setDestination(zone);

    navigator.geolocation.getCurrentPosition((pos) => {
      setUserLocation([pos.coords.latitude, pos.coords.longitude]);
    });
  }, []);

  return (
    <div className="h-screen w-screen">
      <div className="absolute top-4 left-4 z-10 bg-white p-4 rounded shadow-xl w-[300px]">
        <h1 className="text-xl font-bold mb-2">Indoor Navigation</h1>
        <input
          type="text"
          placeholder="Enter destination"
          value={destination}
          onChange={(e) => setDestination(e.target.value)}
          className="w-full px-3 py-2 border rounded mb-2"
        />
        <button
          onClick={() => alert(`Navigate to ${destination}`)}
          className="w-full bg-blue-600 text-white px-3 py-2 rounded"
        >
          Navigate
        </button>
      </div>
      <MapContainer center={userLocation} zoom={18} style={{ height: "100%", width: "100%" }}>
        <TileLayer
          attribution='&copy; OpenStreetMap contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={userLocation}>
          <Popup>You are here</Popup>
        </Marker>
      </MapContainer>
    </div>
  );
}

export default App;
