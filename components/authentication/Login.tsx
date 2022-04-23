import React, { FC, useEffect, useState } from 'react';
import Router from 'next/router'
import { useFormik } from 'formik';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { Box, Grid,Typography} from '@material-ui/core';
import axios from '../../model/axios';
import {User} from '../../model/User';

const Login: FC = () => {
  const [errorMessage, setErrorMessage] = useState<string>('');

  const formik = useFormik({
    initialValues: {
      id: '',
      password: '',
    },
    onSubmit: (values) => {
      axios.post('/api/auth/login',{
        username: values.id,
        password: values.password
      })
      .then((res)=>{
        const user = new User(res.data);
        sessionStorage.setItem('user',JSON.stringify(user));
        Router.push('/student');
      })
      .catch((error)=>{
        const resError = JSON.parse(error.response.data.message);
        setErrorMessage(resError['th']);
      });
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <Box border={2} borderColor='#326295' padding={3} borderRadius={8} >
        <Grid container direction={'column'} spacing={2}>
          <Grid item>
            <TextField
              fullWidth
              id='id'
              name='id'
              label='Student ID'
              value={formik.values.id}
              onChange={formik.handleChange}
              error={formik.touched.id && Boolean(formik.errors.id)}
              helperText={formik.touched.id && formik.errors.id}
            />
          </Grid>
          <Grid item>
            <TextField
              fullWidth
              id='password'
              name='password'
              label='Password'
              type='password'
              value={formik.values.password}
              onChange={formik.handleChange}
              error={formik.touched.password && Boolean(formik.errors.password)}
              helperText={formik.touched.password && formik.errors.password}
            />
          </Grid>
        </Grid>
      </Box>
      <Box display="flex" mt={2} mb={2} justifyContent="center">
      <Typography align="center">{errorMessage}</Typography>
      </Box>
      <Box mt={3}>
        <Button color='primary' variant='contained' fullWidth type='submit'>
          Submit
        </Button>
      </Box>
    </form>
  );
};
export default Login;
