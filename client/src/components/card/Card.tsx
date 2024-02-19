import "./card.scss";
import { IItemProps } from "../../types/types";
import { useAppDispatch } from "../../store/hooks";
import { addItemToCart } from "../../store/slices/productSlice";
import { useEffect } from "react";
import { useGetRateQuery } from "../../store/api/apiSlice";

export default function Card({ product }: IItemProps) {
  const dispatch = useAppDispatch();
  const { data, refetch } = useGetRateQuery("USD");

  useEffect(() => {
    const interval = setInterval(() => {
      refetch();
    }, 60000);
    return () => clearInterval(interval);
  }, [refetch]);

  function addToCartHandler() {
    if (product.quantity !== 0) {
      dispatch(addItemToCart({ ...product, quantity: 1 }));
    }
  }
  return (
    <div className="card">
      <div>
        <h3 className="itemTitle">{product.title}</h3>
      </div>
      <div
        className="itemImg"
        style={{ backgroundImage: `url(${product.img})` }}
      />
      {product.quantity === 0 && <p>Product Not Available</p>}
      <div className="price">
        <div className="itemPrice">
          <span>Price: {product.price} $</span>
        </div>
        <div className="itemPrice">
          <span>Цена: {product.price * data?.rates.RUB.toFixed(1)} RUB</span>
        </div>
      </div>
      <div className="button">
        <button onClick={addToCartHandler}>Add to cart</button>
      </div>
    </div>
  );
}
