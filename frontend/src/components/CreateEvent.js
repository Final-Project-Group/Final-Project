import React, {useContext} from "react";
import TextField from "@material-ui/core/TextField";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import Slider from '@material-ui/core/Slider';
import actions from "../api";
import { useState, useEffect } from "react";
import TheContext from "../TheContext";

function CreateEvent(props) {
  let [event, setEvent] = useState({});

  const [sport, setSport] = useState("");
  const [level, setLevel] = useState("");
  const [age, setAge] = useState("");
  const [spots, setSpots] = useState("");
  const { user } = useContext(TheContext);


  useEffect(() => {
    let eventInfo = { ...event };
    eventInfo['spots'] = spots;
    eventInfo['members'] = [];
    eventInfo['memberIds'] = [];
    eventInfo['members'].push(user);
    eventInfo['memberIds'].push(user._id);
    console.log(eventInfo)
    setEvent(eventInfo);
  }, [spots])

  const handleChange = (e, val) => {
    let eventInfo = { ...event };
    eventInfo[e.target.name] = e.target.value;
    setEvent(eventInfo);

    if (e.target.name === "sport") {
      setSport(e.target.value);
    } else if (e.target.name === "level") {
      setLevel(e.target.value);
    } else if (e.target.name === "age") {
      setAge(e.target.value);
    }
  };

  console.log(spots);

  const handleSubmit = async (e) => {
    e.preventDefault();
    let res = await actions.addEvent( event );
  }

   return (
    <div>
      <h1>Create Event</h1>
      <br />
      <form className="UserInfo" onSubmit={handleSubmit}>
      Location:
      <TextField
        label="location"
        name="location"
        id="filled-size-small"
        variant="filled"
        size="small"
        onChange={handleChange}
        required={true}
      />
      <br />
      <TextField
        name="date"
        id="datetime-local"
        label="Date & time"
        type="datetime-local"
        defaultValue="2017-05-24T10:30"
        InputLabelProps={{
          shrink: true,
        }}
        onChange={handleChange}
        required={true}
      />
      <br />
      Sport:
      <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        name="sport"
        value={sport}
        // renderValue={() => (event.sport ? event.sport : "")}
        onChange={handleChange}
        required={true}
      >
        <MenuItem value="soccer">soccer</MenuItem>
        <MenuItem value="basketball">basketball</MenuItem>
        <MenuItem value="tennis">tennis</MenuItem>
      </Select>
      <br />
      Level:
      <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        name="level"
        value={level}
        onChange={handleChange}
        // renderValue={() => (level ? level : "beginner")}
      >
        <MenuItem value="beginner">beginner</MenuItem>
        <MenuItem value="intermediate">intermediate</MenuItem>
        <MenuItem value="advanced">advanced</MenuItem>
      </Select>
      <br />
      Age:
      <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        name="age"
        value={age}
        onChange={handleChange}
        // renderValue={() => (level3 ? level3 : "beginner")}
        required={true}
      >
        <MenuItem value="kids">kids</MenuItem>
        <MenuItem value="teens">teens</MenuItem>
        <MenuItem value="adults">adults</MenuItem>
      </Select>
      <br />
      Image:
      <TextField
        label="image url"
        name="image"
        id="filled-size-small"
        variant="filled"
        size="small"
        onChange={handleChange}
        required={false}
      />
      <br />
      Event name:
      <TextField
        label="Event Name:"
        name="eventName"
        id="filled-size-small"
        variant="filled"
        size="small"
        onChange={handleChange}
        required={true}
      />
      <br />
      Description:
      <TextField
        label="Description:"
        name="description"
        id="filled-size-small"
        variant="filled"
        size="small"
        onChange={handleChange}
        required={true}
      />
      <br/>
      <br/>
      Spots:
      <Slider
        name="spots"
        style={{width: '10%'}}
        defaultValue={1}
        onChange={ (e, val) => setSpots(val) }  
        aria-labelledby="discrete-slider-custom"
        step={2}
        valueLabelDisplay="auto"
        max={22}
      />
      <br/>
      <br/>
      <input type="submit" value="Submit" />
      </form>
    </div>
  );
}

export default CreateEvent;
