import type { FC } from "react";

interface ModalProps {
  open: boolean;
  onClose: () => void;
  title: string;
  subtitle?: string;
  image?: string;
  redirect?: string;
  contentComponent?: FC; // ⬅️ COMPONENTE DINÁMICO
}

export default function Modal({
  open,
  onClose,
  title,
  subtitle,
  image,
  redirect,
  contentComponent: ContentComponent,
}: ModalProps) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-xl relative flex flex-col items-center text-center">
        {/* Cerrar */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-xl font-bold"
        >
          ✕
        </button>

        {/* Imagen */}
        {image && (
          <div className="w-full h-48 rounded-xl overflow-hidden mb-4">
            <img
              src={image}
              alt={title}
              className="w-full h-full object-cover"
            />
          </div>
        )}

        {/* Título */}
        <h2 className="text-3xl font-bold text-[#2E7D32] mb-2 capitalize">
          {title}
        </h2>

        {/* Subtítulo */}
        {subtitle && (
          <p className="text-lg font-medium italic mb-4">{subtitle}</p>
        )}

        {/* Componente dinámico */}
        {ContentComponent && (
          <div className="w-full mt-2 mb-4">
            <ContentComponent />
          </div>
        )}

        {/* Botón dinámico */}
        {redirect && (
          <a
            href={redirect}
            className="mt-3 inline-block bg-[#2E7D32] text-white px-5 py-2 rounded-xl font-semibold hover:bg-green-700 transition"
          >
            Ir a {title}
          </a>
        )}
      </div>
    </div>
  );
}
