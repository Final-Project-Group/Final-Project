import { useContext, useState, useEffect } from "react";
import { GoogleLogin } from "react-google-login";
import actions from "../api";
import TheContext from "../TheContext";

function Auth(props) {
  let { getTheUser } = useContext(TheContext);
  let { user } = useContext(TheContext);

  const [country, setCountry] = useState("");

  //console.log(user.country);

  useEffect(() => {
    setCountry(user?.country);

    console.log(country);
  }, []);

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
    <div>
      {sendRedirectUser()}
      <h3>Auth</h3>
      <GoogleLogin
        clientId={process.env.REACT_APP_GOOGLEID}
        buttonText="Login"
        onSuccess={responseGoogle}
        onFailure={responseGoogle}
        cookiePolicy={"single_host_origin"}
      />
    </div>
  );
}

export default Auth;
