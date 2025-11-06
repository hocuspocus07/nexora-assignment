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
  },
  rating:{
    type:Number,
    default:5.0
  },
  colors:{
    type:[String],
    default:['red','yellow','green','white','blue']
  },
  sizes:{
    type:[String],
    default:['S','M','L','XL']
  }
});

export default mongoose.model('Product', ProductSchema);