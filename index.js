// const express = require('express');
// const app = express();
// const itemsRouter = require('./routes/items');
// const errorHandler = require('./middleware/errorHandler');

// const PORT = process.env.PORT || 3000;

// // Middleware
// app.use(express.json());

// // Routes
// app.get('/', (req, res) => {
//   res.send('Hello, World!');
// });

// // Crash
// app.get('/crash', (req, res) => {
//     console.log('Crash route hit!');
//     throw new Error("Simulated server crash!");
// });
  

// app.use('/items', itemsRouter);

// // Invalid route handler
// app.use((req, res, next) => {
//   res.status(404).json({ error: 'Route not found' });
// });

// // Global error handler
// app.use(errorHandler);

// // Start server
// app.listen(PORT, () => {
//   console.log(`Server running on http://localhost:${PORT}`);
// });


const express = require('express');
const app = express();
const itemsRouter = require('./routes/items');
const errorHandler = require('./middleware/errorHandler');

app.use(express.json());

// ✅ Root route
app.get('/', (req, res) => {
  res.send('Hello, World!');
});

// ✅ Force 500 error for testing
app.get('/crash', (req, res) => {
  throw new Error("Simulated server crash for testing 500 error.");
});

// ✅ Mount routes
app.use('/items', itemsRouter);

// ✅ 404 handler (keep after all valid routes)
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

// ✅ Error handler (last)
app.use(errorHandler);

// ✅ Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
