/**
* @category    Nooku
* @package     Nooku_Desktop
* @subpackage  View
* @copyright   Copyright (C) 2011 Timble CVBA. (http://www.timble.net).
* @license     GNU GPLv3 <http://www.gnu.org/licenses/gpl.html>
* @link        http://www.nooku.org
*/

this.ViewAbstract = new Class({

	Extends: Identifiable,
	
	_layout: 'default',
	output: '',

	setLayout: function(layout){

		this._layout = layout;

		return this;

	},

	getLayout: function(){

		return this._layout;

	},

	display: function(){
	
		this.beforeDisplay();
		
		var output = new Element('div');
		output.innerHTML = this.output;
		
		//Parse scripts
		var scripts = output.querySelectorAll('script');
		for (var i = 0; i < scripts.length; i++){
			new Function(scripts[i].innerHTML).call(output);
		}
	
		return output;
	
	},

	beforeDisplay: function(){

		this.output = this.loadTemplate();

	},

	loadTemplate: function(){

		var file = Loader.path(this.getIdentifier()),
			absolute = Titanium.App.appURLToPath(file),
			path = Titanium.Filesystem.getFile(absolute).parent(),
			tmpl = path+'/'+this.getLayout()+'.html';


		return Titanium.Filesystem.getFile(tmpl).read().toString();

	}

});