const { User } = require("../models/user.model");
const { getMultipleClientsInfo } = require("./client.controller");

const updateProfilePicture = (req, res) => {
  const { usertoken, picUrl } = req.body;

  User.updateOne(
    { uid: usertoken.uid },
    {
      $set: {
        profilePicture: picUrl ?? null,
      },
    }
  )
    .then(() => {
      return res.status(200).json({
        success: true,
        message: "Profile picture updated successfully",
        picUrl: picUrl,
        error: {
          status: false,
          code: null,
        },
      });
    })
    .catch((err) => {
      return res.status(400).json({
        success: false,
        message: "Failed to update profile picture",
        picUrl: null,
        error: {
          status: true,
          code: "profile_picture_update_fail",
          debug: err,
        },
      });
    });
};

const getClientIds = (req, res, next) => {
  const { usertoken } = req.body;

  User.findOne({ uid: usertoken.uid })
    .then((user) => {
      if (user) {
        return res.status(200).json({
          success: true,
          message: "Fetched user associcated client IDs successfully",
          clients: user.clients,
          error: {
            status: false,
            code: null,
          },
        });
      } else {
        return res.status(404).json({
          success: false,
          message: "User couldn't be found in DB!!",
          clients: null,
          error: {
            status: true,
            code: "user_not_found",
          },
        });
      }
    })
    .catch((get_user_clients_err) => {
      console.log(get_user_clients_err);
      return res.status(400).json({
        success: false,
        message: "Error finding user in DB",
        clients: null,
        error: {
          status: true,
          code: "db_error",
          debug: get_user_clients_err,
        },
      });
    });
};

const getClients = (req, res, next) => {
  const { usertoken } = req.body;

  User.findOne({ uid: usertoken.uid })
    .then((user) => {
      if (user) {
        // return res.status(200).json({
        //     success: true,
        //     message: "Fetched user associcated client IDs successfully",
        //     clients: user.clients,
        //     error: {
        //         status: false,
        //         code: null,
        //     }
        // })
        return getMultipleClientsInfo(
          { body: { ...req.body, cids: user.clients } },
          res,
          next
        );
      } else {
        return res.status(404).json({
          success: false,
          message: "User couldn't be found in DB!!",
          clients: null,
          error: {
            status: true,
            code: "user_not_found",
          },
        });
      }
    })
    .catch((get_user_clients_err) => {
      console.log(get_user_clients_err);
      return res.status(400).json({
        success: false,
        message: "Error finding user in DB",
        clients: null,
        error: {
          status: true,
          code: "db_error",
          debug: get_user_clients_err,
        },
      });
    });
};

const fetchUserProfile = (req, res, next) => {
  const { usertoken } = req.body;
  
  const { uid } = req.params;

  if (!uid) {
    return res.status(400).json({
      success: false,
      message: "Missing credentials",
      usertoken: {
        user: null,
        token: null,
      },
      error: {
        status: true,
        code: "missing_credentials",
      },
    });
  }

  User.findOne({uid: uid}).then((user) => {
    if (user) {
      // user found
      // filter confidential info
      const { tasks, socialAuth, twoFA, projects, clients, organization = {}, individual = {},password, ...include } = user._doc;

      return res.status(200).json({
        success: true,
        message: "User fetched successfully!!",
        usertoken: {
          user: usertoken,
          token: usertoken.token
        },
        user: include,
        error: {
          status: false,
          code: null,
          debug: null
        }
      })
    } else {
      return res.status(200).json({
        success: false,
        message: "User not found",
        usertoken: {
          user: null,
          token: null,
        },
        error: {
          status: true,
          code: "user_not_found",
        },
      });
    }
  }).catch((user_find_err) => {
    return res.status(200).json({
      success: false,
      message: "An error occurred",
      usertoken: {
        user: null,
        token: null,
      },
      error: {
        status: true,
        code: "db_error",
        debug: user_find_err,
      },
    });
  })
};

const fetchMultipleUserProfiles = (req, res) => {
  const { usertoken, uids = [] } = req.body;

  if (!uids) {
    return res.status(400).json({
      success: false,
      message: "Missing credentials",
      usertoken: {
        user: null,
        token: null,
      },
      error: {
        status: true,
        code: "missing_credentials",
      },
    });
  }

  User.find({uid: {$in: uids}}).then((found_users) => {
    if (found_users) {
      // filter confidential info
      return res.status(200).json({
        status: true,
        message: "Successfully fetched users",
        usertoken: {
          user: usertoken,
          token: usertoken.token
        },
        users: found_users.map((usr) => {
          const { tasks, socialAuth, twoFA, projects, clients, organization = {}, individual = {},password, ...include } = usr._doc;

          return include;
        }),
        error: {
          status: false,
          code: null,
          debug: null
        }
      })
    } else {
      return res.status(200).json({
        success: false,
        message: "Users not found",
        usertoken: {
          user: null,
          token: null,
        },
        error: {
          status: true,
          code: "users_not_found",
        },
      });
    }
  }).catch((users_find_err) => {
    return res.status(200).json({
      success: false,
      message: "An error occurred",
      usertoken: {
        user: null,
        token: null,
      },
      error: {
        status: true,
        code: "db_error",
        debug: users_find_err,
      },
    });
  })
}

module.exports = {
  updateProfilePicture,
  getClients,
  fetchUserProfile,
  fetchMultipleUserProfiles
};

