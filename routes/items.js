const express = require('express');
const { body, param, validationResult } = require('express-validator');
const router = express.Router();

let items = [];
let idCounter = 1;

const handleErrors = (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
};

router.get('/', (req, res) => {
  res.json(items);
});

router.get('/:id', [
  param('id').isInt({ min: 1 }).withMessage('ID must be a positive integer')
], (req, res) => {
  const error = handleErrors(req, res);
  if (error) return error;

  const id = parseInt(req.params.id);
  const item = items.find(i => i.id === id);
  if (!item) return res.status(404).json({ error: `Item with ID ${id} not found` });

  res.json(item);
});

router.post('/', [
  body('name').isString().notEmpty().withMessage('Name is required'),
  body('description').isString().notEmpty().withMessage('Description is required')
], (req, res) => {
  const error = handleErrors(req, res);
  if (error) return error;

  const { name, description } = req.body;
  const newItem = { id: idCounter++, name, description };
  items.push(newItem);
  res.status(201).json(newItem);
});

router.put('/:id', [
  param('id').isInt({ min: 1 }).withMessage('ID must be a positive integer'),
  body('name').isString().notEmpty().withMessage('Name is required'),
  body('description').isString().notEmpty().withMessage('Description is required')
], (req, res) => {
  const error = handleErrors(req, res);
  if (error) return error;

  const id = parseInt(req.params.id);
  const item = items.find(i => i.id === id);
  if (!item) return res.status(404).json({ error: `Item with ID ${id} not found` });

  item.name = req.body.name;
  item.description = req.body.description;
  res.json(item);
});

router.delete('/:id', [
  param('id').isInt({ min: 1 }).withMessage('ID must be a positive integer')
], (req, res) => {
  const error = handleErrors(req, res);
  if (error) return error;

  const id = parseInt(req.params.id);
  const index = items.findIndex(i => i.id === id);
  if (index === -1) return res.status(404).json({ error: `Item with ID ${id} not found` });

  const deleted = items.splice(index, 1);
  res.json({ message: 'Item deleted', item: deleted[0] });
});

module.exports = router;

