const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
app.use(bodyParser.json());
app.use(cors());

mongoose
  .connect("mongodb+srv://adelformat541:8C0lJvmjapAHu84O@cluster0.ol6cg.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connecté"))
  .catch((err) => console.error("Erreur MongoDB :", err));

const userSchema = new mongoose.Schema({
  email: String,
  password: String,
});

const User = mongoose.model("User", userSchema);

app.get("/", (req, res) =>  {
  res.send("Hello World!");
})

app.post("/api/login", async (req, res) => {
  const { email, password } = req.body;

  const newUser = new User({ email, password });
  try {
    await newUser.save();
    res.status(201).send("Utilisateur enregistré !");
  } catch (err) {
    res.status(500).send("Erreur serveur.");
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Backend lancé sur le port ${PORT}`));
