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
  MapPin,
  Star, // Nuevo icono para rating o destacado
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
      "Destino tranquilo con aguas turquesa, perfecto para snorkel y relajación frente al mar, conocido por su gran arrecife de coral.",
    categoria: "Costa Maya",
    imagen:
      "https://rinconesdemexico.com/wp-content/uploads/atardecer-en-Mahahual-2048x1459.jpg",
    fotos: ["https://picsum.photos/id/1015/300/200", "https://picsum.photos/id/1018/300/200"],
    comentarios: [
      { id: 1, autor: "Carla P.", texto: "Un lugar increíblemente tranquilo y hermoso. ¡Volvería mil veces!", fecha: "23/07/2025" }
    ],
    tradiciones: ["Pesca artesanal", "Gastronomía a base de mariscos frescos"],
    atractivos: ["Arrecife Chinchorro", "Faro de Mahahual"],
    ubicacion: "Al sur de Quintana Roo, cerca de la frontera con Belice.",
    tiendasCercanas: ["Tienda de buceo Gato", "Oxxo Costa"],
  },
  {
    id: 2,
    titulo: "Bacalar",
    descripcion:
      "Famoso por la Laguna de los Siete Colores, una maravilla natural única con cenotes y fuerte histórico.",
    categoria: "Laguna Mágica",
    imagen:
      "https://images.sipse.com/ottdLeSfpShKaxDhVml3FAB-loM=/1654x1016/smart/2019/09/02/1567452177126.jpg",
    fotos: ["https://picsum.photos/id/1040/300/200"],
    comentarios: [
      { id: 2, autor: "Viajero Q.", texto: "El color del agua es irreal. ¡Recomendado tomar un tour en velero!", fecha: "01/08/2025" }
    ],
    tradiciones: ["Navegación en palapa", "Cultura lacustre", "Festival de la Cumbia"],
    atractivos: ["Fuerte de San Felipe", "Cenote Azul", "Rápidos de Bacalar"],
    ubicacion: "A 40 km al norte de Chetumal, en el interior de Q. Roo.",
    tiendasCercanas: ["Mercado Municipal", "Farmacia Similares"],
  },
  {
    id: 3,
    titulo: "Xcalak",
    descripcion:
      "Uno de los rincones más vírgenes y remotos del Caribe mexicano, ideal para buceo y pesca deportiva de clase mundial.",
    categoria: "Naturaleza Pura",
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
  {
    id: 4,
    titulo: "Tulum",
    descripcion:
      "Famoso por sus ruinas mayas frente al mar Caribe y su vibrante ambiente bohemio y cosmopolita.",
    categoria: "Cultural & Playa",
    imagen: "https://tse1.mm.bing.net/th/id/OIP.r82XrEdMLz8oAeqjdPYavQHaFj?cb=ucfimg2&ucfimg=1&rs=1&pid=ImgDetMain&o=7&rm=3",
    fotos: ["https://picsum.photos/id/237/300/200"],
    comentarios: [],
    tradiciones: ["Ceremonias de Temazcal", "Yoga y vida saludable"],
    atractivos: ["Zona Arqueológica", "Gran Cenote", "Playa Paraíso"],
    ubicacion: "A 130 km al sur de Cancún, en la Riviera Maya.",
    tiendasCercanas: ["Super Aki", "Boutiques de diseño"],
  },
  {
    id: 5,
    titulo: "Isla Mujeres",
    descripcion:
      "Una joya caribeña de ambiente relajado, perfecta para andar en carrito de golf y disfrutar de la mejor playa de México.",
    categoria: "Isla Tranquila",
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
      "La isla más grande de México, meca del buceo por sus impresionantes formaciones de coral y su atmósfera de puerto internacional.",
    categoria: "Isla de Buceo",
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

// (ImageModal se mantiene igual en funcionalidad, solo cambia el estilo)
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
          <X size={24} color="white"/>
        </button>

        <div style={styles.modalBody}>
          <button
            onClick={() =>
              setIndex((i) => (i - 1 + images.length) % images.length)
            }
            style={styles.modalNav}
          >
            <ChevronLeft size={28} />
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
            <ChevronRight size={28} />
          </button>
        </div>

        <div style={styles.modalFooter}>
          <small style={styles.modalFooterText}>
            {index + 1} de {images.length}
          </small>
        </div>
      </div>
    </div>
  );
};


