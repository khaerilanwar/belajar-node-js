const { MongoClient } = require('mongodb')

const uri = 'mongodb://127.0.0.1:27017'
const dbName = 'anwar'
const client = new MongoClient(uri)

async function run() {
    try {
        const db = client.db(dbName);

        // Get data on database mahasiswa
        // const mahasiswa = await db.collection('mahasiswa').find().toArray();
        // mahasiswa.forEach(mhs => {
        //     console.log(`nama: ${mhs.nama} email: ${mhs.email} nohp: ${mhs.nohp}`)
        // })

        // Insert a data on database
        // const oneData = {
        //     nama: 'Nurul Rahmanda',
        //     email: 'rahmanda@gmail.com',
        //     nohp: '087800232254'
        // }
        // console.log(await db.collection('mahasiswa').insertOne(oneData))

        // Insert many data on database
        // const manyData = [
        //     {
        //         nama: 'Rahma Liza',
        //         email: 'lizarahma@gmail.com',
        //         nohp: '089800234450'
        //     },
        //     {
        //         nama: 'Jundi Alfatik',
        //         email: 'jundial@gmail.com',
        //         nohp: '085877415023'
        //     }
        // ]

        // console.log(await db.collection('mahasiswa').insertMany(manyData))

        // update one data on database
        // console.log(
        //     await db.collection('mahasiswa').updateOne(
        //         { nama: 'Rahma Liza' },
        //         { $set: { nama: 'Rahma Liza Arifiyah' } }
        //     )
        // )

        // remove one data on database
        // console.log(
        //     await db.collection('mahasiswa').deleteOne({ nama: 'Krisdiana' })
        // )
    } finally {
        // Ensures that the client will close when you finish/error
        await client.close();
    }
}
run().catch(console.dir);