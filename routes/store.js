const express = require('express');
const { Product } = require('../utils/db');
const router = express.Router();

// Rota para obter produtos com paginação
router.get('/products', async (req, res) => {
    const page = parseInt(req.query.page) || 1; // Converter para número inteiro
    const pageSize = parseInt(req.query.pageSize) || 10; // Tamanho padrão da página
  
    try {
      const { count, rows } = await Product.findAndCountAll({
        limit: pageSize,
        offset: (page - 1) * pageSize,
      });
      
      console.log({ count, products: rows })
      res.json({ count, products: rows });
    } catch (error) {
      console.error('Error fetching products:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
});
  
// Rota para adicionar um novo produto
router.post('/add', async (req, res) => {
  // Implemente a verificação de autenticação e privilégios aqui
  // Por exemplo, você pode usar middleware para isso
  // Exemplo:
  // if (!req.user.isAdmin) {
  //   return res.status(403).json({ error: 'Unauthorized' });
  // }

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
router.put('/edit/:id', async (req, res) => {
  // Implemente a verificação de autenticação e privilégios aqui
  // Por exemplo, você pode usar middleware para isso
  // Exemplo:
  // if (!req.user.isAdmin) {
  //   return res.status(403).json({ error: 'Unauthorized' });
  // }

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

module.exports = router;