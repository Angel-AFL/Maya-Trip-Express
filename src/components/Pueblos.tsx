import React, { useState } from "react";
import {
  Landmark,
  Camera,
  Upload,
  Send,
  X,
  ChevronLeft,
  ChevronRight,
  Sun,
  Heart,
  MessageSquare,
  MapPin, // Icono para la nueva sección de atractivos
} from "lucide-react";

// ---------------- TYPES ----------------
interface Comentario {
  id: number;
  autor: string;
  texto: string;
  fecha: string;
}

interface Pueblo {
  id: number;
  titulo: string;
  descripcion: string;
  imagen: string;
  categoria: string;
  fotos: string[];
  comentarios: Comentario[];
  tradiciones: string[];
  // --- NUEVOS CAMPOS ---
  atractivos: string[];
  ubicacion: string; // Describe dónde está (e.g., "Al sur de Quintana Roo")
  tiendasCercanas: string[];
  // ---------------------
}

// ---------------- DATOS INICIALES ----------------
const pueblosIniciales: Pueblo[] = [
  {
    id: 1,
    titulo: "Mahahual",
    descripcion:
      "Destino tranquilo con aguas turquesa, perfecto para snorkel y relajación frente al mar.",
    categoria: "Costa Maya",
    imagen:
      "https://rinconesdemexico.com/wp-content/uploads/atardecer-en-Mahahual-2048x1459.jpg",
    fotos: ["https://picsum.photos/id/1015/300/200", "https://picsum.photos/id/1018/300/200"],
    comentarios: [
      { id: 1, autor: "Carla P.", texto: "Un lugar increíblemente tranquilo y hermoso. ¡Volvería mil veces!", fecha: "23/07/2025" }
    ],
    tradiciones: ["Pesca artesanal", "Gastronomía a base de mariscos"],
    atractivos: ["Arrecife Chinchorro", "Faro de Mahahual"],
    ubicacion: "Al sur de Quintana Roo, cerca de la frontera con Belice.",
    tiendasCercanas: ["Tienda de buceo Gato", "Oxxo Costa"],
  },
  {
    id: 2,
    titulo: "Bacalar",
    descripcion:
      "Famoso por la Laguna de los Siete Colores, una maravilla natural única.",
    categoria: "Laguna",
    imagen:
      "https://images.sipse.com/ottdLeSfpShKaxDhVml3FAB-loM=/1654x1016/smart/2019/09/02/1567452177126.jpg",
    fotos: ["https://picsum.photos/id/1040/300/200"],
    comentarios: [],
    tradiciones: ["Navegación en palapa", "Cultura lacustre"],
    atractivos: ["Fuerte de San Felipe", "Cenote Azul", "Rápidos de Bacalar"],
    ubicacion: "A 40 km al norte de Chetumal, en el interior de Q. Roo.",
    tiendasCercanas: ["Mercado Municipal", "Farmacia Similares"],
  },
  {
    id: 3,
    titulo: "Xcalak",
    descripcion:
      "Uno de los rincones más vírgenes del Caribe mexicano, ideal para buceo y pesca deportiva.",
    categoria: "Naturaleza",
    imagen: "https://en-yucatan.com.mx/fotos/costa-maya/xcalak-hero.jpg",
    fotos: ["https://picsum.photos/id/1037/300/200", "https://picsum.photos/id/1039/300/200", "https://picsum.photos/id/1038/300/200"],
    comentarios: [
      { id: 1, autor: "Buceador Pro", texto: "Los arrecifes aquí están espectaculares. ¡Gran punto de buceo!", fecha: "01/08/2025" }
    ],
    tradiciones: ["Pesca de altura", "Conservación de arrecifes"],
    atractivos: ["Parque Nacional Arrecifes de Xcalak"],
    ubicacion: "Punta sur del Estado de Quintana Roo, muy remoto.",
    tiendasCercanas: ["Minisuper El Pescador"],
  },
  // --- NUEVOS LUGARES ---
  {
    id: 4,
    titulo: "Tulum",
    descripcion:
      "Famoso por sus ruinas mayas frente al mar Caribe y su ambiente bohemio.",
    categoria: "Cultural",
    imagen: "https://tse1.mm.bing.net/th/id/OIP.r82XrEdMLz8oAeqjdPYavQHaFj?cb=ucfimg2&ucfimg=1&rs=1&pid=ImgDetMain&o=7&rm=3",
    fotos: ["https://picsum.photos/id/237/300/200"],
    comentarios: [],
    tradiciones: ["Ceremonias de Temazcal", "Yoga y vida saludable"],
    atractivos: ["Zona Arqueológica", "Gran Cenote", "Playa Paraíso"],
    ubicacion: "A 130 km al sur de Cancún, en la Riviera Maya.",
    tiendasCercanas: ["Super Aki", "boutiques de diseño"],
  },
  {
    id: 5,
    titulo: "Isla Mujeres",
    descripcion:
      "Una joya caribeña de ambiente relajado, perfecta para andar en carrito de golf.",
    categoria: "Isla",
    imagen: "https://tse4.mm.bing.net/th/id/OIP.hKJa-We1ncFpT52AAh1oVAHaE8?cb=ucfimg2&ucfimg=1&rs=1&pid=ImgDetMain&o=7&rm=3",
    fotos: ["https://picsum.photos/id/238/300/200", "https://picsum.photos/id/239/300/200"],
    comentarios: [],
    tradiciones: ["Fiesta de la Virgen de la Concepción"],
    atractivos: ["Punta Sur", "Playa Norte", "Museo Subacuático (MUSA)"],
    ubicacion: "A 20 minutos en ferry desde Cancún.",
    tiendasCercanas: ["Mercado de artesanías", "Tiendas de conveniencia"],
  },
  {
    id: 6,
    titulo: "Cozumel",
    descripcion:
      "La isla más grande de México, meca del buceo por sus impresionantes formaciones de coral.",
    categoria: "Isla",
    imagen: "https://cab3fd4ae07e840188c7-50d1b5a40539d13a7a683523a0ca1dbf.ssl.cf1.rackcdn.com/u/hero-images/La-Ceiba-Hero-Image.jpg",
    fotos: [],
    comentarios: [
      { id: 1, autor: "Felipe G.", texto: "El mejor lugar de buceo que he visitado en México. ¡Impresionante!", fecha: "15/07/2025" }
    ],
    tradiciones: ["Carnaval de Cozumel"],
    atractivos: ["Arrecife Palancar", "El Cielo", "Faro Celarain"],
    ubicacion: "Frente a Playa del Carmen; acceso en ferry.",
    tiendasCercanas: ["Liverpool", "Plaza del Sol"],
  },
];

