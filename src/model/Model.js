define( [
	"model/Observable",
	"model/Stub",
	"utils",
	"underscore",

	] , function( Observable , Stub , utils ){



var Model = function(){ this.init.apply( this, arguments);  };
for( var i in Observable.prototype )
_.extend( Model.prototype , Observable.prototype )
_.extend( Model.prototype , {

	attributes : {},

	references : {},

	init : function( attr , options ){
		
		//copy prototypes field into own field
		var refs = {};
		for( var i in this.references ){
			refs[i] = new Stub();
			refs[i].on( "all" , this , this._relayEvent , i );
		}
		this.references = refs;

		this.attributes = {};

		this.set(attr || {} ,options);
	},

	set : function( attr , options ){
		
		var silent = options && options.silent

		var change = false;
		for( var i in attr ){

			if( this.references[i] ){
				this.references[i].setActual( attr[i] , options )
			}
			else 
			if( this.attributes[i] !== attr[i] ){
				this.attributes[i] = attr[i];
				if( !silent )
					this.trigger( "change:"+i )
				change = true
			}
		}
		if( change && !silent )
			this.trigger( "change" )
	},

	_relayEvent : function( eventName , attrName , o ){
        var s = eventName.split(':')
        this.trigger( s[0]+':'+attrName + ( s.length>1 ? '.'+s[1] : '' ) , o )
    },
})


Model.extend = function( proto ){ return utils.extend( Model ,proto) };

return Model;

})