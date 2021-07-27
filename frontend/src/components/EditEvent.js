import React, { useContext } from "react";
import TextField from "@material-ui/core/TextField";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import Slider from "@material-ui/core/Slider";
import actions from "../api";
import { useState, useEffect } from "react";
import TheContext from "../TheContext";
import { Link, useHistory } from "react-router-dom";
import Button from '@material-ui/core/Button';
import DeleteIcon from '@material-ui/icons/Delete';
import SaveIcon from '@material-ui/icons/Save';
import '../App.css';


function EditEvent(props) {
  let [event, setEvent] = useState({});
  const [spots, setSpots] = useState(2);

  const [details, setDetails] = useState({});
  const { user } = useContext(TheContext);
  const history = useHistory();

  useEffect(() => {
    (async () => {
      let res = await actions.getDetail(props);
      console.log(res.data);
      console.log(user);
      setDetails(() => res.data);
    })();
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
    actions.deleteEvent(details);
    console.log("delete");
  };

  return (
    <div className='editevent-container'>
      <h1>Edit Event</h1>
      <form className="UserInfo" onSubmit={handleSubmit}>
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
        <br/>
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

        <br/>
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
        <br/>
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

        <br/>
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

        <br/>
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

        <br/>
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
          defaultValue={2}
          // onChange={ (e, val) => setSpots(val) }
          aria-labelledby="discrete-slider-custom"
          step={2}
          valueLabelDisplay="auto"
          max={22}
          min={2}
        />


        <div className="editevent-edit-buttons">
          <div className="edit-buttons">
            <Link to="/home" style={{ textDecoration: 'none' }}>
              <Button
                onClick={deleteEvent}
                variant="contained"
                color="default"
                // className={classes.button}
                startIcon={<DeleteIcon />}
              >
                Delete
              </Button>
            </Link>
          </div>
          <div className="edit-buttons">
              <Button
                variant="contained"
                color="default"
                type="submit"
                value="Save" 
                // className={classes.button}
                startIcon={<SaveIcon />}
              >
                Save
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default EditEvent;
