import React, { useState } from "react";
import Search from "../components/Search";
import MapaTuristico from "./MapTuristico";

const MapPage: React.FC = () => {
  const [origen, setOrigen] = useState<string>("Mérida Centro");
  const [destino, setDestino] = useState<string>("");
  const [ubicacionActual, setUbicacionActual] = useState<string>("Mérida");
  const [viajeSeleccionado, setViajeSeleccionado] = useState<any>(null);
  const [lugarSeleccionado, setLugarSeleccionado] = useState<any>(null);

  const handleSearch = (searchOrigen: string, searchDestino: string) => {
    setOrigen(searchOrigen);
    setDestino(searchDestino);

    if (
      searchOrigen.toLowerCase().includes("mérida") ||
      searchOrigen.toLowerCase().includes("merida")
    ) {
      setUbicacionActual("Mérida");
    } else if (
      searchOrigen.toLowerCase().includes("cancún") ||
      searchOrigen.toLowerCase().includes("cancun")
    ) {
      setUbicacionActual("Cancún");
    }

    console.log("Buscando viajes:", {
      origen: searchOrigen,
      destino: searchDestino,
    });
  };

  const handleViajeSeleccionado = (viaje: any) => {
    setViajeSeleccionado(viaje);
  };

  const handleLugarSeleccionado = (lugar: any) => {
    setLugarSeleccionado(lugar);
    // Cuando se selecciona un lugar, establecerlo como destino
    setDestino(lugar.nombre);
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <div style={styles.logoContainer}>
          <div style={styles.logo}>
            <div style={styles.logoSun}></div>
            <div style={styles.logoPyramid}></div>
          </div>
          <div style={styles.titleContainer}>
            <h1 style={styles.title}>Xíimba Maya</h1>
            <div style={styles.titleUnderline}></div>
            <p style={styles.subtitle}>Viajes entre el sur</p>
          </div>
        </div>

        <div style={styles.destinations}>
          <div
            style={{
              ...styles.destinationBtn,
              ...(ubicacionActual === "Mérida" ? styles.destinationActive : {}),
            }}
            onClick={() => {
              setUbicacionActual("Mérida");
              setOrigen("Mérida Centro");
            }}
          >
            <span style={styles.destinationIcon}>🏛️</span>
            <span style={styles.destinationText}>Mérida</span>
          </div>
          <div
            style={{
              ...styles.destinationBtn,
              ...(ubicacionActual === "Cancún" ? styles.destinationActive : {}),
            }}
            onClick={() => {
              setUbicacionActual("Cancún");
              setOrigen("Cancún Centro");
            }}
          >
            <span style={styles.destinationIcon}>🏖️</span>
            <span style={styles.destinationText}>Cancún</span>
          </div>
        </div>
      </div>

      <div style={styles.searchSection}>
        <Search onSearch={handleSearch} ubicacionDefault={ubicacionActual} />
      </div>

      <div style={styles.content}>
        <div style={styles.mapContainer}>
          <MapaTuristico
            origen={origen}
            destino={destino}
            ubicacionActual={ubicacionActual}
            onViajeSeleccionado={handleViajeSeleccionado}
            viajeSeleccionado={viajeSeleccionado}
            onLugarSeleccionado={handleLugarSeleccionado}
          />
        </div>

        <div style={styles.infoPanel}>
          {/* Mostrar información del lugar seleccionado */}
          {lugarSeleccionado ? (
            <div style={styles.lugarInfo}>
              <div style={styles.lugarHeader}>
                <div style={styles.lugarIcon}>{lugarSeleccionado.icono}</div>
                <div>
                  <h3 style={styles.lugarTitle}>{lugarSeleccionado.nombre}</h3>
                  <div style={styles.lugarTipo}>{lugarSeleccionado.tipo}</div>
                </div>
              </div>

              <div style={styles.lugarDetalles}>
                <p style={styles.lugarDescripcion}>
                  {lugarSeleccionado.descripcion}
                </p>

                <div style={styles.lugarCaracteristicas}>
                  <div style={styles.caracteristica}>
                    <span style={styles.caracteristicaIcon}>📍</span>
                    <span>{lugarSeleccionado.ubicacion}</span>
                  </div>
                  <div style={styles.caracteristica}>
                    <span style={styles.caracteristicaIcon}>⏰</span>
                    <span>{lugarSeleccionado.horario}</span>
                  </div>
                  <div style={styles.caracteristica}>
                    <span style={styles.caracteristicaIcon}>💰</span>
                    <span>{lugarSeleccionado.precio}</span>
                  </div>
                </div>

                <div style={styles.reservarLugarSection}>
                  <h4 style={styles.reservarTitle}>
                    Reservar para {lugarSeleccionado.nombre}
                  </h4>
                  <div style={styles.reservarForm}>
                    <div style={styles.formGroup}>
                      <label style={styles.formLabel}>Fecha del viaje:</label>
                      <input type="date" style={styles.formInput} />
                    </div>
                    <div style={styles.formGroup}>
                      <label style={styles.formLabel}>
                        Número de personas:
                      </label>
                      <select style={styles.formInput}>
                        {[1, 2, 3, 4, 5, 6].map((num) => (
                          <option key={num} value={num}>
                            {num} persona{num > 1 ? "s" : ""}
                          </option>
                        ))}
                      </select>
                    </div>
                    <button
                      style={styles.reservarBtnLugar}
                      onClick={() => {
                        alert(
                          `¡Reserva confirmada para ${lugarSeleccionado.nombre}!\nRecibirás un correo con los detalles.`
                        );
                        setLugarSeleccionado(null);
                      }}
                    >
                      Confirmar Reserva - ${lugarSeleccionado.precioNumero} MXN
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <>
              <div style={styles.infoHeader}>
                <h3 style={styles.infoTitle}>Viajes desde {ubicacionActual}</h3>
                <div style={styles.infoBadge}>
                  {ubicacionActual === "Mérida" ? "🏛️" : "🏖️"}
                </div>
              </div>

              <div style={styles.viajesList}>
                {[
                  {
                    id: 1,
                    origen: "Mérida Centro",
                    destino: "Chichén Itzá",
                    precio: 450,
                    duracion: "2h 30m",
                    horario: "08:00 AM",
                    tipo: "Tren Turístico",
                  },
                  {
                    id: 2,
                    origen: "Mérida Centro",
                    destino: "Uxmal",
                    precio: 380,
                    duracion: "1h 45m",
                    horario: "09:30 AM",
                    tipo: "Tren Express",
                  },
                  {
                    id: 3,
                    origen: "Mérida Centro",
                    destino: "Cancún Centro",
                    precio: 850,
                    duracion: "4h 15m",
                    horario: "07:00 AM",
                    tipo: "Tren Panorámico",
                  },
                  {
                    id: 4,
                    origen: "Cancún Centro",
                    destino: "Playa del Carmen",
                    precio: 220,
                    duracion: "1h 15m",
                    horario: "10:00 AM",
                    tipo: "Tren Costero",
                  },
                  {
                    id: 5,
                    origen: "Cancún Centro",
                    destino: "Tulum",
                    precio: 320,
                    duracion: "1h 45m",
                    horario: "11:30 AM",
                    tipo: "Tren Ecológico",
                  },
                ]
                  .filter((viaje) => viaje.origen.includes(ubicacionActual))
                  .map((viaje) => (
                    <div
                      key={viaje.id}
                      style={{
                        ...styles.viajeCard,
                        ...(viajeSeleccionado?.id === viaje.id
                          ? styles.viajeSeleccionado
                          : {}),
                      }}
                      onClick={() => handleViajeSeleccionado(viaje)}
                    >
                      <div style={styles.viajeHeader}>
                        <div style={styles.viajeRuta}>
                          <span style={styles.viajeOrigen}>{viaje.origen}</span>
                          <span style={styles.viajeFlecha}>→</span>
                          <span style={styles.viajeDestino}>
                            {viaje.destino}
                          </span>
                        </div>
                        <div style={styles.viajeTipo}>{viaje.tipo}</div>
                      </div>

                      <div style={styles.viajeDetalles}>
                        <div style={styles.viajeInfo}>
                          <span style={styles.viajeHorario}>
                            ⏰ {viaje.horario}
                          </span>
                          <span style={styles.viajeDuracion}>
                            🕒 {viaje.duracion}
                          </span>
                        </div>
                        <div style={styles.viajePrecio}>
                          <span style={styles.precioValor}>
                            ${viaje.precio} MXN
                          </span>
                        </div>
                      </div>

                      <button
                        style={styles.reservarBtn}
                        onClick={(e) => {
                          e.stopPropagation();
                          alert(
                            `¡Reserva confirmada!\n${viaje.origen} → ${viaje.destino}\nPrecio: $${viaje.precio} MXN\nHorario: ${viaje.horario}`
                          );
                        }}
                      >
                        Reservar Asiento
                      </button>
                    </div>
                  ))}
              </div>
            </>
          )}

          {!lugarSeleccionado && (
            <div style={styles.infoFooter}>
              <p style={styles.footerText}>
                💡 Haz click en cualquier punto turístico del mapa para reservar
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// ESTILOS EN EL MISMO ARCHIVO
const styles = {
  container: {
    backgroundColor: "#0f172a",
    minHeight: "100vh",
    padding: "0",
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    overflowX: "hidden" as "hidden",
  },
  header: {
    background: "linear-gradient(135deg, #1e3a8a 0%, #1d4ed8 100%)",
    padding: "1.5rem 3rem",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    boxShadow: "0 10px 30px rgba(0, 0, 0, 0.3)",
    position: "relative" as "relative",
    zIndex: 10,
  },
  logoContainer: {
    display: "flex",
    alignItems: "center",
    gap: "1.5rem",
  },
  logo: {
    width: "70px",
    height: "70px",
    position: "relative" as "relative",
    filter: "drop-shadow(0 4px 8px rgba(0, 0, 0, 0.3))",
  },
  logoSun: {
    position: "absolute" as "absolute",
    width: "100%",
    height: "100%",
    background:
      "radial-gradient(circle, #fbbf24 0%, #f59e0b 70%, transparent 71%)",
    borderRadius: "50%",
    animation: "pulse 4s infinite alternate",
  },
  logoPyramid: {
    position: "absolute" as "absolute",
    width: "50px",
    height: "40px",
    backgroundColor: "transparent",
    borderBottom: "40px solid #3b82f6",
    borderLeft: "15px solid transparent",
    borderRight: "15px solid transparent",
    bottom: "5px",
    left: "50%",
    transform: "translateX(-50%)",
    filter: "drop-shadow(0 4px 6px rgba(0, 0, 0, 0.4))",
  },
  titleContainer: {
    display: "flex",
    flexDirection: "column" as "column",
  },
  title: {
    color: "#ffffff",
    fontSize: "2.5rem",
    fontWeight: 800,
    letterSpacing: "2px",
    margin: 0,
    textShadow: "0 4px 8px rgba(0, 0, 0, 0.4)",
  },
  titleUnderline: {
    height: "4px",
    width: "100%",
    background: "linear-gradient(90deg, transparent, #60a5fa, transparent)",
    marginTop: "5px",
    borderRadius: "2px",
  },
  subtitle: {
    color: "#dbeafe",
    fontSize: "1rem",
    marginTop: "0.5rem",
    opacity: 0.9,
  },
  destinations: {
    display: "flex",
    gap: "1.5rem",
  },
  destinationBtn: {
    display: "flex",
    alignItems: "center",
    gap: "0.75rem",
    padding: "0.8rem 1.8rem",
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    borderRadius: "12px",
    cursor: "pointer",
    transition: "all 0.3s ease",
    border: "1px solid rgba(255, 255, 255, 0.2)",
  },
  destinationActive: {
    backgroundColor: "rgba(59, 130, 246, 0.3)",
    border: "1px solid #60a5fa",
    boxShadow: "0 0 20px rgba(96, 165, 250, 0.4)",
    transform: "translateY(-2px)",
  },
  destinationIcon: {
    fontSize: "1.5rem",
  },
  destinationText: {
    color: "#ffffff",
    fontSize: "1.1rem",
    fontWeight: 600,
  },
  searchSection: {
    padding: "2rem 3rem",
    backgroundColor: "rgba(30, 58, 138, 0.2)",
  },
  content: {
    display: "grid",
    gridTemplateColumns: "1fr 400px",
    gap: "2rem",
    padding: "0 3rem 3rem 3rem",
    height: "calc(100vh - 250px)",
  },
  mapContainer: {
    borderRadius: "15px",
    overflow: "hidden",
    boxShadow: "0 10px 30px rgba(0, 0, 0, 0.4)",
    border: "1px solid rgba(59, 130, 246, 0.3)",
  },
  infoPanel: {
    backgroundColor: "rgba(30, 41, 59, 0.9)",
    borderRadius: "15px",
    padding: "1.5rem",
    display: "flex",
    flexDirection: "column" as "column",
    border: "1px solid rgba(59, 130, 246, 0.3)",
    boxShadow: "0 10px 25px rgba(0, 0, 0, 0.3)",
    height: "100%",
  },
  // Estilos para información del lugar
  lugarInfo: {
    height: "100%",
    display: "flex",
    flexDirection: "column" as "column",
  },
  lugarHeader: {
    display: "flex",
    alignItems: "center",
    gap: "1rem",
    marginBottom: "1.5rem",
    paddingBottom: "1rem",
    borderBottom: "2px solid #3b82f6",
  },
  lugarIcon: {
    fontSize: "2.5rem",
  },
  lugarTitle: {
    color: "#ffffff",
    fontSize: "1.5rem",
    fontWeight: "bold" as "bold",
    margin: "0 0 0.25rem 0",
  },
  lugarTipo: {
    color: "#93c5fd",
    fontSize: "0.9rem",
    backgroundColor: "rgba(37, 99, 235, 0.2)",
    padding: "0.25rem 0.75rem",
    borderRadius: "15px",
    display: "inline-block",
  },
  lugarDetalles: {
    flex: 1,
    overflowY: "auto" as "auto",
  },
  lugarDescripcion: {
    color: "#dbeafe",
    fontSize: "0.95rem",
    lineHeight: 1.5,
    marginBottom: "1.5rem",
  },
  lugarCaracteristicas: {
    backgroundColor: "rgba(30, 58, 138, 0.3)",
    borderRadius: "12px",
    padding: "1rem",
    marginBottom: "1.5rem",
  },
  caracteristica: {
    display: "flex",
    alignItems: "center",
    gap: "0.75rem",
    marginBottom: "0.75rem",
    color: "#ffffff",
    fontSize: "0.9rem",
  },
  caracteristicaIcon: {
    fontSize: "1rem",
  },
  reservarLugarSection: {
    marginTop: "1.5rem",
  },
  reservarTitle: {
    color: "#ffffff",
    fontSize: "1.2rem",
    fontWeight: "bold" as "bold",
    marginBottom: "1rem",
  },
  reservarForm: {
    backgroundColor: "rgba(30, 58, 138, 0.3)",
    borderRadius: "12px",
    padding: "1.5rem",
  },
  formGroup: {
    marginBottom: "1rem",
  },
  formLabel: {
    display: "block",
    color: "#93c5fd",
    fontSize: "0.9rem",
    marginBottom: "0.5rem",
  },
  formInput: {
    width: "100%",
    padding: "0.75rem",
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    border: "1px solid rgba(59, 130, 246, 0.5)",
    borderRadius: "8px",
    color: "#ffffff",
    fontSize: "1rem",
  },
  reservarBtnLugar: {
    backgroundColor: "#3b82f6",
    color: "#ffffff",
    border: "none",
    padding: "1rem",
    borderRadius: "8px",
    fontWeight: "bold" as "bold",
    fontSize: "1rem",
    cursor: "pointer",
    width: "100%",
    marginTop: "1rem",
    transition: "all 0.3s ease",
  },
  // Estilos para lista de viajes
  infoHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "1.5rem",
    paddingBottom: "1rem",
    borderBottom: "2px solid #3b82f6",
  },
  infoTitle: {
    color: "#ffffff",
    fontSize: "1.4rem",
    fontWeight: "bold" as "bold",
    margin: 0,
  },
  infoBadge: {
    backgroundColor: "rgba(37, 99, 235, 0.3)",
    color: "#ffffff",
    width: "40px",
    height: "40px",
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "1.2rem",
  },
  viajesList: {
    flex: 1,
    overflowY: "auto" as "auto",
    display: "flex",
    flexDirection: "column" as "column",
    gap: "1rem",
  },
  viajeCard: {
    backgroundColor: "rgba(30, 58, 138, 0.4)",
    borderRadius: "12px",
    padding: "1.2rem",
    cursor: "pointer",
    transition: "all 0.3s ease",
    border: "1px solid rgba(59, 130, 246, 0.2)",
  },
  viajeSeleccionado: {
    backgroundColor: "rgba(59, 130, 246, 0.3)",
    border: "2px solid #3b82f6",
    transform: "translateX(5px)",
    boxShadow: "0 5px 15px rgba(59, 130, 246, 0.4)",
  },
  viajeHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: "1rem",
  },
  viajeRuta: {
    display: "flex",
    alignItems: "center",
    gap: "0.5rem",
    flexWrap: "wrap" as "wrap",
  },
  viajeOrigen: {
    color: "#60a5fa",
    fontWeight: "bold" as "bold",
    fontSize: "1.1rem",
  },
  viajeFlecha: {
    color: "#3b82f6",
    fontSize: "1.2rem",
  },
  viajeDestino: {
    color: "#38bdf8",
    fontWeight: "bold" as "bold",
    fontSize: "1.1rem",
  },
  viajeTipo: {
    backgroundColor: "rgba(37, 99, 235, 0.3)",
    color: "#93c5fd",
    padding: "0.25rem 0.75rem",
    borderRadius: "20px",
    fontSize: "0.85rem",
    fontWeight: "bold" as "bold",
  },
  viajeDetalles: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "1rem",
    paddingBottom: "1rem",
    borderBottom: "1px solid rgba(59, 130, 246, 0.2)",
  },
  viajeInfo: {
    display: "flex",
    flexDirection: "column" as "column",
    gap: "0.5rem",
  },
  viajeHorario: {
    color: "#dbeafe",
    fontSize: "0.95rem",
    display: "flex",
    alignItems: "center",
    gap: "0.3rem",
  },
  viajeDuracion: {
    color: "#dbeafe",
    fontSize: "0.95rem",
    display: "flex",
    alignItems: "center",
    gap: "0.3rem",
  },
  viajePrecio: {
    display: "flex",
    flexDirection: "column" as "column",
    alignItems: "flex-end",
  },
  precioValor: {
    color: "#ffffff",
    fontSize: "1.4rem",
    fontWeight: "bold" as "bold",
  },
  reservarBtn: {
    backgroundColor: "#3b82f6",
    color: "#ffffff",
    border: "none",
    padding: "0.75rem 1.5rem",
    borderRadius: "8px",
    fontWeight: "bold" as "bold",
    fontSize: "0.95rem",
    cursor: "pointer",
    width: "100%",
    transition: "all 0.3s ease",
  },
  infoFooter: {
    marginTop: "1.5rem",
    paddingTop: "1rem",
    borderTop: "1px solid rgba(59, 130, 246, 0.2)",
  },
  footerText: {
    color: "#93c5fd",
    fontSize: "0.9rem",
    textAlign: "center" as "center",
    margin: 0,
  },
};

// Inyectar animaciones CSS
const styleSheet = document.styleSheets[0];
if (styleSheet) {
  styleSheet.insertRule(
    `
    @keyframes pulse {
      0% { transform: scale(1); opacity: 0.8; }
      100% { transform: scale(1.05); opacity: 1; }
    }
  `,
    styleSheet.cssRules.length
  );

  styleSheet.insertRule(
    `
    .destinationBtn:hover {
      transform: translateY(-3px);
      box-shadow: 0 10px 25px rgba(59, 130, 246, 0.2);
    }
  `,
    styleSheet.cssRules.length
  );

  styleSheet.insertRule(
    `
    .viajeCard:hover {
      transform: translateY(-2px);
      box-shadow: 0 8px 20px rgba(59, 130, 246, 0.2);
    }
  `,
    styleSheet.cssRules.length
  );

  styleSheet.insertRule(
    `
    .reservarBtn:hover {
      background-color: #2563eb;
      transform: translateY(-2px);
      box-shadow: 0 5px 15px rgba(37, 99, 235, 0.4);
    }
  `,
    styleSheet.cssRules.length
  );

  styleSheet.insertRule(
    `
    .reservarBtnLugar:hover {
      background-color: #2563eb;
      transform: translateY(-2px);
      box-shadow: 0 5px 15px rgba(37, 99, 235, 0.4);
    }
  `,
    styleSheet.cssRules.length
  );
}

export default MapPage;
