import { RiDeleteBin3Line } from "react-icons/ri"
import { useDispatch } from "react-redux"
import { removeFromCart, UpdateCartItemQuantity } from "../../redux/slices/cartSlice";


const CartContents = ({ cart, userId, guestId }) => {
     const dispatch = useDispatch();
     
     // Handle adding or subtracting to cart
     const handleAddToCart = (productId, delta, quantity, size, color)=>{
      const newQuantity = quantity + delta;
      if(newQuantity >=1){
        dispatch(
          UpdateCartItemQuantity({
            productId,
            quantity: newQuantity,
            guestId,
            userId,
            size,
            color,
          })
        )
      }
     }

     const handleRemoveFromCart = (productId, size, color)=>{
      dispatch(removeFromCart({ productId, guestId, userId, size, color }))
     }


  return (
    <div>
      {
         cart.products.map((product, index) => (
                <div key={index} className="flex items-start justify-between py-4 border-b">
                 <div className="flex items-start">
                   <img src={product.image} alt={product.name} className="w-20 h-24 object-cover mr-4"/>
                   <div>
                     <h3>{product.name}</h3>
                   <p className="text-sm text-gray-500">size:{product.size} | color:{product.color}</p>
                   <div className="flex items-center mt-2">
                      <button onClick={()=> handleAddToCart(product.productId, -1, product.quantity, product.size, product.color)} className="border rounded px-1 py-0.5 text-xl font-medium mr-3">-</button>
                      <span>{product.quantity}</span>
                      <button  onClick={()=> handleAddToCart(product.productId, 1, product.quantity, product.size, product.color)} className="border rounded px-1 py-0.5 text-xl font-medium ml-3">+</button>
                   </div>
                   </div>
                 </div>
                 <div className="mr-2">
                  <p className="font-medium mb-6">${product.price.toLocaleString()}</p>
                 <button onClick={()=>handleRemoveFromCart(product.productId, product.size, product.color)}><RiDeleteBin3Line className="h-6 w-6 mt-2 text-red-600"/></button>
                 </div>
                 
                </div>
      ))}
    </div>
  )
}

export default CartContents
