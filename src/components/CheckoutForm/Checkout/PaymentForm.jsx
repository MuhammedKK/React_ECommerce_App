import React from 'react';
import {Typography, Button, Divider} from '@material-ui/core';
import {Elements, CardElement, ElementsConsumer} from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js';

import Review from './Review'

const stripePromise = loadStripe("pk_test_51JoY2SBveOsUxLgvHAucVP5QubcosswbzdkN1vtCuVeXlIKzBSqQIFF1EHLPwEn9LDOnZwkEColB8knlrrW7RAxD00Qyv8CBlo")

const PaymentForm = ({shippingData, chkToken, backStep, handleCapture, nextStep, timeout, refershcCart}) => {
    console.log(shippingData)

    // Form To Handel The Submit
    const handleForm = async (event, elements, stripe) => {
        event.preventDefault();
        if(!stripe || !elements) return // Stop Excution

        const cardElement = elements.getElement(CardElement);

        const {error, paymentMethod} = await stripe.createPaymentMethod( { type: 'card', card: cardElement } );

        if(error) {
            console.log(error)
        } else {
            const orderData = { // Object Of The Entire Order Data
                line_items: chkToken.live.line_items,
                customer: {
                    firstname: shippingData.firstname,
                    lastname: shippingData.lastname,
                    email: shippingData.email,
                },
                shipping: {
                    name: 'Primary',
                    street: shippingData.address,
                    town_city: shippingData.city,
                    county_state: shippingData.shipSubdivision,
                    postal_zip_code: shippingData.zip,
                    country: shippingData.shipCountry
                },
                fulfillment: {
                    shipping_method: shippingData.shipOption 
                },
                payment: {
                    gateway: 'stripe',
                    stripe: {
                        payment_method_id: paymentMethod.id
                    }
                }
            }
            handleCapture(chkToken.id, orderData)
            timeout();
            nextStep();
            refershcCart();
        }
    }

    return (
        <>
            <Review chkToken={chkToken} />
            <Divider />
            <Typography variant="h6" gutterBottom style={{margin: '20px 0'}}>Payment Method</Typography>
            <Elements stripe={stripePromise}>
                <ElementsConsumer>
                    {({elements, stripe}) => (
                        <form onSubmit={(e) =>handleForm(e, elements, stripe)}>
                            <CardElement />
                            <br />
                            <br />
                            <div style={{display:"flex", justifyContent: 'space-between'}}>
                                <Button variant="outlined" onClick={backStep}>Back</Button>
                                <Button type="submit" disabled={!stripe} variant="contained" color="primary">Pay {chkToken.live.subtotal.formatted_with_symbol}</Button>
                            </div>
                        </form>
                    )}
                </ElementsConsumer>
            </Elements>
        </>
    )
}

export default PaymentForm
