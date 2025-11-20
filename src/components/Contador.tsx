<<<<<<< HEAD
// src/components/Contador.tsx
import React, { useState } from "react";

const Contador: React.FC = () => {
  const [count, setCount] = useState(0);

  return (
    <div className="p-4 border border-blue-500 rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-2">Contador de React (TSX)</h2>
      <p className="mb-4">
        El contador está en:{" "}
        <span className="text-blue-600 font-extrabold">{count}</span>
      </p>
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        onClick={() => setCount(count + 1)}
      >
        Incrementar
      </button>
    </div>
  );
};

export default Contador;
=======
// src/components/Contador.tsx
import React, { useState } from "react";

const Contador: React.FC = () => {
  const [count, setCount] = useState(0);

  return (
    <div className="p-4 border border-blue-500 rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-2">Contador de React (TSX)</h2>
      <p className="mb-4">
        El contador está en:{" "}
        <span className="text-blue-600 font-extrabold">{count}</span>
      </p>
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        onClick={() => setCount(count + 1)}
      >
        Incrementar
      </button>
    </div>
  );
};

export default Contador;
>>>>>>> a1c1e4d2d7725a89955c4b3c8d28f5fb8aaddb08
