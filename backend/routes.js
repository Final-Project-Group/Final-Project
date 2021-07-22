const express = require("express");
const jwt = require("jsonwebtoken");
const router = express.Router();
const Post = require("./models/Post");
const User = require("./models/User");
const Event = require("./models/Event");

/**ALL OUR BACKEND ROUTES */

router.get("/", (req, res) => {
  res.json({ serverWorking: true });
});
// router.get("/", (req, res) => {
//     Event.find().then(events => {
//         res.json(events)
//         console.log(events)
//     })
// });

router.get("/get-the-user", authorize, async (req, res) => {
  let user = await User.findById(res.locals.user._id);
  res.json(user);
});

router.post("/add-post", authorize, async (req, res) => {
  let newPost = req.body;
  newPost.userId = res.locals.user._id;
  Post.create(newPost).then((post) => {
    res.json(post);
  });
});

router.post("/add-details", authorize, async (req, res) => {
  let updatedUser = req.body;
  console.log(updatedUser);
  updatedUser.userId = res.locals.user._id;
  console.log(updatedUser.userId);
  User.findOneAndUpdate(
    { _id: updatedUser.userId },
    { country: updatedUser.user.country, sports: updatedUser.user.sports }
  ).then((user) => {
    res.json(user);
  });
});


router.post("/add-event", authorize, async (req, res) => {
  let newEvent = req.body;
  newEvent.creator = res.locals.user;
  Event.create(req.body).then((event) => {
    res.json(event);
    console.log(event)
  });
});

router.post("/join-event", authorize, async (req, res) => {
  let updatedEvent = req.body;
  // console.log(updatedEvent);
  console.log(updatedEvent._id);
  console.log(updatedEvent.members);


  Event.findOneAndUpdate(
    { _id: updatedEvent._id },
    { members: updatedEvent.members }
  ).then((user) => {
    res.json(user);
  });
});



router.get("/all-the-events", (req, res) => {
    Event.find()
    // .populate("userId")
    .then((posts) => {
      res.json(posts);
    });
});

router.get("/get-event-details/:dynamicId", (req, res) => {
    console.log("anythnig")
    Event.findOne({_id: req.params.dynamicId}).then((event) => {
        res.json(event)
        
        console.log(event)
    })
});

router.post("/authenticate", async (req, res) => {
  let user = await User.findOne({ email: req.body.email });

  if (!user) {
    user = await User.create(req.body);
  }

  jwt.sign({ user }, "secret key", { expiresIn: "30min" }, (err, token) => {
    res.json({ user, token });
  });
});

//Middle ware >>> Put this in the middle of any route where you want to authorize
function authorize(req, res, next) {
  let token = req.headers.authorization.split(" ")[1]; //Token from front end
  if (token) {
    jwt.verify(token, "secret key", (err, data) => {
      if (!err) {
        res.locals.user = data.user; //Set global variable with user data in the backend
        next();
      } else {
        res.status(403).json({ message: err });
        //throw new Error({ message: "ahhh" })
      }
    });
  } else {
    res.status(403).json({ message: "Must be logged in!" });
  }
}

module.exports = router;
