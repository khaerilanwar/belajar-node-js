const express = require('express')
const session = require('express-session')
const cookieParser = require('cookie-parser')
const flash = require('connect-flash')
const expressLayouts = require('express-ejs-layouts')
const { body, validationResult, check } = require('express-validator');
const { loadContacts, findContact, cekDuplikat, addContact } = require('./utils/contact')
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
        res.send({ errors: result.array() })
        // res.render('add-contact', {
        //     layout: "layouts/main",
        //     title: "Add Contact",
        //     errors: result.array()
        // })
    }
    const contact = {
        nama: req.body.nama,
        email: req.body.email,
        nohp: req.body.nohp.replace(/^0/, "+62"),
    }
    req.flash('msg', 'Data berhasil ditambahkan!')
    addContact(contact)
    res.redirect('/contact')
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

app.use((req, res) => {
    res.status(404)
    res.send('<h1>404 Not Found</h1>')
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})