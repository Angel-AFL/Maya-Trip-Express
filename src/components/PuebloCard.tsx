import React from "react";

const PuebloCard = ({ pueblo, onClick }: any) => (
  <div
    onClick={onClick}
    style={{
      borderRadius: 26,
      overflow: "hidden",
      background: "rgba(255,255,255,.8)",
      boxShadow: "0 30px 60px rgba(0,0,0,.15)",
      cursor: "pointer",
      transition: ".3s",
    }}
  >
    <div
      style={{
        height: 200,
        backgroundImage: `url(${pueblo.imagen_principal || "https://picsum.photos/500"})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    />
    <div style={{ padding: 20 }}>
      <h3 style={{ color: "#14532d" }}>{pueblo.titulo}</h3>
      <small>{pueblo.ubicacion_general}</small>
    </div>
  </div>
);

export default PuebloCard;
