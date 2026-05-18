import { useEffect, useState } from "react";
import { router } from "./router/index.jsx";

export default function App() {
  const [component, setComponent] =
    useState(null);

  useEffect(() => {
    const renderRoute = () => {
      setComponent(router());
    };

    renderRoute();

    window.addEventListener(
      "hashchange",
      renderRoute
    );

    return () => {
      window.removeEventListener(
        "hashchange",
        renderRoute
      );
    };
  }, []);

  return component;
}