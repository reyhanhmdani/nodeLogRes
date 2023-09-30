const mysql = require ('mysql2');


// Konfigurasi koneksi ke database sumber (Santri)
const sourceDB = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Pastibisa',
    database: 'Santri',
});

// Konfigurasi koneksi ke database tujuan (pzn)
const targetDB = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Pastibisa',
    database: 'sequelize',
});

// Query data dari database sumber
sourceDB.query('SELECT jurusan FROM jurusan', (err, results) => {
    if (err) {
        console.error('Error querying source database:', err);
        return;
    }

    // Memasukkan data ke database tujuan
    const dataToInsert = results.map((row) => [row.jurusan]);
    targetDB.query('INSERT INTO Jurusan (jurusan) VALUES ?', [dataToInsert], (err) => {
        if (err) {
            console.error('Error inserting data into target database:', err);
        } else {
            console.log('Data successfully transferred to target database.');
        }

        // Tutup koneksi ke kedua database
        sourceDB.end();
        targetDB.end();
    });
});
