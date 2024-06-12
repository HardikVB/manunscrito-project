
import { Product, User } from './db';

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

export {findUserByEmail, getProducts}
