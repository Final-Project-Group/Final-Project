import React, { useContext, useState, useEffect } from "react";
import actions from "../api";
import TheContext from "../TheContext";
import { GoogleLogin } from "react-google-login";
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

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link
        color="inherit"
        href="https://github.com/Final-project-group/Jogo"
        target="_blank"
      >
        Jogo Inc.
      </Link>{" "}
      {new Date().getFullYear()}
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
    marginTop: theme.spacing(1),
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

export default function SignIn(props) {
  const classes = useStyles();

  let { getTheUser } = useContext(TheContext);
  let { user } = useContext(TheContext);

  const [country, setCountry] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  //console.log(user.country);

  useEffect(() => {
    setCountry(user?.country);

    console.log(country);
  }, [props]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log(email, password);
    let ras = await actions.signInUser({ email, password });
    console.log(ras.data.err);

    if (ras.data.err) {
      alert(ras.data.err);
    }
    await getTheUser();
  };

  // Authenticate-with-Google API call
  const responseGoogle = async (response) => {
    console.log(response);
    await actions.authenticate(response.profileObj);
    await getTheUser();
  };
  console.log(user);

  // (user?.country && user?.token) ? props.history.push("/") : props.history.push("/UserInfo");

  // Redirect user if country not set, other wise go to home
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
    <Container component="main" maxWidth="xs" className="signin-container">
      {sendRedirectUser()}
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <form className={classes.form} onSubmit={handleSubmit}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            InputProps={{
              className: classes.input,
            }}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
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
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          />
          <br/>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            // color="primary"
            className={classes.submit}
            style={{
              backgroundColor: 'white',
              color: 'black',
              border: '4px solid rgb(75,105,40)',
              borderRadius: '40px',
              width: '40%',
            }}
          >
            Sign In
          </Button>
          <br/>
          <br/>
          <Grid container>
            <Grid item xs>
              <Link 
                href="#"
                variant="body2"
                style={{
                  color: 'white'
                }}
              >
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link 
                href="/Auth"
                variant="body2"
                style={{
                  color: 'white'
                }}
              >
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
          <br />
          <br/>
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
