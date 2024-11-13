import express from "express";
import cors from "cors";
import { db } from "./db.js"; // Asegúrate de tener tu archivo de conexión a DB

const app = express();
const port = 5000;

app.use(express.json());
app.use(cors());

// Endpoint de registro de usuario
app.post("/register", async (req, res) => {
  const { nombre_usuario, email_usuario, contrasena_usuario } = req.body;

  // Validar campos
  if (!nombre_usuario || !email_usuario || !contrasena_usuario) {
    return res.status(400).json({ error: "Todos los campos son obligatorios" });
  }

  try {
    // Verificar si el correo ya existe
    db.query(
      "SELECT * FROM usuario WHERE email_usuario = ?",
      [email_usuario],
      (err, result) => {
        if (err) {
          console.error("Error al verificar el correo electrónico:", err);
          return res
            .status(500)
            .json({ error: "Error al verificar el correo electrónico" });
        }

        if (result.length > 0) {
          // Si el correo ya está registrado
          return res
            .status(409)
            .json({ error: "El correo electrónico ya está registrado" });
        }

        // Insertar el nuevo usuario en la base de datos
        db.query(
          "INSERT INTO usuario (nombre_usuario, email_usuario, contrasena_usuario) VALUES (?, ?, ?)",
          [nombre_usuario, email_usuario, contrasena_usuario],
          (err, result) => {
            if (err) {
              console.error("Error al registrar usuario:", err);
              return res
                .status(500)
                .json({ error: "Hubo un error al registrar al usuario" });
            }
            res.status(201).json({ message: "Usuario registrado con éxito" });
          }
        );
      }
    );
  } catch (err) {
    console.error("Error al registrar usuario:", err);
    res.status(500).json({ error: "Hubo un error al registrar al usuario" });
  }
});

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});
