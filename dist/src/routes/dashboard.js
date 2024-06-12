"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express = require('express');
const router = express.Router();
exports.router = router;
const { authenticateToken, getUserToken } = require('../utils/auth');
const { findUserByEmail } = require('../utils/db');
