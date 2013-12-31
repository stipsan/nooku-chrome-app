/**
* @category    Nooku
* @package     Nooku_Desktop
* @subpackage  Model
* @copyright   Copyright (C) 2011 Timble CVBA. (http://www.timble.net).
* @license     GNU GPLv3 <http://www.gnu.org/licenses/gpl.html>
* @link        http://www.nooku.org
*/

this.ModelSites = new Class({

	Extends: ModelAbstract,

	_insert: ['id'],
	
	initialize: function(options){

		var install = 'CREATE TABLE IF NOT EXISTS sites (id INT, name TEXT, title TEXT)';
		this.db.execute(install);

		return this.parent(options);
	},
	
	db: Titanium.Database.open('nooku_desktop'),
	_id: false,
	_list: [],
	_item: {},
	
	id: function(id){
		this._id = id;

		return this;
	},
	
	getTotal: function(){

		var total = this.db.execute('SELECT MAX(id) FROM sites').field(0).toInt();
		return isNaN(total) ? 0 : total;

	},

	getList: function(){

		this._list = [];
		var rows = this.db.execute(
		    "SELECT * FROM sites WHERE id = ?",
		    this._id.toInt()
		);
		while(rows.isValidRow()){
			var item = {
				id: rows.fieldByName('id'), 
				name: rows.fieldByName('name'), 
				title: rows.fieldByName('title')
			};
			this._list.include(item);
			rows.next();
		}
		rows.close();

		return this._list;

	},

	getItem: function(){

		this._item = {};
		var rows = this.db.execute(
		    "SELECT * FROM sites WHERE id = ? LIMIT 1",
		    this._id.toInt()
		);
		this._item = {
			id: rows.fieldByName('id'),
			name: rows.fieldByName('name'),
			title: rows.fieldByName('title')
		};
		//Release memory
		rows.close();

		return this._item;

	},
	
	save: function(column, value){

		if(!this._id) return false;

		this.db.execute(
		    "UPDATE sites SET "+column+" = ? WHERE id = ?",
                value, this._id.toInt()
		    );
		
		//Set the app menu
		Factory.get('model.menu').setMenu();

		return true;
	},
	
	remove: function(){

		if(!this._id) return false;

		this.db.execute(
		    'DELETE FROM sites WHERE id = ?',
		    this._id.toInt()
		);

		//Set the app menu
		Factory.get('model.menu').setMenu();

		return true;
	}

});