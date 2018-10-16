const express = require("express");

const router = express.Router();

const mongoose = require("mongoose");
const passport = require("passport");

const Profile = require(".././models/Profile");
const User = require(".././models/User");
const validateProfileInput = require("../../validation/profile");
const validateExperienceInput = require("../../validation/experience");
const validateEducationInput = require("../../validation/education");

//@route GET api/profile/test
//@dsc tests profile route
//@access public
router.get("/test", (req, res) =>
  res.json({ msg: "hello world from profile" })
);
//@route GET api/profile/all
//@dsc gets all profiles
//@access public
router.get("/all", (req, res) => {
  const errors = {};
  Profile.find()
    .populate("user", ["name", "avatar"])
    .then(profiles => {
      if (!profiles) {
        errors.noprofile = "there are no profiles";
        return res.status(404).json(errors);
      }
      res.json(profiles);
    })
    .catch(res.status(404).json({ profiles: "there are no profiles" }));
});

//@route GET api/profile/handle/:handle
//@dsc gets profile by handle
//@access public

router.get("/handle/:handle", (req, res) => {
  const errors = {};

  Profile.findOne({ handle: req.params.handle })
    .populate("user", ["name", "avatar"])
    .then(profile => {
      if (!profile) {
        errors.noprofile = "there's no profilr for this user";
        res.status(404).json(errors);
      }
      res.json(profile);
    })
    .catch(err => res.status(404).json(err));
});

//@route GET api/profile/user/:user_id
//@dsc gets profile by user id
//@access public

router.get("/user/:user_id", (req, res) => {
  const errors = {};

  Profile.findOne({ user: req.params.user_id })
    .populate("user", ["name", "avatar"])
    .then(profile => {
      if (!profile) {
        errors.noprofile = "there's no profilr for this user";
        res.status(404).json(errors);
      }
      res.json(profile);
    })
    .catch(err =>
      res.status(404).json({ profile: "no profile for any user with this id" })
    );
});

//@route GET api/profile
//@dsc gets current user profile
//@access private
router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const errors = {};
    Profile.findOne({ user: req.user.id })
      .populate("user", ["name", "avatar"])
      .then(profile => {
        if (!profile) {
          errors.noprofile = "there's no profile for this user";
          return res.status(404).json(errors);
        }
        res.json(profile);
      })
      .catch(err => res.status(404).json(err));
  }
);

//@route POST api/profile
//@dsc create/edit user profile
//@access private
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = validateProfileInput(req.body);

    //check validation
    if (!isValid) {
      //return errors
      return res.status(400).json(errors);
    }
    //get fields
    const profileFields = {};
    profileFields.user = req.user.id;
    if (req.body.handle) profileFields.handle = req.body.handle;
    if (req.body.company) profileFields.company = req.body.company;
    if (req.body.website) profileFields.website = req.body.website;
    if (req.body.location) profileFields.location = req.body.location;
    if (req.body.bio) profileFields.bio = req.body.bio;
    if (req.body.status) profileFields.status = req.body.status;
    if (req.body.githubusername)
      profileFields.githubusername = req.body.githubusername;

    if (typeof req.body.skills !== "undefined") {
      profileFields.skills = req.body.skills.split(",");
    }

    profileFields.social = {};
    if (req.body.youtube) profileFields.social.youtube = req.body.youtube;
    if (req.body.twitter) profileFields.social.twitter = req.body.twitter;
    if (req.body.facebook) profileFields.social.facebook = req.body.facebook;
    if (req.body.linkedin) profileFields.social.linkedin = req.body.linkedin;
    if (req.body.instagram) profileFields.social.instagram = req.body.instagram;

    Profile.findOne({ user: req.user.id }).then(profile => {
      if (profile) {
        //update
        Profile.findOneAndUpdate(
          { user: req.user.id },
          { $set: profileFields },
          { new: true }
        ).then(profile => res.json(profile));
      } else {
        //create
        //check if handle exists
        Profile.findOne({ handle: profileFields.handle }).then(profile => {
          if (profile) {
            errors.handle = "that handle already exists";
            res.status(404).json(errors);
          }
          //save profile
          new Profile(profileFields).save().then(profile => res.json(profile));
        });
      }
    });

    // const errors = {};
    // Profile.findOne({ user: req.user.id })
    //   .then(profile => {
    //     if (!profile) {
    //       errors.noprofile = "there's no profile for this user";
    //       return res.status(404).json(errors);
    //     }
    //     res.json(profile);
    //   })
    //   .catch(err => res.status(404).json(err));
  }
);

//@route POST api/profile/experience
//@dsc posts experience to profile
//@access private

router.post(
  "/experience",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = validateExperienceInput(req.body);

    //check validation
    if (!isValid) {
      //return errors
      return res.status(400).json(errors);
    }

    Profile.findOne({ user: req.user.id }).then(profile => {
      const newExp = {
        title: req.body.title,
        company: req.body.company,
        location: req.body.location,
        from: req.body.from,
        to: req.body.to,
        current: req.body.current,
        description: req.body.description
      };
      //add to experience array
      profile.experience.unshift(newExp);

      profile.save().then(profile => res.json(profile));
    });
  }
);
//@route POST api/profile/education
//@dsc posts education to profile
//@access private

router.post(
  "/education",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = validateEducationInput(req.body);

    //check validation
    if (!isValid) {
      //return errors
      return res.status(400).json(errors);
    }

    Profile.findOne({ user: req.user.id }).then(profile => {
      const newEdu = {
        school: req.body.school,
        degree: req.body.degree,
        fos: req.body.fos //field of study
        // from: req.body.from,
        // to: req.body.to,
        // current: req.body.current,
        // description: req.body.description
      };
      //add to education array
      profile.education.unshift(newEdu);

      profile.save().then(profile => res.json(profile));
    });
  }
);

//@route POST api/profile/experience/:exp_id
//@dsc deletes experience from profile
//@access private

router.delete(
  "/experience/:exp_id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Profile.findOne({ user: req.user.id })
      .then(profile => {
        //get remove index
        const removeIndex = profile.experience
          .map(item => item.id)
          .indexOf(req.params.exp_id);

        //splice array
        profile.experience.splice(removeIndex, 1);

        //save
        profile.save().then(profle => res.json(profile));
      })
      .catch(err => res.status(404).json(err));
  }
);

//@route POST api/profile/education/:edu_id
//@dsc deletes education from profile
//@access private

router.delete(
  "/education/:edu_id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Profile.findOne({ user: req.user.id })
      .then(profile => {
        //get remove index
        const removeIndex = profile.education
          .map(item => item.id)
          .indexOf(req.params.edu_id);

        //splice array
        profile.education.splice(removeIndex, 1);

        //save
        profile.save().then(profle => res.json(profile));
      })
      .catch(err => res.status(404).json(err));
  }
);

//@route DELETE api/profile
//@dsc deletes user profile
//@access private

router.delete(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Profile.findOneAndDelete({ user: req.user.id }).then(() => {
      User.findOneAndDelete({ _id: req.body.id }).then(() => {
        // const _id = mongoose.Types.ObjectId.fromString(id);
        res.json({ success: true });
      });
    });
  }
);

module.exports = router;
