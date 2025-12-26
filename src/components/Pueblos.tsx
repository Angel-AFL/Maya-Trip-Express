import React, { useEffect, useState } from "react";
import { supabase } from "../supabaseClient";
import { Waves, Plus, ChevronLeft, Camera, Upload, Send, MapPin } from "lucide-react";
import PuebloCard from "./PuebloCard";
import ModalNuevoPueblo from "./ModalNuevoPueblo";

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
  tipo: "foto";
  valor: string;
}

interface Comentario {
  id: number;
  autor: string;
  texto: string;
}

const Pueblos: React.FC = () => {
  const [pueblos, setPueblos] = useState<Pueblo[]>([]);
  const [puebloSel, setPuebloSel] = useState<Pueblo | null>(null);
  const [detalles, setDetalles] = useState<Detalle[]>([]);
  const [comentarios, setComentarios] = useState<Comentario[]>([]);
  const [showModal, setShowModal] = useState(false);

  const [fotoURL, setFotoURL] = useState("");
  const [autor, setAutor] = useState("");
  const [comentarioTxt, setComentarioTxt] = useState("");

  useEffect(() => {
    cargarPueblos();
  }, []);

  const cargarPueblos = async () => {
    const { data } = await supabase
      .from("pueblos")
      .select("*")
      .ilike("categoria", "%costero%");
    setPueblos(data || []);
  };

  const verDetalle = async (p: Pueblo) => {
    setPuebloSel(p);

    const { data: det } = await supabase
      .from("detalles_pueblo")
      .select("*")
      .eq("pueblo_id", p.id);

    const { data: com } = await supabase
      .from("comentarios")
      .select("*")
      .eq("pueblo_id", p.id);

    setDetalles(det || []);
    setComentarios(com || []);
  };

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

  const comentar = async () => {
    if (!comentarioTxt || !puebloSel) return;

    await supabase.from("comentarios").insert({
      pueblo_id: puebloSel.id,
      autor: autor || "Visitante",
      texto: comentarioTxt,
    });

    setAutor("");
    setComentarioTxt("");
    verDetalle(puebloSel);
  };

  // ---------------- DETALLE ----------------
  if (puebloSel) {
    return (
      <div style={{ padding: 60, maxWidth: 1200, margin: "auto" }}>
        <button
          onClick={() => setPuebloSel(null)}
          style={{
            background: "linear-gradient(135deg,#166534,#22c55e)",
            color: "#fff",
            padding: "12px 20px",
            borderRadius: 999,
            border: "none",
            display: "flex",
            gap: 8,
            marginBottom: 30,
          }}
        >
          <ChevronLeft size={18} /> Volver
        </button>

        <h1 style={{ fontSize: 42, color: "#14532d" }}>{puebloSel.titulo}</h1>
        <p style={{ fontSize: 18 }}>{puebloSel.descripcion}</p>

        <p style={{ display: "flex", gap: 6, color: "#16a34a" }}>
          <MapPin size={18} /> {puebloSel.ubicacion_general}
        </p>

        <h3 style={{ marginTop: 40, color: "#14532d" }}>
          <Camera /> Galería
        </h3>

        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill,260px)",
          gap: 20
        }}>
          {detalles.map(f => (
            <img
              key={f.id}
              src={f.valor}
              style={{
                width: "100%",
                height: 180,
                objectFit: "cover",
                borderRadius: 20,
                boxShadow: "0 20px 40px rgba(0,0,0,.15)",
              }}
            />
          ))}
        </div>

        <div style={{ display: "flex", gap: 12, marginTop: 16 }}>
          <input
            placeholder="URL de la imagen"
            value={fotoURL}
            onChange={(e) => setFotoURL(e.target.value)}
            style={{ flex: 1, padding: 14, borderRadius: 14 }}
          />
          <button onClick={subirFoto} style={{ background: "#22c55e", color: "#fff", borderRadius: 14 }}>
            <Upload />
          </button>
        </div>

        <h3 style={{ marginTop: 50 }}>Comentarios</h3>

        <input
          placeholder="Tu nombre"
          value={autor}
          onChange={(e) => setAutor(e.target.value)}
          style={{ width: "100%", padding: 14, borderRadius: 14 }}
        />
        <textarea
          placeholder="Comparte tu experiencia"
          value={comentarioTxt}
          onChange={(e) => setComentarioTxt(e.target.value)}
          style={{ width: "100%", padding: 14, borderRadius: 14, marginTop: 8 }}
        />
        <button
          onClick={comentar}
          style={{
            marginTop: 10,
            background: "linear-gradient(135deg,#14532d,#22c55e)",
            color: "#fff",
            padding: "14px 26px",
            borderRadius: 999,
            border: "none",
          }}
        >
          <Send /> Publicar
        </button>
      </div>
    );
  }

  // ---------------- LISTADO ----------------
  return (
    <div style={{ minHeight: "100vh", padding: 60 }}>
      <h1 style={{ fontSize: 48, color: "#14532d", display: "flex", gap: 12 }}>
        <Waves size={40} /> Pueblos Costeros
      </h1>

      <button
        onClick={() => setShowModal(true)}
        style={{
          position: "fixed",
          bottom: 30,
          right: 30,
          background: "linear-gradient(135deg,#22c55e,#16a34a)",
          color: "#fff",
          borderRadius: "50%",
          width: 64,
          height: 64,
          border: "none",
        }}
      >
        <Plus />
      </button>

      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit,300px)",
        gap: 32,
        marginTop: 40,
      }}>
        {pueblos.map(p => (
          <PuebloCard key={p.id} pueblo={p} onClick={() => verDetalle(p)} />
        ))}
      </div>

      <ModalNuevoPueblo
        open={showModal}
        onClose={() => setShowModal(false)}
        onSave={cargarPueblos}
      />
    </div>
  );
};

export default Pueblos;
