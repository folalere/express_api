const express = require('express');
const { body, param, validationResult } = require('express-validator');
const router = express.Router();

let items = [];
let nextId = 1;

// GET /items - Retrieve all items
router.get('/', (req, res) => {
  res.json(items);
});

// GET /items/:id - Retrieve single item
router.get('/:id', [param('id').isInt()], (req, res) => {
  const id = parseInt(req.params.id);
  const item = items.find(i => i.id === id);
  if (!item) return res.status(404).json({ error: 'Item not found' });
  res.json(item);
});

// POST /items - Create new item
router.post(
  '/',
  [
    body('name').notEmpty().withMessage('Name is required'),
    body('description').notEmpty().withMessage('Description is required')
  ],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    const item = {
      id: nextId++,
      name: req.body.name,
      description: req.body.description
    };
    items.push(item);
    res.status(201).json(item);
  }
);

// PUT /items/:id - Update an item
router.put(
  '/:id',
  [
    param('id').isInt(),
    body('name').notEmpty().withMessage('Name is required'),
    body('description').notEmpty().withMessage('Description is required')
  ],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    const id = parseInt(req.params.id);
    const item = items.find(i => i.id === id);
    if (!item) return res.status(404).json({ error: 'Item not found' });

    item.name = req.body.name;
    item.description = req.body.description;
    res.json(item);
  }
);

// DELETE /items/:id - Delete an item
router.delete('/:id', [param('id').isInt()], (req, res) => {
  const id = parseInt(req.params.id);
  const index = items.findIndex(i => i.id === id);
  if (index === -1) return res.status(404).json({ error: 'Item not found' });

  items.splice(index, 1);
  res.json({ message: 'Item deleted' });
});

module.exports = router;
