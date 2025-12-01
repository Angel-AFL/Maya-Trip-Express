import { useState } from "react";
import Modal from "./Modal";

interface Item {
  title: string;
  subtitle: string;
  image: string;
  reverse: boolean;
  modalComponent: React.FC;
}

export default function CommunityGrid({ items }: { items: Item[] }) {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<Item | null>(null);

  // rutas dinámicas según el título
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
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 border-t-4 border-black">
        {items.map((item, index) => (
          <button
            key={item.title}
            onClick={() => openModal(item)}
            className={`relative flex items-center p-6 md:p-10 gap-6 border-b-4 border-black w-full text-left
              ${index % 2 === 0 ? "md:border-r-4" : ""}
              ${item.reverse ? "flex-row-reverse text-right" : "flex-row"}
            `}
          >
            {/* Imagen */}
            <div className="w-1/2 aspect-video overflow-hidden rounded-2xl shadow-sm">
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
              />
            </div>

            {/* Texto */}
            <div className="w-1/2 flex flex-col justify-center">
              <h3 className="text-2xl md:text-3xl font-bold text-[#2E7D32] mb-1 lowercase">
                {item.title}
              </h3>
              <p className="text-lg text-black font-medium italic font-serif">
                {item.subtitle}
              </p>
            </div>
          </button>
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
    </>
  );
}
