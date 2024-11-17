import mysql from "mysql";

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "BD_ToDoListPeruvian",
});

db.connect((err) => {
  if (err) {
    console.error("Error de conexión a la base de datos:", err);
  } else {
    console.log("Conexión a la base de datos exitosa");
  }
});

export { db };