// (ImageModal se mantiene igual)
// ---------------- MODAL ----------------
const ImageModal: React.FC<{
  abierta: boolean;
  images: string[];
  indexInicial: number;
  onCerrar: () => void;
}> = ({ abierta, images, indexInicial, onCerrar }) => {
  const [index, setIndex] = useState(indexInicial);

  React.useEffect(() => setIndex(indexInicial), [indexInicial, abierta]);

  React.useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (!abierta) return;
      if (e.key === "Escape") onCerrar();
      if (e.key === "ArrowRight")
        setIndex((i) => (i + 1) % images.length);
      if (e.key === "ArrowLeft")
        setIndex((i) => (i - 1 + images.length) % images.length);
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [abierta, images.length, onCerrar]);

  if (!abierta || images.length === 0) return null;

  return (
    <div style={styles.modalOverlay} onClick={onCerrar}>
      <div style={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        <button onClick={onCerrar} style={styles.modalClose}>
          <X size={28} color="white"/>
        </button>

        <div style={styles.modalBody}>
          <button
            onClick={() =>
              setIndex((i) => (i - 1 + images.length) % images.length)
            }
            style={styles.modalNav}
          >
            <ChevronLeft size={32} />
          </button>

          <img
            src={images[index]}
            alt="preview"
            style={styles.modalImage}
          />

          <button
            onClick={() => setIndex((i) => (i + 1) % images.length)}
            style={styles.modalNav}
          >
            <ChevronRight size={32} />
          </button>
        </div>

        <div style={styles.modalFooter}>
          <small>
            {index + 1} / {images.length}
          </small>
        </div>
      </div>
    </div>
  );
};


