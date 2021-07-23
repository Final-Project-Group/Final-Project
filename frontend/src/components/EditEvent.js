import React, { useContext } from "react";
import TextField from "@material-ui/core/TextField";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import Slider from "@material-ui/core/Slider";
import actions from "../api";
import { useState, useEffect } from "react";
import TheContext from "../TheContext";
import {Link, useHistory} from "react-router-dom"

function EditEvent(props) {
  let [event, setEvent] = useState({});
  const [spots, setSpots] = useState("");

  const [details, setDetails] = useState({});
  const { user } = useContext(TheContext);
  const history = useHistory()

  useEffect( () => {
    (async () => {
        let res = await actions.getDetail(props);
        console.log(res.data);
        console.log(user);
        setDetails(() => res.data)
    })()
  }, [props, user]);

  const [sport, setSport] = useState(details?.sport);
  const [level, setLevel] = useState(details?.level);
  const [age, setAge] = useState(details?.age);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(details);
    actions.editEvent(details);

    actions.getDetail(props).then((res) => {
      history.push(`/eventDetails/${props.match.params.dynamicId}`);
    });
  };

  const handleChange = (e) => {
    let newDetails = { ...details };
    newDetails[e.target.name] = e.target.value;
    setDetails(newDetails);

    if (e.target.name === "sport") {
      setSport(e.target.value);
    } else if (e.target.name === "level") {
      setLevel(e.target.value);
    } else if (e.target.name === "age") {
      setAge(e.target.value);
    }
  };

  const deleteEvent = () => {
    actions.deleteEvent( details )
    console.log("delete")
  }

  return (
    <div>
      <h1>Edit Event</h1>
      <br />
      <form className="UserInfo" onSubmit={handleSubmit}>
        Location:
        {console.log(details)}
        <TextField
          value={`${details?.location}`}
          onChange={handleChange}
          label="location"
          name="location"
          id="filled-size-small"
          variant="filled"
          size="small"
          required={true}
        />
        <br />
        <TextField
          value={`${details?.date}`}
          onChange={handleChange}
          name="date"
          id="datetime-local"
          label="Date & time"
          type="datetime-local"
          InputLabelProps={{
            shrink: true,
          }}
          // onChange={handleChange}
          required={true}
        />
        <br />
        Sport:
        <Select
          value={`${details?.sport}`}
          onChange={handleChange}
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          name="sport"
          required={true}
        >
          <MenuItem value="soccer">soccer</MenuItem>
          <MenuItem value="basketball">basketball</MenuItem>
          <MenuItem value="tennis">tennis</MenuItem>
        </Select>
        <br />
        Level:
        <Select
          value={`${details?.level}`}
          onChange={handleChange}
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          name="level"
        >
          <MenuItem value="beginner">beginner</MenuItem>
          <MenuItem value="intermediate">intermediate</MenuItem>
          <MenuItem value="advanced">advanced</MenuItem>
        </Select>
        <br />
        Age:
        <Select
          value={`${details?.age}`}
          onChange={handleChange}
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          name="age"
          required={true}
        >
          <MenuItem value="kids">kids</MenuItem>
          <MenuItem value="teens">teens</MenuItem>
          <MenuItem value="adults">adults</MenuItem>
        </Select>
        <br />
        Image:
        <TextField
          value={`${details?.image}`}
          onChange={handleChange}
          label="image url"
          name="image"
          id="filled-size-small"
          variant="filled"
          size="small"
          // onChange={handleChange}
          required={false}
        />
        <br />
        Event name:
        <TextField
          value={`${details?.eventName}`}
          onChange={handleChange}
          label="Event Name:"
          name="eventName"
          id="filled-size-small"
          variant="filled"
          size="small"
          // onChange={handleChange}
          required={true}
        />
        <br />
        Description:
        <TextField
          value={`${details?.description}`}
          onChange={handleChange}
          label="Description:"
          name="description"
          id="filled-size-small"
          variant="filled"
          size="small"
          // onChange={handleChange}
          required={true}
        />
        <br />
        <br />
        Spots:
        <Slider
          value={`${details?.spots}`}
          onChange={(e, val) => {
            let newDetails = { ...details };
            newDetails.spots = val;
            setDetails(newDetails);
          }}
          name="spots"
          style={{ width: "10%" }}
          defaultValue={1}
          // onChange={ (e, val) => setSpots(val) }
          aria-labelledby="discrete-slider-custom"
          step={2}
          valueLabelDisplay="auto"
          max={22}
        />
        <br />
        <br />
        <Link to="/"><button onClick={deleteEvent}>Delete</button></Link>
        <input type="submit" value="Save" />
      </form>
    </div>
  );
}

export default EditEvent;
