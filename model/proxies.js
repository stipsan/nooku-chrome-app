/**
* @category    Nooku
* @package     Nooku_Desktop
* @subpackage  Model
* @copyright   Copyright (C) 2011 Timble CVBA. (http://www.timble.net).
* @license     GNU GPLv3 <http://www.gnu.org/licenses/gpl.html>
* @link        http://www.nooku.org
*/

this.ModelProxies = new Class({

	Extends: ModelAbstract,

	setProxy: function(proxy){

		localStorage.proxy = proxy;

		Titanium.Network.setHTTPProxy(proxy);

		return this;

	},

	getProxy: function(){

		return localStorage.proxy;

	}

});