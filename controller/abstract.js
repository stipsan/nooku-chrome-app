/**
* @category    Nooku
* @package     Nooku_Desktop
* @subpackage  Controller
* @copyright   Copyright (C) 2011 Timble CVBA. (http://www.timble.net).
* @license     GNU GPLv3 <http://www.gnu.org/licenses/gpl.html>
* @link        http://www.nooku.org
*/

this.ControllerAbstract = new Class({

	Extends: Identifiable,

	_request: {},

	initialize: function(options){

		this._request = options.request;
		this._identifier = options.identifier;

		return this;

	},

	displayView: function(){

		var name = this.getRequest().view,
			model = Factory.get('model.'+name.pluralize()),
			view = Factory.get('view.'+name+'.default');

		//Set model states
		model.set(this.getRequest());
		
		//Set view layout
		view.setLayout(this.getRequest().layout);

		return view.display();
	
	},

	getRequest: function(){

		return this._request;

	}

});