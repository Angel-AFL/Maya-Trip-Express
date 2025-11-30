import {
  MapContainer,
  TileLayer,
  Marker,
  Polyline,
  Popup,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

const trainIcon = new L.Icon({
  iconUrl: "https://cdn-icons-png.flaticon.com/512/684/684908.png",
  iconSize: [36, 36],
  iconAnchor: [18, 36],
});

const pinIcon = new L.Icon({
  iconUrl: "https://cdn-icons-png.flaticon.com/512/535/535137.png",
  iconSize: [38, 38],
  iconAnchor: [19, 38],
});

const origen = {
  name: "Mérida (MID)",
  position: [20.97, -89.62],
  tiempo: "4h 20m",
};

const destino = {
  name: "Cancún",
  position: [21.16, -86.851],
};

const ruta: [number, number][] = [
  origen.position,
  [21.05, -88.9],
  destino.position,
];

export default function MapTuristico() {
  return (
    <MapContainer
      center={[20.2, -89.0]}
      zoom={8}
      style={{ height: "100%", width: "100%" }}
    >
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

      <Marker position={origen.position} icon={trainIcon}>
        <Popup>
          <b>{origen.name}</b>
          <br />
          <span>{origen.tiempo}</span>
        </Popup>
      </Marker>

      <Marker position={destino.position} icon={pinIcon}>
        <Popup>
          <b>{destino.name}</b>
          <br />
          <a
            href="#"
            style={{
              color: "#d14a9c",
              fontWeight: "bold",
              textDecoration: "none",
            }}
          >
            Ver hoteles
          </a>
        </Popup>
      </Marker>

      <Polyline
        positions={ruta}
        color="#098652ff"
        weight={6}
        opacity={0.9}
        smoothFactor={2}
      />
    </MapContainer>
  );
}