// ---------------- DETALLE CARD (El diseño anterior completo, ahora con nueva info) ----------------
const PuebloDetailCard: React.FC<{
  pueblo: Pueblo;
  onVolver: () => void;
  onComentar: (id: number, autor: string, texto: string) => void;
  onSubirFoto: (id: number, url: string) => void;
  onAgregarTradicion: (id: number, texto: string) => void;
  onEliminarTradicion: (id: number, idx: number) => void;
  onEliminarFoto: (id: number, idx: number) => void;
  onAbrirGaleria: (images: string[], index: number) => void;
}> = ({
  pueblo,
  onVolver,
  onComentar,
  onSubirFoto,
  onAgregarTradicion,
  onEliminarTradicion,
  onEliminarFoto,
  onAbrirGaleria,
}) => {
  const [comentario, setComentario] = useState("");
  const [autor, setAutor] = useState("");
  const [fotoURL, setFotoURL] = useState("");
  const [nuevaTradicion, setNuevaTradicion] = useState("");

  return (
    <article style={styles.detailCard}>
      <button onClick={onVolver} style={styles.btnBack}>
        <ChevronLeft size={18} /> Volver a Publicaciones
      </button>

      <div style={styles.headerImageDetail(pueblo.imagen)} />

      <div style={styles.cardBodyDetail}>
        <div style={styles.cardMeta}>
          <h2 style={styles.titleDetail}>{pueblo.titulo}</h2>
          <span style={styles.categoryDetail}>{pueblo.categoria}</span>
        </div>

        <p style={styles.descriptionDetail}>{pueblo.descripcion}</p>
        
        {/* Sección de Ubicación y Atractivos (NUEVA) */}
        <section style={styles.section}>
          <h3 style={styles.sectionTitle}><MapPin size={18} /> Ubicación y Servicios</h3>
          
          <div style={styles.infoSection}>
            <h4>Dónde queda</h4>
            <p style={styles.infoText}>{pueblo.ubicacion}</p>
          </div>

          <div style={styles.infoSection}>
            <h4>Atractivos Principales</h4>
            <ul style={styles.simpleList}>
              {pueblo.atractivos.map((a, i) => <li key={i}>{a}</li>)}
            </ul>
          </div>

          <div style={styles.infoSection}>
            <h4>Tiendas más cercanas</h4>
            <ul style={styles.simpleList}>
              {pueblo.tiendasCercanas.map((t, i) => <li key={i}>{t}</li>)}
            </ul>
          </div>
        </section>


        {/* Sección Tradiciones */}
        <section style={styles.section}>
          <h3 style={styles.sectionTitle}><Landmark size={18} /> Tradiciones y Costumbres</h3>
          <ul style={styles.tradList}>
            {pueblo.tradiciones.map((t, i) => (
              <li key={i} style={styles.tradItem}>
                <span>{t}</span>
                <button aria-label={`Eliminar tradición ${t}`} onClick={() => onEliminarTradicion(pueblo.id, i)} style={styles.deleteSmall}>✕</button>
              </li>
            ))}
          </ul>
          <div style={styles.rowGap}>
            <input
              placeholder="Agregar tradición o costumbre"
              value={nuevaTradicion}
              onChange={(e) => setNuevaTradicion(e.target.value)}
              style={styles.input}
            />
            <button
              onClick={() => {
                const t = nuevaTradicion.trim();
                if (t) {
                  onAgregarTradicion(pueblo.id, t);
                  setNuevaTradicion("");
                }
              }}
              style={styles.btnPrimarySmall}
            >
              Añadir
            </button>
          </div>
        </section>

        {/* Galería */}
        <section style={styles.section}>
          <h3 style={styles.sectionTitle}><Camera size={18} /> Galería de la Comunidad</h3>
          <div style={styles.gallery}>
            {pueblo.fotos.length === 0 ? (
              <div style={styles.empty}>No hay fotos — sé el primero en subir.</div>
            ) : (
              pueblo.fotos.map((f, i) => (
                <div key={i} style={styles.thumbWrap}>
                  <img
                    src={f}
                    alt={`${pueblo.titulo} foto ${i + 1}`}
                    style={styles.thumb}
                    onClick={() => onAbrirGaleria(pueblo.fotos, i)}
                  />
                  <button aria-label="Eliminar foto" onClick={() => onEliminarFoto(pueblo.id, i)} style={styles.deleteThumb}>✕</button>
                </div>
              ))
            )}
          </div>
          <div style={styles.rowGap}>
            <input
                type="text"
                placeholder="Pegar URL de la imagen aquí"
                value={fotoURL}
                onChange={(e) => setFotoURL(e.target.value)}
                style={styles.input}
            />
            <button
                onClick={() => {
                    const url = fotoURL.trim();
                    if (url) {
                        onSubirFoto(pueblo.id, url);
                        setFotoURL("");
                    }
                }}
                style={styles.btnAccent}
            >
                <Upload size={16} /> Subir
            </button>
          </div>
        </section>

        {/* Comentarios */}
        <section style={styles.section}>
          <h3 style={styles.sectionTitle}><Send size={18} /> Publicaciones</h3>
          <div style={styles.commentForm}>
            <input
              placeholder="Tu nombre (opcional)"
              value={autor}
              onChange={(e) => setAutor(e.target.value)}
              style={{ ...styles.input, marginBottom: 8 }}
            />
            <textarea
              placeholder="Comparte tu experiencia sobre este pueblo..."
              value={comentario}
              onChange={(e) => setComentario(e.target.value)}
              style={styles.textarea}
            />
            <button
              onClick={() => {
                const txt = comentario.trim();
                if (!txt) return;
                onComentar(pueblo.id, autor || "Usuario Anónimo", txt);
                setComentario("");
                setAutor("");
              }}
              style={styles.btnPrimary}
              disabled={comentario.trim().length === 0}
            >
              Publicar
            </button>
          </div>
          <div style={{ marginTop: 16 }}>
            {pueblo.comentarios.length === 0 ? (
              <small style={styles.empty}>Aún no hay publicaciones — anima a la comunidad.</small>
            ) : (
              pueblo.comentarios.map((c) => (
                <div key={c.id} style={styles.commentCard}>
                  <div style={styles.commentHeader}>
                    <strong style={{ color: styles.primary }}>{c.autor}</strong>
                    <small style={{ color: "#6b7280", fontSize: 12 }}>{c.fecha}</small>
                  </div>
                  <p style={{ margin: 0, color: '#334155' }}>{c.texto}</p>
                </div>
              ))
            )}
          </div>
        </section>
      </div>
    </article>
  );
};


