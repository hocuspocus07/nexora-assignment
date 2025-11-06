import e from 'express';
import productModel from '../models/product.model.js';
import cartItemModel from '../models/cartItem.model.js';
const router = e.Router();

// get all mock products
router.get('/products', async (req, res) => {
  try {
    const products = await productModel.find();
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// add an item to the cart
router.post('/cart', async (req, res) => {
  const { productId, quantity } = req.body;
  
  if (!productId || !quantity || quantity < 1) {
    return res.status(400).json({ message: 'Invalid request body' });
  }
  
  try {
    // Check if item is already in cart
    let cartItem = await cartItemModel.findOne({ product: productId });
    
    if (cartItem) {
      cartItem.quantity += quantity;
      await cartItem.save();
    } else {
      cartItem = new cartItemModel({
        product: productId,
        quantity: quantity
      });
      await cartItem.save();
    }
    
    const populatedItem = await cartItemModel.findById(cartItem._id).populate('product');
    res.status(201).json(populatedItem);

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// remove an item from the cart
router.delete('/cart/:id', async (req, res) => {
  try {
    const cartItem = await cartItemModel.findById(req.params.id);
    if (!cartItem) {
      return res.status(404).json({ message: 'Cart item not found' });
    }

    await cartItemModel.findByIdAndDelete(req.params.id);
    res.json({ message: 'Item removed from cart' });
    
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// decrease quantity of a cart item by 1 (or remove if 0)
router.patch('/cart/:id/decrease', async (req, res) => {
  try {
    const cartItem = await cartItemModel.findById(req.params.id);
    if (!cartItem) {
      return res.status(404).json({ message: 'Cart item not found' });
    }

    // decrease quantity
    if (cartItem.quantity > 1) {
      cartItem.quantity -= 1;
      await cartItem.save();
      const updatedItem = await cartItemModel.findById(cartItem._id).populate('product');
      return res.json({ message: 'Quantity decreased', item: updatedItem });
    }
    //if qty is zero, remove it
    await cartItemModel.findByIdAndDelete(req.params.id);
    res.json({ message: 'Item removed from cart' });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// get all cart items + total
router.get('/cart', async (req, res) => {
  try {
    const cartItems = await cartItemModel.find().populate('product');
    
    const total = cartItems.reduce((acc, item) => {
      // Handle cases where product might be null 
      if (item.product) {
        return acc + (item.product.price * item.quantity);
      }
      return acc;
    }, 0);
    
    res.json({ items: cartItems, total: total });
    
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// mock checkout, then clear the cart
router.post('/checkout', async (req, res) => {
  const { cartItems, total, name, email } = req.body;
  console.log('Processing checkout for:', { name, email, total });

  try {
    await cartItemModel.deleteMany({});
    
    const receipt = {
      confirmationId: `RECEIPT-${Date.now()}`,
      timestamp: new Date().toISOString(),
      total: total,
      itemsPurchased: cartItems.map(item => ({
        name: item.product.name,
        quantity: item.quantity
      }))
    };
    
    res.status(200).json(receipt);
    
  } catch (err) {
     res.status(500).json({ message: 'Checkout failed' });
  }
});

export default router;