import api from "../../helpers/api";
import { Product } from "./Product";
import { Container } from "react-bootstrap";
import { useEffect, useState } from "react";

function Products() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const getProducts = async () => {
      const result = await api.get("productos");
      setProducts(result.data);
    };

    getProducts();
  }, []);

  return (
    <div>
      {products.map((product) => {
        return (
          <>
            <div className="container">
              <div className="row">
                <Product {...product} />
              </div>
            </div>
          </>
        );
      })}
    </div>
  );
}

export default Products;