// ---------------- SUMMARY CARD (El nuevo diseño al estilo de la imagen) ----------------
const PuebloSummaryCard: React.FC<{
  pueblo: Pueblo;
  onVerDetalles: (id: number) => void;
}> = ({ pueblo, onVerDetalles }) => {
  // Simular datos de resumen para el diseño de la imagen
  const diasSimulados = pueblo.id + 4; // 5, 6, 7 días
  const costoSimulado = `desde ${1500 + pueblo.id * 40}€`; // Simular costo

  return (
    <article style={styles.summaryCard}>
      {/* 1. Imagen con metadatos */}
      <div style={styles.summaryImage(pueblo.imagen)}>
        <div style={styles.imageOverlay}>
          {/* Metadatos - Esquina superior izquierda (Días) */}
          <div style={styles.imageMetaLeft}>
            <Sun size={14} color="white" />
            <span style={{ marginLeft: 4, fontWeight: 'bold' }}>{diasSimulados} DÍAS</span>
          </div>
          {/* Metadatos - Esquina superior derecha (Iconos) */}
          <div style={styles.imageMetaRight}>
            <Heart size={16} color="white" style={{ opacity: 0.8 }} />
            <MessageSquare size={16} color="white" style={{ opacity: 0.8 }} />
            <Camera size={16} color="white" style={{ opacity: 0.8 }} />
            <ChevronRight size={16} color="white" style={{ opacity: 1 }} />
          </div>
        </div>
      </div>

      {/* 2. Cuerpo de la Tarjeta */}
      <div style={styles.summaryBody}>
        <h3 style={styles.summaryTitle}>{pueblo.titulo}</h3>
        <p style={styles.summaryLocation}>{pueblo.categoria}</p>
        
        <p style={styles.summaryDescription}>
          {pueblo.descripcion.length > 80 ? pueblo.descripcion.substring(0, 80) + '...' : pueblo.descripcion}
        </p>

        <div style={styles.summaryFooter}>
          <div style={styles.summaryPrice}>
            <span style={styles.priceLabel}>desde</span>
            <span style={styles.priceValue}>{costoSimulado}</span>
          </div>
          <button style={styles.btnRed} onClick={() => onVerDetalles(pueblo.id)}>
            Ver Detalles
          </button>
        </div>
      </div>
    </article>
  );
};


