import React from 'react';
import {Typography, Button, Card, CardActions, CardContent, CardMedia} from '@material-ui/core';
import useStyles from './styles';

const CartItem = ({item, onUpdate, onDelete}) => {
    const classes = useStyles();
    console.log(item)
    return (
        <Card>
            {/* <CardMedia image={item.media.source} alt={item.name} className={classes.media} /> */}
            <img style={{width:'300px', height:'300px'}} src={item.image.url} alt={item.name} title={item.name} />
            <CardContent className={classes.cardContent}>
                <Typography variant="h4">{item.name}</Typography>
                <Typography variant="h5">{item.line_total.formatted_with_symbol}</Typography>
            </CardContent>
            <CardActions className={classes.cardActions}>
                <div className={classes.buttons}>
                    <Button type="button" size="small" onClick={() => onUpdate(item.id, item.quantity - 1)}>-</Button>
                    <Typography variant="h5">{item.quantity}</Typography>
                    <Button className={classes.removeBtn} type="button" size="small" onClick={() => onUpdate(item.id, item.quantity + 1)}>+</Button>
                </div>
                <Button variant="contained" type="button" color="secondary" onClick={() => onDelete(item.id)}>Remove</Button>
            </CardActions>
        </Card>
    )
}

export default CartItem

