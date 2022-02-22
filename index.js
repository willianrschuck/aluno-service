const express = require('express');
const cors = require('cors');
const alunoController = require('./controller/aluno.controller')

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

app.route('/alunos')
    .get(alunoController.getAlunos)
    .post(alunoController.addAluno)
    .put(alunoController.updateAluno);

app.route('/alunos/:id')
    .get(alunoController.getAlunoById)
    .delete(alunoController.deleteAluno);

app.listen(process.env.PORT || 3001, () => {
    console.log(`Servidor iniciado!`)
});
