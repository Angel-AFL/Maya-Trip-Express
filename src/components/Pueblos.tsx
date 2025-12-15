// PueblosCosterosSupabaseGaleria.tsx
// Página React conectada a Supabase para PUEBLOS COSTEROS
// Diseño profesional verde/blanco + manejo de errores visible

import React, { useEffect, useState } from "react";
import { supabase } from "../supabaseClient";
import {
  Camera,
  Upload,
  Send,
  ChevronLeft,
  MapPin,
  Waves,
} from "lucide-react";

// ---------------- TYPES ----------------
interface Pueblo {
  id: number;
  titulo: string;
  descripcion: string;
  imagen_principal: string | null;
  categoria: string;
  ubicacion_general: string | null;
}

interface Detalle {
  id: number;
  tipo: "foto" | "tradicion" | "atractivo" | "tienda_cercana";
  valor: string;
}

interface Comentario {
  id: number;
  autor: string;
  texto: string;
  fecha_publicacion: string;
}

// ---------------- PAGE ----------------
const PueblosCosterosSupabaseGaleria: React.FC = () => {
  const [pueblos, setPueblos] = useState<Pueblo[]>([]);
  const [puebloSel, setPuebloSel] = useState<Pueblo | null>(null);
  const [detalles, setDetalles] = useState<Detalle[]>([]);
  const [comentarios, setComentarios] = useState<Comentario[]>([]);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const [fotoURL, setFotoURL] = useState("");
  const [comentarioTxt, setComentarioTxt] = useState("");
  const [autor, setAutor] = useState("");

  // --------- CARGAR PUEBLOS ---------
  useEffect(() => {
    cargarPueblos();
  }, []);

  const cargarPueblos = async () => {
    setLoading(true);
    setErrorMsg(null);

    const { data, error } = await supabase
      .from("pueblos")
      .select("id,titulo,descripcion,imagen_principal,categoria,ubicacion_general")
      .ilike("categoria", "%costero%");

    console.log("PUEBLOS DATA:", data);
    console.log("PUEBLOS ERROR:", error);

    if (error) {
      setErrorMsg("Error al cargar pueblos desde Supabase");
      setPueblos([]);
    } else {
      setPueblos(data || []);
    }

    setLoading(false);
  };

  // --------- DETALLE ---------
  const verDetalle = async (p: Pueblo) => {
    setPuebloSel(p);

    const { data: det } = await supabase
      .from("detalles_pueblo")
      .select("*")
      .eq("pueblo_id", p.id);

    const { data: com } = await supabase
      .from("comentarios")
      .select("*")
      .eq("pueblo_id", p.id)
      .order("fecha_publicacion", { ascending: false });

    setDetalles(det || []);
    setComentarios(com || []);
  };

  // --------- SUBIR FOTO ---------
  const subirFoto = async () => {
    if (!fotoURL || !puebloSel) return;

    await supabase.from("detalles_pueblo").insert({
      pueblo_id: puebloSel.id,
      tipo: "foto",
      valor: fotoURL,
    });

    setFotoURL("");
    verDetalle(puebloSel);
  };

  // --------- COMENTAR ---------
  const publicarComentario = async () => {
    if (!comentarioTxt || !puebloSel) return;

    await supabase.from("comentarios").insert({
      pueblo_id: puebloSel.id,
      autor: autor || "Visitante",
      texto: comentarioTxt,
    });

    setComentarioTxt("");
    setAutor("");
    verDetalle(puebloSel);
  };

  // ---------------- UI DETALLE ----------------
  if (puebloSel) {
    const fotos = detalles.filter((d) => d.tipo === "foto");

    return (
      <div style={{ padding: 40, maxWidth: 1100, margin: "0 auto" }}>
        <button
          onClick={() => setPuebloSel(null)}
          style={{
            display: "flex",
            alignItems: "center",
            gap: 6,
            marginBottom: 20,
            background: "#166534",
            color: "#fff",
            border: "none",
            padding: "10px 16px",
            borderRadius: 10,
            cursor: "pointer",
          }}
        >
          <ChevronLeft size={16} /> Volver
        </button>

        <h1 style={{ fontSize: 34, color: "#14532d" }}>{puebloSel.titulo}</h1>
        <p style={{ color: "#374151" }}>{puebloSel.descripcion}</p>
        <p style={{ display: "flex", gap: 6, marginTop: 6, color: "#166534" }}>
          <MapPin size={16} /> {puebloSel.ubicacion_general}
        </p>

        <h3 style={{ marginTop: 30, color: "#14532d" }}>
          <Camera size={18} /> Galería
        </h3>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill,minmax(200px,1fr))",
            gap: 16,
          }}
        >
          {fotos.map((f) => (
            <img
              key={f.id}
              src={f.valor}
              style={{
                width: "100%",
                height: 150,
                objectFit: "cover",
                borderRadius: 14,
              }}
            />
          ))}
        </div>

        <div style={{ display: "flex", gap: 10, marginTop: 15 }}>
          <input
            value={fotoURL}
            onChange={(e) => setFotoURL(e.target.value)}
            placeholder="URL de la imagen"
            style={{ flex: 1, padding: 10, borderRadius: 8 }}
          />
          <button
            onClick={subirFoto}
            style={{
              background: "#22c55e",
              color: "#fff",
              border: "none",
              padding: "10px 16px",
              borderRadius: 10,
            }}
          >
            <Upload size={16} /> Subir
          </button>
        </div>

        <h3 style={{ marginTop: 40, color: "#14532d" }}>Comentarios</h3>
        <input
          placeholder="Tu nombre"
          value={autor}
          onChange={(e) => setAutor(e.target.value)}
          style={{ width: "100%", marginBottom: 6, padding: 10 }}
        />
        <textarea
          placeholder="Comparte tu experiencia"
          value={comentarioTxt}
          onChange={(e) => setComentarioTxt(e.target.value)}
          style={{ width: "100%", padding: 10 }}
        />
        <button
          onClick={publicarComentario}
          style={{
            marginTop: 10,
            background: "#166534",
            color: "#fff",
            border: "none",
            padding: "10px 18px",
            borderRadius: 10,
          }}
        >
          <Send size={16} /> Publicar
        </button>
      </div>
    );
  }

  // ---------------- LISTADO ----------------
  return (
    <div style={{ padding: 50, background: "#fefffeff", minHeight: "100vh" }}>
      <h1 style={{ fontSize: 38, color: "#14532d", display: "flex", gap: 10 }}>
        <Waves /> Pueblos Costeros
      </h1>
      <p style={{ marginBottom: 30, color: "#374151" }}>
        Comunidades costeras llenas de tradición y naturaleza
      </p>

      {loading && <p>Cargando pueblos...</p>}
      {errorMsg && <p style={{ color: "red" }}>{errorMsg}</p>}

      {!loading && pueblos.length === 0 && (
        <p>No hay pueblos costeros registrados.</p>
      )}

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit,minmax(260px,1fr))",
          gap: 28,
        }}
      >
        {pueblos.map((p) => (
          <div
            key={p.id}
            onClick={() => verDetalle(p)}
            style={{
              borderRadius: 18,
              overflow: "hidden",
              background: "#ffffff",
              boxShadow: "0 12px 25px rgba(0,0,0,0.08)",
              cursor: "pointer",
            }}
          >
            <div
              style={{
                height: 180,
                backgroundImage: `url(${p.imagen_principal || "https://picsum.photos/500/300?green"})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            />
            <div style={{ padding: 18 }}>
              <h3 style={{ color: "#14532d" }}>{p.titulo}</h3>
              <small style={{ color: "#166534" }}>{p.ubicacion_general}</small>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PueblosCosterosSupabaseGaleria;