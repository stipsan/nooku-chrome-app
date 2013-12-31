/**
* @category    Nooku
* @package     Nooku_Desktop
* @subpackage  Model
* @copyright   Copyright (C) 2011 Timble CVBA. (http://www.timble.net).
* @license     GNU GPLv3 <http://www.gnu.org/licenses/gpl.html>
* @link        http://www.nooku.org
*/

this.ModelConnections = new Class({

	Extends: ModelAbstract,

	_insert: ['id'],
	
	initialize: function(options){

		var install = 'CREATE TABLE IF NOT EXISTS connections (id INT, url TEXT, title TEXT, username TEXT, password TEXT)';
		this.db.execute(install);

		if(!this.getTotal()) {
			this.db.execute('DROP TABLE connections');
			this.db.execute(install);
		}
		
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

		//return this.getList().length;
		var total = this.db.execute('SELECT MAX(id) FROM connections').field(0).toInt();
		return isNaN(total) ? 0 : total;

	},

	getList: function(){

		this._list = [];
		var rows = this.db.execute("SELECT * FROM connections");
		while(rows.isValidRow()){
			var item = {
				id: rows.fieldByName('id'), 
				url: rows.fieldByName('url'), 
				title: rows.fieldByName('title'),
				username: rows.fieldByName('username'),
				password: rows.fieldByName('password')
			};
			//Set the subsites if available
			item.sites = this.setSites(item);

			this._list.include(item);
			if(item.username === null || item.password === null) this.updateTable(1);
			
			rows.next();
		}
		rows.close();

		return this._list;

	},

	getItem: function(){

		this._item = {};
		var rows = this.db.execute(
		    "SELECT * FROM connections WHERE id = ? LIMIT 1",
		    this._id.toInt()
		);
		this._item = {
			id: rows.fieldByName('id'), 
			url: rows.fieldByName('url'), 
			title: rows.fieldByName('title'),
			username: rows.fieldByName('username'),
			password: rows.fieldByName('password')
		};
		//Release memory
		rows.close();

        //Set the subsites if available
        this._item.sites = this.setSites(this._item);

		if(this._item.username === null || this._item.password === null) this.updateTable(1);

		return this._item;

	},

	setSites: function(item){

        var model = Factory.get('model.sites'), sites = model.id(item.id).getList();
        return sites.length > 1 ? sites : [];

	},
	
	save: function(column, value){

		if(!this._id) return false;

		this.db.execute(
		    "UPDATE connections SET "+column+" = ? WHERE id = ?",
                value, this._id.toInt()
		    );
		
		//Set the app menu
		Factory.get('model.menu').setMenu();

		return true;
	},
	
	remove: function(){

		if(!this._id) return false;

		this.db.execute(
		    'DELETE FROM connections WHERE id = ?',
		    this._id.toInt()
		);

		//Set the app menu
		Factory.get('model.menu').setMenu();

		return true;
	},
	
	updateTable: function(step) {
		if(this._ranUpdateTable) return;

		switch(step) {
			case 1:
				this.db.execute('ALTER TABLE connections ADD COLUMN username TEXT');
				this.db.execute('ALTER TABLE connections ADD COLUMN password TEXT');
		}
		
		this._ranUpdateTable = true;
	}

});