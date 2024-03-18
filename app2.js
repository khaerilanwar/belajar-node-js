const yargs = require('yargs')
const { simpanContact, detailContact, listContact, removeContact } = require('./contact')

yargs.command({
    command: 'add',
    describe: 'Menambahkan contact baru',
    builder: {
        nama: {
            describe: 'Nama lengkap kontak',
            type: 'string',
            demandOption: true
        },
        email: {
            describe: 'Alamat email aktif',
            type: 'string',
            demandOption: false
        },
        nohp: {
            describe: 'Nomor HP aktif',
            type: 'string',
            demandOption: true,
        },
    },
    handler(argv) {
        simpanContact(argv.nama, argv.email, argv.nohp)
    }
}).demandCommand()

yargs.command({
    command: 'detail',
    describe: 'Menampilkan detail contact berdasarkan nama',
    builder: {
        nama: {
            describe: 'Nama detail kontak',
            type: 'string',
            demandOption: true
        }
    },
    handler(argv) {
        detailContact(argv.nama)
    }
})

yargs.command({
    command: 'list',
    describe: 'Menampilkan daftar kontak',
    handler() {
        listContact()
    }
})

yargs.command({
    command: 'remove',
    describe: 'Menghapus salah satu kontak berdasarkan nama',
    builder: {
        nama: {
            describe: 'Nama detail kontak',
            type: 'string',
            demandOption: true
        }
    },
    handler(argv) {
        removeContact(argv.nama)
    }
})

yargs.parse()