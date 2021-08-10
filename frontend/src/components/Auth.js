import { useContext, useState, useEffect } from "react";
import { GoogleLogin } from "react-google-login";
import actions from "../api";
import TheContext from "../TheContext";

import React from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import PropTypes from "prop-types";

function Copyright() {
  return (
    <Typography variant="body2" color="textPrimary" align="center">
      {"Copyright © "}
      <Link
        color="inherit"
        href="https://github.com/Final-project-group/Jogo"
        target="_blank"
      >
        Jogo Inc.
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: 'white',
    border: '5px solid rgb(75,105,40)',
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  input: {
    // color:"white",
    background: "white",
    color: "black",
  },
}));

export default function Auth(props, { setToken }) {
  const classes = useStyles();

  let { getTheUser } = useContext(TheContext);
  let { user } = useContext(TheContext);

  const [country, setCountry] = useState("");

  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [name, setName] = useState();
  const [allUsers, setAllUsers] = useState();

  const handleSubmit = async (e) => {
    e.preventDefault();

    let ras = await actions.createUser({ email, password, name });
    console.log(ras);
    if (ras.data.err) {
      alert(ras.data.err);
    }
    await getTheUser();
  };

  //console.log(user.country);

  // GETALLUSERS MIGHT BE USELESS, PLEASE CONFIRM AND DELETE IF NECESSARY as well as allusers state
  useEffect(async () => {
    let res = await actions.getAllUsers();
    setAllUsers(res?.data);
    console.log(res?.data);

    setCountry(user?.country);

    console.log(country);
  }, [props]);

  console.log(allUsers);

  const responseGoogle = async (response) => {
    console.log(response);
    await actions.authenticate(response.profileObj);
    await getTheUser();
  };
  console.log(user);

  // (user?.country && user?.token) ? props.history.push("/") : props.history.push("/UserInfo");

  const sendRedirectUser = () => {
    if (user?.country && localStorage?.token) {
      props.history.push("/home");
    } else if (!user?.country && localStorage?.token) {
      props.history.push("/UserInfo");
    } else {
      console.log("stay here");
    }
  };
  // If localStorage keeps token after 30 min auto log out, use
  // localStorage.clear() to be able to log in again.

  return (
    <Container component="main" maxWidth="xs">
      {sendRedirectUser()}
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>

        <Typography component="h1" variant="h5">
          Sign up with email:
        </Typography>
        <form className={classes.form} onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={12}>
              <TextField
                autoComplete="fname"
                name="name"
                variant="outlined"
                required={true}
                fullWidth
                id="name"
                label="Full Name"
                autoFocus
                InputProps={{
                  className: classes.input,
                }}
                onChange={(e) => setName(e.target.value)}
              />
            </Grid>
            {/* <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="lastName"
                label="Last Name"
                name="lastName"
                autoComplete="lname"
                InputProps={{
                  className: classes.input
                }}
              />
            </Grid> */}
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required={true}
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                InputProps={{
                  className: classes.input,
                  pattern: "/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/"
                }}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required={true}
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                InputProps={{
                  className: classes.input,
                }}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <FormControlLabel
                control={<Checkbox value="allowExtraEmails" color="primary" />}
                label="I want to receive inspiration, marketing promotions and updates via email."
                labelStyle="primary"
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            style={{
              backgroundColor: 'white',
              color: 'black',
              border: '4px solid rgb(75,105,40)',
              borderRadius: '40px',
              width: '40%',
            }}
          >
            Sign Up
          </Button>
          <br />
          <br />
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link
                href="/signin"
                variant="body2"
                style={{
                  color: 'white'
                }}
              >
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
          <br />
          <br />
          <Typography component="h1" variant="h5">
            Or sign in with Google:
          </Typography>
          <br />
          <br />
          <GoogleLogin
            clientId={process.env.REACT_APP_GOOGLEID}
            buttonText="Login"
            onSuccess={responseGoogle}
            onFailure={responseGoogle}
            cookiePolicy={"single_host_origin"}
          />
        </form>
      </div>
      <Box mt={5}>
        <Copyright />
      </Box>
    </Container>
  );
}

Auth.propTypes = {
  setToken: PropTypes.func.isRequired,
};
