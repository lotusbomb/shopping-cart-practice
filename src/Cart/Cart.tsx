import { useAppDispatch, useAppSelector } from '../hooks';
import { getCartProducts, getTotalPrice, removeFromCart } from './CartSlice';

const Cart = () => {

  const dispatch = useAppDispatch()
  const {totalPrice, cartProducts} = useAppSelector((state) => ({
    cartProducts: getCartProducts(state),
    totalPrice: getTotalPrice(state)
  }))

  const handleRemover = (productId:number) => {
    dispatch(removeFromCart(productId))
  }
  return (
    <div>
      <h3>Cart</h3>
      <h4>{totalPrice}</h4>
      {cartProducts.map((product) => (
        <div key={product.id}>
          <div>{product.title}</div>
          <div>{product.amount}</div>
          <button className="bttn btn" onClick={() => handleRemover(product.id)}>Remove from Cart</button>
        </div>
      ))}
    </div>
  );
}

export default Cart