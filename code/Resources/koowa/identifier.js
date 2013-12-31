/**
* @category    Nooku
* @package     Nooku_Desktop
* @subpackage  Koowa
* @copyright   Copyright (C) 2011 Timble CVBA. (http://www.timble.net).
* @license     GNU GPLv3 <http://www.gnu.org/licenses/gpl.html>
* @link        http://www.nooku.org
*/

var Identifier = new Class({

	initialize: function(identifier){

		if(typeof identifier == 'object') return identifier;

		var parts = identifier.split('.');
		
		this.name = parts.pop();
		this.path = parts;

		return this;
	},

	toString: function(){

		return this.path.join('.')+'.'+this.name;

	}

});