import app from "./app.js";

const PORT = 3000;

app.get("/", (req, res) => {
  res.send("API funcionando");
});

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
});