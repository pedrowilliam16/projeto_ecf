const express = require('express')
const app = express()
const port = 3000
const path = require ('path')
const mysql = require('mysql2')
const bodyParser = require('body-parser')

app.use(bodyParser.urlencoded({extended: true}))

const banco_de_dados = mysql.createConnection ({
    host: 'localhost',
    user: 'root',
    password: 'c@tolic@',
    database: 'escola'
})

banco_de_dados.connect((err) => {
    if (err) {
        (console.log('Erro na conexão com MySql'))
    } else {
        console.log('Conexão estabelecida com MySql')
    }

})

app.post('/criar', (req,res) => {
    const nome = req.body.nome_m
    const cpf = req.body.cpf_m 
    const dn = req.body.dn_m 
    const email = req.body.email_m
    const telefone = req.body.telefone_m

    const values = [nome, cpf, dn, email, telefone]

    banco_de_dados.query('INSERT INTO matriculas(nome, cpf, dn, email, telefone) VALUES (?, ?, ?, ?, ?)', values, (err, results) =>{
        if (err) {
            res.send("Erro ao inserir dados no MySql")
        } else {
            res.send("Dados inseridos com sucesso")
        }
    })
})
    
app.use(express.static(path.join(__dirname, 'public')))

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname + '/views/home.html'))
})

app.get('/style.css', (req, res) =>{
    res.sendFile(path.join(__dirname + '/public/css/style.css'))
})

app.get('/script.js', (req, res) =>{
    res.sendFile(path.join(__dirname + '/public/js/script.js'))
})

app.delete('/excluir/:', (req, res) =>{
    const id = req.body.id_e
    banco_de_dados.query('DELETE FROM matriculas WHERE ID=?', id, (err,results) => {
        if (err) {
            res.send("Erro ao deletar dados")
        } else {
            res.send("Dados excluídos com sucesso")
        }
    })
})

app.listen (port, () => {
    console.log("O servidor está no ar")
})