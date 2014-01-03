angular.module('app', ['ngRoute'])

.config(function($routeProvider) {
    $routeProvider
        .when('/', {
            controller:'ListController',
            templateUrl:'list.html'
        })
        .when('/edit/:connectionId', {
            controller:'EditController',
            templateUrl:'detail.html'
        })
        .when('/new', {
            controller:'CreateController',
            templateUrl:'detail.html'
        })
        .otherwise({
            redirectTo:'/'
        });
})

.controller('ListController', function($scope) {
    $scope.connections = [{id: 0, url: 'http://demo.nooku.org', title: 'Demo Nooku', username: 'admin@localhost.me', password: 'demo'}];
})

.controller('CreateController', function($scope, $location, $timeout) {
    $scope.save = function(){
    $timeout(function() { $location.path('/'); });
    /*
        Projects.$add($scope.project, function() {
            $timeout(function() { $location.path('/'); });
        });
    //*/
    };
})

.controller('EditController', function($scope, $location, $routeParams, $firebase, fbURL) {
    $scope.connection = {id: 0, url: 'http://demo.nooku.org', title: 'Demo Nooku', username: 'admin@localhost.me', password: 'demo'};

    $scope.destroy = function() {
        //$scope.project.$remove();
        $location.path('/');
    };

    $scope.save = function() {
        //$scope.project.$save();
        $location.path('/');
    };
});




(function(){

window.addEventListener('load', function(){
    //Fixing flash of unstyled content
    document.body.style.opacity = 1;
});

Element.prototype.redraw = function(){
    var n = document.createTextNode(' ');
    this.appendChild(n);
    setTimeout(function(){n.parentNode.removeChild(n)}, 0);
    return this;
};

setTimeout(function(){
    setInterval(function(){
        document.body.redraw();
    }, 1000);
}, 1000);

head.js(
    'mootools.js',
    'Base64.js',
    'koowa/inflector.js',
    'koowa/identifier.js',
    'koowa/loader.js',
    'koowa/factory.js',
    'koowa/identifiable.js',
    'controller/abstract.js',
    'controller/connection.js',
    'controller/proxy.js',
    'model/abstract.js',
    'model/connections.js',
    'model/menu.js',
    'model/proxies.js',
    'model/sites.js',
    'view/abstract.js',
    'view/default.js',
    'view/connections/default.js',
    'view/connection/default.js',
    'view/proxy/default.js',
    'application.js',
    function(){
        //@TODO Set the proxy
        //var proxy = Factory.get('model.proxies').getProxy();
        //Titanium.Network.setHTTPProxy(proxy);

        var app = Factory.get('application', function(){
            if(app.options.request.view == 'connections')
            {
                //Back
                app.options.request.layout = 'form';
                $('view').getElement('.back').grab(app.dispatch());
                //Back
                app.options.request.layout = 'default';
                $('view').getElement('.front').grab(app.dispatch());
            } else {
                $('view').getElement('.front').grab(app.dispatch());
            }

            /*
             Titanium.addEventListener(Titanium.ALL, function(event){
             console.group(event.getType());
             console.log('Titanium.ALL', new Date, this, event.getType());
             console.groupEnd();
             });
             //*/
            /* @TODO refactor out titanium
             Titanium.addEventListener(Titanium.HTTP_STATE_CHANGED, function(){
             document.body.addClass('loading');
             });
             Titanium.addEventListener(Titanium.HTTP_DONE, function(){
             document.body.removeClass('loading');
             });
             window.addEventListener('focus', Factory.get('model.menu').setMenu);
             */


            /* @TODO This stuff is for testing and developing multi-site
            var secret = new Keyboard({
                events: {
                    'alt+m': function(){
                        var secrets = ['Default', 'Store', 'Demo', 'Support'], menu = Factory.get('model.menu');

                        document.body.addClass('multisite');
                        menu.setMenu();
                    }
                }
            });
            secret.activate();
            */
        });
    }
);

(function(){
    /** @TODO experimental window drag support on in-frame UI elements (like the bottom statusbar)
    var listening = false, prevEvent, drag = function(event){
        if(!prevEvent) prevEvent = event;
        var win = Titanium.UI.getCurrentWindow();

         //win.setX(win.getX() + (event.screenX - prevEvent.screenX));
         //win.setY(win.getY() + (event.screenY - prevEvent.screenY));

        window.moveBy(event.screenX - prevEvent.screenX, event.screenY - prevEvent.screenY);
        prevEvent = event;
    }, detach = function(){
        window.removeEventListener('mousemove', drag);
        listening = false;
        prevEvent = false;
    };
    window.addEventListener('mousedown', function(event){

        //Prevent dragging of window when the target is certain elements
        var canDrag = true;
        ['input', 'button', 'li', 'label', 'a'].each(function(needle){
            if(event.target.match(needle) || event.target.getParent(needle)) canDrag = false;
        });
        if(!canDrag) return event;

        //This is to prevent issues when using scrollbar
        var offset = event.pageX;

        if(!listening && (offset < 285 || offset > 300)) {
            window.addEventListener('mousemove', drag);
            listening = true;
        } else {
            detach();
        }
    });

    window.addEventListener('mouseup', detach);
    setTimeout(function(){
        var list = document.getElement('.front ul');
        if(list) list.addEventListener('scroll', detach);
    }, 10000);
   */
})();
});