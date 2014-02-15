define( [
    "model/Observable",
    "model/Model",
    "fishboneUtils",
    "underscore",

    ] , function( Observable , Model , utils ){



var Collection = function(){ this.init.apply( this, arguments);  };
for( var i in Observable.prototype )
_.extend( Collection.prototype , Observable.prototype )
_.extend( Collection.prototype , {

    Model : null ,

    models : null ,

    modelsById : null ,

    // order by crescent order, or decsrescant order with a '-''
    comparator : null,

    init : function( attr , options ){
        
        this.Model = this.Model || Model

        //copy prototypes field into own field
        this.models = [];

        this.modelsById = {};

        if( this.comparator ){
            var compAsc = this.comparator[0] == '-'
            var compAttr = compAsc ? this.comparator.substr(1) : this.comparator;
            // comparator ( a , b ) < 0  -> a < b -> a before b in models
            this._comparatorFn = function(a,b){ return ((a.attributes[compAttr] < b.attributes[compAttr]) == compAsc) ? 1 : -1 }
            this._compAttr = compAttr;
        }

        this.id = Model.nextId()

        this.set( attr || [] , options );
    },

    // add       ->  else erase the previous set
    // merge     ->  else existing value will be ignored
    // remove    ->  remove element that are not in the set
    set : function( attrs , options ){
        
        options = options || {}

        var silent = options.silent,
            merge = options.merge == null ? true : options.merge,
            add = options.add == null ? true : options.add,
            del = options.del,
            nosort = options.nosort

        if( Object.prototype.toString.call( attrs ) !== '[object Array]' )
            attrs = [ attrs ]

        var toAdd = [],
            toRmv = [];

        var newModelsById = {};
            

        for(var i=attrs.length;i--;){
            var id = attrs[i].id;
            if( id == null ){
                if( add )
                    toAdd.push( new this.Model( attrs[i] , options ) )
                continue;
            }
            if( this.modelsById[id] ){
                if( merge )
                    this.modelsById[id].set( attrs[i] instanceof this.Model ? attrs[i].attributes : attrs[i] , options )
                if( del )
                    this.newModelsById[id]=true;
            }else{
                if( add )
                    toAdd.push( attrs[i] instanceof this.Model ? attrs[i] : new this.Model( attrs[i] , options ) ) 
            }
        }

        if( del ){
            for(var i=this.models.length;i--;)
                if( !this.newModelsById[ this.models[i].id ] ){

                    //push to delete array
                    toRmv.push( this.models[i] )

                    //remove
                    delete this.modelsById[ this.models[i].id ]
                    this.models.splice(i,1);
                }
        }

        if( add ){

            if( this._comparatorFn && !nosort ){

                for( var i=toAdd.length;i--;){

                    this.modelsById[ toAdd[i].id ] = toAdd[i];

                    // dichotomic insertion
                    var a=0,b=this.models.length-1,e;

                    // it is the greatest ?
                    if( b<0 || this._comparatorFn( this.models[b] , toAdd[i] ) < 0 ){
                        this.models.push( toAdd[i] )
                        continue
                    }

                    while(b-a>1){
                        e = Math.floor( (a+b)/2 )
                        if( this._comparatorFn( this.models[e] , toAdd[i] ) < 0 )
                            a = e;
                        else
                            b = e;
                    }
                    
                    if( this._comparatorFn( this.models[a] , toAdd[i] ) < 0 )
                        this.models.splice( b , 0 , toAdd[i] )
                    else
                        this.models.splice( a , 0 , toAdd[i] )
                    
                }
            } else {
                this.models = this.models.concat( toAdd )
                for( var i=toAdd.length;i--;)
                    this.modelsById[ toAdd[i].id ] = toAdd[i];
            }


        }

        if( toRmv.length > 0 && !silent ){
            for( var i=toRmv.length;i--;){
                //remove sort attr listener
                toRmv[i].off( this )

                // notify the removing
                toRmv[i].trigger( 'removed' , this );
            }
                
            this.trigger( 'remove'  , toRmv )
        }

        if( toAdd.length > 0 && !silent ){
            for( var i=toAdd.length;i--;){

                // if the collection is sortable, listen for change on the sorted attr
                if( this._compAttr )
                    // TODO, this is little overkill, replace the misplaced element should be cheapier
                    toAdd[i].on('change:'+this._compAttr , this , this.sort)

                //notify the add
                toAdd[i].trigger( 'added' , this );
            }
            this.trigger( 'add'  , toAdd )
        }

        if( ( toRmv.length > 0 || toAdd.length > 0 ) && !nosort && !silent)
            this.trigger( 'sort' )
    },

    get : function(id){
        return this.modelsById[id]
    },

    sort : function(options){

        this.models = this.models.sort( this._comparatorFn )

        if( !options || !options.silent)
            this.trigger( 'sort' )
    },

    _relayEvent : function( eventName , attrName , o ){
        var s = eventName.split(':')
        this.trigger( s[0]+':'+attrName + ( s.length>1 ? '.'+s[1] : '' ) , o )
    },
})


Collection.extend = function( proto ){ return utils.extend( Collection , proto ) };

return Collection;

})