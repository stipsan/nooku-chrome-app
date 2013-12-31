/**
* @category    Nooku
* @package     Nooku_Desktop
* @subpackage  Model
* @copyright   Copyright (C) 2011 Timble CVBA. (http://www.timble.net).
* @license     GNU GPLv3 <http://www.gnu.org/licenses/gpl.html>
* @link        http://www.nooku.org
*/

this.ModelMenu = new Class({

	Extends: ModelAbstract,

	ui: Titanium.UI,
	
	setMenu: function(){
	
			var total = Factory.get('model.connections').getTotal();
			this.menu = Titanium.UI.createMenu();
			Titanium.UI.setMenu(this.menu);
			
			//@TODO dock menu is experimental
	        //Titanium.UI.setDockMenu(this.menu);
	
			var connections = {
				item: Titanium.UI.createMenuItem('Connections'),
				menu: Titanium.UI.createMenu(),
				items: []
			};
			
			//@TODO disabled as the global object 'Titanium' is destroyed when a window is closed, making this menu item fail if one window is closed just once.
			/*
			connections.item.addItem('New Window', this.newWindow);
			
			//Creates the link to the proxy window
			//connections.item.addItem('Configure Proxy', this.openProxyWindow);
			
			if(total > 0) connections.item.addSeparatorItem();
	        //*/
	
			Factory.get('model.connections').getList().each(function(item){
				var menuitem = connections.item.addCheckItem(item.title, function(){
				    var currentWindow = Titanium.UI.getCurrentWindow().getDOMWindow(),
				        selected = currentWindow.document.getElement('ul li[data-id="'+item.id+'"]'),
				        evt = document.createEvent("MouseEvents");
	                
				    evt.initEvent("click", true, true);
	
				    if(selected) {
				    	selected.fireEvent('click', new Event(evt, currentWindow));
				    }
				});
				menuitem.setAutoCheck(false);
				if(localStorage.selected == item.id) menuitem.setState(true);

				if(item.sites.length > 0) {
				    var submenu = Titanium.UI.createMenu();
				    menuitem.setSubmenu(submenu);
				    
				    if(item.sites.length > 1 && !localStorage['connection-site-'+item.id]) {
				        localStorage['connection-site-'+item.id] = item.sites[0].name;
				    }
				    
				    item.sites.each(function(site, i){
				        var checkItem = submenu.addCheckItem(site.title, function(){
				            localStorage['connection-site-'+item.id] = site.name;
				            var currentWindow = Titanium.UI.getCurrentWindow().getDOMWindow(), 
				                selected = currentWindow.document.getElement('ul li[data-id="'+item.id+'"]'), 
				                active = selected.getElement('li.site[data-name="'+site.name+'"]');

				            if(active) {
				                var evt = document.createEvent("MouseEvents");
				                evt.initEvent("click", true, true);
				                click = new Event(evt, currentWindow);
				                
				                active.fireEvent('click', click);
				                active.getParent('li').fireEvent('click', click);
				            }
				        });
				        checkItem.setAutoCheck(false);
				        if(localStorage['connection-site-'+item.id] == site.name) checkItem.setState(true);
				    });
				}
			});
	
			this.menu.appendItem(connections.item);
		},
	
	newWindow: function(){
        var main = Titanium.UI.getMainWindow(),
            child = main.createWindow('app://index.html?view=connections&layout=default');
        child.open();
	},

	openProxyWindow: function(){
		
		var uri = 'app://'+Titanium.App.getID()+'/index.html?view=proxy&layout=form';
	
		//Find all connection manager windows by filtering current open windows
		var proxies = Titanium.UI.getOpenWindows().filter(function(win){
		     return win.getURL() === uri;
		});
		//If any, then don't open another, focus the existing one instead
		if(proxies.length) {
			return proxies[0].focus();
		}

		var manager = Titanium.UI.createWindow(uri);
		manager.open();
		
		var dom = connections.getDOMWindow();
		dom.addEventListener('unload', function(){
		
			var app = Factory.get('application');
			app.setMenu();
		
		});
	}

});