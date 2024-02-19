import Card from "../card/Card";
import "./List.scss";
import { productsData } from "../../data/db_data";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { useEffect } from "react";
import { getProducts } from "../../store/slices/productSlice";

export default function List() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getProducts(productsData));
  }, [dispatch]);

  const { products } = useAppSelector((store) => store.productSlice);
  return (
    <section className="products">
      <div className="productsTitle">
        <h2 className="title">Phones</h2>
      </div>
      <div className="content">
        {products.length ? (
          products.map((product) => <Card key={product.id} product={product} />)
        ) : (
          <p>No Items</p>
        )}
      </div>
    </section>
  );
}
