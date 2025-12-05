import React, { useState } from "react";

interface SearchProps {
  onSearch: (origen: string, destino: string) => void;
  ubicacionDefault: string;
}

const Search: React.FC<SearchProps> = ({ onSearch, ubicacionDefault }) => {
  const [origen, setOrigen] = useState<string>(
    ubicacionDefault === "Mérida" ? "Mérida Centro" : "Cancún Centro"
  );
  const [destino, setDestino] = useState<string>("");

  const handleSubmit = () => {
    if (origen.trim() && destino.trim()) {
      onSearch(origen, destino);
    } else {
      alert("Por favor, ingresa origen y destino");
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSubmit();
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.searchCard}>
        <div style={styles.titleContainer}>
          <h2 style={styles.title}>Buscar Viajes en Tren</h2>
          <p style={styles.subtitle}>Encuentra la mejor ruta entre destinos</p>
        </div>

        <div style={styles.inputsContainer}>
          <div style={styles.inputGroup}>
            <label style={styles.label}>
              <span style={styles.labelIcon}>🚂</span>
              Origen
            </label>
            <div style={styles.inputWrapper}>
              <input
                type="text"
                value={origen}
                onChange={(e) => setOrigen(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ej: Mérida Centro, Cancún Centro..."
                style={styles.input}
              />
            </div>
          </div>

          <div style={styles.arrowContainer}>
            <div style={styles.arrow}>➡️</div>
          </div>

          <div style={styles.inputGroup}>
            <label style={styles.label}>
              <span style={styles.labelIcon}>🏁</span>
              Destino
            </label>
            <div style={styles.inputWrapper}>
              <input
                type="text"
                value={destino}
                onChange={(e) => setDestino(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ej: Chichén Itzá, Tulum, Playa del Carmen..."
                style={styles.input}
              />
            </div>
          </div>

          <button style={styles.searchButton} onClick={handleSubmit}>
            <span style={styles.buttonIcon}>🔍</span>
            <span style={styles.buttonText}>Buscar Viajes</span>
          </button>
        </div>

        <div style={styles.suggestions}>
          <p style={styles.suggestionsTitle}>Destinos populares:</p>
          <div style={styles.suggestionsList}>
            <button
              style={styles.suggestionBtn}
              onClick={() => {
                setDestino("Chichén Itzá");
                handleSubmit();
              }}
            >
              🗿 Chichén Itzá
            </button>
            <button
              style={styles.suggestionBtn}
              onClick={() => {
                setDestino("Tulum");
                handleSubmit();
              }}
            >
              🏖️ Tulum
            </button>
            <button
              style={styles.suggestionBtn}
              onClick={() => {
                if (ubicacionDefault === "Mérida") {
                  setDestino("Cancún Centro");
                } else {
                  setDestino("Mérida Centro");
                }
                handleSubmit();
              }}
            >
              {ubicacionDefault === "Mérida" ? "🏖️ Cancún" : "🏛️ Mérida"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    width: "100%",
  },
  searchCard: {
    backgroundColor: "rgba(30, 58, 138, 0.25)",
    borderRadius: "20px",
    padding: "2rem",
    border: "1px solid rgba(59, 130, 246, 0.4)",
    boxShadow: "0 15px 35px rgba(0, 0, 0, 0.3)",
    backdropFilter: "blur(10px)",
  },
  titleContainer: {
    marginBottom: "2rem",
    textAlign: "center" as "center",
  },
  title: {
    color: "#ffffff",
    fontSize: "2rem",
    fontWeight: "bold" as "bold",
    margin: "0 0 0.5rem 0",
    textShadow: "0 2px 10px rgba(0, 0, 0, 0.3)",
  },
  subtitle: {
    color: "#dbeafe",
    fontSize: "1rem",
    opacity: 0.9,
    margin: 0,
  },
  inputsContainer: {
    display: "grid",
    gridTemplateColumns: "1fr auto 1fr auto",
    gap: "1.5rem",
    alignItems: "end",
    marginBottom: "2rem",
  },
  inputGroup: {
    flex: 1,
  },
  label: {
    display: "flex",
    alignItems: "center",
    gap: "0.5rem",
    color: "#93c5fd",
    fontSize: "1rem",
    fontWeight: "600" as "600",
    marginBottom: "0.5rem",
  },
  labelIcon: {
    fontSize: "1.2rem",
  },
  inputWrapper: {
    position: "relative" as "relative",
  },
  input: {
    width: "100%",
    padding: "1rem 1rem 1rem 3rem",
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    border: "2px solid rgba(59, 130, 246, 0.5)",
    borderRadius: "12px",
    color: "#ffffff",
    fontSize: "1.1rem",
    transition: "all 0.3s ease",
  },
  arrowContainer: {
    display: "flex",
    alignItems: "center",
    height: "100%",
    paddingBottom: "1.5rem",
  },
  arrow: {
    fontSize: "2rem",
    color: "#3b82f6",
    filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.3))",
  },
  searchButton: {
    backgroundColor: "#3b82f6",
    color: "#ffffff",
    border: "none",
    padding: "1rem 2rem",
    borderRadius: "12px",
    fontSize: "1.1rem",
    fontWeight: "bold" as "bold",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    gap: "0.75rem",
    transition: "all 0.3s ease",
    boxShadow: "0 8px 20px rgba(59, 130, 246, 0.4)",
    height: "fit-content",
  },
  buttonIcon: {
    fontSize: "1.2rem",
  },
  buttonText: {
    whiteSpace: "nowrap" as "nowrap",
  },
  suggestions: {
    backgroundColor: "rgba(15, 23, 42, 0.5)",
    borderRadius: "15px",
    padding: "1.5rem",
    border: "1px solid rgba(59, 130, 246, 0.3)",
  },
  suggestionsTitle: {
    color: "#dbeafe",
    fontSize: "0.95rem",
    margin: "0 0 1rem 0",
    fontWeight: "600" as "600",
  },
  suggestionsList: {
    display: "flex",
    gap: "1rem",
    flexWrap: "wrap" as "wrap",
  },
  suggestionBtn: {
    backgroundColor: "rgba(59, 130, 246, 0.2)",
    color: "#ffffff",
    border: "1px solid rgba(59, 130, 246, 0.4)",
    padding: "0.75rem 1.5rem",
    borderRadius: "25px",
    fontSize: "0.95rem",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    gap: "0.5rem",
    transition: "all 0.3s ease",
  },
};

// Inyectar estilos para hover
const styleSheet = document.styleSheets[0];
if (styleSheet) {
  styleSheet.insertRule(
    `
    .input:focus {
      outline: none;
      border-color: #60a5fa;
      box-shadow: 0 0 0 3px rgba(96, 165, 250, 0.3);
    }
  `,
    styleSheet.cssRules.length
  );

  styleSheet.insertRule(
    `
    .searchButton:hover {
      background-color: #2563eb;
      transform: translateY(-2px);
      box-shadow: 0 12px 25px rgba(37, 99, 235, 0.5);
    }
  `,
    styleSheet.cssRules.length
  );

  styleSheet.insertRule(
    `
    .suggestionBtn:hover {
      background-color: rgba(37, 99, 235, 0.4);
      transform: translateY(-2px);
    }
  `,
    styleSheet.cssRules.length
  );
}

export default Search;
