const pool = require('../config/pg.config')

const getAlunos = (req, res) => {
    pool.query('SELECT * FROM alunos', (err, result) => {
        
        if (err) {
            return res.status(401).json({
                status: 'error',
                message: `Um erro ocorreu ao recuperar as alunos.`
            });
        }

        res.status(200).json( result.rows );

    });
}

const addAluno = (req, res) => {
    const { nome, dataNascimento, dataIngresso, matricula, cpf } = req.body;

    pool.query(
        'INSERT INTO alunos (id, nome, dataNascimento, dataIngresso, matricula, cpf)' +
        'VALUES (nextval(\'seqalunos\'), $1, $2, $3, $4, $5)',
        [nome, dataNascimento, dataIngresso, matricula, cpf],
        (err) => {
            
            if (err) {
                return res.status(401).json({
                    status: 'error',
                    message: `Um erro ocorreu ao inserir o aluno.`
                });
            }

            res.status(201).json({
                status: 'success',
                message: 'Aluno adicionado.'
            });

        }
    );
}

const updateAluno = (req, res) => {
    const { id, nome, dataNascimento, dataIngresso, matricula, cpf } = req.body;

    pool.query(
        'UPDATE alunos SET nome=$2, dataNascimento=$3, dataIngresso=$4, matricula=$5, cpf=$6 WHERE id=$1',
        [id, nome, dataNascimento, dataIngresso, matricula, cpf],
        (err, result) => {
            
            if (err || result.rowCount == 0) {
                return res.status(401).json({
                    status: 'error',
                    message: `Um erro ocorreu ao atualizar o aluno id:${id}.`
                });
            }

            res.status(201).json({
                status: 'success',
                message: 'Aluno atualizado.'
            });

        }
    );
}

const deleteAluno = (req, res) => {
    const id = parseInt(req.params.id);
    pool.query(
        'DELETE FROM alunos WHERE id=$1',
        [id],
        (err, result) => {
            
            if (err || result.rowCount == 0) {
                res.status(401).json({
                    status: 'error',
                    message: `Um erro ocorreu ao remover o aluno ${id}`
                });
                return;
            }
    
            res.status(201).json({
                status: 'success',
                message: 'Aluno removido.'
            });
    
        }
    );
}

const getAlunoById = (req, res) => {
    const id = req.params.id;

    pool.query(
        'SELECT * FROM alunos WHERE id=$1',
        [id],
        (err, result) => {
            if (err || result.rowCount == 0) {
                res.status(401).json({
                    status: 'error',
                    message: 'Não foi possível recuperar o aluno.'
                });
                return;
            }
            res.status(200).json(result.rows);
        }
    );
}

module.exports = {
    addAluno,
    getAlunos,
    getAlunoById,
    deleteAluno,
    updateAluno
}