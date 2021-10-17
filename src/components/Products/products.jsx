import React from 'react';
import {Grid} from '@material-ui/core';
import Product from './Product/product';
import useStyles from './styles';

// const products = [
//     {
//         id: 1,
//         name: "Shorts",
//         desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellat",
//         price: '5$',
//         image: "http://placehold.it/100/100"
//     },
//     {
//         id: 2,
//         name: "T-Shirt",
//         desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellat",
//         price: '10$',
//         image: 'http://placehold.it/100/100'
//     },
    
// ];

const Products = ({products}) => {

    const classes = useStyles();

    return (
        <main className={classes.content}>
            <div className={classes.toolbar} />
            <Grid container justifyContent="center" spacing={4}>
                {products.map(pro => (
                    <Grid item key={pro.id} xs={12} sm={6} md={4} lg={3}>
                        <Product key={pro.id} product={pro} />
                    </Grid>
                ))}
            </Grid>
        </main>
    )
}

export default Products;