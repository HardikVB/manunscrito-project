const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize(process.env.DATABASE, process.env.DATABASE_USER, process.env.DATABASE_PASSWORD, {
  host: process.env.DATABASE_HOST,
  port: process.env.DATABASE_PORT,
  dialect: 'mysql',
});

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

// Definição do modelo Product
const Product = sequelize.define('Product', {
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  image: {
    type: DataTypes.TEXT, // Você pode armazenar a URL da imagem
    allowNull: true,
  },
  price: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
}, {
  tableName: 'products',
});

// Definição do modelo Comment
const Comment = sequelize.define('Comment', {
  text: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
}, {
  tableName: 'comments',
});

// Definição do modelo Review
const Review = sequelize.define('Review', {
  rating: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      min: 1,
      max: 5,
    },
  },
}, {
  tableName: 'reviews',
});

// Relacionamentos entre entidades
Product.hasMany(Comment);
Product.hasMany(Review);

// Sincronização do modelo com a base de dados
sequelize.sync();

module.exports = {
  Product,
  Comment,
  Review,
  User
};
