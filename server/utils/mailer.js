var mailer = require('nodemailer'),
    express = require('express'),
    maria = require('../maria-sql/maria-query')

var app = module.exports = express.Router();

app.post('/sendReset', function (req, res) {
    maria.getMailList(function (err, maillist) {
        console.log(maillist);
        var cpt = false;
        for (let i = 0; i < maillist.length; i++) {
            if(maillist[i].email == req.body.mail){
                cpt = true;
                var mailf = maillist[i].email;
                break;
            }
        }
        if(cpt) {
            _sendMail(mailf, function(err, ok){
                if(err != null)
                    res.status(200).send({code : false, res : err}).end();
                else{
                    console.log("ok! ", ok);
                    
                    res.status(200).send({code : true, res : ok}).end();
                }
            });
        }
        else {
            res.status(200).send({code : false, err : 'Cet email n\'existe pas'}).end();
        }
    });
});

function _sendMail(mail, callback) {
    var transporter = mailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'willem.houm.dev@gmail.com',
            pass: 'tructruc123'
        }
    });

    var mailOptions = {
        from: 'willem.houm.dev@gmail.com',
        to: mail,
        subject: 'Arche de Noé - Demande de nouveau mot de passe',
        text: 'Vous avez demander à modifier votre mot de passe'
    };

    transporter.sendMail(mailOptions, function (error, info) {
        console.log(error, info);
        
        error != null ? callback(error, null) : callback(null, 'Email sent: ' + info.response);
    });
}