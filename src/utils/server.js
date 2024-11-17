import express from "express";
import cors from "cors";
import { db } from "./db.js";
import bcrypt from "bcryptjs";

const app = express();
const port = 5000;

app.use(express.json());
app.use(cors());

// Endpoint de registro de usuario
app.post("/register", async (req, res) => {
  const {
    nombre_usuario,
    apellido_usuario,
    dni_usuario,
    username_usuario,
    email_usuario,
    password_usuario,
  } = req.body;

  // Validar campos
  if (
    !nombre_usuario ||
    !apellido_usuario ||
    !dni_usuario ||
    !username_usuario ||
    !email_usuario ||
    !password_usuario
  ) {
    return res.status(400).json({ error: "Todos los campos son obligatorios" });
  }

  try {
    // Verificar si ya existen usuarios con los datos proporcionados
    db.query(
      "SELECT * FROM TM_Usuarios WHERE dni_usuario = ? OR username_usuario = ? OR email_usuario = ?",
      [dni_usuario, username_usuario, email_usuario],
      (err, result) => {
        if (err) {
          console.error("Error al verificar los datos del usuario:", err);
          return res
            .status(500)
            .json({ error: "Error al verificar los datos del usuario." });
        }

        if (result.length > 0) {
          // Verificar cada posible duplicado
          if (result.find((user) => user.dni_usuario === dni_usuario)) {
            return res
              .status(409)
              .json({ error: "El DNI ya está registrado." });
          }
          if (
            result.find((user) => user.username_usuario === username_usuario)
          ) {
            return res
              .status(409)
              .json({ error: "El nombre de usuario ya está registrado." });
          }
          if (result.find((user) => user.email_usuario === email_usuario)) {
            return res
              .status(409)
              .json({ error: "El correo electrónico ya está registrado." });
          }
        }

        // Cifrar la contraseña
        bcrypt.hash(password_usuario, 10, (err, hashedPassword) => {
          if (err) {
            console.error("Error al cifrar la contraseña:", err);
            return res.status(500).json({
              error: "Error al cifrar la contraseña.",
            });
          }

          // Insertar el nuevo usuario con la contraseña cifrada
          db.query(
            "INSERT INTO TM_Usuarios (nombre_usuario, apellido_usuario, dni_usuario, username_usuario, email_usuario, password_usuario) VALUES (?, ?, ?, ?, ?, ?)",
            [
              nombre_usuario,
              apellido_usuario,
              dni_usuario,
              username_usuario,
              email_usuario,
              hashedPassword,
            ],
            (err, result) => {
              if (err) {
                console.error("Error al registrar usuario:", err);
                return res
                  .status(500)
                  .json({ error: "Error al registrar al usuario." });
              }
              res
                .status(201)
                .json({ message: "Usuario registrado con éxito." });
            }
          );
        });
      }
    );
  } catch (err) {
    console.error("Error al registrar usuario:", err);
    res.status(500).json({ error: "Error al registrar al usuario." });
  }
});

// Endpoint de inicio de sesión
app.post("/login", (req, res) => {
  const { login, password } = req.body;

  // Validación de campos
  if (!login || !password) {
    return res.status(400).json({
      success: false,
      message: "Correo o nombre de usuario y contraseña son requeridos.",
    });
  }

  // Consulta en la base de datos para verificar si el login es un correo o un nombre de usuario
  const query =
    "SELECT * FROM TM_Usuarios WHERE email_usuario = ? OR username_usuario = ?";
  db.query(query, [login, login], (err, result) => {
    if (err) {
      console.error("Error en la consulta:", err);
      return res.status(500).json({
        success: false,
        message: "Hubo un problema al procesar la solicitud.",
      });
    }

    if (result.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Usuario o correo electrónico no encontrado.",
      });
    }

    const user = result[0];

    // Comparar la contraseña
    bcrypt.compare(password, user.password_usuario, (err, isMatch) => {
      if (err) {
        return res.status(500).json({
          success: false,
          message: "Error al verificar la contraseña.",
        });
      }

      if (!isMatch) {
        return res.status(400).json({
          success: false,
          message: "Contraseña incorrecta.",
        });
      }

      // Login exitoso
      res.status(200).json({
        success: true,
        message: "Inicio de sesión exitoso.",
      });
    });
  });
});

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});
