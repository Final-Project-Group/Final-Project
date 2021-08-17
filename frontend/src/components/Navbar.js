import React, { useContext } from "react";
import { Link, Route } from "react-router-dom";
import clsx from "clsx";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import CssBaseline from "@material-ui/core/CssBaseline";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import MailIcon from "@material-ui/icons/Mail";
import "../App.css";
import TheContext from "../TheContext";
import HomeRoundedIcon from "@material-ui/icons/HomeRounded";
import AddRoundedIcon from "@material-ui/icons/AddRounded";
import Button from "@material-ui/core/Button";

import { useHistory, useLocation } from "react-router-dom";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexGrow: 1,
    textAlign: "left",
  },
  appBar: {
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  offset: theme.mixins.toolbar,
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  hide: {
    display: "none",
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
    backgroundColor: "black",
  },
  drawerHeader: {
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: "flex-end",
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -drawerWidth,
  },
  contentShift: {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },

  title: {
    flexGrow: 1,
  },
  // offset: theme.mixins.toolbar,
}));

export default function Navbar(props) {
  const classes = useStyles(); // MaterialUI use styles
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  // Print pathname on to navbar title
  const history = useHistory();

  const returnPathname = () => {
    console.log(history.location.pathname);
    let pathname = history.location.pathname;
    pathname = pathname.slice(1, pathname.length);
    pathname = pathname.charAt(0).toUpperCase() + pathname.slice(1);
    console.log(pathname);
    console.log(pathname.substr(0, pathname.lastIndexOf("/")));
    let includesNum = false;
    pathname.split("").map((eachChar) => {
      if (!isNaN(eachChar)) {
        includesNum = true;
      }
    });
    console.log(includesNum);
    return includesNum
      ? pathname.substr(0, pathname.lastIndexOf("/"))
      : pathname;
  };

  const { user } = useContext(TheContext);

  console.log(user);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <div className="navbarParent">
      <div className={classes.root}>
        <CssBaseline />
        <AppBar
          position="fixed"
          className={clsx(classes.appBar, {
            [classes.appBarShift]: open,
          })}
          // style={{background: 'transparent', boxShadow: 'none'}}
        >
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerOpen}
              edge="start"
              className={clsx(classes.menuButton, open && classes.hide)}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" className={classes.title}>
              {returnPathname()}
            </Typography>
            <Button
              onClick={props.handler}
              variant="outlined"
              style={{ color: "white" }}
            >
              {props.light ? "Dark mode" : "Light mode"}
            </Button>
          </Toolbar>
        </AppBar>
        {/* <Toolbar /> */}
        {/* <div className={classes.offset}/> */}

        <Drawer
          className={classes.drawer}
          variant="temporary"
          anchor="left"
          open={open}
          onClose={(ev, reason) => setOpen(false)}
          classes={{
            paper: classes.drawerPaper,
          }}
        >
          <div className={classes.drawerHeader}>
            <IconButton
              onClick={handleDrawerClose}
              style={{
                color: "white",
              }}
            >
              {theme.direction === "ltr" ? (
                <ChevronLeftIcon />
              ) : (
                <ChevronRightIcon />
              )}
            </IconButton>
          </div>
          <Divider />
          {/* ---DRAWER ITEM LIST--- */}
          <List
            onClick={() => {
              handleDrawerClose();
            }}
          >
            {[
              {
                name: "Dashboard",
                url: "/Profile",
                icon: <img src={user.imageUrl} className="navProfileImg"></img>,
              },
              {
                name: "Home",
                url: "/home",
                icon: <HomeRoundedIcon style={{ fill: "lightgray" }} />,
              },
              {
                name: "New Event",
                url: "/CreateEvent",
                icon: <AddRoundedIcon style={{ fill: "lightgray" }} />,
              },
            ].map((item, index) => (
              <ListItem button key={item.name} component={Link} to={item.url}>
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText primary={item.name} />
              </ListItem>
            ))}
          </List>
        </Drawer>
      </div>
    </div>
  );
}
