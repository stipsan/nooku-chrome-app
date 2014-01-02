/**
* @category    Nooku
* @package     Nooku_Desktop
* @subpackage  Koowa
* @copyright   Copyright (C) 2011 Timble CVBA. (http://www.timble.net).
* @license     GNU GPLv3 <http://www.gnu.org/licenses/gpl.html>
* @link        http://www.nooku.org
*/

var Factory = {

	_registry: {},

	get: function(){

        var config = Array.from(arguments).link({
            identifier: Type.isString,
            options: Type.isObject,
            callback: Type.isFunction
        });
        
        console.dir(config);
        if(!config.callback) throw new TypeError('Factory calls require a callback!');

		var identifier = config.identifier,
		    options = config.options || {},
		    callback = config.callback || false;
		    
		options.identifier = identifier;
		
		
		
		//Get object from object cache if exists
		if(!this._registry.hasOwnProperty(identifier)) {
            //Get classname
            var className = this._getClassNameFromIdentifier(identifier);

            //Check if class exists
            if(className in window == false) throw new TypeError(className+' not found');

            //Instantiate class
            //console.log('before new window[%s]', className, new Date);
            var obj = new window[className](options);
            //console.log('new %s', className, options);

            //Cache object
            this._registry[identifier] = obj;
        }


        return config.callback(this._registry[identifier]);
	},

	_getClassNameFromIdentifier: function(identifier){

		var parts = identifier.split('.').map(function(part){
			return part.capitalize();
		});
		
		return parts.join('')

	}

};