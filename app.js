const express = require('express')
const expressLayouts = require('express-ejs-layouts')
const { body, validationResult, check } = require('express-validator');
const { loadContacts, findContact, cekDuplikat, addContact, removeContact, updateContacts } = require('./utils/contact')
const session = require('express-session')
const cookieParser = require('cookie-parser')
const flash = require('connect-flash')
const app = express()
const port = 3000

app.set('view engine', 'ejs')
app.use(expressLayouts);
app.use(express.urlencoded({ extended: true }))

// konfigurasi flash
app.use(cookieParser('secret'))
app.use(
    session({
        cookie: { maxAge: 6000 },
        secret: 'secret',
        resave: true,
        saveUninitialized: true
    })
)
app.use(flash())

app.get('/', (req, res) => {
    const data = {
        layout: "layouts/main",
        title: "Aplikasi Kita",
    }
    res.render('index', data)
})

app.get('/about', (req, res) => {
    const data = {
        layout: "layouts/main",
        title: "About Page",
    }
    res.render('about', data)
})

app.get('/contact', (req, res) => {
    const contacts = loadContacts()
    const data = {
        layout: "layouts/main",
        title: "Contact Page",
        contacts,
        msg: req.flash('msg')
    }
    res.render('contact', data)
})

app.get('/contact/add', (req, res) => {
    const data = {
        layout: "layouts/main",
        title: "Add Contact",
    }
    res.render('add-contact', data)
})

app.post('/contact', [
    body('nama').custom(async value => {
        if (cekDuplikat(value)) {
            throw new Error('Nama kontak sudah ada!')
        }
    }),
    check('email', 'Email tidak valid').isEmail(),
    check('nohp', 'Nomor HP tidak valid').isMobilePhone('id-ID')
], (req, res) => {
    const result = validationResult(req)
    if (!result.isEmpty()) {
        res.render('add-contact', {
            layout: "layouts/main",
            title: "Add Contact",
            errors: result.array()
        })
        // res.send({ errors: result.array() })
    } else {
        req.body.nohp = req.body.nohp.replace(/^0/, "+62")
        addContact(req.body)
        req.flash('msg', 'Data berhasil ditambahkan!')
        res.redirect('/contact')
    }
})

app.get('/contact/delete/:nama', (req, res) => {
    let namaContact = req.params.nama.toLowerCase().replace('-', ' ')
    if (!findContact(namaContact)) {
        res.status(404)
        res.send('<h1>404 Not Found</h1>')
    } else {
        removeContact(namaContact)
        req.flash('msg', 'Berhasil menghapus kontak!')
        res.redirect('/contact')
    }
})

app.get('/contact/edit/:nama', (req, res) => {
    let namaContact = req.params.nama.toLowerCase().replace('-', ' ')
    const contact = findContact(namaContact)
    contact.nohp = contact.nohp.replace(/^\+62/, "0")
    const data = {
        layout: "layouts/main",
        title: "Edit Contact",
        contact
    }
    res.render('edit-contact', data)
})

app.post('/contact/update', [
    body('nama').custom(async (value, { req }) => {
        if (req.body.oldNama !== req.body.nama && cekDuplikat(value)) {
            throw new Error('Nama kontak sudah ada!')
        }
    }),
    check('email', 'Email tidak valid').isEmail(),
    check('nohp', 'Nomor HP tidak valid').isMobilePhone('id-ID')
], (req, res) => {
    const result = validationResult(req)
    if (!result.isEmpty()) {
        res.render('edit-contact', {
            layout: "layouts/main",
            title: "Add Contact",
            errors: result.array(),
            contact: req.body
        })
    } else {
        req.body.nohp = req.body.nohp.replace(/^0/, "+62")
        updateContacts(req.body)
        req.flash('msg', 'Data berhasil diubah!')
        res.redirect('/contact')
    }
})

app.get('/contact/:nama', (req, res, next) => {
    const contact = findContact(req.params.nama)
    // redirect to 404 page if contact not in database
    if (!contact) {
        next()
    }
    const data = {
        layout: "layouts/main",
        title: "Detail Contact Page",
        contact
    }
    res.render('detail', data)
})

app.delete('/contact/:nama', (req, res) => {

})

app.use((req, res) => {
    res.status(404)
    res.send('<h1>404 Not Found</h1>')
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})