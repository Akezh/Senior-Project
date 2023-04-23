import "@uiw/react-md-editor/markdown-editor.css";
import "@uiw/react-markdown-preview/markdown.css";
import "react-toastify/dist/ReactToastify.css";
import "../styles/globals.css";

import type { AppProps } from "next/app";
import { ThemeProvider } from "next-themes";
import { ToastContainer } from "react-toastify";

import { RoleProvider } from "../providers";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider forcedTheme="dark" attribute="class" enableSystem={false}>
      <RoleProvider>
        <Component {...pageProps} />
        <ToastContainer />
      </RoleProvider>
    </ThemeProvider>
  );
}
