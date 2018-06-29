var express = require('express'),
    os = require('os'),
    maria = require('./maria-query');

var app = module.exports = express.Router();

app.post('/admin/update-id-group', function (req, res) {
    maria.updateIdGroupe(req.body, function (err, data) {
        if (err) {
            res.status(400).send(err).end();
        } else {
            res.status(200).send(data).end();
        }
    });
});
app.post('/admin/update-id-user', function (req, res) {
    maria.updateIdUser(req.body, function (err, data) {
        if (err) {
            res.status(400).send(err).end();
        } else {
            res.status(200).send(data).end();
        }
    });
});
app.post('/admin/update-alert-status', function (req, res) {
    maria.updateAlertStatus(req.body, function (err, data) {
        if (err) {
            res.status(400).send(err).end();
        } else {
            res.status(200).send(data).end();
        }
    });
});
app.get('/admin/users/:pseudo', function (req, res) {
    maria.getUserDataFromPseudo(req.params.pseudo, function (err, data) {
        if (err) {
            res.status(400).send(err).end();
        } else {
            res.status(200).send(data).end();
        }
    });
});
app.get('/getEnv', function (req, res) {
    res.status(200).send({
        "hostname": os.hostname()
    })
});
app.get('/crashApp', function (req, res) {
    maria.crashApp(function (err, data) {
        if (err) {
            res.status(400).send(err).end();
        } else {
            res.status(200).send(data).end();
        }
    });
})