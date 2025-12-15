// src/components/PuebloDetalle.tsx
import React, { useEffect, useState } from "react";
import { supabase } from "../supabaseClient";
import ModalImagen from "./modalImagen";
import { ChevronLeft, MapPin, MessageSquare } from "lucide-react";

interface Props {
  pueblo: any;
  onBack: () => void;
}

const PuebloDetalle = ({ pueblo, onBack }: Props) => {
  const [fotos, setFotos] = useState<string[]>([]);
  const [tradiciones, setTradiciones] = useState<string[]>([]);
  const [atractivos, setAtractivos] = useState<string[]>([]);
  const [tiendas, setTiendas] = useState<string[]>([]);
  const [comentarios, setComentarios] = useState<any[]>([]);
  const [modalImg, setModalImg] = useState<string | null>(null);

  useEffect(() => {
    const fetchDetalles = async () => {
      const { data, error } = await supabase
        .from("detalles_pueblo")
        .select("*")
        .eq("pueblo_id", pueblo.id)
        .order("orden", { ascending: true });

      console.log("DETALLES:", data, "ERROR:", error);

      if (data) {
        setFotos(data.filter(d => d.tipo === "foto").map(d => d.valor));
        setTradiciones(data.filter(d => d.tipo === "tradicion").map(d => d.valor));
        setAtractivos(data.filter(d => d.tipo === "atractivo").map(d => d.valor));
        setTiendas(data.filter(d => d.tipo === "tienda_cercana").map(d => d.valor));
      }
    };

    const fetchComentarios = async () => {
      const { data, error } = await supabase
        .from("comentarios")
        .select("*")
        .eq("pueblo_id", pueblo.id)
        .order("fecha_publicacion", { ascending: false });

      console.log("COMENTARIOS:", data, "ERROR:", error);

      setComentarios(data || []);
    };

    fetchDetalles();
    fetchComentarios();
  }, [pueblo.id]);

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <button
        className="flex items-center gap-2 text-green-700 font-semibold mb-4"
        onClick={onBack}
      >
        <ChevronLeft size={22} /> Regresar
      </button>

      <h1 className="text-3xl font-bold text-green-800">{pueblo.titulo}</h1>

      <div className="flex gap-2 items-center text-gray-700 mt-1">
        <MapPin size={18} />
        {pueblo.ubicacion_general}
      </div>

      {/* GALERÍA */}
      <h2 className="text-2xl text-green-700 mt-6">Galería</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mt-3">
        {fotos.map((img, i) => (
          <img
            key={i}
            src={img}
            className="w-full h-40 object-cover rounded-xl cursor-pointer border border-green-200"
            onClick={() => setModalImg(img)}
          />
        ))}
      </div>

      {modalImg && <ModalImagen imagen={modalImg} onClose={() => setModalImg(null)} />}

      {/* TRADICIONES */}
      <h2 className="text-2xl text-green-700 mt-6">Tradiciones</h2>
      <ul className="list-disc ml-6 text-gray-800">
        {tradiciones.map((t, i) => (
          <li key={i}>{t}</li>
        ))}
      </ul>

      {/* ATRACTIVOS */}
      <h2 className="text-2xl text-green-700 mt-6">Atractivos</h2>
      <ul className="list-disc ml-6 text-gray-800">
        {atractivos.map((a, i) => (
          <li key={i}>{a}</li>
        ))}
      </ul>

      {/* TIENDAS */}
      <h2 className="text-2xl text-green-700 mt-6">Tiendas Cercanas</h2>
      <ul className="list-disc ml-6 text-gray-800">
        {tiendas.map((t, i) => (
          <li key={i}>{t}</li>
        ))}
      </ul>

      {/* COMENTARIOS */}
      <h2 className="text-2xl text-green-700 mt-8">Comentarios</h2>
      <div className="space-y-3 mt-3">
        {comentarios.map((c) => (
          <div key={c.id} className="p-3 bg-green-50 rounded-xl border border-green-200">
            <p className="font-semibold text-green-800">{c.autor}</p>
            <p>{c.texto}</p>
            <span className="text-xs text-gray-500">{c.fecha_publicacion}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PuebloDetalle;
