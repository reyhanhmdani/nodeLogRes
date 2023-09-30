const knex = require('../db/db.config'); // Impor objek Knex yang telah dikonfigurasi
const {getUserById, getSantriDataByAsId} = require('../helper/ResponUserOrSantri')

exports.getDataByUser = async (req, res) => {
    try {
        const userId = req.user.id; // Mengambil ID pengguna dari token

        // Mengambil data pengguna
        const user = await getUserById(userId);

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const asId = user.as_id;

        // Mengambil data Santri berdasarkan 'as_id'
        const santriData = await getSantriDataByAsId(asId);

        if (!santriData) {
            return res.status(404).json({ message: "Santri not found" });
        }

        // Membentuk respons hanya dengan data Santri
        const santriProfile = {
            id: asId, // Menggunakan 'as_id' sebagai ID Santri
            ...santriData, // Menggabungkan data Santri ke dalam objek respons
        };

        res.status(200).json(santriProfile);
    } catch (error) {
        console.error("Error in getAllByUser:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};