import React from 'react'
import styled from 'styled-components'
import {productos} from '../data'
import Product from './Product'

const Products = () => {
    const Container = styled.div`
        padding:20px;
        display:flex;
        flex-wrap:wrap;
        justify-content:space-between;
    `

  return (
    <Container>
        {productos.map((item, idx) =>(
            <Product item={item} key={idx}/>
        ))}
    </Container>
    

    )
}

export default Products