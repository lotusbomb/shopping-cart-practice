import { useSelector } from 'react-redux';
import { Products, removedProducts, selectAllProducts, selectProductById, selectProductByIds, selectProductEntities, selectTotalProducts } from './ProductSlice';
import { useAppDispatch } from '../hooks';
import { addToCart } from '../Cart/CartSlice';
import { RootState } from '../store';

const Product = () => {

  const product = useSelector(selectAllProducts);
  const eft = useSelector<RootState>((state) =>
    selectProductById(state, 9)
  );
  const totalNumber = useSelector(selectTotalProducts);
  const productsIds = useSelector(selectProductByIds);
  const entities = useSelector(selectProductEntities);
  console.log(product);
  console.log(eft);
  console.log(totalNumber);
  console.log(productsIds);
  console.log(entities);

  const dispatch = useAppDispatch()

  const addProductToCart = (product: Products) => {
    dispatch(addToCart(product))
  };

  const removeProductFromCart = (id:number) => {
    dispatch(removedProducts(id))
  }
  return (
    <div>
      <h1>List of FoodStuffs</h1>
      {product.map((products) => (
        <ul key={products.id}>
          <li>{`${products.title} : ${products.price}`}</li>
          <button className="btn bttn" onClick={() => addProductToCart(products)}>Add</button>
          <button className="btn bttn" onClick={() => removeProductFromCart(products.id)} >Remove</button>
        </ul>
      ))}
    </div>
  );
}

export default Product