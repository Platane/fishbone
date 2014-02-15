define( [
    "model/Observable",
    "model/Stub",
    "fishboneUtils",
    "underscore",

    ] , function( Observable , Stub , utils ){




var Model = function(){ this.init.apply( this, arguments);  };
for( var i in Observable.prototype )
_.extend( Model.prototype , Observable.prototype )
_.extend( Model.prototype , {

    attributes : {},

    references : {},

    collections : {},

    init : function( attr , options ){
        
        //copy prototypes field into own field
        var refs = {};
        for( var i in this.references ){
            refs[i] = new Stub();
            refs[i].on( "all" , this , this._relayEvent , i );
        }
        this.references = refs;

        var cols = {};
        for( var i in this.collections ){
            cols[i] = new this.collections[i]();
            //cols[i].on( "all" , this , this._relayEvent , i );
        }
        this.collections = cols;

        this.attributes = {};


        this.id = attr && attr.id ? attr.id :  Model.nextId()

        this.set(attr || {} ,options);
    },

    set : function( attr , options ){
        
        var silent = options && options.silent

        var change = false;
        for( var i in attr ){

            if( i == 'id' )
                continue;

            if( this.references[i] ){
                this.references[i].setActual( attr[i] , options )
            }
            else 
            if( this.collections[i] ){
                this.collections[i].set( attr[i] , options )
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


var idC = 1;

Model.nextId = function(){
    return idC ++;
}

Model.extend = function( proto ){ return utils.extend( Model ,proto) };

return Model;

})