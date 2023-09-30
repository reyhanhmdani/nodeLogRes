const knex = require('../db/db.config');
const getSantriDataByAsId = async (asId) => {
    return knex('Santri')
        .select('Santri.*', 'Jurusan.jurusan', 'Status.nama_status as status', 'Minat.minat')
        .join('Jurusan', 'Santri.jurusan', 'Jurusan.id')
        .join('Status', 'Santri.status', 'Status.id')
        .join('Minat', 'Santri.minat', 'Minat.id')
        .where('Santri.id', asId)
        .first(); // Mengambil satu baris data
};

// Fungsi untuk mengambil data pengguna berdasarkan ID
const getUserById = async (userId) => {
    return knex('User')
        .select('*')
        .where('User.id', userId)
        .first(); // Mengambil satu baris data
};

const generateSantriProfileResponse = (santri) => {
    return {
        id: santri.id,
        nama: santri.nama,
        hp: santri.hp,
        email: santri.email,
        gender: santri.gender,
        alamat: santri.alamat,
        angkatan: santri.angkatan,
        jurusan: santri.Jurusan ? santri.Jurusan.jurusan : null,
        status: santri.Status ? santri.Status.nama_status : null,
        minat: santri.Minat ? santri.Minat.minat : null,
        // Tambahkan data lain yang Anda ingin sertakan di sini
    };
};





module.exports = {
    getUserById,
    getSantriDataByAsId,
    generateSantriProfileResponse
}