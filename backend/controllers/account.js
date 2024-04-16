const accountSchema = require("../models/accoundModel");

exports.login = async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await accountSchema.findOne({ username });
    if (!user) {
      return res.status(401).json({ message: "username tidak ditemukan" });
    }

    // Periksa apakah fungsi comparePassword ada pada user, jika tidak, buat fallback
    if (user.comparePassword && typeof user.comparePassword === "function") {
      const isMatch = await user.comparePassword(password);
      if (!isMatch) {
        return res.status(401).json({ message: "Password salah" });
      }
    } else {
      // Fallback jika fungsi comparePassword tidak ditemukan
      // Misalnya, menggunakan pembandingan password sederhana (tidak disarankan untuk produksi)
      if (user.password !== password) {
        return res.status(401).json({ message: "Password salah" });
      }
    }

    res.status(200).json({ message: "Login berhasil" });
  } catch (e) {
    res.status(500).json({ message: "Terjadi kesalahan pada server" });
  }
};

exports.register = async (req, res) => {
  const { email, password, username } = req.body;

  try {
    // Cek apakah email sudah terdaftar
    const existingUser = await accountSchema.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email sudah terdaftar" });
    }

    // Membuat user baru
    const newUser = new accountSchema({
      email,
      password,
      username,
    });

    // Menyimpan user baru
    await newUser.save();

    res.status(201).json({ message: "Pendaftaran berhasil" });
  } catch (error) {
    res.status(500).json({ message: "Terjadi kesalahan pada server" });
  }
};
