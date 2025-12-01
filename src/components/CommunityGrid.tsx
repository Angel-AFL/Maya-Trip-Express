import { useState } from "react";
import Modal from "./Modal";

interface Item {
  title: string;
  subtitle: string;
  image: string;
  reverse: boolean;
  modalComponent?: React.FC;
}

export default function CommunityGrid({ items }: { items: Item[] }) {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<Item | null>(null);

  const redirectRoutes: Record<string, string> = {
    destacados: "/Community/Destacados",
    Fotos: "/Community/Fotos",
    recomendaciones: "/Community/Recomendaciones",
    opiniones: "/Community/Opiniones",
  };

  const openModal = (item: Item) => {
    setActive(item);
    setOpen(true);
  };

  return (
    <div className="w-full min-h-screen p-6 md:p-10 mx-auto max-w-7xl">
      {/* Contenido Principal - Full Screen Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-2 gap-10">
        {items.map((item) => (
          <div
            key={item.title}
            onClick={() => openModal(item)}
            className="
              cursor-pointer bg-white/90 backdrop-blur-xl border border-black/10
              rounded-3xl shadow-lg hover:shadow-2xl transition-all p-6
              flex flex-col gap-5 hover:-translate-y-1
            "
          >
            {/* Imagen */}
            <div className="overflow-hidden rounded-2xl aspect-video">
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover hover:scale-110 transition-all duration-500"
              />
            </div>

            {/* Texto */}
            <div>
              <h3 className="text-3xl font-extrabold text-[#2E7D32] capitalize">
                {item.title}
              </h3>
              <p className="mt-2 text-black/70 text-lg leading-relaxed">
                {item.subtitle}
              </p>
            </div>

            {/* Botón */}
            <button className="self-start px-4 py-2 rounded-lg bg-[#2E7D32] text-white font-semibold text-sm hover:bg-[#256528] transition">
              Abrir sección →
            </button>
          </div>
        ))}
      </div>

      {/* Modal dinámico */}
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        title={active?.title || ""}
        subtitle={active?.subtitle}
        image={active?.image}
        redirect={active ? redirectRoutes[active.title] : ""}
      />
    </div>
  );
}
