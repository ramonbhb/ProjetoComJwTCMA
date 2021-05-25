const { Router } = require('express');
const jwt = require('jsonwebtoken');
const routes = Router();
const verificar = require('../middlewares/autenticacao');

routes.get('/', (req,res) => {
    res.status(200).json({mensagem: "Hello World " + process.env.ACCESS_SECRET})
});

routes.get("/oi", verificar(['usuario']), (req,res) => {
    res.status(200).json({mensagem: "oi"});
})

routes.get("/oiAdmin", verificar(['admin']), (req,res) => {
    res.status(200).json({mensagem: "oi"});
})

routes.post('/login', (req,res) => {
    if (req.body.usuario == 'luusk' && req.body.senha == '123') {
        // Vou Gerar o Token
        let id = '159';  // pode ser o id do Banco
        let role = 'usuario'; //pode ser variável role do banco

        const token = jwt.sign({ id: id,role:role, hora:hora }, process.env.ACCESS_SECRET, {
            expiresIn: 1500// process.env.ACCESS_LIFE
        });

        res.status(200).json({
            auth: true,
            token: token
        });
    }
    else if (req.body.usuario == 'luusk2' && req.body.senha == '123') {
        // Vou Gerar o Token
        let id = '159';
        let role = 'admin'; // pode ser o id do Banco
        const token = jwt.sign({ id: id,role:role }, process.env.ACCESS_SECRET, {
            expiresIn: 1500// process.env.ACCESS_LIFE
        });

        res.status(200).json({
            auth: true,
            token: token
        });
    }
    else {
        res.status(401).json({mensagem: 'Usuário não autorizado'});
    }
});

routes.get('/logout', (req,res) => {
    res.status(200).json({auth: false, token: null})
});

module.exports = routes;