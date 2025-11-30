import React, { useState, useEffect } from "react";
import type { ReactNode } from "react";
import {
  Palmtree,
  Waves,
  Landmark,
  Tent,
  Map as MapIcon,
  Camera,
  ArrowRight,
  ArrowLeft,
  Sun,
  Compass,
  MapPin,
  Info,
  Star,
  Clock,
  Tag,
  Navigation,
} from "lucide-react";

/* --- ⚠️ INSTRUCCIONES PARA TU PROYECTO ASTRO ⚠️ ---
  
  1. Instala las dependencias: npm install react-leaflet leaflet @types/leaflet
  2. DESCOMENTA el bloque de "IMPORTACIONES REALES" abajo.
  3. DESCOMENTA la "CONFIGURACIÓN DE ICONOS".
  4. INTERCAMBIA los componentes: Comenta el 'MapTuristico' (Mock) y descomenta el 'MapTuristico' (Real).
*/

// --- IMPORTACIONES REALES (DESCOMENTAR EN ASTRO) ---
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// --- CONFIGURACIÓN DE ICONOS (DESCOMENTAR EN ASTRO) ---

const DefaultIcon = L.icon({
  iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});
L.Marker.prototype.options.icon = DefaultIcon;

// --- INTERFACES & TIPOS ---
interface Experiencia {
  id: number;
  titulo: string;
  categoria: string;
  descripcion: string;
  imagen: string;
  icono: ReactNode;
  color: string;
  esPlanificador?: boolean;
}

interface Ubicacion {
  nombre: string;
  descripcion: string;
  lat: number;
  lng: number;
  precio?: string;
  horario?: string;
  destacado?: boolean;
}

interface ExperienceCardProps {
  data: Experiencia;
  onExplore: (categoria: string) => void;
}

/* =================================================================================
   ⬇️ COMPONENTE MAPA TURISTICO (MOCK - SOLO PARA VISTA PREVIA AQUÍ) ⬇️
   En tu proyecto Astro, usa el componente REAL que está más abajo.
   ================================================================================= */

/* =================================================================================
   ⬇️ COMPONENTE MAPA TURISTICO (REAL - PARA ASTRO) ⬇️
   Descomenta este bloque y utilízalo en lugar del mock anterior.
   ================================================================================= */

// Componente auxiliar para manejar el Zoom programático
const MapController = ({
  center,
  zoom,
}: {
  center: [number, number];
  zoom: number;
}) => {
  const map = useMap();
  useEffect(() => {
    map.flyTo(center, zoom, { duration: 1.5 });
  }, [center, zoom, map]);
  return null;
};

