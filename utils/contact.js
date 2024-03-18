const fs = require('fs');

// Create data directory, contacts.json if not exist
!fs.existsSync('./data') ? fs.mkdirSync('./data') : ''
!fs.existsSync('./data/contacts.json') ? fs.writeFileSync('./data/contacts.json', '[]') : ''

const loadContacts = () => {
    const dataContacts = fs.readFileSync('./data/contacts.json', 'utf-8')
    return JSON.parse(dataContacts)
}

const findContact = (nama) => {
    const contactsJson = loadContacts()
    const contact = contactsJson.find((contact) => contact.nama.toLowerCase() === nama.toLowerCase().replace('-', ' '))
    return contact
}

const cekDuplikat = (value) => {
    const contacts = loadContacts()
    return contacts.find(contact => contact.nama.toLowerCase() === value.toLowerCase())
}


const saveContacts = (contacts) => {
    fs.writeFileSync('./data/contacts.json', JSON.stringify(contacts))
}
const removeContact = (nama) => {
    const contactsJson = loadContacts()
    const newContacts = contactsJson.filter((contact) => contact.nama.toLowerCase() !== nama.toLowerCase())
    saveContacts(newContacts)
    console.log(`Berhasil hapus kontak ${nama}`)
}

const addContact = (contact) => {
    const contacts = loadContacts()
    contacts.push(contact)
    saveContacts(contacts)
}

module.exports = { loadContacts, findContact, cekDuplikat, addContact }