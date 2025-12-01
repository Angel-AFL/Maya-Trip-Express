import React, { useState } from "react";
import { Landmark, Camera, Mountain, Palmtree, Upload, Send, X, ChevronLeft, ChevronRight } from "lucide-react";

// Single-file React + TypeScript component. No external files required.
// - Diseño moderno, esquema azul pavo/teal
// - Secciones por pueblo: descripción, costumbres/tradiciones, galería con modal bonito, comentarios
// - Todo en una sola página y en un solo archivo

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
    fotos: [],
    comentarios: [],
    tradiciones: ["Pesca artesanal", "Gastronomía a base de mariscos"],
  },
  {
    id: 2,
    titulo: "Bacalar",
    descripcion:
      "Famoso por la Laguna de los Siete Colores, una maravilla natural única.",
    categoria: "Laguna",
    imagen:
      "https://images.sipse.com/ottdLeSfpShKaxDhVml3FAB-loM=/1654x1016/smart/2019/09/02/1567452177126.jpg",
    fotos: [],
    comentarios: [],
    tradiciones: ["Navegación en palapa", "Cultura lacustre"],
  },
  {
    id: 3,
    titulo: "Xcalak",
    descripcion:
      "Uno de los rincones más vírgenes del Caribe mexicano, ideal para buceo y pesca deportiva.",
    categoria: "Naturaleza",
    imagen: "https://en-yucatan.com.mx/fotos/costa-maya/xcalak-hero.jpg",
    fotos: [],
    comentarios: [],
    tradiciones: ["Pesca de altura", "Conservación de arrecifes"],
  },
];

