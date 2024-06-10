const express = require('express');
const { Product } = require('../utils/db');
const router = express.Router();
const { verifyAdminPrivilage } = require('../utils/auth');

// Rota para obter produtos com paginação
router.get('/products', async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const pageSize = parseInt(req.query.pageSize) || 10;

  try {
    const { count, rows } = await Product.findAndCountAll({
      limit: pageSize,
      offset: (page - 1) * pageSize,
    });
    
    res.json({ count, products: rows });
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Rota para adicionar um novo produto
router.post('/add', verifyAdminPrivilage, async (req, res) => {
  const { title, image, price, description } = req.body;

  try {
    const product = await Product.create({ title, image, price, description });
    res.json(product);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Rota para editar um produto existente por ID
router.put('/edit/:id', verifyAdminPrivilage, async (req, res) => {
  const productId = req.params.id;
  const { title, image, price, description } = req.body;

  try {
    const product = await Product.findByPk(productId);

    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }

    product.title = title;
    product.image = image;
    product.price = price;
    product.description = description;
    
    await product.save();

    res.json(product);

  } catch (error) {
    console.error('Error updating product:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Rota para deletar um produto
router.delete('/:id', verifyAdminPrivilage, async (req, res) => {
  const productId = req.params.id;

  try {
    const product = await Product.findByPk(productId);

    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }

    await product.destroy();
    res.json({ message: 'Product deleted successfully' });

  } catch (error) {
    console.error('Error deleting product:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
