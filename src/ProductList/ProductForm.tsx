import React, { useState } from 'react'
import { addProduct, Products } from './ProductSlice';
import { useAppDispatch } from '../hooks';

const ProductForm = () => {
  const dispatch = useAppDispatch();

  const [{ title, price, id }, setProduct] = useState<Products>({
    id: 0,
    title: "",
    price: 0,
  });

  const handleChange = ({
    target: { name, value },
  }: React.ChangeEvent<HTMLInputElement>) =>
    setProduct((prev) => {
      (prev as any)[name] = value;
      const newValue = { ...prev };
      return newValue;
    });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(addProduct({title, id, price}));
  };


  return (
    <div>
      <h2>Add to the Store</h2>
      <form action="" onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          id=""
          placeholder="Title"
          value={title}
          onChange={handleChange}
        />
        <input
          type="number"
          name="id"
          id=""
          placeholder="Id"
          value={id}
          onChange={handleChange}
        />
        <input
          type="number"
          name="price"
          id=""
          placeholder="Price"
          value={price}
          onChange={handleChange}
        />
        <button className="btn bttn">Add to Cart</button>
      </form>
    </div>
  );
}

export default ProductForm