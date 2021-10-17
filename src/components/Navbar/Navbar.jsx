import React from 'react';
import {AppBar, Toolbar, IconButton, Badge, MenuItem, Menu, Typography} from '@material-ui/core';
import {ShoppingCart} from '@material-ui/icons';
import useStyles from './styles'
import logo from '../../assets/logo.jpg';
const Navbar = () => {

    const classes = useStyles();

    return (
        <>  {/* React Fragment */}
            <AppBar position="fixed" className={classes.appBar} color="inherit">
                <Toolbar>
                    <Typography variant="h6" className={classes.title} color="inherit">
                        <img src={logo} alt="Cart" style={{maxWidth: "40px", marginRight: "10px"}}/>
                        My Own Shop
                    </Typography>
                    <div className={classes.grow} />
                    <div className={classes.button}>
                        <IconButton aria-label="Show Cart" color="inherit">
                            <Badge color="secondary" badgeContent={2}>
                                <ShoppingCart />
                            </Badge>
                        </IconButton>
                    </div>
                </Toolbar>
            </AppBar>
        </>
    )

}

export default Navbar