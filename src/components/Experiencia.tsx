import React, { useState } from "react";
import type { ReactNode } from "react";
import {
  Palmtree,
  Waves,
  Landmark,
  Tent,
  Map as MapIcon,
  Camera,
  ArrowRight,
  Sun,
  Compass,
} from "lucide-react";

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

interface ExperienceCardProps {
  data: Experiencia;
}

// --- DATOS DE EJEMPLO ---
// Nota: Hemos cambiado las fuentes de Cenotes y Haciendas a Wikimedia para mayor fiabilidad.
const experienciasData: Experiencia[] = [
  {
    id: 1,
    titulo: "Cenotes Sagrados",
    categoria: "Naturaleza",
    descripcion: "Sumérgete en las aguas cristalinas del inframundo maya.",
    // FUENTE: WIKIMEDIA COMMONS (Cenote Ik Kil)
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
    // FUENTE: WIKIMEDIA COMMONS (Hacienda Uayamón)
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

// --- COMPONENTE DE TARJETA INDIVIDUAL ---
const ExperienceCard: React.FC<ExperienceCardProps> = ({ data }) => {
  const [isHovered, setIsHovered] = useState<boolean>(false);

  return (
    <div
      className="card-container"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        position: "relative",
        borderRadius: "16px",
        overflow: "hidden",
        cursor: "pointer",
        height: "320px",
        boxShadow: "0 10px 30px -5px rgba(0, 0, 0, 0.3)",
        transition: "transform 0.3s ease",
        transform: isHovered ? "translateY(-5px)" : "translateY(0)",
        backgroundColor: "#cbd5e1", // Color de fondo gris mientras carga la imagen
      }}
    >
      {/* Imagen de Fondo con Efecto Zoom */}
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

      {/* Overlay Oscuro (Gradiente para legibilidad) */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: data.esPlanificador
            ? "linear-gradient(to top, rgba(88, 28, 135, 0.85) 0%, rgba(88, 28, 135, 0.4) 100%)"
            : "linear-gradient(to top, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.4) 50%, rgba(0,0,0,0.1) 100%)",
        }}
      />

      {/* Contenido */}
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
        {/* Icono flotante superior */}
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

        {/* Categoría */}
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
          {data.esPlanificador ? <MapIcon size={12} /> : <Sun size={12} />}
          {data.categoria}
        </span>

        {/* Título */}
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

        {/* Descripción */}
        <p
          style={{
            fontSize: "14px",
            color: "#e5e5e5",
            lineHeight: "1.5",
            margin: "5px 0 15px 0",
            opacity: 0.9,
          }}
        >
          {data.descripcion}
        </p>

        {/* Botón de Acción */}
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
            marginTop: "auto",
          }}
        >
          {data.esPlanificador ? "Comenzar a Planear" : "Ver Mapa Interactivo"}{" "}
          <ArrowRight size={16} />
        </button>
      </div>
    </div>
  );
};

// --- COMPONENTE PRINCIPAL ---
const ExperienciasPage: React.FC = () => {
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
        {/* Encabezado */}
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
            categoría para ver el mapa detallado de atracciones.
          </p>
        </div>

        {/* Grid de Tarjetas */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gap: "24px",
          }}
        >
          {experienciasData.map((exp) => (
            <ExperienceCard key={exp.id} data={exp} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ExperienciasPage;
