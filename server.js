var express = require('express')
var bodyParser = require('body-parser')
var Axios = require('axios')
var Request = require('request')
var cors = require('cors')
var config = require('./authconfig.json')
var OAuth = require('oauth')
var timestamp = require('unix-timestamp')
var http = require('http')
var dotenv = require('dotenv')
var secret  = require('./secretconfig.json')
var oauthSignature = require('oauth-signature')
var jwt = require('jsonwebtoken')
_       = require('lodash')

var app = express()
dotenv.load()
app.use(cors())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
// app.use(allowCrossDomain);
 var users = [{
     id: 1,
     name: 'gonto',
     email: 'johndoe@gmail.com',
     password: 'gonto'

 }];

function createIdToken(user) {
    return jwt.sign(_.omit(user, 'password'),
        secret.secret, { expiresIn: 60*60*5 });
}

function createAccessToken() {
    return jwt.sign({
        iss: secret.issuer,
        aud: secret.audience,
        exp: Math.floor(Date.now() / 1000) + (60 * 60),
        scope: 'full_access',
        sub: "lalaland|gonto",
        jti: genJti(),
        alg: 'HS256'
    }, secret.secret);
}

function genJti() {
    let jti = '';
    let possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (let i = 0; i < 16; i++) {
        jti += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return jti;
}

function getUserScheme(req) {
    var name;
    var type;
    var userSearch = {};

    // The POST contains a name and not an email
    if(req.body.name) {
        name = req.body.name;
        type = 'name';
        userSearch = { name: name };
    }

    // The POST contains an email and not an name
    else if(req.body.email) {
        name = req.body.email;
        type = 'email';
        userSearch = { email: name };
    }

    return {
        name: name,
        type: type,
        userSearch: userSearch
    }
}

app.get('/', function (req, res) {
    res.send('vue-authenticate')
})

app.post('/auth/:provider', function(req, res){
    switch(req.params.provider) {
        case 'github':
            github(req, res)
            break
        case 'facebook':
            facebook(req, res)
            break
        case 'google':
            google(req, res)
            break
        case 'twitter':
            twitter(req, res)
            break
        case 'instagram':
            instagramAuth(req, res)
            break
        case 'bitbucket':
            bitbucket(req, res)
            break
        case 'linkedin':
            linkedin(req, res)
            break
        case 'live':
            live(req, res)
            break
        case 'login':
            login(req, res)
            break
        case 'register':
            register(req, res)
            break
    }
});

function allowCrossDomain(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
}

function login(req, res) {
    var userScheme = getUserScheme(req);
    if (!userScheme.name || !req.body.password) {
        return res.status(400).send("You must send the username and the password");
    }

    var user = _.find(users, userScheme.userSearch);
    if (!user) {
        return res.status(401).send("The username or password don't match");
    }

    if (user.password !== req.body.password) {
        return res.status(401).send("The username or password don't match");
    }

    res.status(201).send({
        id_token: createIdToken(user),
        access_token: createAccessToken()
    })

}

function register(req, res) {
    var userScheme = getUserScheme(req);
    if (!userScheme.name || !req.body.password) {
        return res.status(400).send("You must send the username and the password");
    }

    if (_.find(users, userScheme.userSearch)) {
        return res.status(400).send("A user with that username already exists");
    }

    var profile = _.pick(req.body, userScheme.type, 'password', 'extra');
    profile.id = _.max(users, 'id').id + 1;
    users.push(profile);
    res.status(201).send({
        id_token: createIdToken(profile),
        access_token: createAccessToken()
    })
}

function github(req, res) {
    Axios.post('https://github.com/login/oauth/access_token', {
        client_id: config.auth.github.clientId,
        client_secret: config.auth.github.clientSecret,
        code: req.body.code,
        redirect_uri: req.body.redirectUri,
        state: req.body.state,
        grant_type: 'authorization_code'
    }, { 'Content-Type': 'application/json' }).then(function (response) {
        var responseJson = parseQueryString(response.data)
        if (responseJson.error) {
            res.status(500).json({ error: responseJson.error })
        } else {
            res.json(responseJson)
        }
    }).catch(function (err) {
        res.status(500).json(err)
    })
}

function facebook(req, res) {
    Axios.post('https://graph.facebook.com/v2.4/oauth/access_token', {
        client_id: config.auth.facebook.clientId,
        client_secret: config.auth.facebook.clientSecret,
        code: req.body.code,
        redirect_uri: req.body.redirectUri
    }, { 'Content-Type': 'application/json' }).then(function (response) {
        var responseJson = response.data
        res.json(responseJson)
    }).catch(function (err) {
        res.status(500).json(err)
    })
}

function google(req, res) {
    Request({
        method: 'post',
        url: 'https://accounts.google.com/o/oauth2/token',
        form: {
            code: req.body.code,
            client_id: config.auth.google.clientId,
            client_secret: config.auth.google.clientSecret,
            redirect_uri: req.body.redirectUri,
            grant_type: 'authorization_code'
        },
        headers: {
            'content-type': 'application/x-www-form-urlencoded'
        }
    }, function (err, response, body) {
        try {
            if (!err && response.statusCode === 200) {
                var responseJson = JSON.parse(body)
                res.json(responseJson)
            } else {
                res.status(response.statusCode).json(err)
            }
        } catch (e) {
            res.status(500).json(err || e)
        }
    })
}

function instagram(req, res) {
    Request({
        method: 'post',
        url: 'https://api.instagram.com/oauth/access_token',
        form: {
            code: req.body.code,
            client_id: config.auth.instagram.clientId,
            client_secret: config.auth.instagram.clientSecret,
            redirect_uri: req.body.redirectUri,
            grant_type: 'authorization_code'
        },
        headers: {
            'content-type': 'application/x-www-form-urlencoded'
        }
    }, function (err, response, body) {
        try {
            if (!err && response.statusCode === 200) {
                var responseJson = JSON.parse(body)
                res.json(responseJson)
            } else {
                res.status(response.statusCode).json(err)
            }
        } catch (e) {
            res.status(500).json(err || e)
        }
    })
}

function bitbucket(req, res) {
    Request({
        method: 'post',
        url: 'https://bitbucket.org/site/oauth2/access_token',
        form: {
            code: req.body.code,
            client_id: config.auth.bitbucket.clientId,
            client_secret: config.auth.bitbucket.clientSecret,
            redirect_uri: req.body.redirectUri,
            grant_type: 'authorization_code'
        },
        headers: {
            'content-type': 'application/x-www-form-urlencoded'
        }
    }, function (err, response, body) {
        try {
            if (!err && response.statusCode === 200) {
                var responseJson = JSON.parse(body)
                res.json(responseJson)
            } else {
                res.status(response.statusCode).json(err)
            }
        } catch (e) {
            res.status(500).json(err || e)
        }
    })
}

function linkedin(req, res) {
    Request({
        method: 'post',
        url: 'https://www.linkedin.com/oauth/v2/accessToken',
        form: {
            code: req.body.code,
            client_id: config.auth.linkedin.clientId,
            client_secret: config.auth.linkedin.clientSecret,
            redirect_uri: req.body.redirectUri,
            grant_type: 'authorization_code'
        },
        headers: {
            'content-type': 'application/x-www-form-urlencoded'
        }
    }, function (err, response, body) {
        try {
            if (!err && response.statusCode === 200) {
                var responseJson = JSON.parse(body)
                res.json(responseJson)
            } else {
                res.status(response.statusCode).json(err)
            }
        } catch (e) {
            res.status(500).json(err || e)
        }
    })
}

function live(req, res) {
    Request({
        method: 'post',
        url: 'https://' +
        'in.live.com/oauth20_token.srf',
        form: {
            code: req.body.code,
            client_id: config.auth.live.clientId,
            client_secret: config.auth.live.clientSecret,
            redirect_uri: req.body.redirectUri,
            grant_type: 'authorization_code'
        },
        headers: {
            'content-type': 'application/json'
        }
    }, function (err, response, body) {
        try {
            if (!err && response.statusCode === 200) {
                var responseJson = JSON.parse(body)
                res.json(responseJson)
            } else {
                res.status(response.statusCode).json(err)
            }
        } catch (e) {
            res.status(500).json(err || e)
        }
    })
}

oauthService = new OAuth.OAuth(
    'https://api.twitter.com/oauth/request_token',
    'https://api.twitter.com/oauth/access_token',
    config.auth.twitter.clientId,
    config.auth.twitter.clientSecret,
    '1.0A',
    null,
    'HMAC-SHA1'
)

function twitter(req, res) {
    if (!req.body.oauth_token) {
        oauthService.getOAuthRequestToken({ oauth_callback: req.body.redirectUri }, function (error, oauthToken, oauthTokenSecret, results) {
            if (error) {
                res.status(500).json(error)
            } else {
                res.json({
                    oauth_token: oauthToken,
                    oauth_token_secret: oauthTokenSecret
                })
            }
        })
    } else {
        oauthService.getOAuthAccessToken(req.body.oauth_token, null, req.body.oauth_verifier, function (error, oauthAccessToken, oauthAccessTokenSecret, results) {

            if (error) {
                res.status(500).json(error)
            } else {
                var verifyCredentialsUrl = 'https://api.twitter.com/1.1/account/verify_credentials.json'
                var parameters = {
                    oauth_consumer_key: config.auth.twitter.clientId,
                    oauth_token: oauthAccessToken,
                    oauth_nonce: ('vueauth-' + new Date().getTime()),
                    oauth_timestamp: timestamp.now(),
                    oauth_signature_method: 'HMAC-SHA1',
                    oauth_version: '1.0'
                }

                var signature = oauthSignature.generate('GET', verifyCredentialsUrl, parameters, config.auth.twitter.clientSecret, oauthAccessTokenSecret)

                Axios.get('https://api.twitter.com/1.1/account/verify_credentials.json', {
                    headers: {
                        Authorization:  'OAuth ' +
                        'oauth_consumer_key="' + config.auth.twitter.clientId + '",' +
                        'oauth_token="' + oauthAccessToken + '",' +
                        'oauth_nonce="' + parameters.oauth_nonce + '",' +
                        'oauth_timestamp="' + parameters.oauth_timestamp + '",' +
                        'oauth_signature_method="HMAC-SHA1",'+
                        'oauth_version="1.0",' +
                        'oauth_signature="' + signature + '"'
                    }
                }).then(function (response) {
                    res.json({
                        access_token: oauthAccessToken,
                        access_token_secret: oauthAccessTokenSecret,

                        profile: response.data
                    })
                }).catch(function (err) {
                    console.log(err.response.data.errors)
                    res.status(500).json(err.response.data.errors)
                })
            }
        })
    }
}

function parseQueryString(str) {
    let obj = {};
    let key;
    let value;
    (str || '').split('&').forEach((keyValue) => {
        if (keyValue) {
            value = keyValue.split('=');
            key = decodeURIComponent(value[0]);
            obj[key] = (!!value[1]) ? decodeURIComponent(value[1]) : true;
        }
    });
    return obj;
}

var port = process.env.PORT || 3001;
http.createServer(app).listen(port, function (err) {
    console.log('listening in http://localhost:' + port);
})
