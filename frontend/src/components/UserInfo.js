import React, { useState, useEffect } from "react";
import axios from "axios";
import TextField from "@material-ui/core/TextField";
import Checkbox from "@material-ui/core/Checkbox";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import actions from "../api";
import { useHistory } from "react-router-dom";

function UserInfo(props) {
  const [level, setLevel] = useState("");
  const [level2, setLevel2] = useState("");
  const [level3, setLevel3] = useState("");
  const [currentUser, setCurrentUser] = useState({});
  const history = useHistory();

  const [user, setUser] = useState({
    country: "",
    sports: [
      {
        name: "soccer",
        favorite: false,
        level: "beginner",
      },
      {
        name: "basketball",
        favorite: false,
        level: "beginner",
      },
      {
        name: "tennis",
        favorite: false,
        level: "beginner",
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
    if (e.target.name === "country") {
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

    if (e.target.name === "soccer" && newUser.sports[0].favorite === true) {
      newUser.sports[0].level = e.target.value;
      setUser(newUser);
      newUser.country = currentUser.country;
      setCurrentUser(newUser);
      setLevel(e.target.value);
    } else if (
      e.target.name === "basketball" &&
      newUser.sports[1].favorite === true
    ) {
      setLevel2(e.target.value);
      newUser.sports[1].level = e.target.value;
      setUser(newUser);
      newUser.country = currentUser.country;
      setCurrentUser(newUser);
    } else if (
      e.target.name === "tennis" &&
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
    <div>
      <h2>Please set up your profile</h2>
      <form className="UserInfo" onSubmit={handleSubmit}>
        <br />
        <TextField
          label="country"
          name="country"
          id="filled-size-small"
          variant="filled"
          size="small"
          value={`${currentUser?.country ? currentUser?.country : ""}`}
          onChange={handleChange}
          required={true}
        />
        <br />
        Soccer
        <Checkbox
          name="0"
          id="soccer"
          onChange={handleChange}
          inputProps={{ "aria-label": "primary checkbox" }}
          // checked={currentUser?.sports?.map((sport, i) => sport.favorite ? true : false) }
        />
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          name="soccer"
          value={level ? level : "beginner"}
          onChange={handleChange2}
          renderValue={() => (level ? level : "beginner")}
        >
          <MenuItem value="beginner">beginner</MenuItem>
          <MenuItem value="intermediate">intermediate</MenuItem>
          <MenuItem value="advanced">advanced</MenuItem>
        </Select>
        <br />
        Basketball
        <Checkbox
          name="1"
          id="basketball"
          onChange={handleChange}
          inputProps={{ "aria-label": "primary checkbox" }}
        />
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          name="basketball"
          value={level2 ? level2 : "beginner"}
          onChange={handleChange2}
          renderValue={() => (level2 ? level2 : "beginner")}
        >
          <MenuItem value="beginner">beginner</MenuItem>
          <MenuItem value="intermediate">intermediate</MenuItem>
          <MenuItem value="advanced">advanced</MenuItem>
        </Select>
        <br />
        Tennis
        <Checkbox
          name="2"
          id="tennis"
          onChange={handleChange}
          inputProps={{ "aria-label": "primary checkbox" }}
        />
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          name="tennis"
          value={level3 ? level3 : "beginner"}
          onChange={handleChange2}
          renderValue={() => (level3 ? level3 : "beginner")}
        >
          <MenuItem value="beginner">beginner</MenuItem>
          <MenuItem value="intermediate">intermediate</MenuItem>
          <MenuItem value="advanced">advanced</MenuItem>
        </Select>
        <br />
        {/* { user._id === details?.creator?._id ? <Link to={`/editEvent/${details?._id}`}> <button> Edit </button> </Link> : <button onClick={memberJoin}>Join Event</button>} */}
        <input type="submit" value="Submit" />
      </form>
    </div>
  );
}

export default UserInfo;
