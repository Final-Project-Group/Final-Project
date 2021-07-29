import React, { useContext, useState, useEffect } from "react";
import TextField from "@material-ui/core/TextField";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import Slider from "@material-ui/core/Slider";
import actions from "../api";
import TheContext from "../TheContext";
import { useHistory } from "react-router-dom";
import axios from "axios";
import Button from "@material-ui/core/Button";
import AddIcon from "@material-ui/icons/Add";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import { makeStyles } from "@material-ui/core/styles";

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

function CreateEvent(props) {
  const classes = useStyles();

  const [event, setEvent] = useState({});

  const [eventPosition, setEventPosition] = useState("");
  const [sport, setSport] = useState("");
  const [level, setLevel] = useState("");
  const [age, setAge] = useState("");
  const [spots, setSpots] = useState(2);
  const { user } = useContext(TheContext);
  const [eventId, setEventId] = useState("");

  let history = useHistory();

  useEffect(() => {
    let eventInfo = { ...event };
    eventInfo["spots"] = spots;
    eventInfo["members"] = [];
    eventInfo["memberIds"] = [];
    eventInfo["members"].push(user);
    eventInfo["memberIds"].push(user._id);
    console.log(eventInfo);
    setEvent(eventInfo);
  }, [spots]);

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
    );
    console.log(ras);

    // ADD THE LOCATION REQ TO THE EVENTS
    // let copy = { ...event };
    // copy.locationRequest = ras.data;
    // console.log(copy)
    // setEvent(copy);
    // console.log(event)

    if (ras.data.results.length === 0) {
      alert(
        "Can not read address. Change and do not forget the state and country"
      );
      return 0;
    } else {
      return 1;
    }
  };

  console.log(spots);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(event);

    if (await getGeocode(event)) {
      await actions.addEvent(event).then((res) => {
        console.log(res.data);
        console.log(event);
        props.match.params.dynamicId = res.data._id;
        console.log(props.match.params.dynamicId);
      });
      await actions.getDetail(props).then((res) => {
        console.log(res.data);
        setEventId(res.data._id);
        history.push(`/eventDetails/${res.data._id}`);
      });
    }
  };

  return (
    <div className="create-details">
      <h1>Create Event</h1>
      <Card
        style={{
          borderRadius: "5%",
          width: "80vw",
          border: "2px solid white",
          backgroundColor: "black",
        }}
      >
        <CardContent>
          <form className="UserInfo" onSubmit={handleSubmit}>
            <TextField
              label="Event Name:"
              name="eventName"
              id="filled-size-small"
              variant="filled"
              size="small"
              onChange={handleChange}
              required={true}
              style={{
                borderRadius: "40px",
                backgroundColor: "white",
              }}
              InputProps={{
                className: classes.input,
              }}
            />
            <br />
            <TextField
              name="date"
              id="datetime-local"
              label="Date & time"
              type="datetime-local"
              InputLabelProps={{
                shrink: true,
                style: { color: "#fff" },
              }}
              onChange={handleChange}
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
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              name="level"
              value={level}
              onChange={handleChange}
              style={{
                width: "200px",
                color: "black",
                borderRadius: "40px",
                backgroundColor: "white",
              }}
              // renderValue={() => (level ? level : "beginner")}
            >
              <MenuItem
                value="beginner"
                style={{
                  color: "black",
                }}
              >
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
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              name="age"
              value={age}
              onChange={handleChange}
              // renderValue={() => (level3 ? level3 : "beginner")}
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
                style={{
                  color: "black",
                }}
                value="teens"
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
            <br />
            <TextField
              label="image url"
              name="image"
              id="filled-size-small"
              variant="filled"
              size="small"
              onChange={handleChange}
              required={false}
              style={{
                borderRadius: "40px",
                backgroundColor: "white",
              }}
              InputProps={{
                className: classes.input,
              }}
            />
            <br />
            <TextField
              label="location"
              name="location"
              id="filled-size-small"
              variant="filled"
              size="small"
              onChange={handleChange}
              required={true}
              style={{
                backgroundColor: "white",
                borderRadius: "40px",
              }}
              InputProps={{
                className: classes.input,
              }}
            />
            <br />
            <TextField
              label="Description:"
              name="description"
              id="filled-size-small"
              variant="filled"
              size="small"
              onChange={handleChange}
              required={true}
              style={{
                borderRadius: "40px",
                backgroundColor: "white",
              }}
              InputProps={{
                className: classes.input,
              }}
            />
            <br />
            Spots:
            <Slider
              name="spots"
              style={{ width: "10%" }}
              defaultValue={2}
              onChange={(e, val) => setSpots(val)}
              aria-labelledby="discrete-slider-custom"
              step={2}
              valueLabelDisplay="auto"
              max={22}
              min={2}
            />
            <br />
            <Button
              variant="contained"
              color="default"
              type="submit"
              value="Save"
              // className={classes.button}
              startIcon={<AddIcon />}
            >
              Save
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

export default CreateEvent;
