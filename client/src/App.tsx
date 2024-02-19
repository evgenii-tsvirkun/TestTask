import { Route, Routes } from "react-router-dom";
import Header from "./components/header/Header";
import List from "./components/list/List";
import Cart from "./components/cart/Cart";
import { ROUTES } from "./utils/routes";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path={ROUTES.HOME} element={<List />} />
        <Route path={ROUTES.CART} element={<Cart />} />
      </Routes>
    </>
  );
}

export default App;
