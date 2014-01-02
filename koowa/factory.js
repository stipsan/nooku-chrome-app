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
            identifier: function(identifier){
                return Type.isString(identifier) || identifier.isPrototypeOf(Identifier);
            },
            options: Type.isObject,
            callback: Type.isFunction
        });
        
        console.dir(config);
        if(!config.callback) throw new TypeError('Factory calls require a callback!');

		var identifier = new Identifier(config.identifier),
		    options = config.options || {},
		    callback = config.callback || false;
		    
		options.identifier = identifier;
		
		
		
		//Get object from object cache if exists
		if(this._registry.hasOwnProperty(identifier)) return config.callback(this._registry[identifier]);

        var self = this, returns = function(){
            var innerReturns = function(){
                //Get classname
                var className = self._getClassNameFromIdentifier(identifier);

                //Check if class exists
                if(className in window == false) console.error(className+' not found');

                //Instantiate class
                //console.log('before new window[%s]', className, new Date);
                var obj = new window[className](options);
                //console.log('new %s', className, options);

                //Cache object
                self._registry[identifier] = obj;
            };
            //console.log('before Loader(%s)', identifier, new Date);
            //If the object don't exist, or have the name 'default', get the default object
            Loader.load(identifier, innerReturns);
            //console.log('after Loader(%s)', identifier, new Date);
        };

		//*autoload* the abstract class
		var abstract	= Object.clone(identifier);
		abstract.name	= 'abstract';
		try {
			Loader.load(abstract, returns);
		} catch(error) {
			returns();
		}
	},

	tmp: function(){

		

	},

	_getClassNameFromIdentifier: function(identifier){

		var path = identifier.path.map(function(part){
			return part.capitalize();
		});
		
		return path.join('')+identifier.name.capitalize()

	}

};