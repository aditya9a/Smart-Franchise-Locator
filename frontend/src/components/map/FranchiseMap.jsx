import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMap
} from "react-leaflet";
import { useEffect } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// Custom marker icon for franchises
const franchiseIcon = L.divIcon({
  className: "custom-marker",
  html: `
    <div style="
      background-color: #0f766e;
      width: 32px;
      height: 32px;
      border-radius: 50% 50% 50% 0;
      transform: rotate(-45deg);
      display: flex;
      align-items: center;
      justify-content: center;
      border: 2px solid white;
      box-shadow: 0 4px 6px rgba(0,0,0,0.3);
    ">
      <div style="
        transform: rotate(45deg);
        color: white;
        font-size: 14px;
      ">
        <i class="bi bi-shop"></i>
      </div>
    </div>
  `,
  iconSize: [32, 32],
  iconAnchor: [16, 32],
  popupAnchor: [0, -32]
});

// Custom marker for user location
const userIcon = L.divIcon({
  className: "user-marker",
  html: `
    <div style="position: relative; width: 20px; height: 20px;">
      <div style="
        background-color: #3b82f6;
        width: 100%;
        height: 100%;
        border-radius: 50%;
        border: 2px solid white;
        box-shadow: 0 0 10px rgba(59, 130, 246, 0.5);
        z-index: 2;
        position: relative;
      "></div>
      <div style="
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: #3b82f6;
        border-radius: 50%;
        animation: pulse 2s infinite;
        opacity: 0.5;
        z-index: 1;
      "></div>
    </div>
    <style>
      @keyframes pulse {
        0% { transform: scale(1); opacity: 0.5; }
        100% { transform: scale(3); opacity: 0; }
      }
    </style>
  `,
  iconSize: [20, 20],
  iconAnchor: [10, 10]
});

function AutoCenter({ location }) {
  const map = useMap();

  useEffect(() => {
    if (location) {
      map.flyTo([location.lat, location.lng], 13, { duration: 1.5 });
    }
  }, [location, map]);

  return null;
}

export default function FranchiseMap({
  opportunities,
  userLocation,
  selectedFranchise
}) {
  const filteredOpportunities = opportunities;

  return (
    <div style={{ height: "450px", width: "100%" }}>
      <MapContainer
        center={[22.9734, 78.6569]}
        zoom={5}
        style={{ height: "100%", width: "100%", borderRadius: "12px" }}
      >
        <TileLayer
          attribution="&copy; OpenStreetMap contributors"
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {/* Auto-center on selected franchise */}
        <AutoCenter location={selectedFranchise} />

        {/* User marker */}
        {userLocation && (
          <Marker position={[userLocation.lat, userLocation.lng]} icon={userIcon}>
            <Popup>Your Location</Popup>
          </Marker>
        )}

        {/* Franchise markers */}
        {filteredOpportunities
          .filter(item => item.lat != null && item.lng != null)
          .map((item) => (
          <Marker
            key={item._id || item.id}
            position={[item.lat, item.lng]}
            icon={franchiseIcon}
          >
            <Popup>
              <div style={{ padding: "5px" }}>
                <strong style={{ color: "#0f766e", fontSize: "16px" }}>{item.brand || item.name}</strong>
                <div style={{ marginTop: "5px" }}>
                  💰 Investment: <span className="fw-bold">₹{item.investment} L</span><br />
                  📐 Land: {item.land} sq ft<br />
                  📍 {item.city}
                </div>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}
