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
import axios from 'axios';
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import { makeStyles } from "@material-ui/core/styles";
import '../App.css';

const JOSE_API_KEY = process.env.REACT_APP_API_KEY;

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

function EditEvent(props) {
  const classes = useStyles();
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

  const getGeocode = async (event) => {
    let convert = event?.location;
    // console.log(details?.location);
    // console.log(typeof details?.location);
    // console.log(convert);
    convert = convert
      ?.split("")
      ?.map((char) => (char === " " ? "+" : char))
      .join("");
    console.log(convert);
    // setAddress(convert)
    let ras = await axios.get(
      // `https://maps.googleapis.com/maps/api/geocode/json?address=29+champs+elys%C3%A9e+paris&key=AIzaSyAf6-uRnVV8NM67T9FobkbcynWfDGe-0oY`
      `https://maps.googleapis.com/maps/api/geocode/json?address=${convert}&key=${JOSE_API_KEY}`
    )
    console.log(ras);

    // ADD THE LOCATION REQ TO THE EVENTS
    // let copy = { ...event };
    // copy.locationRequest = ras.data;
    // console.log(copy)
    // setEvent(copy);
    // console.log(event)

    if (ras.data.results.length === 0 ) {
      alert('Can not read address. Change and do not forget the state and country')
      return 0;
    } else {
      return 1;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(details);
    
    if(await getGeocode(event)) {
      await actions.editEvent(details);
      await actions.getDetail(props).then((res) => {
        history.push(`/eventDetails/${props.match.params.dynamicId}`);
      });
    };
  }

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
      <Card
        style={{
          borderRadius: "40px",
          width: "80vw",
          border: "2px solid white",
          backgroundColor: "black",
        }}
      >
        <CardContent>
      <form className="UserInfo" onSubmit={handleSubmit}>
        {console.log(details)}
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
          style={{
                borderRadius: "40px",
                backgroundColor: "white",
              }}
          InputProps={{
            className: classes.input,
          }}
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
            style: { color: "#fff" },
          }}
          required={true}
          style={{
              color: "white",
              borderRadius: "40px",
              // backgroundColor: 'white'
            }}
          InputProps={{
            className: classes.input,
          }}
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
          style={{
                width: "200px",
                color: "black",
                borderRadius: "40px",
                backgroundColor: "white",
          }}
        >
          <MenuItem 
            value="soccer"
            style={{
              color: "black",
            }}
          >
            soccer
          </MenuItem>
          <MenuItem 
            value="basketball"
            style={{
              color: "black",
            }}
          >
            basketball
          </MenuItem>
          <MenuItem
            value="tennis"
            style={{
              color: "black",
            }}
          >
            tennis
          </MenuItem>
        </Select>

        Level:
        <Select
          value={`${details?.level}`}
          onChange={handleChange}
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          name="level"
          style={{
                width: "200px",
                color: "black",
                borderRadius: "40px",
                backgroundColor: "white",
          }}
        >
          <MenuItem 
            value="beginner"
            style={{
              color: "black",
            }}>
            beginner
          </MenuItem>
          <MenuItem
            value="intermediate"
            style={{
              color: "black",
            }}  
          >
            intermediate
          </MenuItem>
          <MenuItem
            value="advanced"
            style={{
              color: "black",
            }}
          >
            advanced
          </MenuItem>
        </Select>

        Age:
        <Select
          value={`${details?.age}`}
          onChange={handleChange}
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          name="age"
          required={true}
          style={{
            width: "200px",
            color: "black",
            borderRadius: "40px",
            backgroundColor: "white",
          }}
        >
          <MenuItem 
            value="kids"
            style={{
              color: "black",
            }}
          >
            kids
          </MenuItem>
          <MenuItem
            value="teens"
            style={{
              color: "black",
            }}            
          >
            teens
          </MenuItem>
          <MenuItem
            value="adults"
            style={{
              color: "black",
            }}
          >
            adults
          </MenuItem>
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
          style={{
            borderRadius: "40px",
            backgroundColor: "white",
          }}
          InputProps={{
            className: classes.input,
          }}
        />

        <br/>
        <TextField
          value={`${details?.location}`}
          onChange={handleChange}
          label="location"
          name="location"
          id="filled-size-small"
          variant="filled"
          size="small"
          required={true}
          style={{
            backgroundColor: "white",
            borderRadius: "40px",
          }}
          InputProps={{
            className: classes.input,
          }}
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
          style={{
            borderRadius: "40px",
            backgroundColor: "white",
          }}
          InputProps={{
            className: classes.input,
          }}
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
      </CardContent>
      </Card>
    </div>
  );
}

export default EditEvent;
