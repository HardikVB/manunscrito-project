const { Sequelize, DataTypes } = require('sequelize');
const mysql2 = require('mysql2');
const fs = require('fs');
const path = require('path');

// Caminho para o certificado SSL
const certPath = path.resolve(__dirname, '../certificate/ca.pem');

// Configuração da base de dados
const sequelize = new Sequelize(process.env.DATABASE, process.env.DATABASE_USER, process.env.DATABASE_PASSWORD, {
  host: process.env.DATABASE_HOST,
  port: process.env.DATABASE_PORT,
  dialect: 'mysql',
  dialectModule: mysql2, // Usar o mysql2 em vez do mysql padrão
  dialectOptions: {
    ssl: {
      ca: fs.readFileSync(certPath), // Lendo o certificado SSL
    },
  },
  logging: false,
});

// Definição do modelo User
const User = sequelize.define('User', {
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  privilege: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  tableName: 'users',
  timestamps: false,
});

// Sincronização do modelo com a base de dados
sequelize.sync();

const findUserByUsername = async (username) => {
  return await User.findOne({ where: { username } });
};

const addUser = async (username, email, password) => {
  return await User.create({ username, email, password, privilege: "user" });
};

module.exports = {
  findUserByUsername,
  addUser,
};