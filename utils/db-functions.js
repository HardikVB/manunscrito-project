const { Product, User } = require("./db");

// Método para criar um novo produto
const createProduct = async (title, image, price, description) => {
  return await Product.create({ title, image, price, description });
};

// Método para obter todos os produtos com paginação
const getProducts = async (page = 1, pageSize = 10) => {
  const offset = (page - 1) * pageSize;
  return await Product.findAndCountAll({
    limit: pageSize,
    offset: offset,
  });
};

// Método para obter detalhes de um produto por ID
const getProductById = async (productId) => {
  return await Product.findByPk(productId, {
    include: [{ model: Comment }, { model: Review }],
  });
};

// Método para atualizar um produto por ID
const updateProduct = async (productId, title, image, price, description) => {
  const product = await Product.findByPk(productId);
  if (!product) {
    throw new Error('Product not found');
  }
  product.title = title;
  product.image = image;
  product.price = price;
  product.description = description;
  return await product.save();
};

// Método para excluir um produto por ID
const deleteProduct = async (productId) => {
  const product = await Product.findByPk(productId);
  if (!product) {
    throw new Error('Product not found');
  }
  return await product.destroy();
};

const findUserByEmail = async (Email) => {
    return await User.findOne({ where: { Email } });
  };
  
  const addUser = async (username, email, password) => {
    return await User.create({ username, email, password, privilege: "user" });
  };

module.exports = {
  createProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct,
  findUserByEmail,
  addUser
};