// ---------------- DETALLE CARD (Diseño elegante y organizado) ----------------
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
      <button onClick={onVolver} style={styles.btnBackDetail}>
        <ChevronLeft size={16} /> Volver a Expediciones
      </button>

      <div style={styles.headerImageDetail(pueblo.imagen)} />

      <div style={styles.cardBodyDetail}>
        <div style={styles.cardMeta}>
          <h2 style={styles.titleDetail}>{pueblo.titulo}</h2>
          <span style={styles.categoryDetail}>{pueblo.categoria}</span>
        </div>

        <p style={styles.descriptionDetail}>{pueblo.descripcion}</p>
        
        {/* Sección de Ubicación y Atractivos */}
        <section style={styles.section}>
          <h3 style={styles.sectionTitle}><MapPin size={18} /> Ubicación y Servicios Esenciales</h3>
          
          <div style={styles.infoGrid}>
            <div style={styles.infoBox}>
              <h4 style={styles.infoTitle}>Ubicación General</h4>
              <p style={styles.infoText}>{pueblo.ubicacion}</p>
            </div>

            <div style={styles.infoBox}>
              <h4 style={styles.infoTitle}>Atractivos Principales</h4>
              <ul style={styles.simpleList}>
                {pueblo.atractivos.map((a, i) => <li key={i}>{a}</li>)}
              </ul>
            </div>

            <div style={styles.infoBox}>
              <h4 style={styles.infoTitle}>Comercios Cercanos</h4>
              <ul style={styles.simpleList}>
                {pueblo.tiendasCercanas.map((t, i) => <li key={i}>{t}</li>)}
              </ul>
            </div>
          </div>
        </section>


        {/* Sección Tradiciones */}
        <section style={styles.section}>
          <h3 style={styles.sectionTitle}><Landmark size={18} /> Tradiciones y Costumbres Locales</h3>
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
              placeholder="Nueva tradición o costumbre a añadir"
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
          <h3 style={styles.sectionTitle}><Camera size={18} /> Galería de la Comunidad ({pueblo.fotos.length})</h3>
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
                type="url"
                placeholder="Pegar URL de la imagen aquí (e.g., https://picsum.photos/300/200)"
                value={fotoURL}
                onChange={(e) => setFotoURL(e.target.value)}
                style={styles.input}
            />
            <button
                onClick={() => {
                    const url = fotoURL.trim();
                    if (url && (url.startsWith('http') || url.startsWith('data:'))) {
                        onSubirFoto(pueblo.id, url);
                        setFotoURL("");
                    } else if (url) {
                      alert('Por favor, ingresa una URL de imagen válida.');
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
          <h3 style={styles.sectionTitle}><MessageSquare size={18} /> Comentarios y Experiencias</h3>
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
              <Send size={16} /> Publicar
            </button>
          </div>
          <div style={{ marginTop: 20, display: 'flex', flexDirection: 'column', gap: 12 }}>
            {pueblo.comentarios.length === 0 ? (
              <small style={styles.empty}>Aún no hay publicaciones — ¡sé el primero en compartir!</small>
            ) : (
              pueblo.comentarios.map((c) => (
                <div key={c.id} style={styles.commentCard}>
                  <div style={styles.commentHeader}>
                    <strong style={{ color: styles.primary }}>{c.autor}</strong>
                    <small style={{ color: "#718096", fontSize: 12 }}>{c.fecha}</small>
                  </div>
                  <p style={{ margin: 0, color: '#4a5568', fontSize: 15 }}>{c.texto}</p>
                </div>
              ))
            )}
          </div>
        </section>
      </div>
    </article>
  );
};


// ---------------- SUMMARY CARD (Diseño Moderno y Bohemio) ----------------
const PuebloSummaryCard: React.FC<{
  pueblo: Pueblo;
  onVerDetalles: (id: number) => void;
}> = ({ pueblo, onVerDetalles }) => {
  // Simular datos de resumen para el diseño de la imagen
  const diasSimulados = pueblo.id + 4; // 5, 6, 7 días
  const costoSimulado = pueblo.id === 4 ? `2500€` : `desde ${1500 + pueblo.id * 80}€`; // Simular costo
  const ratingSimulado = (pueblo.id % 5) + 1; // 1 a 5

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
            <Heart size={16} color="white" style={styles.imageIcon} />
            <MessageSquare size={16} color="white" style={styles.imageIcon} />
            <Camera size={16} color="white" style={styles.imageIcon} />
          </div>
        </div>
      </div>

      {/* 2. Cuerpo de la Tarjeta */}
      <div style={styles.summaryBody}>
        <h3 style={styles.summaryTitle}>{pueblo.titulo}</h3>
        <p style={styles.summaryLocation}>{pueblo.categoria}</p>
        
        <div style={styles.summaryRating}>
          {Array(ratingSimulado).fill(0).map((_, i) => (
            <Star key={i} size={14} color={styles.accent} fill={styles.accent} />
          ))}
        </div>

        <p style={styles.summaryDescription}>
          {pueblo.descripcion.length > 90 ? pueblo.descripcion.substring(0, 90) + '...' : pueblo.descripcion}
        </p>

        <div style={styles.summaryFooter}>
          <div style={styles.summaryPrice}>
            <span style={styles.priceLabel}>Precio total</span>
            <span style={styles.priceValue}>{costoSimulado}</span>
          </div>
          <button style={styles.btnAccentSummary} onClick={() => onVerDetalles(pueblo.id)}>
            Ver Detalles <ChevronRight size={14} />
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
        { id: Date.now(), autor, texto, fecha: new Date().toLocaleDateString('es-ES') },
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
        <header style={styles.heroDetail}>
          <div style={styles.heroInnerDetail}>
            <h1 style={styles.pageTitleDetail}>Detalles de **{puebloSeleccionado.titulo}**</h1>
            <p style={styles.pageSubtitleDetail}>La guía completa para tu próxima expedición a **{puebloSeleccionado.categoria}**.</p>
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
          <h1 style={styles.pageTitle}>🗺️ Expediciones Costeras de la Zona Maya</h1>
          <p style={styles.pageSubtitle}>Descubre 6 destinos únicos y comparte tus experiencias con la comunidad de viajeros.</p>
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
const primary = "#1e293b"; // Gris oscuro/Azul casi negro para texto/títulos (elegante)
const accent = "#A0522D"; // Terracota / Ladrillo suave (Bohemio)
const serifFont = "Georgia, 'Times New Roman', Times, serif";
const sansFont = "'Inter', 'Helvetica Neue', Arial, sans-serif";
const shadowSubtle = "0 6px 16px rgba(0,0,0,0.08)";

// Definición de base para botones fuera del objeto styles
const btnBase = {
  padding: "10px 14px",
  borderRadius: 8,
  border: "none",
  cursor: "pointer",
  fontWeight: 600,
  transition: "all 0.2s ease",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  gap: 8,
  whiteSpace: "nowrap",
  fontSize: 14,
  lineHeight: 1,
};

const styles: { [k: string]: any } = {
  primary,
  accent,
  page: {
    fontFamily: sansFont,
    background: "#f4f7f9",
    minHeight: "100vh",
  },

  // --- HERO for SUMMARY PAGE ---
  hero: {
    background: `linear-gradient(180deg, #ffffff, #f4f7f9)`,
    padding: "60px 20px 40px 20px",
    borderBottom: `1px solid #e2e8f0`,
  },
  heroInner: {
    maxWidth: 1200,
    margin: "0 auto",
    textAlign: "center",
  },
  pageTitle: { fontFamily: serifFont, color: primary, fontSize: 40, margin: 0, fontWeight: 700 },
  pageSubtitle: { color: "#64748b", opacity: 0.9, marginTop: 10, fontSize: 18, fontWeight: 300 },

  // --- HERO for DETAIL PAGE ---
  heroDetail: {
    background: primary,
    color: 'white',
    padding: "60px 20px 30px 20px",
  },
  heroInnerDetail: {
    maxWidth: 800,
    margin: "0 auto",
    textAlign: "center",
  },
  pageTitleDetail: { fontFamily: serifFont, color: "white", fontSize: 32, margin: 0, fontWeight: 700 },
  pageSubtitleDetail: { color: "#cbd5e1", opacity: 0.9, marginTop: 10, fontSize: 16, fontWeight: 300 },


  container: { maxWidth: 1200, margin: "40px auto", padding: "0 20px" },
  containerDetail: { maxWidth: 800, margin: "40px auto", padding: "0 20px" },

  grid: {
    display: "grid",
    gap: 36,
    gridTemplateColumns: "repeat(auto-fit, minmax(350px, 1fr))",
  },

  // --- STYLES FOR SUMMARY CARD (Elegant/Bohemian Look) ---
  summaryCard: {
    background: "white",
    borderRadius: 12, 
    boxShadow: shadowSubtle,
    overflow: "hidden",
    display: "flex",
    flexDirection: "column",
    transition: 'transform 0.2s ease, box-shadow 0.2s ease',
    "&:hover": { transform: 'translateY(-4px)', boxShadow: "0 10px 20px rgba(0,0,0,0.12)" },
    maxWidth: 400, // Ajuste para el diseño de la grilla
    margin: '0 auto',
  },

  summaryImage: (img: string) => ({
    height: 200,
    backgroundImage: `linear-gradient(rgba(0,0,0,0.1), rgba(0,0,0,0.4)), url(${img})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    position: 'relative',
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  }),

  imageOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    padding: 12,
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    color: 'white',
    fontSize: 12,
  },
  imageMetaLeft: {
    background: 'rgba(0,0,0,0.4)',
    padding: '6px 10px',
    borderRadius: 999,
    display: 'flex',
    alignItems: 'center',
    fontWeight: 'bold',
    letterSpacing: 0.5,
  },
  imageMetaRight: {
    display: 'flex',
    gap: 8,
  },
  imageIcon: { opacity: 0.9, filter: 'drop-shadow(0 1px 1px rgba(0,0,0,0.5))' },

  summaryBody: { padding: "20px 24px 24px 24px" },
  
  summaryTitle: { 
    fontFamily: serifFont, 
    fontSize: 26, 
    margin: "0 0 4px 0", 
    color: primary, 
    fontWeight: 700 
  },
  summaryLocation: { 
    fontSize: 14, 
    color: accent, 
    margin: "0 0 10px 0", 
    textTransform: 'uppercase',
    letterSpacing: 1,
    fontWeight: 600,
  },
  summaryRating: {
    display: 'flex',
    gap: 2,
    marginBottom: 10,
  },
  summaryDescription: {
    margin: "0 0 20px 0",
    color: "#475569",
    fontSize: 15,
    lineHeight: 1.5,
  },
  
  summaryFooter: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 15,
    borderTop: '1px dashed #e2e8f0'
  },
  
  summaryPrice: {
    display: 'flex',
    flexDirection: 'column',
    lineHeight: 1.2,
  },
  priceLabel: {
    fontSize: 12,
    color: '#64748b',
    marginBottom: 4,
  },
  priceValue: {
    fontFamily: serifFont,
    fontSize: 22,
    color: accent,
    fontWeight: 700,
  },
  
  btnAccentSummary: {
    ...btnBase,
    background: accent,
    color: "white",
    fontSize: 15,
    padding: '12px 18px',
    borderRadius: 8,
    "&:hover": { backgroundColor: "#8c4828", transform: 'scale(1.02)' }
  },
  
  // --- STYLES FOR DETAIL CARD (Clean and Structured Look) ---
  detailCard: {
    background: "white",
    borderRadius: 12,
    boxShadow: shadowSubtle,
    overflow: "hidden",
    border: `1px solid #e2e8f0`,
    display: "flex",
    flexDirection: "column",
    marginTop: -40, // Sobresalir ligeramente del hero
    zIndex: 1,
    position: 'relative',
  },
  
  btnBackDetail: {
    ...btnBase,
    background: 'transparent',
    color: '#64748b',
    padding: '15px 20px',
    justifyContent: 'flex-start',
    borderBottom: '1px solid #f8f9fa',
    borderRadius: 0,
    fontWeight: 500,
    fontSize: 15,
  },
  headerImageDetail: (img: string) => ({
    height: 300,
    backgroundImage: `linear-gradient(rgba(0,0,0,0.05), rgba(0,0,0,0.1)), url(${img})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
  }),
  cardBodyDetail: { padding: "30px 30px 40px 30px", display: "flex", flexDirection: "column", gap: 25 },
  titleDetail: { fontFamily: serifFont, fontSize: 36, margin: 0, color: primary, fontWeight: 700 },
  categoryDetail: { background: "#e2e8f0", color: primary, padding: "8px 14px", borderRadius: 999, fontSize: 14, fontWeight: 700, alignSelf: 'flex-start' },
  descriptionDetail: { margin: 0, color: "#334155", fontSize: 17, lineHeight: 1.6 },

  // Shared Detail Styles
  cardMeta: { display: "flex", justifyContent: "space-between", alignItems: "center", gap: 12, borderBottom: '1px solid #f8f9fa', paddingBottom: 15 },
  section: { marginTop: 0, paddingTop: 15, borderTop: "1px solid #e2e8f0" },
  sectionTitle: { display: "flex", gap: 8, alignItems: "center", fontSize: 20, margin: "6px 0 15px 0", color: primary, fontWeight: 700 },

  // --- ESTILOS PARA SECCIONES DE INFO (Grid) ---
  infoGrid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 20 },
  infoBox: { padding: 15, background: '#f8fafc', borderRadius: 8, borderLeft: `4px solid ${accent}` },
  infoTitle: { margin: '0 0 8px 0', fontSize: 16, color: primary, fontWeight: 700 },
  infoText: { margin: "0", color: "#475569", fontSize: 15, lineHeight: 1.5 },
  simpleList: { listStyleType: 'disc', paddingLeft: 20, margin: "0", fontSize: 15, color: "#475569" },
  // ---------------------------------------------

  tradList: { listStyle: "none", padding: 0, margin: "10px 0 0 0", display: "flex", gap: 10, flexWrap: "wrap" },
  tradItem: { background: "#e2e8f0", padding: "8px 12px", borderRadius: 6, display: "inline-flex", alignItems: "center", gap: 6, fontSize: 14, color: primary, fontWeight: 500, border: `1px solid #cbd5e1` },
  deleteSmall: { background: "transparent", border: "none", cursor: "pointer", fontSize: 12, color: "#b91c1c", fontWeight: 'bold' },

  gallery: { display: "flex", gap: 12, flexWrap: "wrap", marginTop: 12 },
  thumbWrap: { position: "relative", width: 120, height: 90, borderRadius: 8, overflow: "hidden", boxShadow: "0 4px 8px rgba(0,0,0,0.15)" },
  thumb: { width: "100%", height: "100%", objectFit: "cover", cursor: "pointer", display: "block" },
  deleteThumb: { position: "absolute", top: 4, right: 4, background: "rgba(0,0,0,0.6)", color: "white", border: "none", width: 22, height: 22, borderRadius: 999, cursor: "pointer", display: "flex", justifyContent: "center", alignItems: "center", fontSize: 14, fontWeight: 'bold' },
  empty: { color: "#94a3b8", fontSize: 15, fontStyle: 'italic', padding: 10, border: '1px dashed #e2e8f0', borderRadius: 8 },

  input: { width: "100%", padding: "12px 16px", borderRadius: 8, border: "1px solid #cbd5e1", outline: "none", transition: "border-color 0.2s", "&:focus": { borderColor: accent, boxShadow: `0 0 0 2px ${accent}30` } },
  textarea: { width: "100%", padding: 16, borderRadius: 8, border: "1px solid #cbd5e1", minHeight: 100, outline: "none", transition: "border-color 0.2s", "&:focus": { borderColor: accent, boxShadow: `0 0 0 2px ${accent}30` } },
  rowGap: { display: "flex", gap: 15, marginTop: 15, alignItems: 'stretch' },

  btnPrimary: { ...btnBase, marginTop: 15, background: primary, color: "white", "&:hover": { backgroundColor: "#0f172a" } },
  btnPrimarySmall: { ...btnBase, padding: "10px 16px", background: primary, color: "white", fontWeight: 600, "&:hover": { backgroundColor: "#0f172a" } },
  btnAccent: { ...btnBase, background: accent, color: "white", "&:hover": { backgroundColor: "#8c4828" } },

  commentForm: { display: "flex", flexDirection: "column" },
  commentCard: { background: "#ffffff", padding: 18, borderRadius: 10, boxShadow: "0 1px 4px rgba(0,0,0,0.05)", border: "1px solid #e2e8f0" },
  commentHeader: { display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 10, marginBottom: 8 },

  // Modal (Ajuste de estilo)
  modalOverlay: { position: "fixed", inset: 0, background: "rgba(0,0,0,0.9)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 2000, padding: 20, backdropFilter: "blur(4px)" },
  modalContent: { position: "relative", width: "min(1200px, 98%)", borderRadius: 12, background: "#f8fafc", boxShadow: "0 25px 75px rgba(0,0,0,0.5)", overflow: "hidden" },
  modalClose: { position: "absolute", top: 10, right: 10, background: "rgba(0,0,0,0.6)", color: "white", border: "none", cursor: "pointer", zIndex: 2, width: 40, height: 40, borderRadius: 999, display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'background 0.2s' },
  modalBody: { display: "flex", alignItems: "center", justifyContent: "center", gap: 20, padding: 20 },
  modalImage: { maxHeight: "85vh", width: "auto", maxWidth: "100%", borderRadius: 8, objectFit: 'contain', boxShadow: "0 4px 15px rgba(0,0,0,0.2)" },
  modalNav: { background: "rgba(255,255,255,0.9)", border: `1px solid #cbd5e1`, color: primary, padding: 12, borderRadius: 8, cursor: "pointer", display: "inline-flex", alignItems: "center", justifyContent: "center", transition: 'background 0.2s', "&:hover": { background: "white" } },
  modalFooter: { padding: 15, textAlign: "center", borderTop: "1px solid #e2e8f0", color: '#475569', fontSize: 14 },
  modalFooterText: { fontWeight: 600 },
};