// ---------------- PAGE ----------------
const PueblosCosterosPage: React.FC = () => {
  const [pueblos, setPueblos] = useState<Pueblo[]>(pueblosIniciales);
  const [puebloSeleccionado, setPuebloSeleccionado] = useState<Pueblo | null>(null);

  // Modal
  const [modalOpen, setModalOpen] = useState(false);
  const [modalImages, setModalImages] = useState<string[]>([]);
  const [modalIndex, setModalIndex] = useState(0);

  const abrirGaleria = (images: string[], index = 0) => {
    setModalImages(images);
    setModalIndex(index);
    setModalOpen(true);
  };

  const verDetalles = (id: number) => {
    const pueblo = pueblos.find(p => p.id === id);
    setPuebloSeleccionado(pueblo || null);
  };

  const volverASumario = () => {
    setPuebloSeleccionado(null);
  };

  // Funciones de manejo de estado (Comentarios, Fotos, Tradiciones)
  const handleUpdatePueblos = (id: number, updateFn: (p: Pueblo) => Pueblo) => {
    setPueblos((prev) =>
      prev.map((p) => (p.id === id ? updateFn(p) : p))
    );
    // Asegurarse de que el detalle seleccionado se actualice si está abierto
    setPuebloSeleccionado((prev) => (prev && prev.id === id ? updateFn(prev) : prev));
  };
  
  const handleComentar = (id: number, autor: string, texto: string) => {
    handleUpdatePueblos(id, (p) => ({
      ...p,
      comentarios: [
        { id: Date.now(), autor, texto, fecha: new Date().toLocaleDateString() },
        ...p.comentarios,
      ],
    }));
  };

  const handleSubirFoto = (id: number, url: string) => {
    handleUpdatePueblos(id, (p) => ({ ...p, fotos: [url, ...p.fotos] }));
  };

  const handleEliminarFoto = (id: number, idx: number) => {
    handleUpdatePueblos(id, (p) => ({ ...p, fotos: p.fotos.filter((_, i) => i !== idx) }));
  };

  const handleAgregarTradicion = (id: number, texto: string) => {
    handleUpdatePueblos(id, (p) => ({ ...p, tradiciones: [...p.tradiciones, texto] }));
  };

  const handleEliminarTradicion = (id: number, idx: number) => {
    handleUpdatePueblos(id, (p) => ({ ...p, tradiciones: p.tradiciones.filter((_, i) => i !== idx) }));
  };

  if (puebloSeleccionado) {
    return (
      <div style={styles.page}>
        <header style={styles.hero}>
          <div style={styles.heroInner}>
            <h1 style={styles.pageTitle}>Detalles de {puebloSeleccionado.titulo}</h1>
            <p style={styles.pageSubtitle}>Comentarios, fotos, tradiciones y servicios.</p>
          </div>
        </header>

        <main style={styles.containerDetail}>
          <PuebloDetailCard
            pueblo={puebloSeleccionado}
            onVolver={volverASumario}
            onComentar={handleComentar}
            onSubirFoto={handleSubirFoto}
            onAgregarTradicion={handleAgregarTradicion}
            onEliminarTradicion={handleEliminarTradicion}
            onEliminarFoto={handleEliminarFoto}
            onAbrirGaleria={abrirGaleria}
          />
        </main>
        
        <ImageModal abierta={modalOpen} images={modalImages} indexInicial={modalIndex} onCerrar={() => setModalOpen(false)} />
      </div>
    );
  }

  return (
    <div style={styles.page}>
      <header style={styles.hero}>
        <div style={styles.heroInner}>
          <h1 style={styles.pageTitle}>🗺️ Expediciones Costeras de la Zona Maya (6 Destinos)</h1>
          <p style={styles.pageSubtitle}>Descubre los destinos y comparte tus experiencias con la comunidad.</p>
        </div>
      </header>

      <main style={styles.container}>
        <div style={styles.grid}>
          {pueblos.map((p) => (
            <PuebloSummaryCard
              key={p.id}
              pueblo={p}
              onVerDetalles={verDetalles}
            />
          ))}
        </div>
      </main>

      <ImageModal abierta={modalOpen} images={modalImages} indexInicial={modalIndex} onCerrar={() => setModalOpen(false)} />

    </div>
  );
};

