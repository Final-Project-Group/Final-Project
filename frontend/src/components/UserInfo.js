import React, { useState, useEffect } from "react";
import axios from "axios";
import TextField from "@material-ui/core/TextField";
import Checkbox from "@material-ui/core/Checkbox";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import actions from "../api";
import { useHistory } from "react-router-dom";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import '../App.css';


const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
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
    borderRadius: "40px",
  },
}));

function UserInfo(props) {
  const [level, setLevel] = useState("");
  const [level2, setLevel2] = useState("");
  const [level3, setLevel3] = useState("");
  const [currentUser, setCurrentUser] = useState({});
  const history = useHistory();
  const classes = useStyles();
  const [user, setUser] = useState({
    country: "",
    sports: [
      {
        name: "Soccer",
        favorite: false,
        level: "Beginner",
      },
      {
        name: "Basketball",
        favorite: false,
        level: "Beginner",
      },
      {
        name: "Tennis",
        favorite: false,
        level: "Beginner",
      },
    ],
  });

  useEffect(() => {
    (async () => {
      let res = await actions.getUser(props);
      const copy = res.data;
      copy.sports.map((eachSport) => {
        eachSport.favorite = false;
      })
      console.log(copy);
      setCurrentUser(copy);

      console.log(res.data);
    })();
  }, [props]);

  const handleChange = (e) => {
    if (e.target.name === "Country") {
      let newUser = { ...user };
      newUser.country = e.target.value;
      setCurrentUser(newUser);
      setUser(newUser);
    } else {
      let newUser = { ...user };
      newUser.country = currentUser.country;
      newUser.sports[Number(e.target.name)].favorite = e.target.checked;

      setUser(newUser);
      setCurrentUser(newUser);
    }
  };

  const handleChange2 = (e) => {
    let newUser = { ...user };
    newUser.country = currentUser.country;

    // newUser.sports[Number(e.target.name)].level = e.target.value;
    // setUser(newUser);

    if (e.target.name === "Soccer" && newUser.sports[0].favorite === true) {
      newUser.sports[0].level = e.target.value;
      setUser(newUser);
      newUser.country = currentUser.country;
      setCurrentUser(newUser);
      setLevel(e.target.value);
    } else if (
      e.target.name === "Basketball" &&
      newUser.sports[1].favorite === true
    ) {
      setLevel2(e.target.value);
      newUser.sports[1].level = e.target.value;
      setUser(newUser);
      newUser.country = currentUser.country;
      setCurrentUser(newUser);
    } else if (
      e.target.name === "Tennis" &&
      newUser.sports[2].favorite === true
    ) {
      setLevel3(e.target.value);
      newUser.sports[2].level = e.target.value;
      setUser(newUser);
      newUser.country = currentUser.country;
      setCurrentUser(newUser);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (user.country === "") {
     

      if(!user.imageUrl) {
        let copyOfUser = { ...user };
        copyOfUser.imageUrl = 'https://image.shutterstock.com/image-vector/default-avatar-profile-icon-social-260nw-1677509740.jpg'
        setUser(copyOfUser);
      }
      
      let copyOfUser = { ...user };
      console.log(currentUser);
      console.log(user);

      copyOfUser.country = currentUser.country;
      setUser(copyOfUser);
      setCurrentUser(copyOfUser);
    }
    const array = [];
    currentUser.sports.map((eachSport) => {
      array.push(eachSport.favorite);
    });

    let counter = 0;
    let favoriteCheck = array.map((favorite) => {
      return favorite === false ? counter++ : counter;
    });

    console.log(counter);
    console.log(array)
    if (counter === 3) {
      alert("you need at least one sport");
    } else {
      console.log({ user });
      await actions.addDetails({ currentUser }).then(() => {
        history.push(`/Profile`);
      });
    }
  };

  return (
    <div className="userinfo-container">
      <section className="please-set-up">‎ </section>
      <form className="userinfo-form" onSubmit={handleSubmit}>
        <h1 className="please-set-up">Please set up your profile</h1>
        <br />
        <TextField
          label="Country"
          name="Country"
          id="filled-size-small"
          variant="filled"
          size="small"
          value={`${currentUser?.country ? currentUser?.country[0].toUpperCase() +  currentUser?.country.slice(1) : ""}`}
          onChange={handleChange}
          required={true}
          style={{
            borderRadius: "40px",
            backgroundColor: "white",
            border: '4px solid rgb(75,105,40)',
          }}
          InputProps={{
            className: classes.input,
          }}
        />
        <br />
        <h2>Soccer:</h2>
        <Checkbox
          name="0"
          id="Soccer"
          onChange={handleChange}
          inputProps={{ "aria-label": "primary checkbox" }}
          style={{
            color: 'white',
          }}
          // checked={currentUser?.sports?.map((sport, i) => sport.favorite ? true : false) }
        />
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          name="Soccer"
          value={level ? level : "Beginner"}
          onChange={handleChange2}
          renderValue={() => (level ? level : "Beginner")}
          style={{
            fontSize: '2vh',
            backgroundColor: 'white',
            color: 'black'
          }}
        >
          <MenuItem 
            value="Beginner"
            style={{
              color: 'black',
            }}
          >Beginner</MenuItem>
          <MenuItem 
            value="Intermediate"
            style={{
              color: 'black',
            }}
          >Intermediate</MenuItem>
          <MenuItem
            value="Advanced"
            style={{
              color: 'black',
            }}
          >Advanced</MenuItem>
        </Select>
        <br />
        <h2>Basketball:</h2>
        <Checkbox
          name="1"
          id="Basketball"
          onChange={handleChange}
          inputProps={{ "aria-label": "primary checkbox" }}
          style={{
            color: 'white',
          }}
        />
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          name="Basketball"
          value={level2 ? level2 : "Beginner"}
          onChange={handleChange2}
          renderValue={() => (level2 ? level2 : "Beginner")}
          style={{
            fontSize: '2vh',
            backgroundColor: 'white',
            color: 'black'
          }}
        >
          <MenuItem 
            value="Beginner"
            style={{
              color: 'black',
            }}>Beginner</MenuItem>
          <MenuItem 
            value="Intermediate"
            style={{
              color: 'black',
            }}>Intermediate</MenuItem>
          <MenuItem 
            value="Advanced"
            style={{
              color: 'black',
            }}>Advanced</MenuItem>
        </Select>
        <br />
        <h2>Tennis:</h2>
        <Checkbox
          name="2"
          id="Tennis"
          onChange={handleChange}
          inputProps={{ "aria-label": "primary checkbox" }}
          style={{
            color: 'white',
          }}
        />
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          name="Tennis"
          value={level3 ? level3 : "Beginner"}
          onChange={handleChange2}
          renderValue={() => (level3 ? level3 : "Beginner")}
          style={{
            fontSize: '2vh',
            backgroundColor: 'white',
            color: 'black'
          }}
        >
          <MenuItem 
            value="Beginner"
            style={{
              color: 'black',
            }}>Beginner</MenuItem>
          <MenuItem 
            value="Intermediate"
            style={{
              color: 'black',
            }}>Intermediate</MenuItem>
          <MenuItem 
            value="Advanced"
            style={{
              color: 'black',
            }}>Advanced</MenuItem>
        </Select>
        <br />
        <br/>
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
            width: '8%',
          }}
        >    Save
        </Button>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
      </form>
    </div>
  );
}

export default UserInfo;
