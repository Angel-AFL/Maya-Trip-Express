import React, { useState } from "react";
import { supabase } from "../supabaseClient";

const ModalNuevoPueblo = ({ open, onClose, onSave }: any) => {
  const [nuevo, setNuevo] = useState({
    titulo: "",
    descripcion: "",
    imagen_principal: "",
    ubicacion_general: "",
  });

  const guardar = async () => {
    await supabase.from("pueblos").insert({
      ...nuevo,
      categoria: "Costero",
    });
    onClose();
    onSave();
  };

  if (!open) return null;

  return (
    <div style={{
      position: "fixed",
      inset: 0,
      background: "rgba(0,0,0,.6)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    }}>
      <div style={{ background: "#fff", padding: 36, borderRadius: 28, width: 460 }}>
        <h2>Nuevo Pueblo Costero</h2>

        {Object.keys(nuevo).map(k => (
          <input
            key={k}
            placeholder={k.replace("_", " ")}
            value={(nuevo as any)[k]}
            onChange={(e) => setNuevo({ ...nuevo, [k]: e.target.value })}
            style={{ width: "100%", padding: 14, marginBottom: 10 }}
          />
        ))}

        <button onClick={guardar} style={{
          background: "#22c55e",
          color: "#fff",
          padding: "14px 26px",
          borderRadius: 999,
          border: "none",
        }}>
          Guardar
        </button>

        <button onClick={onClose} style={{ marginLeft: 10 }}>
          Cancelar
        </button>
      </div>
    </div>
  );
};

export default ModalNuevoPueblo;
