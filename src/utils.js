define( [] , function(  ){



var extend = function( Parent , proto ){

	Parent = Parent || {}
	proto = proto || {}

	var Child = function(){ 
		this.init.apply( this, arguments);
	};
	for( var i in Parent.prototype )
		Child.prototype[ i ] = Parent.prototype[ i ]
	for( var i in proto )
		Child.prototype[ i ] = proto[ i ]

	Child.extend = function( proto ){ return extend(Child,proto) };

	return Child;
}


return {
	extend : extend
};

})