const MapTuristico: React.FC<{
  ubicaciones: Ubicacion[];
  ubicacionActiva: Ubicacion | null;
}> = ({ ubicaciones, ubicacionActiva }) => {
  // Centro por defecto (Yucatán) si no hay selección
  const defaultCenter: [number, number] = [20.6, -88.6];
  const defaultZoom = 8;

  // Calculamos el centro y zoom dinámico
  const activeCenter: [number, number] = ubicacionActiva
    ? [ubicacionActiva.lat, ubicacionActiva.lng]
    : defaultCenter;

  const activeZoom = ubicacionActiva ? 12 : defaultZoom; // Zoom más cercano al seleccionar

  return (
    <div style={{ width: "100%", height: "100%", zIndex: 0 }}>
      <MapContainer
        center={defaultCenter}
        zoom={defaultZoom}
        scrollWheelZoom={true}
        style={{ height: "100%", width: "100%" }}
      >
        <TileLayer
          attribution="&copy; OpenStreetMap contributors"
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        // Controlador para mover el mapa cuando cambia la selección
        <MapController center={activeCenter} zoom={activeZoom} />
        {ubicaciones.map((ubi, idx) => (
          <Marker key={idx} position={[ubi.lat, ubi.lng]}>
            <Popup>
              <div style={{ textAlign: "center", fontFamily: "system-ui" }}>
                <strong style={{ color: "#16a34a", fontSize: "14px" }}>
                  {ubi.nombre}
                </strong>
                <p style={{ margin: "5px 0", fontSize: "12px" }}>
                  {ubi.descripcion}
                </p>
                {ubi.destacado && (
                  <span
                    style={{
                      fontSize: "10px",
                      background: "#fbbf24",
                      padding: "2px",
                    }}
                  >
                    ★ Imperdible
                  </span>
                )}
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};

// --- DATOS AMPLIADOS ---
const ubicacionesPorCategoria: Record<string, Ubicacion[]> = {
  Naturaleza: [
    {
      nombre: "Cenote Ik Kil",
      descripcion: "Impresionante cenote abierto con lianas colgantes.",
      lat: 20.666,
      lng: -88.555,
      precio: "150 MXN",
      horario: "09:00 - 17:00",
      destacado: true,
    },
    {
      nombre: "Cenote Suytun",
      descripcion: "Famoso por su plataforma de piedra y rayo de luz.",
      lat: 20.699,
      lng: -88.111,
      precio: "200 MXN",
      horario: "09:00 - 16:30",
    },
    {
      nombre: "Cenote Zací",
      descripcion: "Cenote urbano en el corazón de Valladolid.",
      lat: 20.691,
      lng: -88.202,
      precio: "60 MXN",
      horario: "08:30 - 17:00",
    },
    {
      nombre: "Cenote Dos Ojos",
      descripcion: "Sistema de cuevas inundadas ideal para buceo.",
      lat: 20.333,
      lng: -87.444,
      precio: "350 MXN",
      horario: "08:00 - 17:00",
    },
    {
      nombre: "Gran Cenote",
      descripcion: "Aguas cristalinas con tortugas y peces.",
      lat: 20.222,
      lng: -87.455,
      precio: "300 MXN",
      horario: "08:00 - 16:45",
    },
    {
      nombre: "Laguna de Bacalar",
      descripcion: "La laguna de los siete colores.",
      lat: 18.677,
      lng: -88.391,
      precio: "Acceso público",
      horario: "Siempre abierto",
      destacado: true,
    },
    {
      nombre: "Reserva de Calakmul",
      descripcion: "Selva tropical y biosfera protegida.",
      lat: 18.105,
      lng: -89.81,
      precio: "Gratis",
      horario: "06:00 - 17:00",
    },
  ],
  Historia: [
    {
      nombre: "Chichén Itzá",
      descripcion: "Maravilla del mundo y pirámide de Kukulcán.",
      lat: 20.684,
      lng: -88.567,
      precio: "571 MXN",
      horario: "08:00 - 17:00",
      destacado: true,
    },
    {
      nombre: "Uxmal",
      descripcion: "Joya del estilo Puuc, Pirámide del Adivino.",
      lat: 20.36,
      lng: -89.77,
      precio: "494 MXN",
      horario: "08:00 - 17:00",
    },
    {
      nombre: "Ek Balam",
      descripcion: "Acrópolis con tumba y fachada de estuco.",
      lat: 20.89,
      lng: -88.136,
      precio: "456 MXN",
      horario: "08:00 - 17:00",
    },
    {
      nombre: "Palenque",
      descripcion: "Misteriosa ciudad en la selva de Chiapas.",
      lat: 17.484,
      lng: -92.046,
      precio: "90 MXN",
      horario: "08:00 - 16:30",
      destacado: true,
    },
    {
      nombre: "Tulum",
      descripcion: "Única zona arqueológica frente al mar.",
      lat: 20.211,
      lng: -87.43,
      precio: "95 MXN",
      horario: "08:00 - 17:00",
    },
    {
      nombre: "Edzná",
      descripcion: "La casa de los Itzáes en Campeche.",
      lat: 19.596,
      lng: -90.228,
      precio: "85 MXN",
      horario: "08:00 - 17:00",
    },
    {
      nombre: "Calakmul (Ruinas)",
      descripcion: "Inmensa ciudad maya oculta en la selva.",
      lat: 18.106,
      lng: -89.807,
      precio: "90 MXN",
      horario: "06:00 - 13:00",
    },
  ],
  Cultura: [
    {
      nombre: "Izamal",
      descripcion: "Pueblo Mágico pintado de amarillo.",
      lat: 20.933,
      lng: -89.016,
      precio: "Gratis",
      horario: "Siempre abierto",
      destacado: true,
    },
    {
      nombre: "Valladolid",
      descripcion: "Ciudad colonial con gran gastronomía.",
      lat: 20.69,
      lng: -88.201,
      precio: "Gratis",
      horario: "Siempre abierto",
    },
    {
      nombre: "Maní",
      descripcion: "Pueblo Mágico con convento histórico.",
      lat: 20.393,
      lng: -89.392,
      precio: "Gratis",
      horario: "Siempre abierto",
    },
    {
      nombre: "Mérida (Centro)",
      descripcion: "Capital cultural con arquitectura francesa.",
      lat: 20.967,
      lng: -89.623,
      precio: "Gratis",
      horario: "Siempre abierto",
    },
    {
      nombre: "Campeche",
      descripcion: "Ciudad amurallada patrimonio de la humanidad.",
      lat: 19.83,
      lng: -90.534,
      precio: "Gratis",
      horario: "Siempre abierto",
    },
  ],
  Relax: [
    {
      nombre: "Playa Delfines",
      descripcion: "El mirador icónico de Cancún.",
      lat: 21.065,
      lng: -86.78,
      precio: "Gratis",
      horario: "24h",
    },
    {
      nombre: "Playa Paraíso",
      descripcion: "Arena blanca icónica en Tulum.",
      lat: 20.2,
      lng: -87.42,
      precio: "Acceso libre",
      horario: "10:00 - 18:00",
      destacado: true,
    },
    {
      nombre: "Holbox",
      descripcion: "Isla sin coches, santuario de tiburón ballena.",
      lat: 21.52,
      lng: -87.38,
      precio: "Ferry 220 MXN",
      horario: "Siempre abierto",
    },
    {
      nombre: "Isla Mujeres",
      descripcion: "Playa Norte y arrecifes de coral.",
      lat: 21.232,
      lng: -86.733,
      precio: "Ferry 300 MXN",
      horario: "Siempre abierto",
    },
    {
      nombre: "Mahahual",
      descripcion: "Pueblo pesquero tranquilo con malecón.",
      lat: 18.713,
      lng: -87.708,
      precio: "Gratis",
      horario: "Siempre abierto",
    },
  ],
  Arquitectura: [
    {
      nombre: "Hacienda Yaxcopoil",
      descripcion: "Museo vivo de la época del henequén.",
      lat: 20.73,
      lng: -89.7,
      precio: "150 MXN",
      horario: "09:00 - 18:00",
    },
    {
      nombre: "Hacienda Sotuta de Peón",
      descripcion: "Hacienda viva con paseos en truck.",
      lat: 20.8,
      lng: -89.5,
      precio: "600 MXN",
      horario: "10:00 - 17:00",
      destacado: true,
    },
    {
      nombre: "Hacienda Mucuyché",
      descripcion: "Hacienda con cenotes y canal de nado.",
      lat: 20.627,
      lng: -89.605,
      precio: "650 MXN",
      horario: "09:00 - 15:00",
    },
    {
      nombre: "Hacienda Temozón",
      descripcion: "Lujosa hacienda restaurada como hotel.",
      lat: 20.785,
      lng: -89.663,
      precio: "Consumo",
      horario: "09:00 - 20:00",
    },
  ],
};

// --- DATA PRINCIPAL (HOME) ---
const experienciasData: Experiencia[] = [
  {
    id: 1,
    titulo: "Cenotes Sagrados",
    categoria: "Naturaleza",
    descripcion: "Sumérgete en las aguas cristalinas del inframundo maya.",
    imagen:
      "https://images.pexels.com/photos/34855022/pexels-photo-34855022.jpeg",
    icono: <Waves size={24} />,
    color: "#0ea5e9",
  },
  {
    id: 2,
    titulo: "Zonas Arqueológicas",
    categoria: "Historia",
    descripcion: "Camina entre las leyendas de Chichén Itzá, Uxmal y Palenque.",
    imagen:
      "https://images.unsplash.com/photo-1552074284-5e88ef1aef18?q=80&w=800&auto=format&fit=crop",
    icono: <Landmark size={24} />,
    color: "#d97706",
  },
  {
    id: 3,
    titulo: "Pueblos Mágicos",
    categoria: "Cultura",
    descripcion: "Descubre la arquitectura colonial de Izamal y Valladolid.",
    imagen:
      "https://images.unsplash.com/photo-1512813195386-6cf811ad3542?q=80&w=800&auto=format&fit=crop",
    icono: <Camera size={24} />,
    color: "#db2777",
  },
  {
    id: 4,
    titulo: "Playas del Caribe",
    categoria: "Relax",
    descripcion: "Arena blanca y mar turquesa a lo largo de la Riviera Maya.",
    imagen:
      "https://images.unsplash.com/photo-1544550581-5f7ceaf7f992?q=80&w=800&auto=format&fit=crop",
    icono: <Palmtree size={24} />,
    color: "#22d3ee",
  },
  {
    id: 5,
    titulo: "Haciendas Henequeneras",
    categoria: "Arquitectura",
    descripcion: "Viaja al pasado en las históricas haciendas de oro verde.",
    imagen:
      "https://images.pexels.com/photos/10039977/pexels-photo-10039977.jpeg",
    icono: <Tent size={24} />,
    color: "#16a34a",
  },
  {
    id: 6,
    titulo: "Planificador de Viaje",
    categoria: "Tu Ruta",
    descripcion:
      "¿No sabes por dónde empezar? Crea tu itinerario personalizado.",
    imagen:
      "https://images.unsplash.com/photo-1524850011238-e3d235c7d4c9?q=80&w=800&auto=format&fit=crop",
    icono: <Compass size={24} />,
    color: "#8b5cf6",
    esPlanificador: true,
  },
];

// --- TARJETA INDIVIDUAL ---
const ExperienceCard: React.FC<ExperienceCardProps> = ({ data, onExplore }) => {
  const [isHovered, setIsHovered] = useState<boolean>(false);

  return (
    <div
      className="card-container"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => onExplore(data.categoria)}
      style={{
        position: "relative",
        borderRadius: "16px",
        overflow: "hidden",
        cursor: "pointer",
        height: "320px",
        boxShadow: "0 10px 30px -5px rgba(0, 0, 0, 0.3)",
        transition: "transform 0.3s ease",
        transform: isHovered ? "translateY(-5px)" : "translateY(0)",
        backgroundColor: "#cbd5e1",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          backgroundImage: `url(${data.imagen})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          transition: "transform 0.7s ease",
          transform: isHovered ? "scale(1.1)" : "scale(1.0)",
        }}
      />
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: data.esPlanificador
            ? "linear-gradient(to top, rgba(88, 28, 135, 0.85) 0%, rgba(88, 28, 135, 0.4) 100%)"
            : "linear-gradient(to top, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.4) 50%, rgba(0,0,0,0.1) 100%)",
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          width: "100%",
          padding: "24px",
          color: "white",
          display: "flex",
          flexDirection: "column",
          gap: "8px",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: "-240px",
            right: "20px",
            background: "rgba(255, 255, 255, 0.2)",
            backdropFilter: "blur(8px)",
            borderRadius: "50%",
            padding: "10px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            border: "1px solid rgba(255, 255, 255, 0.3)",
          }}
        >
          {data.icono}
        </div>
        <span
          style={{
            fontSize: "12px",
            textTransform: "uppercase",
            letterSpacing: "1px",
            fontWeight: "bold",
            color: data.esPlanificador ? "#e9d5ff" : data.color,
            display: "flex",
            alignItems: "center",
            gap: "6px",
          }}
        >
          {data.esPlanificador ? <MapIcon size={12} /> : <Sun size={12} />}{" "}
          {data.categoria}
        </span>
        <h3
          style={{
            margin: 0,
            fontSize: "24px",
            fontWeight: "700",
            lineHeight: "1.2",
            textShadow: "0 2px 4px rgba(0,0,0,0.5)",
          }}
        >
          {data.titulo}
        </h3>
        <button
          style={{
            background: data.esPlanificador ? "#a855f7" : "white",
            color: data.esPlanificador ? "white" : "#1a1a1a",
            border: "none",
            padding: "10px 16px",
            borderRadius: "8px",
            fontWeight: "600",
            fontSize: "14px",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "8px",
            width: "fit-content",
            transition: "background 0.2s",
            marginTop: "15px",
          }}
        >
          {data.esPlanificador ? "Comenzar a Planear" : "Ver Mapa Interactivo"}{" "}
          <ArrowRight size={16} />
        </button>
      </div>
    </div>
  );
};

// --- VISTA DEL MAPA INTERACTIVO ---
const InteractiveMap: React.FC<{ categoria: string; onBack: () => void }> = ({
  categoria,
  onBack,
}) => {
  const ubicaciones = ubicacionesPorCategoria[categoria] || [];
  // Estado para la ubicación seleccionada (Zoom)
  const [activeLocation, setActiveLocation] = useState<Ubicacion | null>(null);

  // Efecto para seleccionar automáticamente el primer destacado si no hay selección
  useEffect(() => {
    if (ubicaciones.length > 0 && !activeLocation) {
      // Opcional: Auto-seleccionar el primer lugar o dejar centrado general
      // setActiveLocation(ubicaciones[0]);
    }
  }, []);

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "350px 1fr",
        height: "90vh",
        width: "100%",
        gap: "0",
        background: "#f7f7f7",
      }}
    >
      {/* SIDEBAR */}
      <div
        style={{
          overflowY: "auto",
          padding: "18px",
          borderRight: "1px solid #ddd",
          background: "#fff",
        }}
      >
        <button
          onClick={onBack}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "5px",
            background: "none",
            border: "none",
            color: "#666",
            cursor: "pointer",
            marginBottom: "15px",
            padding: 0,
            fontSize: "14px",
          }}
        >
          <ArrowLeft size={16} /> Volver a Experiencias
        </button>

        <h2 style={{ marginBottom: "15px", fontSize: "1.2rem", color: "#333" }}>
          Explorando: {categoria}
        </h2>

        {ubicaciones.length > 0 ? (
          ubicaciones.map((ubi, i) => {
            const isActive = activeLocation?.nombre === ubi.nombre;
            return (
              <div
                key={i}
                onClick={() => setActiveLocation(ubi)} // Al hacer click, activamos el zoom
                style={{
                  border: isActive ? "2px solid #16a34a" : "1px solid #e3e3e3", // Borde verde si está activo
                  borderRadius: "10px",
                  padding: "15px",
                  marginBottom: "12px",
                  background: isActive ? "#f0fdf4" : "#fff", // Fondo sutil si está activo
                  boxShadow: "0 2px 4px rgba(0,0,0,0.05)",
                  cursor: "pointer",
                  transition: "all 0.2s",
                }}
              >
                <div
                  style={{ display: "flex", alignItems: "center", gap: "10px" }}
                >
                  <span style={{ color: "#16a34a" }}>
                    <MapPin
                      size={18}
                      fill={isActive ? "#16a34a" : "none"}
                      color={isActive ? "white" : "currentColor"}
                    />
                  </span>
                  <b style={{ color: "#333" }}>{ubi.nombre}</b>
                </div>
                <p
                  style={{
                    margin: "8px 0 5px",
                    fontSize: "14px",
                    opacity: 0.8,
                    lineHeight: "1.4",
                  }}
                >
                  {ubi.descripcion}
                </p>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginTop: "10px",
                  }}
                >
                  <span
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "5px",
                      fontSize: "13px",
                      color: "#666",
                    }}
                  >
                    <Clock size={14} /> {ubi.horario || "Consultar"}
                  </span>
                  <span
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "5px",
                      fontSize: "13px",
                      color: "#666",
                    }}
                  >
                    <Tag size={14} /> {ubi.precio || "Varía"}
                  </span>
                </div>
                {ubi.destacado && (
                  <span
                    style={{
                      marginTop: "10px",
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "4px",
                      background: "#2ecc71",
                      color: "#fff",
                      padding: "3px 8px",
                      borderRadius: "5px",
                      fontSize: "12px",
                      fontWeight: 600,
                    }}
                  >
                    <Star size={10} fill="white" /> IMPERDIBLE
                  </span>
                )}
                {/* Botón explícito de 'Ver en mapa' para móviles o claridad */}
                <div
                  style={{
                    marginTop: "8px",
                    fontSize: "12px",
                    color: "#16a34a",
                    fontWeight: 600,
                    display: "flex",
                    alignItems: "center",
                    gap: "4px",
                  }}
                >
                  Ver en mapa <Navigation size={12} />
                </div>
              </div>
            );
          })
        ) : (
          <div style={{ textAlign: "center", padding: "20px", color: "#999" }}>
            <Info size={32} style={{ marginBottom: "10px" }} />
            <p>No hay ubicaciones registradas aún.</p>
          </div>
        )}
      </div>

      {/* ÁREA DEL MAPA */}
      <div
        style={{
          height: "100%",
          width: "100%",
          background: "#e2e8f0",
          position: "relative",
        }}
      >
        {/* Pasamos la ubicación activa al mapa para que haga el zoom */}
        <MapTuristico
          ubicaciones={ubicaciones}
          ubicacionActiva={activeLocation}
        />
      </div>
    </div>
  );
};

// --- PRINCIPAL ---
const ExperienciasPage: React.FC = () => {
  const [vistaActual, setVistaActual] = useState<string | null>(null);

  if (vistaActual)
    return (
      <InteractiveMap
        categoria={vistaActual}
        onBack={() => setVistaActual(null)}
      />
    );

  return (
    <div
      style={{
        background: "#f8fafc",
        minHeight: "100vh",
        padding: "40px 20px",
        fontFamily:
          '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      }}
    >
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        <div style={{ marginBottom: "40px", textAlign: "center" }}>
          <span
            style={{
              color: "#16a34a",
              fontWeight: "bold",
              letterSpacing: "1.5px",
              fontSize: "14px",
              textTransform: "uppercase",
            }}
          >
            Descubre la Ruta
          </span>
          <h1
            style={{
              fontSize: "36px",
              fontWeight: "800",
              color: "#1e293b",
              marginTop: "10px",
              marginBottom: "15px",
            }}
          >
            Experiencias del Tren Maya
          </h1>
          <p
            style={{
              color: "#64748b",
              maxWidth: "600px",
              margin: "0 auto",
              fontSize: "16px",
            }}
          >
            Explora las maravillas del sureste mexicano. Selecciona una
            categoría para ver el mapa detallado.
          </p>
        </div>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gap: "24px",
          }}
        >
          {experienciasData.map((exp) => (
            <ExperienceCard
              key={exp.id}
              data={exp}
              onExplore={(cat) => setVistaActual(cat)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ExperienciasPage;
