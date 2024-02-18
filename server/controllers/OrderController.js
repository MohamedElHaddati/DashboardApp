import Order from './models/Order.js';
import { supplier } from '../models/Supplier.js';
import { product } from '../models/Product.js';; 
export const getOrders = async (req, res) => {
  try {
    const orders = await Order.find({}).populate('supplier').populate({
      path: 'products.product',
      model: 'Product'
    });
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a single order by ID
export const getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id).populate('supplier').populate({
      path: 'products.product',
      model: 'Product'
    });
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }
    res.status(200).json(order);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create a new order
export const createOrder = async (req, res) => {
    const { supplierId, products } = req.body;
    try {
      const supplier = await Fournisseur.findById(supplierId);
      if (!supplier) {
        return res.status(404).json({ message: 'Supplier not found' });
      }
  
      // Create an array to hold the product references and quantities
      const productRefs = [];
  
      // Loop through the products array in the request body
      for (const product of products) {
        // Find the product by ID and category
        const foundProduct = await Produit.findOne({
          _id: product.productId,
          category_id: product.categoryId
        });
  
        if (!foundProduct) {
          return res.status(404).json({ message: 'Product not found' });
        }
  
        // Add the product reference and quantity to the array
        productRefs.push({
          product: foundProduct._id,
          quantity: product.quantity
        });
      }
  
      // Create a new order with the supplier and products
      const order = new Order({
        supplier: supplier._id,
        products: productRefs
      });
  
      // Save the order to the database
      const newOrder = await order.save();
  
      // Send the newly created order back in the response
      res.status(201).json(newOrder);
    } catch (error) {
      // Handle any errors that occurred during the process
      res.status(500).json({ message: error.message });
    }
  };

  try {
    const newOrder = await order.save();
    res.status(201).json(newOrder);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }


// Update an existing order
export const updateOrder = async (req, res) => {
  try {
    const order = await Order.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }
    res.status(200).json(order);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete an order
export const deleteOrder = async (req, res) => {
  try {
    const order = await Order.findByIdAndDelete(req.params.id);
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }
    res.status(200).json({ message: 'Order deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
app.post('/Add',jsonparser, async (req, res) => {
    try {
      const category = new categorieategorie({
        name: req.body.name,
        description: req.body.description
      });
      await category.save();
      console.log(category);
      res.status(201).send('Category created');
    } catch (error) {
      console.error(error);
      res.status(500).send('Error creating category');
    }
  });