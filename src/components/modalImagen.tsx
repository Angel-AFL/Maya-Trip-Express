// src/components/modalImagen.tsx
import React from "react";
import { X } from "lucide-react";

const ModalImagen = ({ imagen, onClose }: any) => {
  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50"
      onClick={onClose}
    >
      <div
        className="bg-white p-4 rounded-xl relative max-w-3xl shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className="absolute top-2 right-2 bg-red-600 text-white p-1 rounded-full"
          onClick={onClose}
        >
          <X size={20} />
        </button>

        <img src={imagen} className="max-h-[80vh] rounded-lg" />
      </div>
    </div>
  );
};

export default ModalImagen;
