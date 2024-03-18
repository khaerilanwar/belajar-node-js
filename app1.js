// Core modules
// Import core module File System

// Beda menulis file antara sychronous dan asynchronous
// Misal ketika data yang tulis ke file banyak maka
// Program tidak perlu menunggu sampai menulis file selesai (non blocking)

// Menulis teks ke dalam file (synchronous)
// fs.writeFileSync('data/test.txt', 'Hello World secara Synchronous');

// Menulis teks ke dalam file (synchronous)
// fs.writeFile('data/test.txt', 'Hello world secara Asynchronous', (err) => {
//     console.log(err)
// })

// Membaca teks (synchronous)
// const teks = fs.readFileSync('data/test.txt', 'utf-8')
// console.log(teks)

// Membaca teks (synchronous)
// fs.readFile('data/test.txt', 'utf-8', (err, data) => {
//     if (err) throw err;
//     console.log(data);
// })

const contact = require('./contact')

const main = async () => {
    const nama = await contact.tulisPertanyaan("Masukkan nama anda : ")
    const email = await contact.tulisPertanyaan("Masukkan email anda : ")
    const noHP = await contact.tulisPertanyaan("Masukkan nomor anda : ")

    contact.simpanContact(nama, email, noHP)
}

main()