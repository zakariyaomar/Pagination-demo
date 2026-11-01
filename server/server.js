require('dotenv').config();

const express = require('express');
const productRouter = require('./routes/product');

const app = express();
const port = process.env.PORT || 3006;

app.use(express.json());
app.use('/api/products', productRouter);

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});