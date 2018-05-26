var express = require('express'),
  maria = require('./maria-query');

var app = module.exports = express.Router();

//Authentication related route
app.post('/signup', function (req, res) {
  maria.createUser(req.body, function (err, data) {
    if (err) {
      var str = '';
      switch (err.code) {
        case 1062:
          str = 'pseudo already taken';
          break;
        case 1406:
          str = 'pseudo or password too long';
          break;
        default:
          str = 'Unexpected error code : ' + err.code;
          break;
      }
      //console.log('Request : Create user :: ERROR : ', err);
      res.status(400).send(str).end();
    } else {
      //console.log('Request : Create user :: OK', data);
      res.status(200).send(data).end();
    }
  });
});
app.post('/signin', function (req, res) {
  maria.verifyUser(req.body, function (err, data) {
    if (err) {
      //console.log('Request : Verify user :: ERROR', err);
      res.status(400).send(err).end();
    } else {

      //console.log('Request : Verify user :: OK\n data : ', data);
      if (data.info.numRows == 0) {
        res.status(201).send('pseudo or password incorrect').end();
      }
      if (data.info.numRows == 1) {
        res.status(200).send(data).end();
      }
    }
  });
});

app.get('/maria/users', function (req, res) {
  maria.getUsers(function (err, data) {
    if (err) {
      //console.log('Request : SELECT * FROM USER_TABLE :: ERROR');
      res.status(400).send(err).end();
    } else {
      //console.log('Request : SELECT * FROM USER_TABLE :: OK');
      res.status(200).send(data).end();
    }
  });
});
app.get('/maria/users/:id', function (req, res) {
  maria.getUserInfo(req.params.id, function (err, data) {
    if (err) {
      res.status(400).send(err).end();
    } else {
      res.status(200).send(data).end();
    }
  });
});

app.post('/maria/add-comment', function (req, res) {
  //console.log('comment : ', req.body[Object.keys(req.body)[0]]);
  //console.log('user : ', Object.keys(req.body)[0]);
  maria.addComment(req.body, function (err, data) {
    if (err) {
      //console.log('Request : INSERT INTO mission (id_mission, commentaire) :: ERROR', err);
      res.status(400).send(err).end();
    } else { //console.log('Request : Update commentaire :: OK');
      //res.status(200).send('Commentaire ajouté').end();
      res.status(204).send(data).end();
    }
  });
});
app.get('/maria/get-comments/:id', function (req, res) {
  maria.getCommentThread(req.params.id, function (err, data) {
    if (err) {
      //console.log('Request : SELECT commentaire :: ERROR');
      res.status(400).send(err).end();
    } else {
      //console.log('Request : SELECT commentaire :: OK');
      var str = Object.values(data[0]);
      //console.log('thread', str[0]);
      res.send(str[0]).end();
    }
  });
});
app.post('/missions/get', function (req, res) {
  //console.log("body", req.body.wanted);

  maria.getAlerts(req.body.wanted, function (err, data) {
    if (err) {
      //console.log('Request : SELECT * FROM USER_TABLE :: ERROR');
      res.status(400).send(err).end();
    } else {
      //console.log('Request : SELECT * FROM USER_TABLE :: OK');
      res.status(200).send(data).end();
    }
  });
});
app.get('/missions/alert-status-1', function (req, res) {
  maria.getAlertByStatus(1, function (err, data) {
    if (err) {
      //console.log('Request : SELECT * FROM USER_TABLE :: ERROR');
      res.status(400).send(err).end();
    } else {
      //console.log('Request : SELECT * FROM USER_TABLE :: OK');
      res.status(200).send(data).end();
    }
  });
});
app.post('/maria/create-alert', function (req, res) {
  //console.log(req.body);

  //console.log('comment : ', req.body[Object.keys(req.body)[0]]);
  //console.log('user : ', Object.keys(req.body)[0]);
  maria.createAlert(req.body, function (err, data) {
    if (err) {
      // console.log('Request : INSERT INTO mission (id_mission, commentaire) :: ERROR', err);
      res.status(400).send(err).end();
    } else {
      //console.log('Request : Update commentaire :: OK');
      //res.status(200).send('Commentaire ajouté').end();
      res.status(204).send(data).end();
    }
  });
});

