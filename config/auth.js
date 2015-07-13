// config/auth.js

// expose our config directly to our application using module.exports
module.exports = {

    'facebookAuth' : {
        'clientID'      : '446036972230996', // your App ID
        'clientSecret'  : 'cfcf72faed91f8c6d2ed51302f82c5ed', // your App Secret
        'callbackURL'   : 'http://localhost:8080/auth/facebook/callback'
    },

    'twitterAuth' : {
        'consumerKey'       : 'w0TtjkhSW7O2TqLtKytK8d2pH',
        'consumerSecret'    : 'Zw5xvZAvTMqxjgS34g7z6mav5KsPeyDY2PcaV4rIVuQHIPn0p3',
        'callbackURL'       : 'http://localhost:8080/auth/twitter/callback'
    },

    'googleAuth' : {
        'clientID'      : '708684690241-718loesppj3udppcrdkh50a8505l8l8b.apps.googleusercontent.com',
        'clientSecret'  : 'W1KqBCcMvHth-2LfutPlr7-J',
        'callbackURL'   : 'http://localhost:8080/auth/google/callback'
    }

};