import React, { useState } from "react";
import axios from "axios";
import TextField from "@material-ui/core/TextField";
import Checkbox from "@material-ui/core/Checkbox";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import actions from "../api";

function UserInfo(props) {
  const [level, setLevel] = useState("");
  const [level2, setLevel2] = useState("");
  const [level3, setLevel3] = useState("");

  const [user, setUser] = useState({
    country: "usa",
    sports: [
      {
        name: 'soccer',
        favorite: false,
        level: "",
      },
      {
        name: 'basketball',
        favorite: false,
        level: "",
      },
      {
        name: 'tennis',
        favorite: false,
        level: "",
      },
    ],
  });

  const handleChange = (e) => {
    if (e.target.name === "country") {
      let newUser = { ...user };
      newUser.country = e.target.value;
      setUser(newUser);
    } else {
      let newUser = { ...user };
      newUser.sports[Number(e.target.name)].favorite = e.target.checked;

      setUser(newUser);
    }
  };

  const handleChange2 = (e) => {
    let newUser = { ...user };
    
    // newUser.sports[Number(e.target.name)].level = e.target.value;
    // setUser(newUser);

    if (e.target.name === "soccer" && newUser.sports[0].favorite === true) {
      newUser.sports[0].level = e.target.value;
      setUser(newUser);
      setLevel(e.target.value);
    } else if (e.target.name === "basketball" && newUser.sports[1].favorite === true) {
      setLevel2(e.target.value);
      newUser.sports[1].level = e.target.value;
      setUser(newUser);
    } else if (e.target.name === "tennis" && newUser.sports[2].favorite === true) {
      setLevel3(e.target.value);
      newUser.sports[2].level = e.target.value;
      setUser(newUser);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let res = await actions.addDetails({ user });
    console.log(user);
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
        />
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          name="soccer"
          value={level}
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
          value={level2}
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
          value={level3}
          onChange={handleChange2}
          renderValue={() => (level3 ? level3 : "beginner")}
        >
          <MenuItem value="beginner">beginner</MenuItem>
          <MenuItem value="intermediate">intermediate</MenuItem>
          <MenuItem value="advanced">advanced</MenuItem>
        </Select>
        <br />
        <input type="submit" value="Submit" />
      </form>
    </div>
  );
}

export default UserInfo;
