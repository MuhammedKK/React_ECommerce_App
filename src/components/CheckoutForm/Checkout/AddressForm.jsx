import React, {useState, useEffect} from 'react';
import {InputLabel, Select, MenuItem, Button, Grid, Typography} from '@material-ui/core';
import {useForm, FormProvider} from 'react-hook-form';
import FormInput from './CusttomTextField';
import {commerce} from '../../Commerce/Commerce';
import {Link} from 'react-router-dom';

const AddressForm = ({chkToken, next}) => {
    // State Of Inputs
    const [shipCountries, setShipCountries] = useState([]);
    const [shipCountry, setShipCountry] = useState('');
    const [shipSubdivisions, setShipSubdivisions] = useState([]);
    const [shipSubdivision, setShipSubdivision] = useState('');
    const [shipOptions, setShipOptions] = useState([]);
    const [shipOption, setshipOption] = useState('');


    // Turn Countries Object To Arr
    const countries = Object.entries(shipCountries).map(([code, name]) => ({id: code, label: name}));
    const subdivisions = Object.entries(shipSubdivisions).map(([code, name]) => ({id: code, label: name}));
    const options = shipOptions.map(shipOp => ({id : shipOp.id, label: `${shipOp.description} - (${shipOp.price.formatted_with_symbol})`}))

    console.log(shipOptions)
    // Function To Get Shipping Countries
    const fetchShippingCountries = async (checkoutTokenId) => {
        const {countries} = await commerce.services.localeListShippingCountries(checkoutTokenId)

        // Set The Countries In State
        setShipCountries(countries);
        setShipCountry(Object.keys(countries)[0]);
    }

    // Function To Get Subdivisions Countries
    const fetchSubdivisionsCountries = async (contId) => {
        const {subdivisions} = await commerce.services.localeListSubdivisions(contId);

        setShipSubdivisions(subdivisions);
        setShipSubdivision(Object.keys(subdivisions)[0]);
    }

    // Function To Get Shipping Options 
    const fetchShippingOptions = async (chkTokenId, country, state = null) => {
        const options = await commerce.checkout.getShippingOptions(chkTokenId, {country, state})

        setShipOptions(options);
        setshipOption(options[0].id);

    }

    // console.log(chkToken)


    /* Effects */

    // Shipping Effect
    useEffect(() => {
        fetchShippingCountries(chkToken.id);
    }, []);

    // Subdivisions Countries
    useEffect(() => {
        if(shipCountry) fetchSubdivisionsCountries(shipCountry);
    }, [shipCountry])

    useEffect(() => {
        if(shipSubdivision) fetchShippingOptions(chkToken.id, shipCountry, shipSubdivision);
    }, [shipSubdivision]);
    

    // React Form Hook
    const methods = useForm();

    return (
        <>
            <Typography variant="h5" gutterBottom>Shipping Address</Typography>
            <FormProvider {...methods}>
                <form onSubmit={methods.handleSubmit((data) => next({...data, shipCountry, shipSubdivision, shipOption}))}>
                    <Grid container spacing={3}>
                        <FormInput name="firstname" label="First Name" />
                        <FormInput name="lastname" label="Last Name" />
                        <FormInput name="address" label="Address" />
                        <FormInput name="email" label="Email" />
                        <FormInput name="city" label="City" />
                        <FormInput name="zip" label="Zip / Postal Code" />
                        <Grid item xs={12} sm={6}>
                            <InputLabel>Shipping Country</InputLabel>
                            <Select value={shipCountry} fullWidth onChange={(e) => setShipCountry(e.target.value)}>
                                {countries.map(country => (
                                    <MenuItem key={country.id} value={country.id}>
                                        {country.label}
                                    </MenuItem>
                                ))}

                            </Select>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <InputLabel>Shipping Subdivision</InputLabel>
                            <Select value={shipSubdivision} fullWidth onChange={(e) => setShipSubdivision(e.target.value)}>
                                {subdivisions.map(subdivision => (
                                    <MenuItem key={subdivision.id} value={subdivision.id}>
                                        {subdivision.label}
                                    </MenuItem>
                                ))}

                            </Select>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <InputLabel>Shipping Options</InputLabel>
                            <Select value={shipOption} fullWidth onChange={(e) => setshipOption(e.target.value)}>
                                {options.map(op => (
                                    <MenuItem key={op.id} value={op.id}>
                                        {op.label}
                                    </MenuItem>  
                                ))}
                            </Select>
                        </Grid>
                    </Grid>
                    <br />

                    <div style={{display: 'flex', justifyContent: 'space-between'}}>
                        <Button component={Link} to="/cart" variant="outlined">Back To Cart</Button>
                        <Button type="submit" variant="outlined" color="primary">Next</Button>
                    </div>
                </form>
            </FormProvider>
        </>
    )
}

export default AddressForm
