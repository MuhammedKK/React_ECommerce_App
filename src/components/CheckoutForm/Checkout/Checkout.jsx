import React, {useState, useEffect} from 'react';
import {Paper, Stepper, Step, StepLabel, Typography, CircularProgress, Divider, Button, CssBaseline} from '@material-ui/core';
import useStyles from './styles';
import AddressForm from './AddressForm';
import PaymentForm from './PaymentForm';
import {commerce} from '../../Commerce/Commerce';
import {Link, useHistory} from 'react-router-dom'


// Steps Of The Checkout
const steps = ['Shipping Address', 'Payment Details'];




const Checkout = ({cart, handleCapture, order, error, refershcCart}) => {

    console.log(cart);
    // Hook Of The Active Step
    const [activeStep, setActiveStep] = useState(0);
    // Hook Of CheckoutToken
    const [chkToken, setChkToken] = useState(null);
    // Hook Of Shipping Data
    const [shippingData, setShippingData] = useState({});

    const [isFinished, setIsFinished] = useState(false);
    const history = useHistory();

    // useEffect To Get The Token Aftter The Checkout Component Rendering
    useEffect(() => {
        const fetchChkToken = async () => {
            try {
                const token = await commerce.checkout.generateToken(cart.id, {type : 'cart'})
                console.log(token)
                setChkToken(token);
            } catch(err) {
                console.log(err);
                history.push('/')
            }
        }
        // Run The Func
        fetchChkToken();
    }, []);

    // Styles Of The Component
    const classes = useStyles();


    // To Forward Or Backward Functions
    const nextStep = () =>  setActiveStep((prevStep) => prevStep + 1);
    const backStep = () =>  setActiveStep((prevStep) => prevStep - 1);
    // Next Function
    const Next = (data) => {
        setShippingData(data)
        nextStep();
    }
 
    // Handle Spinng Err

    const timeout = () => {
        setTimeout(() => {
            setIsFinished(true);
        }, 3000)
    }
    
    // Confirmation Component
    let Confirmation = () => order.customer ? (
        <>
            <div>
                <Typography variant="h5">Thank You For Your Purchase , {order.customer.firstname} {order.customer.lastname}</Typography>
                <Divider />
                <Typography variant="subtitle2">Order ref : {order.customer_reference}</Typography>
            </div>
            <br />
            <Button component={Link} to="/" variant="outlined" type="button">Back To Home</Button>
        </>
    ) : isFinished ? (
        <>
            <div>
                <Typography variant="h5">Thank You For Your Purchase</Typography>
                <Divider />
            </div>
            <br />
            <Button component={Link} to="/" variant="outlined" type="button">Back To Home</Button>
        </>
    ) : (
        <div className={classes.spinner}>
            <CircularProgress />
        </div>
    )

    // Check Errors

    if(error) {
        <>
            <Typography variant="h5">Error: {error}</Typography>
            <br />
            <Button component={Link} to="/" variant="outlined" type="button">Back To Home</Button>
        </>
    }


    // Form Component Has The Two STeps Components
    const Form = () => activeStep === 0 ? 
    <AddressForm chkToken={chkToken} next={Next}/>
    : <PaymentForm shippingData={shippingData} chkToken={chkToken} backStep={backStep} handleCapture={handleCapture} nextStep={nextStep} timeout={timeout} refershcCart={refershcCart}/>; 
 
    return (
        <>
        <CssBaseline />
            <div className={classes.toolbar}></div>
            <main className={classes.layout}>
                <Paper className={classes.paper}>
                    <Typography variant="h6" align="center">Checkout</Typography>
                    <Stepper activeStep={activeStep} className={classes.stepper}>
                        {steps.map(step => (
                            <Step key={step}>
                                <StepLabel>{step}</StepLabel>
                            </Step>
                        ))}
                    </Stepper>
                    {activeStep === steps.length ? <Confirmation /> : chkToken && <Form />}
                </Paper>
            </main>
        </>
    )
}

export default Checkout
