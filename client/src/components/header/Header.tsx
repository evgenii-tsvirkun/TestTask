import { useEffect, useState } from "react";
import { useAppSelector } from "../../store/hooks";
import "./header.scss";
import { Link } from "react-router-dom";
import { ROUTES } from "../../utils/routes";
import { FiShoppingCart } from "react-icons/fi";

export default function Header() {
  const { cart } = useAppSelector((store) => store.productSlice);
  const [item, setItem] = useState(0);
  useEffect(() => {
    setItem(cart.reduce((acc, el) => acc + el.quantity, 0));
  }, [cart, item]);

  return (
    <nav className="header">
      <Link to={ROUTES.HOME}>
        <div className="link">Main</div>
      </Link>
      <Link to={ROUTES.CART}>
        <div className="link">
          <FiShoppingCart />
          <span>{item}</span>
        </div>
      </Link>
    </nav>
  );
}
