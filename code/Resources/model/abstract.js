/**
* @category    Nooku
* @package     Nooku_Desktop
* @subpackage  Model
* @copyright   Copyright (C) 2011 Timble CVBA. (http://www.timble.net).
* @license     GNU GPLv3 <http://www.gnu.org/licenses/gpl.html>
* @link        http://www.nooku.org
*/

this.ModelAbstract = new Class({

	Extends: Identifiable,
	
	//States
	_insert: [],

	//Set states
	set: function(states){

		Object.each(states, function(value, state){

			if(this._insert.contains(state)) this[state](value);

		}, this);

	}

});