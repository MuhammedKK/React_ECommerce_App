import React from 'react';
import {Card, CardMedia, CardContent, CardActions, Typography, IconButton} from '@material-ui/core' // Import Material Lib
import {AddShoppingCart} from '@material-ui/icons';


import useStyle from './styles' // This our products style 

const Product = ({product}) => {
    const classes = useStyle();
    return (
        <Card className="classes.root">
            {/* <CardMedia className="classes.media" image={product.image.url} title={product.name} /> */}
            <div style={{width:"300px", margin:"auto"}}>
                <img style={{width:'300px', height:'300px'}} src={product.image.url} alt={product.name} title={product.name} />
            </div>
            <CardContent>
                <div className={classes.cardContent}>
                    <Typography variant="h5" gutterBottom>
                        {product.name}
                    </Typography>
                    <Typography variant="h5" gutterBottom>
                        {product.price.formatted_with_code}
                    </Typography>
                </div>
                <Typography dangerouslySetInnerHTML={{__html: product.description}} variant="body2" color="textSecondary"></Typography>
            </CardContent>
            <CardActions disableSpacing className={classes.cardActions}>  
                <IconButton aria-label="Add to cart">
                    <AddShoppingCart />
                </IconButton>
            </CardActions>
        </Card>
    )
}

export default Product