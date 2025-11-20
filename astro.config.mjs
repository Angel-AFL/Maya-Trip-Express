// @ts-check
import { defineConfig } from "astro/config";

import tailwindcss from "@tailwindcss/vite";

import react from "@astrojs/react";

import tailwindcss from '@tailwindcss/vite';

import react from '@astrojs/react';

// https://astro.build/config
export default defineConfig({
  vite: {
<<<<<<< HEAD
    plugins: [tailwindcss()],
  },

  integrations: [react()],
});
=======
    plugins: [tailwindcss()]
  },

  integrations: [react()]
});
>>>>>>> a1c1e4d2d7725a89955c4b3c8d28f5fb8aaddb08
