import "./itemCart.scss";
import { ICartProps, Product } from "../../types/types";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { addItemToCart, buyItem } from "../../store/slices/productSlice";
import { useGetRateQuery } from "../../store/api/apiSlice";
import { useEffect } from "react";

export default function ItemCart({ cart }: ICartProps) {
  const { products } = useAppSelector((store) => store.productSlice);
  const dispatch = useAppDispatch();
  const product = products.find((el) => el.id === cart.id);

  const { data, refetch } = useGetRateQuery("USD");

  useEffect(() => {
    const interval = setInterval(() => {
      refetch();
    }, 60000);
    return () => clearInterval(interval);
  }, [refetch]);

  const changeQuantity = (item: Product, quantity: number) => {
    if (product && cart.quantity < product?.quantity)
      dispatch(addItemToCart({ ...item, quantity }));
  };

  function buyHandler() {
    if (product && product.quantity !== undefined) {
      dispatch(
        buyItem({ ...product, quantity: product.quantity - cart.quantity })
      );
    }
  }

  return (
    <div className="itemCart">
      <div
        className="itemImg"
        style={{ backgroundImage: `url(${cart.img})` }}
      />
      <div className="itemTitle">
        <span>{cart.title}</span>
      </div>
      <div className="availableCount">
        <span>Available count: {product?.quantity}</span>
      </div>

      <div className="itemCount">
        <div className="buttonCount">
          <button
            onClick={() => changeQuantity(cart, Math.max(1, cart.quantity + 1))}
          >
            +
          </button>
        </div>
        <div className="count">{cart.quantity}</div>
        <div className="buttonCount">
          <button
            onClick={() => changeQuantity(cart, Math.max(1, cart.quantity - 1))}
          >
            -
          </button>
        </div>
      </div>
      <div style={{ display: "flex" }}>
        <div className="itemPrice">
          <span>Price: {cart.price}$</span>
        </div>
        <div className="itemPrice">
          <span>Цена: {cart.price * data?.rates.RUB.toFixed(1)} RUB</span>
        </div>
      </div>
      <div className="buttonBuy">
        <button onClick={buyHandler}>Buy!</button>
      </div>
    </div>
  );
}
