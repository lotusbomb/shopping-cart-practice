import './App.css';
import Product from './ProductList/Product';
import { Provider } from 'react-redux';
import { store } from './store';
import ProductForm from './ProductList/ProductForm';
import Cart from './Cart/Cart';


function App() {
  return (
    <div className="App">
      <Provider store={store}>
        <Product/>
        <ProductForm/>
        <Cart/>
      </Provider>
    </div>
  );
}

export default App;
