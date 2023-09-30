const knex = require('../db/db.config'); // Impor objek Knex yang telah dikonfigurasi
const bcrypt = require('bcryptjs');
const { registerUserValidation } = require('../validation/userValidation'); // Impor skema validasi jika digunakan
const jwt = require('jsonwebtoken');


// Fungsi untuk menangani pendaftaran
exports.register = async (req, res) => {
    try {
        const { username, password, as_id } = req.body;

        // Tambahkan validasi di sini jika diperlukan
        const { error } = registerUserValidation.validate({ username, password, as_id });
        if (error) {
            return res.status(400).json({ message: error.details[0].message });
        }

        // Cek apakah username sudah ada dalam database
        const existingUser = await knex('User').where({ username }).first();

        if (existingUser) {
            return res.status(400).json({ message: 'Username already taken' });
        }

        // Enkripsi password sebelum menyimpannya
        const hashedPassword = bcrypt.hashSync(password, 8);

        // Jika as_id ada, cari data Santri berdasarkan as_id
        let user;
        if (as_id !== null) {
            const santri = await knex('Santri').where({ id: as_id }).first();

            if (!santri) {
                return res.status(404).json({ message: 'Santri not found' });
            }

            // Buat user baru dalam database
            user = await knex('User').insert({
                username,
                password: hashedPassword,
                as_id,
            });
        } else {
            // Jika as_id tidak ada atau null, buat user baru tanpa as_id
            user = await knex('User').insert({
                username,
                password: hashedPassword,
            });
        }
        res.json({ message: 'User registered successfully', user: user });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};


exports.login = async (req, res) => {
    try {
        const { username, password } = req.body;

        // Cari pengguna berdasarkan username
        const user = await knex('User').where({ username }).first();

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Verifikasi kata sandi
        const passwordIsValid = bcrypt.compareSync(password, user.password);

        if (!passwordIsValid) {
            return res.status(401).json({ message: 'Invalid password' });
        }

        // Buat token JWT
        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET_KEY, {
            expiresIn: '24h', // Durasi token berlaku
        });

        // Simpan token di tabel User
        await knex('User').where({ id: user.id }).update({ token });

        return res.status(200).json({
            id: user.id,
            username: user.username,
            accessToken: token,
            as_id: user.as_id,
        });
    } catch (error) {
        console.error('Error while signing JWT:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};


exports.getAllUsers = async (req, res) => {
    try {
        const users = await knex('User')
            .select('*'); // Ganti 'user' dengan nama tabel pengguna Anda
        res.status(200).json(users);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

exports.getAllSantri = async (req, res) => {
    try {
        const users = await knex('Santri')
            .select('*'); // Ganti 'user' dengan nama tabel pengguna Anda
        res.status(200).json(users);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};