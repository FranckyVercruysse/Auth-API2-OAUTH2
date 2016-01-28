function ViewModel() {
    var self = this;

    var tokenKey = 'accessToken';

    self.result = ko.observable();
    self.resultaat = ko.observable();               // TestAuthentication

    self.registerGebruikersnaam = ko.observable();
    self.registerPassword = ko.observable();
    self.registerPassword2 = ko.observable();


    self.loginGebruikersnaam = ko.observable();
    self.loginPassword = ko.observable();


    self.register = function () {
        self.result('');

        var data = {
            UserName: self.registerGebruikersnaam(),
            Password: self.registerPassword(),
            ConfirmPassword: self.registerPassword2()
        };
        console.log("data : " + JSON.stringify(data));

        $.ajax({
            type: 'POST',
            crossDomain: true,
            url: '/api/account/register',
            data: data,
            async: false,
            //dataType: 'json'
        })
            .done(function (data) {
                console.log("register Done ! nu poging tot login");
                console.log("self.registerGebruikersnaam() : " + self.registerGebruikersnaam());
                console.log("self.registerPassword() : " + self.registerPassword());
                self.login(self.registerGebruikersnaam(), self.registerPassword());
            })
            .fail(showError)
    }

    self.login = function (x, y) {          // x : username, y : password of undefined
        self.result('');
        var loginData;
        if (x === undefined || y === undefined) {       // login met een bestaande gebruikersnaam en paswoord uit database
            loginData = {
                grant_type: 'password',
                username: self.loginGebruikersnaam(),
                password: self.loginPassword()
            };
        }
        else {                                          // login onmiddellijk na registratie
            console.log("login onmiddellijk na registratie    == >   x = " + x + " y = " + y);
            loginData = {
                grant_type: 'password',
                username: x,
                password: y
            };
        }

        $.ajax({
            type: 'POST',
            url: '/Token',
            data: loginData
        }).done(function (data) {
            window.localStorage.setItem(tokenKey, data.access_token);       //sessionStorage.setItem(tokenKey, data.access_token);    // Cache the access token in session storage.
            window.location.href = location.protocol + '//' + location.host + '/home/Index';
        }).fail(showError);
    }

    self.logout = function () {
        var tokenKey = 'accessToken';
        token = window.localStorage.getItem(tokenKey);      //token = sessionStorage.getItem(tokenKey);

        var headers = {};
        if (token) {
            headers.Authorization = 'Bearer ' + token;
        }

        console.log('headers.Authorization = ' + headers.Authorization);

        $.ajax({
            type: 'POST',
            url: location.protocol + '//' + location.host + '/api/Account/Logout',
            async: false,
            headers: headers
        }).done(function () {
            window.localStorage.removeItem(tokenKey);       //sessionStorage.removeItem(tokenKey);
            window.location.href = location.protocol + '//' + location.host;        // nodig om UI (user interface) aan te passen
        })
            .fail(
            function (jqXHR, exception) {
                var msg = '';
                if (jqXHR.status === 0) {
                    msg = 'Not connect.\n Verify Network.';
                } else if (jqXHR.status == 404) {
                    msg = 'Requested page not found. [404]';
                } else if (jqXHR.status == 500) {
                    msg = 'Internal Server Error [500].';
                } else if (exception === 'parsererror') {
                    msg = 'Requested JSON parse failed.';
                } else if (exception === 'timeout') {
                    msg = 'Time out error.';
                } else if (exception === 'abort') {
                    msg = 'Ajax request aborted.';
                } else {
                    msg = 'Uncaught Error.\n' + jqXHR.responseText;
                }
                console.log("fail logout : " + msg);
            })
    }

    self.getvalues = function (x) {
        if (x == null || x == undefined) { x = ''; }
        self.result('');
        var tokenKey = 'accessToken';
        token = window.localStorage.getItem(tokenKey);      //token = sessionStorage.getItem(tokenKey);

        var headers = {};
        if (token) {
            headers.Authorization = 'Bearer ' + token;
        }

        console.log('headers.Authorization = ' + headers.Authorization);

        $.ajax({
            type: 'GET',
            url: location.protocol + '//' + location.host + '/api/values/' + x,
            headers: headers
        }).done(function (res) {
            self.resultaat(JSON.stringify(res));
        }).fail(showError);           //function () { window.location.href = location.protocol + '//' + location.host + '/AccountMVC/Login'; }
    }

    function showError(jqXHR, textStatus, errorThrown) {
        var foutmelding = '';

        console.log("1. jqXHR.status : " + jqXHR.status);
        console.log("2. jqXHR.statusText : " + jqXHR.statusText);
        console.log("3. jqXHR.responseText : " + jqXHR.responseText);
        console.log("4. jqXHR.responseJSON.ModelState : " + jqXHR.responseJSON.ModelState)
        if (jqXHR.responseJSON.ModelState != undefined) {
            var fouten = jqXHR.responseJSON.ModelState, key;

            for (key in fouten) {
                if (fouten.hasOwnProperty(key)) {               //  http://stackoverflow.com/questions/14028259/json-response-parsing-in-javascript-to-get-key-value-pair
                    console.log(key + " = " + fouten[key]);
                    foutmelding += fouten[key] + '  \ ';
                }
            }
        }
        else {

            console.log("jqXHR.responseJSON.ModelState != undefined");
        }
        self.result(foutmelding + jqXHR.status + ': ' + jqXHR.statusText + ' ' + jqXHR.responseText);
    }
}

