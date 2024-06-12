import express, { Request, Response } from 'express';
import { ProductImage } from '../db/product-image-db';
import { ProductTranslation } from '../db/product-translate-db';
import { Product } from '../utils/db';
import { verifyAdminPrivilage } from '../utils/auth';
import { ProductResponse } from '../models/product-response.model';
import { ProductRequest } from '../models/product-request.model';
const router = express.Router();

interface LanguageRequest extends Request {
  language?: string;
}


// Rota para obter produtos com paginação
// Rota para obter produtos com paginação
router.get('/products', async (req: LanguageRequest, res: Response) => {
  const page = parseInt(req.query.page as string) || 1;
  const pageSize = parseInt(req.query.pageSize as string) || 10;
  const language = req.language;

  try {
    // Consulta para obter os produtos com suas traduções no idioma especificado
    const { count, rows } = await Product.findAndCountAll({
      limit: pageSize,
      offset: (page - 1) * pageSize,
      include: [
        { model: ProductTranslation, required: false, as: 'translations', where: { language: language } },
        { model: ProductImage, required: false, as: 'images' }
      ],
    });

    let products: ProductResponse[] = []

    rows.forEach((product: Product) => {
      const translation = product.translations.find((translation) => translation.language == req.language) || new ProductTranslation();
      products.push({id: product.id, translation: translation, images: product.images, image_thumbnail: product.image_thumbnail, price: product.price})
    })

    res.json({ count, products: products });

  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});



// Rota para adicionar um novo produto
router.post('/add', verifyAdminPrivilage, async (req: LanguageRequest, res: Response) => {
  const request = req.body as ProductRequest;
  
  try {
    // Criação do produto
    const product = await Product.create(request);

    if(request.images) {
      // Criação das imagens do produto
      await Promise.all(request.images.map(async (image) => {
        image.productId = product.id

        await ProductImage.create(image);
      }));
    }

    if(request.translations) {
      // Criação das traduções do produto
      await Promise.all(request.translations.map(async (languageObj) => {
        languageObj.productId = product.id;
        await ProductTranslation.create(languageObj);
      }));
    }

    if(request.translation) {
      request.translation.language = req.language || 'pt'; 
      request.translation.productId = product.id;
      await ProductTranslation.create(request.translation);
    }
    

    res.json(product);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});



// Rota para editar um produto existente por ID
router.put('/edit/:id', verifyAdminPrivilage, async (req: LanguageRequest, res: Response) => {
  console.log(req.params)
  const productId = req.params.id;

  let updateProduct = req.body as ProductRequest;

  try {
    // Busca o produto pelo ID
    const product = await Product.findByPk(productId);

    // Verifica se o produto existe
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }

    // Atualiza os detalhes do produto, se fornecidos
    if (updateProduct.image_thumbnail) {
      product.image_thumbnail = updateProduct.image_thumbnail;

      await product.save();
    }

    // Atualiza as imagens do produto, se fornecidas
    if (updateProduct.images && updateProduct.images.length > 0) {
      await Promise.all(updateProduct.images.map(async (image) => {
        ProductImage.destroy({where: {productId: product.id}});

        image.productId = product.id
  
        await ProductImage.create(image);
      }));
    }

    // Atualiza as traduções do produto, se fornecidas
    if (updateProduct.translations) {
      await Promise.all(updateProduct.translations.map(async (translation) => {
        ProductTranslation.destroy({where: {productId: product.id}});

        translation.productId = product.id
  
        await ProductTranslation.create(translation);
      }));
    }

    if (updateProduct.translation) {

      let translation = await ProductTranslation.findOne({where: {language: updateProduct.translation.language, productId: product.id}})

      updateProduct.translation.productId = product.id

      if(!translation)
        return await ProductTranslation.create(updateProduct.translation)

      translation.title = updateProduct.translation.title;
      translation.description = updateProduct.translation.description;
      translation.description_thumbnail = updateProduct.translation.description_thumbnail;

      translation.save();
    }

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
    const product = await Product.findOne({where: {id: productId}});

    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }

    await Product.destroy({where: {id: productId}});

    res.json({ message: 'Product deleted successfully' });

  } catch (error) {
    console.error('Error deleting product:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

export { router }