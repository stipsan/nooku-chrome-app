/**
* @category    Nooku
* @package     Nooku_Desktop
* @subpackage  Application
* @copyright   Copyright (C) 2011 Timble CVBA. (http://www.timble.net).
* @license     GNU GPLv3 <http://www.gnu.org/licenses/gpl.html>
* @link        http://www.nooku.org
*/

this.Application = new Class({

	Implements: [Options, Events],
	
	options: {

		//request variables
		request: {
		
			view: 'connections',
			layout: 'default'
		
		}

	},

	initialize: function(options){

		//Set the default request object, merged with defaults
		this.options.request = $merge(this.options.request, this.getRequest());

		//Merge passed options with defaults
		this.setOptions(options);
		
		this.__defineGetter__('window', function(){

			return Titanium.UI.getMainWindow();

		});
		
		this.__defineSetter__('window', function(url){
		
			if(this.window.getURL() != url) {
				this.window.setURL(url);
			}
			
			this.window.focus();

		});

		return this;

	},
	
	dispatch: function(){

		//Get the controller
		var controller = Factory.get('controller.'+this.options.request.view.singularize(), {
			request: this.options.request
		});
		
		//Set the application menu
		this.setMenu();
		
		return controller.displayView();

	},
	
	//Sets the window menu
	setMenu: function(){

		Factory.get('model.menu').setMenu();

	},
	
	//Gets the request variables
	getRequest: function(){

		var request = {};
		window.location.search.replace('?', '').split('&').forEach(function(part){
			var parts = part.split('=');
			request[parts[0]] = parts[1];
		});
		return request;

	}

});