import { useEffect, useState } from "react";
import Map, { Marker, NavigationControl } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";

const MAPBOX_TOKEN = "YOUR_MAPBOX_ACCESS_TOKEN"; // Replace with your Mapbox token

function App() {
  const [viewport, setViewport] = useState({
    latitude: 19.0748,
    longitude: 72.8856,
    zoom: 18,
  });

  const [destination, setDestination] = useState("");
  const [userLocation, setUserLocation] = useState(null);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((pos) => {
      setUserLocation({
        latitude: pos.coords.latitude,
        longitude: pos.coords.longitude,
      });
    });
  }, []);

  const handleNavigate = () => {
    alert(`Navigation to ${destination} (Demo Only)`);
  };

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
          onClick={handleNavigate}
          className="w-full bg-blue-600 text-white px-3 py-2 rounded"
        >
          Navigate
        </button>
      </div>
      <Map
        mapboxAccessToken={MAPBOX_TOKEN}
        initialViewState={viewport}
        style={{ width: "100%", height: "100%" }}
        mapStyle="mapbox://styles/mapbox/streets-v11"
      >
        {userLocation && (
          <Marker
            latitude={userLocation.latitude}
            longitude={userLocation.longitude}
            color="red"
          />
        )}
        <NavigationControl position="top-right" />
      </Map>
    </div>
  );
}

export default App;