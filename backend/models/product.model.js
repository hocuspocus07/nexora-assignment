import mongoose,{Schema} from "mongoose";

const ProductSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  imageUrl: {
    type: String,
    default: 'https://via.placeholder.com/150'
  }
});

export default mongoose.model('Product', ProductSchema);