import React from 'react';
import {AppBar, Toolbar, IconButton, Badge, MenuItem, Menu, Typography} from '@material-ui/core';
import {ShoppingCart} from '@material-ui/icons';
import useStyles from './styles'
import logo from '../../assets/logo.jpg';
import {Link, useLocation} from 'react-router-dom';
const Navbar = ({totalItems}) => {

    const classes = useStyles();
    // Get The Location
    const location = useLocation();


    return (
        <>  {/* React Fragment */}
            <AppBar position="fixed" className={classes.appBar} color="inherit">
                <Toolbar>
                    <Typography component={Link} to="/" variant="h6" className={classes.title} color="inherit">
                        <img src={logo} alt="Cart" style={{maxWidth: "40px", marginRight: "10px"}}/>
                        My Own Shop
                    </Typography>
                    <div className={classes.grow} />
                    {location.pathname === '/' && (
                        <div className={classes.button}>
                            <IconButton component={Link} to="/cart" aria-label="Show Cart" color="inherit">
                                <Badge color="secondary" badgeContent={totalItems}>
                                    <ShoppingCart />
                                </Badge>
                            </IconButton>
                        </div>
                    )}

                </Toolbar>
            </AppBar>
        </>
    )

}

export default Navbar