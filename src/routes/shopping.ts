import { Request, Response } from "express";
import { addProductsToOrder, getUserOrders } from "../utils/db-functions";
import { Product } from "../db/product-db";

const express = require('express');
const router = express.Router();

const { authenticateToken, getUserToken } = require('../utils/auth');
const { findUserByEmail } = require('../utils/db')

class RequestOrderFinish {
    userId?: number
    products?: Product[] = []
}

router.post("/finish", async (req: Request, res: Response) => {
    const body = req.body as RequestOrderFinish

    if(!body.userId || !body.products) return res.send(404);

    const response = await addProductsToOrder(body.userId, body.products);
    
    return res.json(response);
})

export { router }