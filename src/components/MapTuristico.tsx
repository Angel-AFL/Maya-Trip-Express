import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import { useEffect, useState } from "react";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// Ícono turístico pequeño
const culturalIcon = new L.Icon({
  iconUrl: "https://cdn-icons-png.flaticon.com/512/854/854878.png",
  iconSize: [26, 26],
  iconAnchor: [13, 26],
});

// 💠 LISTA COMPLETA DE 12 LUGARES (3 por zona)
const lugaresRotativos = [
  {
    zona: "Chichén Itzá",
    items: [
      {
        name: "Chichén Itzá",
        coords: [20.6843, -88.5678],
        wiki: "Chichen_Itza",
      },
      {
        name: "Cenote Ik Kil",
        coords: [20.6749, -88.5686],
        wiki: "Cenote_Ik_Kil",
      },
      {
        name: "Kukulcán Pyramid",
        coords: [20.6843, -88.5678],
        wiki: "El_Castillo",
      },
    ],
  },
  {
    zona: "Uxmal",
    items: [
      { name: "Uxmal", coords: [20.3607, -89.7714], wiki: "Uxmal" },
      {
        name: "Pirámide del Adivino",
        coords: [20.3603, -89.771],
        wiki: "Pyramid_of_the_Magician",
      },
      {
        name: "Cuadrángulo de las Monjas",
        coords: [20.3608, -89.7715],
        wiki: "Nunnery_Quadrangle",
      },
    ],
  },
  {
    zona: "Valladolid",
    items: [
      {
        name: "Valladolid, Yucatán",
        coords: [20.689, -88.201],
        wiki: "Valladolid,_Yucatán",
      },
      { name: "Cenote Zaci", coords: [20.6893, -88.1992], wiki: "Cenote_Zací" },
      {
        name: "Convento de San Bernardino",
        coords: [20.6826, -88.2069],
        wiki: "Convento_de_San_Bernardino",
      },
    ],
  },
  {
    zona: "Cancún",
    items: [
      {
        name: "Zona Hotelera de Cancún",
        coords: [21.121, -86.777],
        wiki: "Cancún",
      },
      {
        name: "Playa Delfines",
        coords: [21.083, -86.777],
        wiki: "Playa_Delfines",
      },
      { name: "Isla Mujeres", coords: [21.233, -86.733], wiki: "Isla_Mujeres" },
    ],
  },
];

// Mueve el mapa automáticamente
function MoveMap({ coords }: { coords: [number, number] }) {
  const map = useMap();
  useEffect(() => {
    map.setView(coords, 9);
  }, [coords]);
  return null;
}

export default function MapTuristico() {
  const [lugarActual, setLugarActual] = useState<any>(null);
  const [indexZona, setIndexZona] = useState(0);
  const [indexInterno, setIndexInterno] = useState(0);

  // Cargar Wikipedia
  const cargarWikipedia = async (item: any) => {
    try {
      const res = await fetch(
        `https://es.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(
          item.wiki
        )}`
      );
      const data = await res.json();
      return {
        ...item,
        extract: data.extract,
        image: data.thumbnail?.source || null,
        url: data.content_urls?.desktop?.page || "",
      };
    } catch {
      return { ...item, extract: "Sin descripción", image: null, url: "" };
    }
  };

  // Rotación automática cada 10 segundos
  useEffect(() => {
    const cambiarLugar = async () => {
      const zona = lugaresRotativos[indexZona];
      const item = zona.items[indexInterno];
      const info = await cargarWikipedia(item);
      setLugarActual(info);
    };

    cambiarLugar();

    const t = setInterval(() => {
      setIndexInterno((prev) => {
        const next = prev + 1;
        if (next >= 3) {
          setIndexZona((z) => (z + 1) % lugaresRotativos.length);
          return 0;
        }
        return next;
      });
    }, 10000);

    return () => clearInterval(t);
  }, [indexZona, indexInterno]);

  if (!lugarActual) return null;

  return (
    <MapContainer
      center={lugarActual.coords}
      zoom={9}
      style={{ height: "100%", width: "100%" }}
    >
      <MoveMap coords={lugarActual.coords} />

      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

      <Marker position={lugarActual.coords} icon={culturalIcon}>
        <Popup>
          <div
            style={{
              width: "220px",
              padding: "10px",
              textAlign: "center",
              fontFamily: "Arial, sans-serif",
              borderRadius: "10px",
              background: "linear-gradient(135deg, #ffffff, #f3f3f3)",
              boxShadow: "0px 2px 10px rgba(0,0,0,0.15)",
            }}
          >
            <h3
              style={{
                margin: "5px 0 10px 0",
                fontSize: "16px",
                color: "#c24d9a",
                fontWeight: "bold",
              }}
            >
              {lugarActual.name}
            </h3>

            {lugarActual.image && (
              <img
                src={lugarActual.image}
                alt="img"
                style={{
                  width: "100%",
                  height: "120px",
                  objectFit: "cover",
                  borderRadius: "8px",
                  marginBottom: "10px",
                }}
              />
            )}

            <p style={{ fontSize: "13px", color: "#333" }}>
              {lugarActual.extract}
            </p>
          </div>
        </Popup>
      </Marker>
    </MapContainer>
  );
}