// ---------------- COMPONENT: Modal de imágenes ----------------
const ImageModal: React.FC<{
  abierta: boolean;
  images: string[];
  indexInicial: number;
  onCerrar: () => void;
}> = ({ abierta, images, indexInicial, onCerrar }) => {
  const [index, setIndex] = useState(indexInicial);

  React.useEffect(() => {
    setIndex(indexInicial);
  }, [indexInicial, abierta]);

  React.useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (!abierta) return;
      if (e.key === "Escape") onCerrar();
      if (e.key === "ArrowRight") setIndex((i) => (i + 1) % images.length);
      if (e.key === "ArrowLeft") setIndex((i) => (i - 1 + images.length) % images.length);
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [abierta, images.length, onCerrar]);

  if (!abierta) return null;
  if (images.length === 0) return null;

  return (
    <div
      aria-modal
      role="dialog"
      style={styles.modalOverlay}
      onClick={onCerrar}
    >
      <div
        style={styles.modalContent}
        onClick={(e) => e.stopPropagation()}
      >
        <button aria-label="Cerrar" onClick={onCerrar} style={styles.modalClose}>
          <X />
        </button>

        <div style={styles.modalBody}>
          <button
            aria-label="Anterior"
            onClick={() => setIndex((i) => (i - 1 + images.length) % images.length)}
            style={styles.modalNav}
          >
            <ChevronLeft />
          </button>

          <img src={images[index]} alt={`imagen ${index + 1}`} style={styles.modalImage} />

          <button
            aria-label="Siguiente"
            onClick={() => setIndex((i) => (i + 1) % images.length)}
            style={styles.modalNav}
          >
            <ChevronRight />
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

// ---------------- COMPONENT: PuebloCard (mejorada) ----------------
const PuebloCard: React.FC<{
  pueblo: Pueblo;
  onComentar: (id: number, autor: string, texto: string) => void;
  onSubirFoto: (id: number, url: string) => void;
  onAgregarTradicion: (id: number, texto: string) => void;
  onEliminarTradicion: (id: number, idx: number) => void;
  onEliminarFoto: (id: number, idx: number) => void;
  onAbrirGaleria: (images: string[], index: number) => void;
}> = ({ pueblo, onComentar, onSubirFoto, onAgregarTradicion, onEliminarTradicion, onEliminarFoto, onAbrirGaleria }) => {
  const [comentario, setComentario] = useState("");
  const [autor, setAutor] = useState("");
  const [fotoURL, setFotoURL] = useState("");
  const [nuevaTradicion, setNuevaTradicion] = useState("");

  return (
    <article style={styles.card} aria-labelledby={`titulo-${pueblo.id}`}>
      <div style={styles.headerImage(pueblo.imagen)} />

      <div style={styles.cardBody}>
        <div style={styles.cardMeta}>
          <h2 id={`titulo-${pueblo.id}`} style={styles.title}>{pueblo.titulo}</h2>
          <span style={styles.category}>{pueblo.categoria}</span>
        </div>

        <p style={styles.description}>{pueblo.descripcion}</p>

        {/* Sección Tradiciones */}
        <section style={styles.section}>
          <h3 style={styles.sectionTitle}><Landmark /> Tradiciones y costumbres</h3>

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
          <h3 style={styles.sectionTitle}><Camera /> Galería</h3>

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

          <div style={{ marginTop: 10 }}>
            <input
              type="text"
              placeholder="Pegar URL de la imagen y presionar Subir"
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
              <Upload size={16} /> Subir foto
            </button>
          </div>
        </section>

        {/* Comentarios */}
        <section style={styles.section}>
          <h3 style={styles.sectionTitle}><Send /> Publicaciones</h3>

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
            >
              Publicar
            </button>
          </div>

          <div style={{ marginTop: 12 }}>
            {pueblo.comentarios.length === 0 ? (
              <small style={{ color: "#6b7280" }}>Aún no hay publicaciones — anima a la comunidad.</small>
            ) : (
              pueblo.comentarios.map((c) => (
                <div key={c.id} style={styles.commentCard}>
                  <div style={styles.commentHeader}>
                    <strong>{c.autor}</strong>
                    <small style={{ color: "#6b7280" }}>{c.fecha}</small>
                  </div>
                  <p style={{ margin: 0 }}>{c.texto}</p>
                </div>
              ))
            )}
          </div>
        </section>
      </div>
    </article>
  );
};

// ---------------- PAGE ----------------
const PueblosCosterosPage: React.FC = () => {
  const [pueblos, setPueblos] = useState<Pueblo[]>(pueblosIniciales);

  // Modal
  const [modalOpen, setModalOpen] = useState(false);
  const [modalImages, setModalImages] = useState<string[]>([]);
  const [modalIndex, setModalIndex] = useState(0);

  const abrirGaleria = (images: string[], index = 0) => {
    setModalImages(images);
    setModalIndex(index);
    setModalOpen(true);
  };

  // Comentarios
  const handleComentar = (id: number, autor: string, texto: string) => {
    setPueblos((prev) =>
      prev.map((p) =>
        p.id === id
          ? {
              ...p,
              comentarios: [
                ...p.comentarios,
                { id: Date.now(), autor, texto, fecha: new Date().toLocaleDateString() },
              ],
            }
          : p
      )
    );
  };

  // Subir foto
  const handleSubirFoto = (id: number, url: string) => {
    setPueblos((prev) =>
      prev.map((p) => (p.id === id ? { ...p, fotos: [...p.fotos, url] } : p))
    );
  };

  // Eliminar foto
  const handleEliminarFoto = (id: number, idx: number) => {
    setPueblos((prev) =>
      prev.map((p) =>
        p.id === id ? { ...p, fotos: p.fotos.filter((_, i) => i !== idx) } : p
      )
    );
  };

  // Tradicion
  const handleAgregarTradicion = (id: number, texto: string) => {
    setPueblos((prev) =>
      prev.map((p) => (p.id === id ? { ...p, tradiciones: [...p.tradiciones, texto] } : p))
    );
  };

  const handleEliminarTradicion = (id: number, idx: number) => {
    setPueblos((prev) =>
      prev.map((p) =>
        p.id === id ? { ...p, tradiciones: p.tradiciones.filter((_, i) => i !== idx) } : p
      )
    );
  };

  return (
    <div style={styles.page}>
      <header style={styles.hero}>
        <div style={styles.heroInner}>
          <h1 style={styles.pageTitle}>Publicaciones — Pueblos Costeros de la Zona Maya</h1>
          <p style={styles.pageSubtitle}>Una sección estilo red social para compartir fotos, tradiciones y experiencias.</p>
        </div>
      </header>

      <main style={styles.container}>
        <div style={styles.grid}>
          {pueblos.map((p) => (
            <PuebloCard
              key={p.id}
              pueblo={p}
              onComentar={handleComentar}
              onSubirFoto={handleSubirFoto}
              onAgregarTradicion={handleAgregarTradicion}
              onEliminarTradicion={handleEliminarTradicion}
              onEliminarFoto={handleEliminarFoto}
              onAbrirGaleria={abrirGaleria}
            />
          ))}
        </div>
      </main>

      <ImageModal abierta={modalOpen} images={modalImages} indexInicial={modalIndex} onCerrar={() => setModalOpen(false)} />

      {/* Small footer */}
      <footer style={styles.footer}>Hecho con ❤️ · Diseño azul pavo · Página única (single-file)</footer>
    </div>
  );
};

export default PueblosCosterosPage;

// ---------------- STYLES (JS objects) ----------------
const primary = "#0f766e"; // azul pavo / teal deep
const accent = "#06b6d4"; // aqua

const styles: { [k: string]: any } = {
  page: { fontFamily: "Inter, ui-sans-serif, system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', Arial", background: "#f1f8f7", minHeight: "100vh" },
  hero: { background: `linear-gradient(180deg, ${primary}22, transparent)`, padding: "36px 20px", borderBottom: `1px solid ${primary}11` },
  heroInner: { maxWidth: 1100, margin: "0 auto", textAlign: "center" },
  pageTitle: { color: primary, fontSize: 34, margin: 0, fontWeight: 900 },
  pageSubtitle: { color: "#064e4c", opacity: 0.85, marginTop: 8 },
  container: { maxWidth: 1100, margin: "26px auto", padding: "0 18px" },
  grid: { display: "grid", gap: 28, gridTemplateColumns: "repeat(auto-fit, minmax(360px, 1fr))" },

  card: { background: "white", borderRadius: 16, boxShadow: "0 8px 30px rgba(16,24,40,0.08)", overflow: "hidden", border: `1px solid ${primary}11`, display: "flex", flexDirection: "column" },
  headerImage: (img: string) => ({ height: 220, backgroundImage: `url(${img})`, backgroundSize: "cover", backgroundPosition: "center", borderBottomLeftRadius: 16, borderBottomRightRadius: 16 }),
  cardBody: { padding: 18, display: "flex", flexDirection: "column", gap: 12 },
  cardMeta: { display: "flex", justifyContent: "space-between", alignItems: "center", gap: 12 },
  title: { fontSize: 20, margin: 0, color: "#052f2d", fontWeight: 800 },
  category: { background: `${accent}22`, color: primary, padding: "6px 10px", borderRadius: 999, fontSize: 12, fontWeight: 700 },
  description: { margin: 0, color: "#475569" },

  section: { marginTop: 8, paddingTop: 6, borderTop: "1px solid #eef2f2" },
  sectionTitle: { display: "flex", gap: 8, alignItems: "center", fontSize: 15, margin: "6px 0", color: primary, fontWeight: 800 },

  tradList: { listStyle: "none", padding: 0, margin: 0, display: "flex", gap: 8, flexWrap: "wrap" },
  tradItem: { background: "#ecfeff", padding: "8px 10px", borderRadius: 10, display: "inline-flex", alignItems: "center", gap: 8, fontSize: 13, border: `1px solid ${primary}11` },
  deleteSmall: { background: "transparent", border: "none", cursor: "pointer", fontSize: 12, color: "#7f1d1d" },

  gallery: { display: "flex", gap: 10, flexWrap: "wrap", marginTop: 8 },
  thumbWrap: { position: "relative", width: 92, height: 72, borderRadius: 8, overflow: "hidden", boxShadow: "0 4px 10px rgba(2,6,23,0.06)" },
  thumb: { width: "100%", height: "100%", objectFit: "cover", cursor: "pointer", display: "block" },
  deleteThumb: { position: "absolute", top: 6, right: 6, background: "rgba(0,0,0,0.5)", color: "white", border: "none", width: 22, height: 22, borderRadius: 999, cursor: "pointer", display: "flex", justifyContent: "center", alignItems: "center", fontSize: 12 },
  empty: { color: "#6b7280", fontSize: 13 },

  input: { width: "100%", padding: "10px 12px", borderRadius: 10, border: "1px solid #d1d5db", outline: "none" },
  textarea: { width: "100%", padding: 12, borderRadius: 10, border: "1px solid #d1d5db", minHeight: 80 },
  rowGap: { display: "flex", gap: 8, marginTop: 8 },

  btnPrimary: { marginTop: 8, background: primary, color: "white", padding: "10px 12px", borderRadius: 10, border: "none", cursor: "pointer", fontWeight: 800 },
  btnPrimarySmall: { background: primary, color: "white", padding: "8px 10px", borderRadius: 8, border: "none", cursor: "pointer", fontWeight: 700 },
  btnAccent: { marginTop: 8, background: accent, color: "#00323a", padding: "10px 12px", borderRadius: 10, border: "none", cursor: "pointer", fontWeight: 800 },

  commentForm: { display: "flex", flexDirection: "column" },
  commentCard: { background: "#f8fafb", padding: 12, borderRadius: 10, marginBottom: 8, border: "1px solid #e6eef0" },
  commentHeader: { display: "flex", justifyContent: "space-between", alignItems: "center", gap: 8, marginBottom: 6 },

  footer: { textAlign: "center", padding: 18, color: "#0f766e", opacity: 0.9 },

  // Modal
  modalOverlay: { position: "fixed", inset: 0, background: "rgba(2,6,23,0.5)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 2000, padding: 20 },
  modalContent: { position: "relative", width: "min(1100px, 96%)", borderRadius: 14, background: "linear-gradient(180deg, #ffffff, #f7ffff)", boxShadow: "0 20px 60px rgba(2,6,23,0.4)", overflow: "hidden" },
  modalClose: { position: "absolute", top: 10, right: 10, background: "transparent", border: "none", cursor: "pointer", zIndex: 2 },
  modalBody: { display: "flex", alignItems: "center", justifyContent: "center", gap: 12, padding: 24 },
  modalImage: { maxHeight: "70vh", width: "auto", maxWidth: "100%", borderRadius: 10, boxShadow: "0 12px 40px rgba(2,6,23,0.25)" },
  modalNav: { background: "rgba(255,255,255,0.9)", border: "none", padding: 12, borderRadius: 10, cursor: "pointer", display: "inline-flex", alignItems: "center", justifyContent: "center" },
  modalFooter: { padding: 10, textAlign: "center", borderTop: "1px solid #e6f6f6" },
};
