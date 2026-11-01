// routes/products.js
require('dotenv').config();

const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

router.get('/', async (req, res) => {
  // Parse query parameters with defaults
  const page = Math.max(1, parseInt(req.query.page) || 1);
  const pageSize = Math.min(100, Math.max(1, parseInt(req.query.pageSize) || 10));

  // Calculate skip value
  const skip = (page - 1) * pageSize;

  try {
    // Run both queries in parallel for better performance
    const [products, totalItems] = await Promise.all([
      prisma.product.findMany({
        skip: skip,
        take: pageSize,
        orderBy: { createdAt: 'desc' },
      }),
      prisma.product.count(),
    ]);

    const totalPages = Math.ceil(totalItems / pageSize);

    res.json({
      data: products,
      pagination: {
        page,
        pageSize,
        totalItems,
        totalPages,
        hasNextPage: page < totalPages,
        hasPreviousPage: page > 1,
      }
    });
  } catch (err) {
    console.error('Failed to fetch products:', err);
    res.status(500).json({ error: 'Failed to fetch products' });
  }
});

router.delete('/:id', async (req, res) => {
  const id = Number.parseInt(req.params.id, 10);

  if (!Number.isInteger(id) || id < 1) {
    return res.status(400).json({ error: 'Product ID must be a positive integer' });
  }

  try {
    await prisma.product.delete({ where: { id } });
    return res.status(204).end();
  } catch (err) {
    if (err.code === 'P2025') {
      return res.status(404).json({ error: 'Product not found' });
    }

    console.error('Failed to delete product:', err);
    return res.status(500).json({ error: 'Failed to delete product' });
  }
});

module.exports = router;