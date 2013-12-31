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
    function(){
        //@TODO Set the proxy
        //var proxy = Factory.get('model.proxies').getProxy();
        //Titanium.Network.setHTTPProxy(proxy);

        var app = Factory.get('application');
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
        Titanium.addEventListener(Titanium.HTTP_STATE_CHANGED, function(){
            document.body.addClass('loading');
        });
        Titanium.addEventListener(Titanium.HTTP_DONE, function(){
            document.body.removeClass('loading');
        });
        window.addEventListener('focus', Factory.get('model.menu').setMenu);


        //@TODO This stuff is for testing and developing multi-site
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
    }
);

/* Analytics code here, needs to be loaded separately from the rest in case the app is offline */
var Analytics;
head.js('http://api.mixpanel.com/site_media/js/api/mixpanel.js', function(){
    try {
        Analytics = new MixpanelLib('6905aafac333e44027e556de8c8f1076', 'Analytics');
    } catch(err) {
        ['track', 'track_funnel', 'register', 'register_once', 'identify'].forEach(function(key){
            Analytics[key] = function(){};
        });
    }

    if(window.parent == window && !sessionStorage['initialized']) {
        Analytics.track('Initialized', {
            'Application User Agent': window.navigator.userAgent,
            'CPU Cores': Titanium.Platform.getProcessorCount(),
            'Language': window.navigator.language,
            'Nooku Desktop Version': Titanium.API.Application.getVersion(),
            'Platform': Titanium.getPlatform().toUpperCase() + ' ' + Titanium.Platform.getVersion(),
            'WebKit': navigator.userAgent.replace(/.*AppleWebKit\/([\d\.]+).*/, "$1")
        }, function(){
            console.log('Application Launch Tracked');
            console.dir(Analytics);
        });

        var win = Titanium.UI.getCurrentWindow();
        if(!localStorage['window.width']) localStorage['window.width'] = window.innerWidth;
        if(!localStorage['window.height']) localStorage['window.height'] = window.innerHeight;
        if(!localStorage['window.left']) localStorage['window.left'] = win.getX();
        if(!localStorage['window.top']) localStorage['window.top'] = win.getY();

        if(localStorage['window.maximized'] && localStorage['window.maximized'] == 'true') {
            var win = Titanium.UI.getCurrentWindow();
            win.maximize();
        } else {
            win.width = parseInt(localStorage['window.width']);
            win.height = parseInt(localStorage['window.height']);
            win.setX(parseInt(localStorage['window.left']));
            win.setY(parseInt(localStorage['window.top']));
            //window.resizeTo(localStorage['window.width'], localStorage['window.height']);
            //window.moveTo(localStorage['window.left'], localStorage['window.top']);
        }

        Titanium.addEventListener(Titanium.MAXIMIZED, function(){
            var win = Titanium.UI.getCurrentWindow();
            localStorage['window.maximized'] = win.isMaximized();
        });
        Titanium.addEventListener(Titanium.MOVED, function(){
            var win = Titanium.UI.getCurrentWindow(), x = win.getX(), y = win.getY();
            if(win.isMaximized()) return;
            localStorage['window.left'] = win.getX();
            localStorage['window.top'] = win.getY();
            console.dir({x: x, y: y});
            //localStorage['window.left'] = window.screenX;
            //localStorage['window.top'] = window.screenY;
            localStorage['window.maximized'] = false;
        });
        window.addEventListener('resize', function(event){
            var win = Titanium.UI.getCurrentWindow();
            if(win.isMaximized()) return;
            localStorage['window.width'] = Math.max(640, win.getWidth());
            localStorage['window.height'] = Math.max(480, win.getHeight());
            //localStorage['window.width'] = Math.max(640, window.getWidth());
            //localStorage['window.height'] = Math.max(480, window.getHeight());
            localStorage['window.maximized'] = false;
        });

        //Prevent this from running more than once
        sessionStorage['initialized'] = true;
    }
});

(function(){
    var listening = false, prevEvent, drag = function(event){
        if(!prevEvent) prevEvent = event;
        var win = Titanium.UI.getCurrentWindow();
        /*
         win.setX(win.getX() + (event.screenX - prevEvent.screenX));
         win.setY(win.getY() + (event.screenY - prevEvent.screenY));
         //*/
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
})();