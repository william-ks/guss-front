// vueform.config.(js|ts)

import pt_BR from "@vueform/vueform/locales/pt_BR";
import { defineConfig } from "@vueform/vueform";
import PluginMask from "@vueform/plugin-mask";
import vueform from "@vueform/vueform/dist/vueform";

import "./styles/vueForm/vueForm.css";

export default defineConfig({
  theme: vueform,
  locales: { pt_BR },
  locale: "pt_BR",
  plugins: [PluginMask],
});
