import "./cart.scss";
import ItemCart from "../itemCart/ItemCart";
import { useAppSelector } from "../../store/hooks";
import { useEffect, useState } from "react";

export default function Cart() {
  const { cart } = useAppSelector((store) => store.productSlice);
  const [totalPrice, setTotalPrice] = useState(0);
  const { products } = useAppSelector((store) => store.productSlice);

  useEffect(() => {
    const total = cart
      .map((el) => el?.price * el.quantity)
      .reduce((acc, item) => acc + item, 0);
    setTotalPrice(total);
  }, [cart]);

  return (
    <section className="cart">
      <div className="cartTitle">
        <h2>Phones</h2>
      </div>
      <div className="content">
        {cart.length ? (
          cart.map((cart) => {
            const product = products.find((el) => el.id === cart.id);
            if (
              product &&
              product.quantity !== undefined &&
              product?.quantity > 0
            ) {
              return <ItemCart key={cart.id} cart={cart} />;
            } else {
              return <p>No Items</p>;
            }
          })
        ) : (
          <p>No Items</p>
        )}
      </div>
      <div className="price">
        <div className="totalPrice">Total: {totalPrice} $</div>
      </div>
    </section>
  );
}
