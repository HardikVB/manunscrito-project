"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = __importDefault(require("express"));
const product_image_db_1 = require("../db/product-image-db");
const product_translate_db_1 = require("../db/product-translate-db");
const db_1 = require("../utils/db");
const auth_1 = require("../utils/auth");
const router = express_1.default.Router();
exports.router = router;
// Rota para obter produtos com paginação
// Rota para obter produtos com paginação
router.get('/products', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const page = parseInt(req.query.page) || 1;
    const pageSize = parseInt(req.query.pageSize) || 10;
    const language = req.language;
    try {
        // Consulta para obter os produtos com suas traduções no idioma especificado
        const { count, rows } = yield db_1.Product.findAndCountAll({
            limit: pageSize,
            offset: (page - 1) * pageSize,
            include: [
                { model: product_translate_db_1.ProductTranslation, required: false, as: 'translations', where: { language: language } },
                { model: product_image_db_1.ProductImage, required: false, as: 'images' }
            ],
        });
        let products = [];
        rows.forEach((product) => {
            const translation = product.translations.find((translation) => translation.language == req.language) || new product_translate_db_1.ProductTranslation();
            products.push({ id: product.id, translation: translation, images: product.images, image_thumbnail: product.image_thumbnail, price: product.price });
        });
        res.json({ count, products: products });
    }
    catch (error) {
        console.error('Error fetching products:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}));
// Rota para adicionar um novo produto
router.post('/add', auth_1.verifyAdminPrivilage, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const request = req.body;
    try {
        // Criação do produto
        const product = yield db_1.Product.create(request);
        if (request.images) {
            // Criação das imagens do produto
            yield Promise.all(request.images.map((image) => __awaiter(void 0, void 0, void 0, function* () {
                image.productId = product.id;
                yield product_image_db_1.ProductImage.create(image);
            })));
        }
        if (request.translations) {
            // Criação das traduções do produto
            yield Promise.all(request.translations.map((languageObj) => __awaiter(void 0, void 0, void 0, function* () {
                languageObj.productId = product.id;
                yield product_translate_db_1.ProductTranslation.create(languageObj);
            })));
        }
        if (request.translation) {
            request.translation.language = req.language || 'pt';
            request.translation.productId = product.id;
            yield product_translate_db_1.ProductTranslation.create(request.translation);
        }
        res.json(product);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
}));
// Rota para editar um produto existente por ID
router.put('/edit/:id', auth_1.verifyAdminPrivilage, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(req.params);
    const productId = req.params.id;
    let updateProduct = req.body;
    try {
        // Busca o produto pelo ID
        const product = yield db_1.Product.findByPk(productId);
        // Verifica se o produto existe
        if (!product) {
            return res.status(404).json({ error: 'Product not found' });
        }
        // Atualiza os detalhes do produto, se fornecidos
        if (updateProduct.image_thumbnail) {
            product.image_thumbnail = updateProduct.image_thumbnail;
            yield product.save();
        }
        // Atualiza as imagens do produto, se fornecidas
        if (updateProduct.images && updateProduct.images.length > 0) {
            yield Promise.all(updateProduct.images.map((image) => __awaiter(void 0, void 0, void 0, function* () {
                product_image_db_1.ProductImage.destroy({ where: { productId: product.id } });
                image.productId = product.id;
                yield product_image_db_1.ProductImage.create(image);
            })));
        }
        // Atualiza as traduções do produto, se fornecidas
        if (updateProduct.translations) {
            yield Promise.all(updateProduct.translations.map((translation) => __awaiter(void 0, void 0, void 0, function* () {
                product_translate_db_1.ProductTranslation.destroy({ where: { productId: product.id } });
                translation.productId = product.id;
                yield product_translate_db_1.ProductTranslation.create(translation);
            })));
        }
        if (updateProduct.translation) {
            let translation = yield product_translate_db_1.ProductTranslation.findOne({ where: { language: updateProduct.translation.language, productId: product.id } });
            updateProduct.translation.productId = product.id;
            if (!translation)
                return yield product_translate_db_1.ProductTranslation.create(updateProduct.translation);
            translation.title = updateProduct.translation.title;
            translation.description = updateProduct.translation.description;
            translation.description_thumbnail = updateProduct.translation.description_thumbnail;
            translation.save();
        }
        res.json(product);
    }
    catch (error) {
        console.error('Error updating product:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}));
// Rota para deletar um produto
router.delete('/:id', auth_1.verifyAdminPrivilage, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const productId = req.params.id;
    try {
        const product = yield db_1.Product.findOne({ where: { id: productId } });
        if (!product) {
            return res.status(404).json({ error: 'Product not found' });
        }
        yield db_1.Product.destroy({ where: { id: productId } });
        res.json({ message: 'Product deleted successfully' });
    }
    catch (error) {
        console.error('Error deleting product:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}));
