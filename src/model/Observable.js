define( [
	"underscore",

	] , function( ){

var Observable=function(){};
Observable.prototype={

	_listeners:null,

	_stack:null,

	_lock:null,

	// ( event , fn )
	// ( event , fn , data )
	// ( event , context , fn )
	// ( event , context , fn , data )
	// 
	// fn is called with <eventName> , <data passed in trigger method> , <data passed in on method>
	on:function( eventName , context , fn , data ){

		//do it latter if locked
		if(this._lock){
			this._stack.push({ 'fn':'on' , 'arguments':arguments });
			return this;
		}

		// deal with params
		if( typeof(context) == "function" ){
			data=fn;
			fn=context;
			context=null;
		}

		// if needed instanciate the _listeners store
		if(!this._listeners)
			this._listeners={};

		// if needed instanciate the _listeners list
		if(!this._listeners[eventName])
			this._listeners[eventName]=[];

		// push the item
		this._listeners[eventName].push({
			fn : fn,
			context : !context ? window : context,
			data : data ? [ data ] : [] ,
		});

		return this;
	},

	// (  )
	// ( event )
	// ( context ) 
	// ( event , context )
	// ( event , context , data )
	// ( event , context , fn )
	// ( event , fn  , data )
	// ( event , data , fn  , context )
	off:function( eventName , context , fn , data ){

		//do it latter if locked
		if(this._lock){
			this._stack.push({ 'fn':'off' , 'arguments':arguments });
			return this;
		}

		// deal with params
		switch(arguments.length){
			case 0:
				context=null;
				fn=null;
				data=null;
				eventName=null;
			break;

			case 1:
				if(typeof(eventName)=="string"){
					context=null;
				}else{
					context=eventName;
					eventName=null;
				}
				fn=null;
				data=null;
			break;

			case 2:
				
			break;

			case 3:

				if( arguments[1] == null ){
					data = arguments[2]
					context = null
					fn = null
					break;
				}

				if( typeof( arguments[1] )=="function" ){
					data = arguments[2]
					fn = arguments[1];
					context =null;
				}else
				if( typeof( arguments[2] )=="function"){
					fn=arguments[2];
					context=arguments[1];
					data =null;
				}else{
					data=arguments[2];
					context=arguments[1];
					fn = null;
				}
				
			break;
		}

		// early exit if the store is not yet instanciated
		if(!this._listeners )
			return this;

		if( eventName ){

			if( !this._listeners[ eventName ] )
				return this;

			for(var i=this._listeners[ eventName ].length;i--;){
				var item = this._listeners[ eventName ][i]
				if( 
					   (!fn || item.fn == fn ) 
					&& (!data || item.data == data )
					&& (!context || item.context == context )
				)
					this._listeners[ eventName ].splice(i,1)
			}

		}else{

			if( !data && !fn && !context ){
				this._listeners = []
				return this
			}

			for( var eventName in this._listeners ){

				for(var i=this._listeners[ eventName ].length;i--;){
					var item = this._listeners[ eventName ][i]
					if( 
						   (!fn || item.fn == fn ) 
						&& (!data || item.data == data )
						&& (!context || item.context == context )
					)
						this._listeners[ eventName ].splice(i,1)
				}

			}

		}

		return this;
	},

	// ( event )
	// ( event , data )
	trigger:function( eventName , data ){

		
		if(!this._listeners )
			return this;

		// delegate the on and off to later
		this._lock=true;
		this._stack=[];

		if( this._listeners[ eventName ] )
			for(var i=this._listeners[ eventName ].length;i--;){
				var item = this._listeners[ eventName ][i]
				item.fn.apply( item.context , [eventName].concat( item.data ).concat( data ? [data] : [] ) )
			}

		if( this._listeners[ 'all' ] && eventName != 'all' )
			for(var i=this._listeners[ 'all' ].length;i--;){
				var item = this._listeners[ 'all' ][i]
				item.fn.apply( item.context , [eventName].concat( item.data ).concat( data ? [data] : [] ) )
			}


		// do the on and off that occur during the calls
		this._lock=false;

		var i=this._stack.length;
		while(i--)
			this[ this._stack[i].fn ].apply( this , this._stack[i].arguments );


		return this;
	},
};

return Observable;

});