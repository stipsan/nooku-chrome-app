/**
* @category    Nooku
* @package     Nooku_Desktop
* @subpackage  Koowa
* @copyright   Copyright (C) 2011 Timble CVBA. (http://www.timble.net).
* @license     GNU GPLv3 <http://www.gnu.org/licenses/gpl.html>
* @link        http://www.nooku.org
*/

var Loader = {

	_registry: {},

	load: function(identifier, callback){

		var identifier = new Identifier(identifier);
		if(this._registry.hasOwnProperty(identifier)) return true;

		var path = this.path(identifier);
			//absolute = Titanium.App.appURLToPath(path);

		callback ? head.js(path, callback) : head.js(path);

		return true;
	},

	path: function(identifier){

		var identifier = new Identifier(identifier);
		if(this._registry.hasOwnProperty(identifier)) return this._registry[identifier];
return identifier.path.join('/')+'/'+identifier.name+'.js';
		path = ['app://'+Titanium.App.getID(), identifier.path.join('/'), identifier.name+'.js'].join('/');
alert(path);
		this._registry[identifier] = path;

		return path;
	}

};