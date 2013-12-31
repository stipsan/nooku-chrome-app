/**
* @category    Nooku
* @package     Nooku_Desktop
* @subpackage  Koowa
* @copyright   Copyright (C) 2011 Timble CVBA. (http://www.timble.net).
* @license     GNU GPLv3 <http://www.gnu.org/licenses/gpl.html>
* @link        http://www.nooku.org
*/

var Identifiable = new Class({

	_identifier: false,

	initialize: function(options){

		this._identifier = options.identifier;

		return this;

	},
	
	getIdentifier: function(){

		return this._identifier;

	}

});