import { request, Request, Response } from "express";
import { findUserById, findUsers, getOrderId, getOrders } from "../utils/db-functions";
import { Order } from "../db/orders-db";
import { ProductTranslation } from "../db/product-translate-db";
import { ProductResponse } from "../models/product-response.model";

const express = require('express');
const router = express.Router();

const { authenticateToken, getUserToken } = require('../utils/auth');
const { findUserByEmail } = require('../utils/db')

interface LanguageRequest extends Request {
    language?: string;
}

router.get("/orders", async (req: LanguageRequest, res: Response) => {
    const page = parseInt(req.query.page as string) || 1;
    const pageSize = parseInt(req.query.pageSize as string) || 10;

    const { count, rows } = await getOrders(page, pageSize);

    rows.forEach((item: Order) => {
        item.products.forEach((product) => {
            
            const translation = product.translations.find((translation) => translation.language == req.language) || new ProductTranslation();

            product.translation = translation
        })
    })
    
    return res.json({count, rows});
})

router.get("/user", async (req: LanguageRequest, res: Response) => {

    const userId = parseInt(req.query.userId as string) || null;

    if(!userId) return res.json(await findUsers());

    const response = await findUserById(userId);
    
    return res.json(response);
})


router.put("/orders", async (req: LanguageRequest, res: Response) => {

    const orderId = parseInt(req.query.id as string) || null;

    if(!orderId) return res.send(404)

    const response = await getOrderId(orderId);

    if(!response) return res.send(404)

    response.users = [req.body.user]
    response.products = req.body.products
    response.status = req.body.status

    response.save()
    
    return res.json(response);
})

export { router }