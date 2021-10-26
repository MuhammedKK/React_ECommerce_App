import React from 'react';
import {Container,Typography, Grid, Button} from '@material-ui/core';
import useStyles from './styles';
import CartItem from './CartItem/CartItem';
import {Link} from 'react-router-dom';

const Cart = ({Cart, onUpdate, onDelete, onDeleteAll}) => {
    const classes = useStyles();
    // If False Run This Comp
    const EmptyCart = () => (
        <Typography variant="h2" className={classes.title}>No Items Here Go To Products And Get Some !</Typography>
    )
    // Else Run This Comp
    const NotEmptyCart = () => (
        // Cart Item
        <>
            <Grid container spacing={3}>
                 {Cart.line_items.map((item) => (
                     <Grid item xs={12} sm={6}>
                        <CartItem 
                            key={item.id} 
                            item={item}
                            onUpdate={onUpdate}
                            onDelete={onDelete}
                        />
                   </Grid>
                ))  }
            </Grid>
            <div className={classes.cardDetails}>
                <Typography variant="h4">
                    Total = {Cart.subtotal.formatted_with_symbol}
                </Typography>
                <div>
                    <Button className={classes.emptyButton} size="large" type="button" variant="contained" color="secondary" onClick={onDeleteAll}>Empty Cart</Button>
                    <Button component={Link} to="/checkout" className={classes.checkoutButton} size="large" type="button" variant="contained" color="primary">Checkout</Button>
                </div>
            </div>
        </>
    )
    if (!Cart.total_items) return "Loading...";
    return (
        <Container className={classes.height}>
            <div />
            <Typography variant="h3" className={classes.toolbar}>Yor Shipping Cart</Typography>
            {/* Cart Items*/}
            {Cart.total_items.length === 0 ? <EmptyCart /> : <NotEmptyCart />}

        </Container>
    )

}

export default Cart;