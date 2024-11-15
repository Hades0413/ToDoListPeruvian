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
  const { nombre_usuario, email_usuario, contrasena_usuario } = req.body;

  // Validar campos
  if (!nombre_usuario || !email_usuario || !contrasena_usuario) {
    return res.status(400).json({ error: "Todos los campos son obligatorios" });
  }

  try {
    // Verificar si el correo ya existe
    db.query(
      "SELECT * FROM usuario WHERE email_usuario = ? OR nombre_usuario = ?",
      [email_usuario, nombre_usuario],
      (err, result) => {
        if (err) {
          console.error("Error al verificar el correo o el nombre:", err);
          return res
            .status(500)
            .json({ error: "Hubo un error al verificar los datos." });
        }

        if (result.length > 0) {
          const existingEmail = result.find(user => user.email_usuario === email_usuario);
          const existingUsername = result.find(user => user.nombre_usuario === nombre_usuario);

          if (existingEmail) {
            return res
              .status(409)
              .json({ error: "El correo electrónico ya está registrado." });
          }

          if (existingUsername) {
            return res
              .status(409)
              .json({ error: "El nombre de usuario ya está registrado." });
          }
        }

        // Cifrar la contraseña
        bcrypt.hash(contrasena_usuario, 10, (err, hashedPassword) => {
          if (err) {
            console.error("Error al cifrar la contraseña:", err);
            return res.status(500).json({
              error: "Hubo un error al cifrar la contraseña.",
            });
          }

          // Insertar el nuevo usuario con la contraseña cifrada
          db.query(
            "INSERT INTO usuario (nombre_usuario, email_usuario, contrasena_usuario) VALUES (?, ?, ?)",
            [nombre_usuario, email_usuario, hashedPassword],
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
        });
      }
    );
  } catch (err) {
    console.error("Error al registrar usuario:", err);
    res.status(500).json({ error: "Hubo un error al registrar al usuario" });
  }
});

// Endpoint de inicio de sesión
app.post("/login", (req, res) => {
  const { email, password } = req.body;

  // Verificar que ambos campos están presentes
  if (!email || !password) {
    return res
      .status(400)
      .json({ success: false, message: "Email y contraseña son requeridos." });
  }

  // Buscar al usuario en la base de datos
  const query = "SELECT * FROM usuario WHERE email_usuario = ?";
  db.query(query, [email], (err, result) => {
    if (err) {
      console.error("Error al realizar la consulta", err);
      return res.status(500).json({
        success: false,
        message: "Hubo un error al intentar iniciar sesión.",
      });
    }

    if (result.length === 0) {
      // Si no se encuentra el usuario
      return res
        .status(400)
        .json({ success: false, message: "Correo electrónico no encontrado." });
    }

    const user = result[0];

    // Compara la contraseña ingresada con la contraseña cifrada
    bcrypt.compare(password, user.contrasena_usuario, (err, isMatch) => {
      if (err) {
        console.error("Error al comparar las contraseñas:", err);
        return res.status(500).json({
          success: false,
          message: "Hubo un error al intentar verificar la contraseña.",
        });
      }

      if (!isMatch) {
        // Si las contraseñas no coinciden
        return res
          .status(400)
          .json({ success: false, message: "Contraseña incorrecta." });
      }

      // Si las credenciales son correctas
      res
        .status(200)
        .json({ success: true, message: "Inicio de sesión exitoso." });
    });
  });
});

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});
