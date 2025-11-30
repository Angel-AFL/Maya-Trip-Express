import MapTuristico from "./MapTuristico";
import { Train, Clock, Tag } from "lucide-react";

const rutas = [
  {
    titulo: "Mérida a Cancún (Ruta Directa)",
    mejor: true,
    barato: false,
    tiempo: "4h 15min",
    precio: "320 MXN",
    icono: <Train size={18} />,
    descripcion: "Tren directo desde Mérida Teya hasta Cancún Aeropuerto.",
  },
  {
    titulo: "Mérida a Valladolid",
    mejor: false,
    barato: true,
    tiempo: "2h 40min",
    precio: "190 MXN",
    icono: <Train size={18} />,
    descripcion: "Ruta económica haciendo una parada en Izamal.",
  },
  {
    titulo: "Mérida a Izamal",
    mejor: false,
    barato: false,
    tiempo: "1h 30min",
    precio: "120 MXN",
    icono: <Train size={18} />,
    descripcion: "Tren corto ideal para un viaje rápido.",
  },
];

export default function MapPage() {
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
      <div
        style={{
          overflowY: "auto",
          padding: "18px",
          borderRight: "1px solid #ddd",
          background: "#fff",
        }}
      >
        <h2 style={{ marginBottom: "15px" }}>
          3 maneras de viajar en tren desde Mérida
        </h2>

        {rutas.map((r, i) => (
          <div
            key={i}
            style={{
              border: "1px solid #e3e3e3",
              borderRadius: "10px",
              padding: "15px",
              marginBottom: "12px",
              background: "#fff",
              boxShadow: "0 2px 4px rgba(0,0,0,0.05)",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              {r.icono}
              <b>{r.titulo}</b>
            </div>

            <p style={{ margin: "8px 0 5px", fontSize: "14px", opacity: 0.8 }}>
              {r.descripcion}
            </p>

            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginTop: "10px",
              }}
            >
              <span
                style={{ display: "flex", alignItems: "center", gap: "5px" }}
              >
                <Clock size={16} /> {r.tiempo}
              </span>

              <span
                style={{ display: "flex", alignItems: "center", gap: "5px" }}
              >
                <Tag size={16} /> {r.precio}
              </span>
            </div>

            {r.mejor && (
              <span
                style={{
                  marginTop: "10px",
                  display: "inline-block",
                  background: "#2ecc71",
                  color: "#fff",
                  padding: "3px 8px",
                  borderRadius: "5px",
                  fontSize: "12px",
                }}
              >
                MEJOR OPCIÓN
              </span>
            )}

            {r.barato && (
              <span
                style={{
                  marginTop: "10px",
                  display: "inline-block",
                  background: "#3498db",
                  color: "#fff",
                  padding: "3px 8px",
                  borderRadius: "5px",
                  fontSize: "12px",
                }}
              >
                MÁS BARATO
              </span>
            )}
          </div>
        ))}
      </div>

      <div style={{ height: "100%", width: "100%" }}>
        <MapTuristico />
      </div>
    </div>
  );
}
