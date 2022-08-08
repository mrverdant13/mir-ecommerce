import React, { useState, useEffect } from "react";
import styled from "styled-components";
// import {productos} from '../data'
import Product from './Product'
import { listarProductos } from "../redux/productos/ProductoAction";
import store from "../redux/Store";

const Products = () => {
  const Container = styled.div`
    padding: 20px;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
  `;
  const [productoList, setProductoList] = useState([]);
  console.log(productoList.products);
  const listadoDeProductos = async () => {
    try {
      const response = await store.dispatch(listarProductos());
      setProductoList(response.productos);
      console.log(response.productos);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    listadoDeProductos();
  }, []);

  return (
    <>
      {/* {productoList.map((item, idx) =>(
            // <Product item={item} key={idx}/>
            <h1>
              {item.total}
            </h1>
            ))} */}
      {productoList && (
          <Container>

            {productoList.products.map((item) => {
              return (
                <Product item={item} key={item._id}/>
              )
            })}
          </Container>
        
      )}
    </>
  );
};

export default Products;