export default PueblosCosterosPage;


// ---------------- STYLES (JS objects) ----------------
const primary = "#4a5568"; // Gris oscuro para texto/títulos
const accent = "#6f5e5eff"; // Rojo principal para botones/acento (simulando el diseño)
const serifFont = "Georgia, 'Times New Roman', Times, serif";
const sansFont = "Inter, ui-sans-serif, system-ui";

// Definición de base para botones fuera del objeto styles
const btnBase = {
  padding: "10px 14px",
  borderRadius: 4,
  border: "none",
  cursor: "pointer",
  fontWeight: 700,
  transition: "background-color 0.2s ease, transform 0.1s ease",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  gap: 8,
  whiteSpace: "nowrap",
};

const styles: { [k: string]: any } = {
  primary,
  page: {
    fontFamily: sansFont,
    background: "#fdfdfd",
    minHeight: "100vh",
  },

  hero: {
    background: `linear-gradient(180deg, #f0f0f0, transparent)`,
    padding: "40px 20px",
    borderBottom: `1px solid #e0e0e0`,
  },

  heroInner: {
    maxWidth: 1100,
    margin: "0 auto",
    textAlign: "center",
  },

  pageTitle: { color: primary, fontSize: 32, margin: 0, fontWeight: 800 },
  pageSubtitle: { color: "#718096", opacity: 0.9, marginTop: 10, fontSize: 16 },

  container: { maxWidth: 1100, margin: "36px auto", padding: "0 18px" },
  containerDetail: { maxWidth: 800, margin: "36px auto", padding: "0 18px" },

  grid: {
    display: "grid",
    gap: 32,
    gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
  },

  // --- STYLES FOR SUMMARY CARD (The new look) ---
  summaryCard: {
    background: "white",
    borderRadius: 0, 
    boxShadow: "0 4px 15px rgba(0,0,0,0.05)",
    overflow: "hidden",
    display: "flex",
    flexDirection: "column",
    maxWidth: 360,
    margin: '0 auto'
  },

  summaryImage: (img: string) => ({
    height: 180,
    backgroundImage: `linear-gradient(rgba(0,0,0,0.1), rgba(0,0,0,0.3)), url(${img})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    position: 'relative',
  }),

  imageOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    padding: 10,
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    color: 'white',
    fontSize: 12,
  },
  imageMetaLeft: {
    background: 'rgba(0,0,0,0.5)',
    padding: '4px 8px',
    borderRadius: 4,
    display: 'flex',
    alignItems: 'center',
    fontWeight: 'bold',
  },
  imageMetaRight: {
    display: 'flex',
    gap: 8,
  },

  summaryBody: { padding: "18px 24px 24px 24px" },
  
  summaryTitle: { 
    fontFamily: serifFont, // Serif para títulos
    fontSize: 22, 
    margin: "0 0 5px 0", 
    color: "#2d3748", 
    fontWeight: 400 
  },
  summaryLocation: { 
    fontSize: 14, 
    color: accent, 
    margin: "0 0 10px 0", 
    textTransform: 'uppercase' 
  },
  summaryDescription: {
    margin: "0 0 15px 0",
    color: "#4a5568",
    fontSize: 14,
    lineHeight: 1.4,
  },
  
  summaryFooter: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 10,
    borderTop: '1px solid #ebedf0'
  },
  
  summaryPrice: {
    display: 'flex',
    flexDirection: 'column',
    lineHeight: 1,
  },
  priceLabel: {
    fontSize: 12,
    color: '#718096',
    marginBottom: 4,
  },
  priceValue: {
    fontFamily: serifFont,
    fontSize: 18,
    color: accent,
    fontWeight: 700,
  },
  
  btnRed: {
    ...btnBase,
    background: accent,
    color: "white",
    fontSize: 14,
    padding: '12px 20px',
    borderRadius: 8,
    "&:hover": { backgroundColor: "#e2f8e9ff" }
  },
  
  // --- STYLES FOR DETAIL CARD (The original detailed look, but updated) ---
  detailCard: {
    background: "white",
    borderRadius: 16,
    boxShadow: "0 8px 30px rgba(16,24,40,0.08)",
    overflow: "hidden",
    border: `1px solid #e0e0e0`,
    display: "flex",
    flexDirection: "column",
    paddingBottom: 20,
    marginTop: 20,
  },
  
  btnBack: {
    ...btnBase,
    background: 'transparent',
    color: primary,
    padding: '10px 20px',
    justifyContent: 'flex-start',
    borderBottom: '1px solid #f0f0f0',
    borderRadius: 0,
    fontWeight: 600,
  },
  headerImageDetail: (img: string) => ({
    height: 250,
    backgroundImage: `url(${img})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    marginBottom: 20,
  }),
  cardBodyDetail: { padding: "0 20px 20px 20px", display: "flex", flexDirection: "column", gap: 18 },
  titleDetail: { fontSize: 28, margin: 0, color: "#2d3748", fontWeight: 700 },
  categoryDetail: { background: "#edf2f7", color: primary, padding: "8px 12px", borderRadius: 999, fontSize: 13, fontWeight: 700 },
  descriptionDetail: { margin: 0, color: "#4a5568", fontSize: 16 },

  // Shared Detail Styles
  cardMeta: { display: "flex", justifyContent: "space-between", alignItems: "center", gap: 12 },
  section: { marginTop: 16, paddingTop: 16, borderTop: "1px solid #e9ecef" },
  sectionTitle: { display: "flex", gap: 8, alignItems: "center", fontSize: 17, margin: "6px 0", color: primary, fontWeight: 700 },

  // --- NUEVOS ESTILOS PARA SECCIONES DE INFO ---
  infoSection: { marginTop: 10, paddingLeft: 10, borderLeft: `3px solid #e9ecef` },
  infoText: { margin: "5px 0 10px 0", color: "#4a5568", fontSize: 15 },
  simpleList: { listStyleType: 'disc', paddingLeft: 20, margin: "5px 0 10px 0", fontSize: 15, color: "#4a5568" },
  // ---------------------------------------------

  tradList: { listStyle: "none", padding: 0, margin: "10px 0 0 0", display: "flex", gap: 8, flexWrap: "wrap" },
  tradItem: { background: "#f7fafc", padding: "6px 10px", borderRadius: 8, display: "inline-flex", alignItems: "center", gap: 6, fontSize: 13, border: `1px solid #ebedf0`, color: primary },
  deleteSmall: { background: "transparent", border: "none", cursor: "pointer", fontSize: 12, color: "#993333", fontWeight: 'bold' },

  gallery: { display: "flex", gap: 10, flexWrap: "wrap", marginTop: 12 },
  thumbWrap: { position: "relative", width: 100, height: 75, borderRadius: 8, overflow: "hidden", boxShadow: "0 2px 8px rgba(0,0,0,0.1)" },
  thumb: { width: "100%", height: "100%", objectFit: "cover", cursor: "pointer", display: "block" },
  deleteThumb: { position: "absolute", top: 4, right: 4, background: "rgba(43, 33, 33, 0.8)", color: "white", border: "none", width: 20, height: 20, borderRadius: 999, cursor: "pointer", display: "flex", justifyContent: "center", alignItems: "center", fontSize: 12 },
  empty: { color: "#718096", fontSize: 14, fontStyle: 'italic' },

  input: { width: "100%", padding: "10px 14px", borderRadius: 8, border: "1px solid #d1d5db", outline: "none", transition: "border-color 0.2s", "&:focus": { borderColor: accent } },
  textarea: { width: "100%", padding: 14, borderRadius: 8, border: "1px solid #d1d5db", minHeight: 80, outline: "none", transition: "border-color 0.2s", "&:focus": { borderColor: accent } },
  rowGap: { display: "flex", gap: 12, marginTop: 10, alignItems: 'stretch' },

  btnPrimary: { ...btnBase, marginTop: 10, background: primary, color: "white", borderRadius: 8, "&:hover": { backgroundColor: "#2d3748" } },
  btnPrimarySmall: { ...btnBase, padding: "8px 12px", borderRadius: 6, background: primary, color: "white", fontWeight: 600, "&:hover": { backgroundColor: "#2d3748" } },
  btnAccent: { ...btnBase, background: accent, color: "white", borderRadius: 8, "&:hover": { backgroundColor: "#fdf2f2ff" } },

  commentForm: { display: "flex", flexDirection: "column" },
  commentCard: { background: "#f7f7f9", padding: 14, borderRadius: 10, marginBottom: 10, border: "1px solid #e9edf0" },
  commentHeader: { display: "flex", justifyContent: "space-between", alignItems: "center", gap: 10, marginBottom: 8 },

  // Modal (Actualizados para un mejor contraste)
  modalOverlay: { position: "fixed", inset: 0, background: "rgba(0,0,0,0.85)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 2000, padding: 20, backdropFilter: "blur(2px)" },
  modalContent: { position: "relative", width: "min(1200px, 98%)", borderRadius: 12, background: "white", boxShadow: "0 25px 75px rgba(0,0,0,0.4)", overflow: "hidden" },
  modalClose: { position: "absolute", top: 15, right: 15, background: "rgba(0,0,0,0.5)", color: "white", border: "none", cursor: "pointer", zIndex: 2, width: 35, height: 35, borderRadius: 999, display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'background 0.2s' },
  modalBody: { display: "flex", alignItems: "center", justifyContent: "center", gap: 20, padding: 20 },
  modalImage: { maxHeight: "80vh", width: "auto", maxWidth: "100%", borderRadius: 8, objectFit: 'contain' },
  modalNav: { background: "rgba(255,255,255,0.7)", border: `1px solid #d0d0d0`, color: primary, padding: 10, borderRadius: 6, cursor: "pointer", display: "inline-flex", alignItems: "center", justifyContent: "center", transition: 'background 0.2s', "&:hover": { background: "white" } },
  modalFooter: { padding: 12, textAlign: "center", borderTop: "1px solid #e6e6e6", color: '#4b5563', fontSize: 14 },
};