var app = new ViewModel();
ko.applyBindings(app);
function ViewModel() {
    var self = this;

    var tokenKey = 'accessToken';

    self.result = ko.observable();
    self.resultaat = ko.observable();               // TestAuthentication

    self.registerGebruikersnaam = ko.observable();
    self.registerPassword = ko.observable();
    self.registerPassword2 = ko.observable();


    self.loginGebruikersnaam = ko.observable();
    self.loginPassword = ko.observable();


    self.register = function () {
        self.result('');

        var data = {
            UserName: self.registerGebruikersnaam(),
            Password: self.registerPassword(),
            ConfirmPassword: self.registerPassword2()
        };
        console.log("data : " + JSON.stringify(data));

        $.ajax({
            type: 'POST',
            crossDomain: true,
            url: '/api/account/register',
            data: data,
            async: false,
            //dataType: 'json'
        })
            .done(function (data) {
                console.log("register Done ! nu poging tot login");
                console.log("self.registerGebruikersnaam() : " + self.registerGebruikersnaam());
                console.log("self.registerPassword() : " + self.registerPassword());
                self.login(self.registerGebruikersnaam(), self.registerPassword());
            })
            .fail(showError)
    }

    self.login = function (x, y) {          // x : username, y : password of undefined
        self.result('');
        var loginData;
        if (x === undefined || y === undefined) {       // login met een bestaande gebruikersnaam en paswoord uit database
            loginData = {
                grant_type: 'password',
                username: self.loginGebruikersnaam(),
                password: self.loginPassword()
            };
        }
        else {                                          // login onmiddellijk na registratie
            console.log("login onmiddellijk na registratie    == >   x = " + x + " y = " + y);
            loginData = {
                grant_type: 'password',
                username: x,
                password: y
            };
        }

        $.ajax({
            type: 'POST',
            url: '/Token',
            data: loginData
        }).done(function (data) {
            window.localStorage.setItem(tokenKey, data.access_token);       //sessionStorage.setItem(tokenKey, data.access_token);    // Cache the access token in session storage.
            window.location.href = location.protocol + '//' + location.host + '/home/Index';
        }).fail(showError);
    }

    self.logout = function () {
        var tokenKey = 'accessToken';
        token = window.localStorage.getItem(tokenKey);      //token = sessionStorage.getItem(tokenKey);

        var headers = {};
        if (token) {
            headers.Authorization = 'Bearer ' + token;
        }

        console.log('headers.Authorization = ' + headers.Authorization);

        $.ajax({
            type: 'POST',
            url: location.protocol + '//' + location.host + '/api/Account/Logout',
            async: false,
            headers: headers
        }).done(function () {
            window.localStorage.removeItem(tokenKey);       //sessionStorage.removeItem(tokenKey);
            window.location.href = location.protocol + '//' + location.host;        // nodig om UI (user interface) aan te passen
        })
            .fail(
            function (jqXHR, exception) {
                var msg = '';
                if (jqXHR.status === 0) {
                    msg = 'Not connect.\n Verify Network.';
                } else if (jqXHR.status == 404) {
                    msg = 'Requested page not found. [404]';
                } else if (jqXHR.status == 500) {
                    msg = 'Internal Server Error [500].';
                } else if (exception === 'parsererror') {
                    msg = 'Requested JSON parse failed.';
                } else if (exception === 'timeout') {
                    msg = 'Time out error.';
                } else if (exception === 'abort') {
                    msg = 'Ajax request aborted.';
                } else {
                    msg = 'Uncaught Error.\n' + jqXHR.responseText;
                }
                console.log("fail logout : " + msg);
            })
    }

    self.getvalues = function (x) {
        if (x == null || x == undefined) { x = ''; }
        self.result('');
        var tokenKey = 'accessToken';
        token = window.localStorage.getItem(tokenKey);      //token = sessionStorage.getItem(tokenKey);

        var headers = {};
        if (token) {
            headers.Authorization = 'Bearer ' + token;
        }

        console.log('headers.Authorization = ' + headers.Authorization);

        $.ajax({
            type: 'GET',
            url: location.protocol + '//' + location.host + '/api/values/' + x,
            headers: headers
        }).done(function (res) {
            self.resultaat(JSON.stringify(res));
        }).fail(showError);           //function () { window.location.href = location.protocol + '//' + location.host + '/AccountMVC/Login'; }
    }

    function showError(jqXHR, textStatus, errorThrown) {
        var foutmelding = '';

        console.log("1. jqXHR.status : " + jqXHR.status);
        console.log("2. jqXHR.statusText : " + jqXHR.statusText);
        console.log("3. jqXHR.responseText : " + jqXHR.responseText);
        console.log("4. jqXHR.responseJSON.ModelState : " + jqXHR.responseJSON.ModelState)
        if (jqXHR.responseJSON.ModelState != undefined) {
            var fouten = jqXHR.responseJSON.ModelState, key;

            for (key in fouten) {
                if (fouten.hasOwnProperty(key)) {               //  http://stackoverflow.com/questions/14028259/json-response-parsing-in-javascript-to-get-key-value-pair
                    console.log(key + " = " + fouten[key]);
                    foutmelding += fouten[key] + '  \ ';
                }
            }
        }
        else {

            console.log("jqXHR.responseJSON.ModelState != undefined");
        }
        self.result(foutmelding + jqXHR.status + ': ' + jqXHR.statusText + ' ' + jqXHR.responseText);
    }
}

var app = new ViewModel();
ko.applyBindings(app);
