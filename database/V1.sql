-- Executar no banco de dados alunos_api

DROP TABLE IF EXISTS alunos;
DROP SEQUENCE IF EXISTS seqalunos;

CREATE TABLE alunos (
    id INTEGER,
    nome VARCHAR(60) NOT NULL,
    dataNascimento DATE,
    dataIngresso DATE,
    matricula VARCHAR(32),
    cpf VARCHAR(11),
    CONSTRAINT pk_aluno PRIMARY KEY (id)
);

CREATE SEQUENCE seqalunos;