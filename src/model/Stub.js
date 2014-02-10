
define( [
    "model/Observable",
    "underscore",

    ] , function( Observable ){



var Stub = function(){ this.init.apply( this, arguments);  };
_.extend( Stub.prototype , Observable.prototype )
_.extend( Stub.prototype , {

    actual : null,

    init:function(){

    },

    setActual : function( actual , options ){

        var silent = options && options.silent;

        if( this.actual )
            // remove listener of the previous actual
            this.actual.off( this );
        
        if( !silent ){

            // assuming the actuals share the same properties key
            // iterate throught the attrs, considering actual may be null
            var newAttr = actual ? actual.attributes : {},
                exAttr = this.actual ? this.actual.attributes : {}

            this.actual = actual;

            var set = actual ? newAttr : exAttr
            var change = false;
            for( var i in set )
                if( newAttr[i] !== exAttr[i] ){
                    this.trigger("change:"+i)
                    change = true;
                }
            if( change )
                this.trigger("change")
        
        }else{
            this.actual = actual;
        }

        

        if( this.actual )
            // listen the new actual
            this.actual.on('all',this,this._relayEvent)

    },

    getActual : function(){
        return actual
    },

    _relayEvent : function( eventName , o ){
        this.trigger( eventName , o )
    },
})

return Stub


})