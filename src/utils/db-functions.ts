
import { OrderProducts } from '../db/order-products';
import { Order, StatusEnum } from '../db/orders-db';
import { ProductResponse } from '../models/product-response.model';
import { Product, ProductTranslation, User } from './db';

interface OrderProductsAttributes {
  orderId: number;
  productId: number;
}


async function getProducts(page = 1, pageSize = 10) {
  const offset = (page - 1) * pageSize;
  return await Product.findAndCountAll({
    limit: pageSize,
    offset: offset,
  });
};

async function findUserByEmail(email: string) {
  return await User.findOne({ where: { email: email } });
};

async function findUserById(id: number) {
  return await User.findOne({ where: { id: id } });
};

async function findUsers() {
  return await User.findAll();
};

async function getUserOrders(userId: number): Promise<any> {
  try {
    const orders = await Order.findAll({
      include: [
        {model: Product},{model: User,where: {id: userId}}
      ],
    });
    return orders;
  } catch (error) {
    console.error('Error fetching user orders:', error);
    throw error;
  }
}

async function getOrderId(orderID: number): Promise<Order | null> {
  try {
    const orders = await Order.findByPk(orderID, {
      include: [
        {model: Product, as: 'products'},{model: User, as: 'users'}
      ],
    });

    return orders;
  } catch (error) {
    console.error('Error fetching user orders:', error);
    throw error;
  }
}

async function getOrders(page = 1, pageSize = 10): Promise<{count: number, rows: Order[]}> {
  const offset = (page - 1) * pageSize;

  try {
    const count = await Order.count();

    const orders = await Order.findAll({
      include: [{model: Product, as: 'products', required: true, include: [{model: ProductTranslation, as: 'translations', required: false}]}, {model: User, as: 'users', required: true}],
      limit: pageSize,
      offset: offset,
    });

    return {count: count, rows: orders};
  } catch (error) {
    console.error('Error fetching user orders:', error);
    throw error;
  }
}

// Função para adicionar produtos a uma ordem e associar o usuário à ordem
async function addProductsToOrder(userId: number, products: Product[]): Promise<Order> {
  try {
    // Cria uma nova ordem associada ao usuário
    const order = await Order.create({ userId: userId, status: StatusEnum.ESPERA_PAGAMENTO });

    await order.save();

    const insertOrderProduct = products.map(product => ({
      id: 0,
      orderId: order.id,
      productId: product.id,
      userId: userId
    }));

    await OrderProducts.bulkCreate(insertOrderProduct);

    return order;

  } catch (error) {
    console.error('Error adding products to order:', error);
    throw error;
  }
}

export {findUserByEmail, getProducts, getUserOrders, addProductsToOrder, getOrders, findUserById, findUsers, getOrderId}