app.get('/missions/:project_id', function (req, res) {
  //console.log('url ', req.params);
  var result = [];
  maria.getAlertById(req.params.project_id, function (err, data) {
    if (err) {
      //console.log('Request : SELECT * FROM USER_TABLE :: ERROR');
      res.status(400).send(err).end();
    } else {
      //console.log('Request : SELECT * FROM USER_TABLE :: OK');
      // res.status(200).send(data).end();
      result.push(data);
      // console.log(data[0].id_Espece);

      maria.getEspece(data[0].id_Espece, function (err, data) {
        if (err) {
          //console.log('Request : SELECT * FROM USER_TABLE :: ERROR');
          res.status(400).send(err).end();
        } else {
          //console.log('Request : SELECT * FROM USER_TABLE :: OK');
          // console.log('animal ', data);

          result.push(data);
          res.status(200).send(result).end();

        }
      });
    }
  });
});
app.get('/comment/:id', function (req, res) {
  maria.getCommentFromMissionId(req.params.id, function (err, data) {
    if (err) {
      res.status(400).send(err).end();
    } else {
      res.status(200).send(data).end();
    }
  });
});
app.get('/maria/get-animals', function (req, res) {
  //console.log('url ', req.params);
  maria.getAnimals(function (err, data) {
    if (err) {
      //console.log('Request : SELECT * FROM USER_TABLE :: ERROR');
      res.status(400).send(err).end();
    } else {
      //console.log('Request : SELECT * FROM USER_TABLE :: OK');
      res.status(200).send(data).end();
    }
  });
});
app.get('/mission/contenu/:id', function (req, res) {
  console.log('Wanting content of mission ' + req.params.id);

  maria.getContenuById(req.params.id, function (err, data) {
    if (err) {

      res.status(400).send(err).end();
    } else {
      // console.log('content', data);

      res.status(200).send(data).end();
    }
  });
});
app.post('/mission/update-contenu', function (req, res) {
  maria.updateContenuById(req.body, function (err, data) {
    if (err) {
      res.status(400).send(err).end();
    } else {
      res.status(200).send(data).end();
    }
  });
});
app.get('/get-task/:id', function (req, res) {
  maria.getTaskOfMission(req.params.id, function (err, data, ) {
    if (err) {
      console.log('error getting taks for' + req.params.id, err);

      res.status(400).send(err).end();
    } else {
      res.status(200).send(data).end();
    }
  });
});
//Routes that imply Missions evolution and log activity
app.post('/maria/submit-participation', function (req, res) {
  // console.log(req.body);

  maria.sumbitParticipation(req.body, function (err, data) {
    if (err) {
      //console.log('Request : INSERT INTO mission (id_mission, commentaire) :: ERROR', err);
      res.status(400).send(err).end();
    } else {
      maria.logParticipation(req.body);
      maria.logNewAlert(req.body);
      // maria.logAlerte(req.body);
      res.status(204).send(data).end();
    }
  });
});
app.post('/maria/submit-avis', function (req, res) {
  maria.logAvis(req.body);
  console.log(req.body);
  maria.getVCurStep(req.body.id_Mission, function (err, data) {
    if (err) {
      //console.log('Request : INSERT INTO mission (id_mission, commentaire) :: ERROR', err);
      res.status(400).send(err).end();
    } else {
      var voteurs = data[0].v_cur_step.split('|');
      // console.log(voteurs[req.body.avis - 1]);
      voteurs[req.body.avis - 1] += ';' + req.body.id_Utilisateurs;
      //
      //Checking if need to change mission status
      //
      var tabCmp = [5, 5, 3];
      var v_int = voteurs[req.body.avis - 1].split(';');
      v_int.splice(0, 1);
      if (v_int.length == tabCmp[req.body.avis - 1]) {
        console.log('Il est temps de passé a l\'étape supérieur');
        var new_status = req.body.id_Status;
        switch (req.body.avis) {
          case 1:
            console.log('Upgrade');

            new_status++;
            break;
          case 2:
            console.log('invalidation');

            new_status = -1;
            break;
          case 3:
            console.log('retrogradation');

            new_status--;
            break;
        }
        if (new_status != -1 && new_status != req.body.id_Status) {

          maria.updateMissionStatus(req.body, voteurs, new_status, function (err, data) {
            if (err) {
              console.log("update status", err);
              res.status(400).send(err).end();
            } else {
              console.log('Update status ok');
              res.status(200).send(data).end();
            }
          });
        }
      } else {
        voteurs = voteurs.join('|');
        maria.updateVCurStep(req.body.id_Mission, voteurs, function (err, data) {
          if (err) {
            console.log(err);
            res.status(400).send(err).end();
          } else {
            res.status(200).send(data).end();
          }
        });
      }
    }
  });
});