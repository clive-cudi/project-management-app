const { User } = require("../models/user.model");
const { v4: v4ID } = require("uuid");
const { generateResponse } = require("../helpers/index");
const { Team } = require("../models/team.model");

// creating a team for an organization
const createTeam = (req, res, next) => {
  const { parentOrgID, name } = req.body;

  User.findOne({ uid: parentOrgID, usertype: "organization" })
    .then((org) => {
      if (org) {
        const newTeamID = `team_${v4ID()}`;
        const newTeam = new Team({
          tid: newTeamID,
          name: name,
          members: [],
          parentOrgID: parentOrgID,
          projects: [],
        });

        newTeam
          .save()
          .then((teamDoc) => {
            User.updateOne(
              { uid: parentOrgID },
              {
                $push: {
                  teams: teamDoc.tid ?? newTeamID,
                },
              }
            )
              .then(() => {
                return res.status(200).json({
                  success: true,
                  message: "Team Created!!",
                  team: teamDoc,
                  error: {
                    status: false,
                    code: null,
                  },
                });
              })
              .catch((err) => {
                return res.status(400).json({
                  success: false,
                  message: "Failed to update team list",
                  usertoken: {
                    user: null,
                    token: null,
                  },
                  error: {
                    status: true,
                    code: "team_list_update_fail",
                    debug: err,
                  },
                });
              });
          })
          .catch((err_save) => {
            return res.status(400).json({
              success: false,
              message: "Team Creation Error",
              usertoken: {
                user: null,
                token: null,
              },
              error: {
                status: true,
                code: "team_init_fail",
                debug: err_save,
              },
            });
          });
      } else {
        return res.status(404).json({
          success: false,
          message: "Organization not found",
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
    })
    .catch((error_db) => {
      return res.status(400).json({
        success: false,
        message: "Error Fetching user from DB!!",
        usertoken: {
          user: null,
          token: null,
        },
        error: {
          status: true,
          code: "db_error",
          debug: error_db,
        },
      });
    });
};

const addTeamMembers = (req, res, next) => {
  const { tid, uids, usertoken } = req.body;

  // [BUG: FIXED]: parent organization should match with the user organization
  // update the team members uid list
  // [BUG]: do a cleanup for the list of members in a team...remove duplicates
  Team.updateOne(
    { tid: tid, parentOrgID: usertoken.uid },
    {
      $push: {
        members: uids,
      },
    }
  )
    .then(() => {
      // update users in the uids array
      User.updateMany(
        {
          uid: {
            $in: uids.length > 0 ? uids : [],
          },
          usertype: "individual",
        },
        { $push: { teams: tid } }
      )
        .then(() => {
          return res.status(200).json({
            success: true,
            message: "Team Members added!!",
            team: {
              tid: tid,
              members: uids,
            },
            error: {
              status: false,
              code: null,
            },
          });
        })
        .catch((users_add_err) => {
          return res.status(400).json({
            success: false,
            message: "Failed to update team list on individuals",
            usertoken: {
              user: null,
              token: null,
            },
            error: {
              status: true,
              code: "team_list_update_fail",
              debug: users_add_err,
            },
          });
        });
    })
    .catch((team_update_err) => {
      return res.status(400).json({
        success: false,
        message: "Failed to update members list",
        usertoken: {
          user: null,
          token: null,
        },
        error: {
          status: true,
          code: "member_list_update_fail",
          debug: team_update_err,
        },
      });
    });
};

const removeTeamMembers = (req, res, next) => {
  const { tid, uids } = req.body;

  Team.findOneAndUpdate(
    { tid: tid },
    {
      $pullAll: {
        members: uids.length > 0 ? uids : [],
      },
    }
  )
    .then((updatedTeam) => {
      // update the users team list in uids
      User.updateMany(
        {
          uid: {
            $in: uids,
          },
        },
        { $pull: { teams: tid } }
      )
        .then(() => {
          return res.status(200).json({
            success: true,
            message: "Updated Team Members Successfully",
            team: {
              updatedTeam,
            },
            error: {
              status: false,
              code: null,
            },
          });
        })
        .catch((user_team_list_err) => {
          return res.status(400).json({
            success: false,
            message: "Failed to update team list on individuals",
            usertoken: {
              user: null,
              token: null,
            },
            error: {
              status: true,
              code: "team_list_update_fail",
              debug: user_team_list_err,
            },
          });
        });
    })
    .catch((team_list_err) => {
      return res.status(400).json({
        success: false,
        message: "Failed to update members list",
        usertoken: {
          user: null,
          token: null,
        },
        error: {
          status: true,
          code: "member_list_update_fail",
          debug: team_list_err,
        },
      });
    });
};

const getTeam = (req, res) => {
  const { tid, usertoken } = req.body;

  if (tid) {
    // find team;
    console.log("____")
    console.log(usertoken)
  }

  return res.status(404).json({
    success: false,
    message: `Team not found: tid: ${tid}`,
    error: {
      status: true,
      code: "team_not_found",
      debug: null,
    },
  });
};

// returns the teams that the given user is part of and sorts by organization
const getMemberTeams = (req, res) => {
  const { uid } = req.body;

  if (uid) {
    User.findOne(
      {uid: uid, usertype: "individual"}
    ).then((user) => {
      if (user) {
        // 
        const targetTeams = user?.teams ?? [];
        Team.find({tid: {
          $in: targetTeams
        }}).then((member_teams) => {
          return res.status(200).json({
            success: true,
            message: "Member Teams fetched successfully",
            teams: member_teams,
            error: {
              status: false,
              code: null,
              debug: null
            }
          });
        }).catch((member_teams_error) => {
          return res.status(400).json({
            success: false,
            message: "Teams DB error occurred",
            teams: [],
            error: {
                status: true,
                code: "db_error",
                debug: member_teams_error
            }
          });
        })
      } else {
        return res.status(200).json({
          success: false,
          message: "User not found",
          usertoken: {
            user: null,
            token: null,
          },
          teams: [],
          error: {
            status: true,
            code: "user_not_found",
          },
        });
      }
    }).catch((user_db_err) => {
      return res.status(400).json({
        success: false,
        message: "DB error occurred",
        teams: [],
        error: {
            status: true,
            code: "db_error",
            debug: user_db_err
        }
      });
    });
  } else {
    return res.status(404).json({
      success: false,
      message: `target UID not provided: uid: ${uid}`,
      error: {
        status: true,
        code: "invalid_uid",
        debug: null,
      },
    });
  }
};

/** [TODO]: an individual user can set up a team with no real parent organization [peer team].
 * in this case the parentOrganization field of the team will point to the uid of the user that created it
*/
const createPeerTeam = (req, res, next) => {
  const { usertoken } = req.body;
}

// returns a single team based on the given tid
const getTeamByTID = (req, res) => {
  const { tid } = req.body;
};

// returns multipleTeams[] based on given tids[]
const getMultipleTeamsByTID = (req, res) => {

};

// returns the teams that are part of an organization
const getOrgTeams = (req, res) => {

}

module.exports = {
  createTeam,
  addTeamMembers,
  removeTeamMembers,
  getTeam,
  getMemberTeams
};

