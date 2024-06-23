import { request, Request, Response } from "express";
import { findUserById, findUsers, getOrders } from "../utils/db-functions";
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
    const language = req.language;

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

    console.log(userId)

    if(!userId) return res.json(await findUsers());

    const response = await findUserById(userId);
    
    return res.json(response);
})

export { router }