import React, { useEffect, useRef, useState } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// Crear iconos personalizados para evitar el problema de require
const createLeafletIcon = () => {
  return new L.Icon({
    iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
    iconRetinaUrl:
      "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
    shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41],
  });
};

interface MapaTuristicoProps {
  origen: string;
  destino: string;
  ubicacionActual: string;
  onViajeSeleccionado: (viaje: any) => void;
  viajeSeleccionado: any;
  onLugarSeleccionado: (lugar: any) => void;
}

const MapaTuristico: React.FC<MapaTuristicoProps> = ({
  origen,
  destino,
  ubicacionActual,
  onViajeSeleccionado,
  viajeSeleccionado,
  onLugarSeleccionado,
}) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const leafletMapRef = useRef<L.Map | null>(null);
  const [mapLoaded, setMapLoaded] = useState(false);

  // Lugares turísticos con coordenadas reales
  const lugaresTuristicos = [
    // Mérida y alrededores
    {
      id: 1,
      nombre: "Mérida Centro Histórico",
      tipo: "Centro Histórico",
      icono: "🏛️",
      descripcion:
        "El corazón cultural de Yucatán con arquitectura colonial, museos y restaurantes tradicionales.",
      ubicacion: "Centro de Mérida, Yucatán",
      horario: "Todo el día",
      precio: "Gratis - $500 MXN",
      precioNumero: 500,
      coordenadas: [20.9674, -89.5926] as [number, number],
    },
    {
      id: 2,
      nombre: "Chichén Itzá",
      tipo: "Pirámide Maya",
      icono: "🗿",
      descripcion:
        "Una de las Nuevas 7 Maravillas del Mundo, famosa por la Pirámide de Kukulkán.",
      ubicacion: "Tinúm, Yucatán",
      horario: "8:00 AM - 5:00 PM",
      precio: "$500 MXN entrada general",
      precioNumero: 500,
      coordenadas: [20.6843, -88.5678] as [number, number],
    },
    {
      id: 3,
      nombre: "Uxmal",
      tipo: "Zona Arqueológica",
      icono: "🏺",
      descripcion:
        "Ciudad maya declarada Patrimonio de la Humanidad por la UNESCO.",
      ubicacion: "Santa Elena, Yucatán",
      horario: "8:00 AM - 5:00 PM",
      precio: "$413 MXN entrada general",
      precioNumero: 413,
      coordenadas: [20.3592, -89.7714] as [number, number],
    },
    {
      id: 4,
      nombre: "Cenote Ik Kil",
      tipo: "Cenote",
      icono: "💧",
      descripcion:
        "Cenote sagrado maya con aguas cristalinas, ideal para nadar y refrescarse.",
      ubicacion: "Cerca de Chichén Itzá",
      horario: "8:00 AM - 6:00 PM",
      precio: "$150 MXN por persona",
      precioNumero: 150,
      coordenadas: [20.7284, -88.5271] as [number, number],
    },
    // Cancún y alrededores
    {
      id: 5,
      nombre: "Cancún Hotel Zone",
      tipo: "Zona Hotelera",
      icono: "🏨",
      descripcion:
        "Famosa zona de resorts todo incluido con playas de arena blanca y aguas turquesas.",
      ubicacion: "Zona Hotelera, Cancún",
      horario: "Todo el día",
      precio: "$1500 - $5000 MXN noche",
      precioNumero: 1500,
      coordenadas: [21.1373, -86.7511] as [number, number],
    },
    {
      id: 6,
      nombre: "Tulum Ruinas",
      tipo: "Ruinas Frente al Mar",
      icono: "🏝️",
      descripcion:
        "Único sitio arqueológico maya construido frente al mar Caribe.",
      ubicacion: "Tulum, Quintana Roo",
      horario: "8:00 AM - 5:00 PM",
      precio: "$90 MXN entrada general",
      precioNumero: 90,
      coordenadas: [20.2114, -87.4654] as [number, number],
    },
    {
      id: 7,
      nombre: "Playa del Carmen",
      tipo: "Destino Playero",
      icono: "🏖️",
      descripcion:
        "Famosa por la Quinta Avenida con tiendas, restaurantes y vida nocturna.",
      ubicacion: "Playa del Carmen, Quintana Roo",
      horario: "Todo el día",
      precio: "Varía según actividad",
      precioNumero: 800,
      coordenadas: [20.6296, -87.0739] as [number, number],
    },
    {
      id: 8,
      nombre: "Xcaret Park",
      tipo: "Parque Ecológico",
      icono: "🌴",
      descripcion:
        "Parque temático con ríos subterráneos, shows culturales y atracciones naturales.",
      ubicacion: "Playa del Carmen, Quintana Roo",
      horario: "8:30 AM - 10:30 PM",
      precio: "$1999 MXN por persona",
      precioNumero: 1999,
      coordenadas: [20.5789, -87.1197] as [number, number],
    },
    // Lugares intermedios
    {
      id: 9,
      nombre: "Valladolid",
      tipo: "Pueblo Mágico",
      icono: "🏘️",
      descripcion:
        "Pintoresco pueblo colonial entre Mérida y Cancún, famoso por sus cenotes.",
      ubicacion: "Valladolid, Yucatán",
      horario: "Todo el día",
      precio: "Gratis - $300 MXN",
      precioNumero: 300,
      coordenadas: [20.6881, -88.1994] as [number, number],
    },
    {
      id: 10,
      nombre: "Izamal",
      tipo: "Ciudad Amarilla",
      icono: "🟡",
      descripcion:
        'Conocida como "La Ciudad Amarilla" por sus edificios pintados de ese color.',
      ubicacion: "Izamal, Yucatán",
      horario: "Todo el día",
      precio: "Gratis - $200 MXN",
      precioNumero: 200,
      coordenadas: [20.9317, -89.0186] as [number, number],
    },
  ];

  // Rutas de tren
  const rutas = [
    {
      nombre: "Mérida Centro -> Chichén Itzá",
      puntos: [
        [20.9674, -89.5926], // Mérida
        [20.9317, -89.0186], // Izamal
        [20.7284, -88.5271], // Cenote Ik Kil
        [20.6843, -88.5678], // Chichén Itzá
      ],
      distancia: "120 km",
      duracion: "2h 30m",
      color: "#3b82f6",
    },
    {
      nombre: "Mérida Centro -> Cancún Centro",
      puntos: [
        [20.9674, -89.5926], // Mérida
        [20.6881, -88.1994], // Valladolid
        [20.6296, -87.0739], // Playa del Carmen
        [21.1619, -86.8515], // Cancún
      ],
      distancia: "320 km",
      duracion: "4h 15m",
      color: "#1d4ed8",
    },
    {
      nombre: "Cancún Centro -> Tulum",
      puntos: [
        [21.1619, -86.8515], // Cancún
        [20.5789, -87.1197], // Xcaret
        [20.2114, -87.4654], // Tulum
      ],
      distancia: "130 km",
      duracion: "1h 45m",
      color: "#0ea5e9",
    },
  ];

  useEffect(() => {
    if (mapRef.current && !leafletMapRef.current) {
      // Crear mapa centrado en la península de Yucatán
      const map = L.map(mapRef.current).setView([20.5, -88.5], 8);
      leafletMapRef.current = map;

      // Añadir capa de OpenStreetMap
      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: "© OpenStreetMap contributors",
        maxZoom: 18,
      }).addTo(map);

      // Crear icono por defecto
      const defaultIcon = createLeafletIcon();

      // Añadir marcadores para lugares turísticos
      lugaresTuristicos.forEach((lugar) => {
        // Crear icono personalizado con emoji
        const customIcon = L.divIcon({
          html: `<div style="
            background: ${lugar.coordenadas[0] > 20.8 ? "#1e3a8a" : "#0369a1"};
            color: white;
            width: 40px;
            height: 40px;
            border-radius: 50%;
            border: 2px solid white;
            box-shadow: 0 2px 5px rgba(0,0,0,0.3);
            font-size: 1.2em;
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
          ">
            ${lugar.icono}
          </div>`,
          className: "",
          iconSize: [40, 40],
          iconAnchor: [20, 40],
        });

        const marker = L.marker(lugar.coordenadas, { icon: customIcon }).addTo(
          map
        ).bindPopup(`
            <div style="padding: 10px; max-width: 250px;">
              <h3 style="margin: 0 0 5px 0; color: #1e3a8a;">${lugar.nombre}</h3>
              <p style="margin: 0 0 10px 0; color: #4b5563;">${lugar.tipo}</p>
              <p style="margin: 0 0 10px 0; font-size: 14px;">${lugar.descripcion}</p>
              <button style="
                background: #3b82f6; 
                color: white; 
                border: none; 
                padding: 8px 16px; 
                border-radius: 4px; 
                cursor: pointer; 
                width: 100%;
                font-size: 14px;
              " id="reservar-${lugar.id}">
                Reservar visita
              </button>
            </div>
          `);

        // Añadir evento click al marcador
        marker.on("click", () => {
          onLugarSeleccionado(lugar);
        });

        // Añadir evento al botón del popup
        marker.on("popupopen", () => {
          setTimeout(() => {
            const btn = document.getElementById(`reservar-${lugar.id}`);
            if (btn) {
              btn.onclick = (e) => {
                e.stopPropagation();
                onLugarSeleccionado(lugar);
              };
            }
          }, 100);
        });
      });

      // Añadir ruta Mérida-Cancún
      const rutaMeridaCancun = rutas.find(
        (r) => r.nombre === "Mérida Centro -> Cancún Centro"
      );
      if (rutaMeridaCancun) {
        const polyline = L.polyline(
          rutaMeridaCancun.puntos as [number, number][],
          {
            color: rutaMeridaCancun.color,
            weight: 4,
            opacity: 0.7,
            dashArray: "10, 10",
          }
        ).addTo(map);

        // Añadir marcadores de estaciones
        const estaciones = [
          "Mérida Centro",
          "Valladolid",
          "Playa del Carmen",
          "Cancún Centro",
        ];
        rutaMeridaCancun.puntos.forEach((coord, index) => {
          L.marker(coord as [number, number], { icon: defaultIcon })
            .addTo(map)
            .bindPopup(`<b>Estación ${index + 1}:</b> ${estaciones[index]}`);
        });
      }

      setMapLoaded(true);
    }

    return () => {
      if (leafletMapRef.current) {
        leafletMapRef.current.remove();
        leafletMapRef.current = null;
      }
    };
  }, []);

  const getRutaActual = () => {
    if (origen && destino) {
      return rutas.find(
        (r) =>
          r.nombre.includes(origen.split(" ")[0]) &&
          r.nombre.includes(destino.split(" ")[0])
      );
    }
    return rutas[0]; // Ruta por defecto
  };

  const ruta = getRutaActual();

  return (
    <div style={styles.container}>
      <div style={styles.mapHeader}>
        <h3 style={styles.mapTitle}>Mapa de Rutas - Tren Xiimba Maya</h3>
        <div style={styles.mapBadge}>
          {ubicacionActual === "Mérida" ? "🏛️" : "🏖️"}
        </div>
      </div>

      <div ref={mapRef} style={styles.map}>
        {!mapLoaded && (
          <div style={styles.loadingMap}>
            <div style={styles.spinner}></div>
            <p style={styles.loadingText}>Cargando mapa...</p>
          </div>
        )}
      </div>

      {ruta && (
        <div style={styles.routeInfo}>
          <div style={styles.routeHeader}>
            <h4 style={styles.routeTitle}>
              Ruta: {origen} → {destino || "Chichén Itzá"}
            </h4>
            <div style={styles.routeStats}>
              <span style={styles.routeStat}>📏 {ruta.distancia}</span>
              <span style={styles.routeStat}>⏱️ {ruta.duracion}</span>
            </div>
          </div>

          <div style={styles.routeStops}>
            <h5 style={styles.stopsTitle}>Estaciones principales:</h5>
            <div style={styles.stopsList}>
              {ruta.nombre === "Mérida Centro -> Chichén Itzá" && (
                <>
                  <div style={styles.stopItem}>
                    <div style={styles.stopNumber}>1</div>
                    <div style={styles.stopName}>Mérida Centro</div>
                    <div style={styles.stopArrow}>➡️</div>
                  </div>
                  <div style={styles.stopItem}>
                    <div style={styles.stopNumber}>2</div>
                    <div style={styles.stopName}>Motul</div>
                    <div style={styles.stopArrow}>➡️</div>
                  </div>
                  <div style={styles.stopItem}>
                    <div style={styles.stopNumber}>3</div>
                    <div style={styles.stopName}>Izamal</div>
                    <div style={styles.stopArrow}>➡️</div>
                  </div>
                  <div style={styles.stopItem}>
                    <div style={styles.stopNumber}>4</div>
                    <div style={styles.stopName}>Chichén Itzá</div>
                  </div>
                </>
              )}
              {ruta.nombre === "Mérida Centro -> Cancún Centro" && (
                <>
                  <div style={styles.stopItem}>
                    <div style={styles.stopNumber}>1</div>
                    <div style={styles.stopName}>Mérida Centro</div>
                    <div style={styles.stopArrow}>➡️</div>
                  </div>
                  <div style={styles.stopItem}>
                    <div style={styles.stopNumber}>2</div>
                    <div style={styles.stopName}>Valladolid</div>
                    <div style={styles.stopArrow}>➡️</div>
                  </div>
                  <div style={styles.stopItem}>
                    <div style={styles.stopNumber}>3</div>
                    <div style={styles.stopName}>Playa del Carmen</div>
                    <div style={styles.stopArrow}>➡️</div>
                  </div>
                  <div style={styles.stopItem}>
                    <div style={styles.stopNumber}>4</div>
                    <div style={styles.stopName}>Cancún Centro</div>
                  </div>
                </>
              )}
            </div>
          </div>

          <div style={styles.routeActions}>
            <button
              style={styles.actionBtn}
              onClick={() => {
                const viajeSimulado = {
                  id: Date.now(),
                  origen,
                  destino: destino || "Chichén Itzá",
                  precio: ruta.distancia.includes("120") ? 450 : 850,
                  duracion: ruta.duracion,
                  horario: "08:00 AM",
                  tipo: "Tren Turístico",
                };
                onViajeSeleccionado(viajeSimulado);
              }}
            >
              Ver Detalles del Viaje
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

const styles = {
  container: {
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(15, 23, 42, 0.8)",
    borderRadius: "15px",
    overflow: "hidden",
    display: "flex",
    flexDirection: "column" as "column",
  },
  mapHeader: {
    padding: "1.5rem",
    backgroundColor: "rgba(30, 58, 138, 0.5)",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottom: "1px solid rgba(59, 130, 246, 0.3)",
  },
  mapTitle: {
    color: "#ffffff",
    fontSize: "1.3rem",
    fontWeight: "bold" as "bold",
    margin: 0,
  },
  mapBadge: {
    backgroundColor: "rgba(37, 99, 235, 0.3)",
    color: "#ffffff",
    width: "45px",
    height: "45px",
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "1.5rem",
  },
  map: {
    flex: 1,
    position: "relative" as "relative",
    minHeight: "400px",
  },
  loadingMap: {
    position: "absolute" as "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    display: "flex",
    flexDirection: "column" as "column",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(30, 41, 59, 0.9)",
  },
  spinner: {
    width: "50px",
    height: "50px",
    border: "5px solid rgba(59, 130, 246, 0.3)",
    borderTopColor: "#3b82f6",
    borderRadius: "50%",
    animation: "spin 1s linear infinite",
    marginBottom: "1rem",
  },
  loadingText: {
    color: "#ffffff",
    fontSize: "1rem",
  },
  routeInfo: {
    padding: "1.5rem",
    backgroundColor: "rgba(30, 58, 138, 0.4)",
    borderTop: "1px solid rgba(59, 130, 246, 0.3)",
  },
  routeHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "1.5rem",
  },
  routeTitle: {
    color: "#ffffff",
    fontSize: "1.2rem",
    fontWeight: "bold" as "bold",
    margin: 0,
  },
  routeStats: {
    display: "flex",
    gap: "1rem",
  },
  routeStat: {
    color: "#93c5fd",
    fontSize: "0.9rem",
    display: "flex",
    alignItems: "center",
    gap: "0.3rem",
  },
  routeStops: {
    marginBottom: "1.5rem",
  },
  stopsTitle: {
    color: "#dbeafe",
    fontSize: "1rem",
    fontWeight: "600" as "600",
    margin: "0 0 1rem 0",
  },
  stopsList: {
    display: "flex",
    flexDirection: "column" as "column",
    gap: "0.75rem",
  },
  stopItem: {
    display: "flex",
    alignItems: "center",
    gap: "1rem",
  },
  stopNumber: {
    width: "28px",
    height: "28px",
    backgroundColor: "#3b82f6",
    color: "#ffffff",
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "0.9rem",
    fontWeight: "bold" as "bold",
  },
  stopName: {
    color: "#ffffff",
    fontSize: "1rem",
    flex: 1,
  },
  stopArrow: {
    color: "#3b82f6",
    fontSize: "1rem",
  },
  routeActions: {
    display: "flex",
    gap: "1rem",
  },
  actionBtn: {
    flex: 1,
    backgroundColor: "#3b82f6",
    color: "#ffffff",
    border: "none",
    padding: "0.85rem",
    borderRadius: "8px",
    fontSize: "0.95rem",
    fontWeight: "bold" as "bold",
    cursor: "pointer",
    transition: "all 0.3s ease",
  },
};

// Inyectar animaciones CSS
const styleSheet = document.styleSheets[0];
if (styleSheet) {
  styleSheet.insertRule(
    `
    @keyframes spin {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }
  `,
    styleSheet.cssRules.length
  );

  styleSheet.insertRule(
    `
    .actionBtn:hover {
      background-color: #2563eb;
      transform: translateY(-2px);
      box-shadow: 0 5px 15px rgba(37, 99, 235, 0.4);
    }
  `,
    styleSheet.cssRules.length
  );
}

export default MapaTuristico;
