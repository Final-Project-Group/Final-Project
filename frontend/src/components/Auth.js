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
    //   console.log(country);
  }, []);

  const responseGoogle = async (response) => {
    console.log(response);
    await actions.authenticate(response.profileObj);
    await getTheUser();

    props.history.push("/")
    //(user?.country) ? props.history.push("/") : props.history.push("/UserInfo");
    //console.log((await user) || "user");
    console.log(user);
    console.log(country);
  };
  console.log(user);

  return (
    <div>
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
