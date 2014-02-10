define( [
    "model/Collection",
    "testUtils/Callback",
    "testUtils/example",

    ] , function( Model , Callback , e ){

    return function(){

        describe("Collection", function() {

            beforeEach(function(){
                this.callback = new Callback();
                this.callbackU = new Callback();
                this.book = new e.Book().on('all',this.callback.fn);
                this.users = [
	               
	                new e.User({
	                    'name' : 'ana',
	                    'age' : 15
	                }),
	                new e.User({
	                    'name' : 'john',
	                    'age' : 2
	                }),
	                new e.User({
	                    'name' : 'fab',
	                    'age' : 30
	                }),
	                new e.User({
	                    'name' : 'lilith',
	                    'age' : 5
	                }).on('all',this.callbackU.fn),
	                new e.User({
	                    'name' : 'dom',
	                    'age' : 19
	                }),
	                new e.User({
	                    'name' : 'rose',
	                    'age' : 0
	                }),
	                 new e.User({
	                    'name' : 'alice',
	                    'age' : 400
	                }),
                	new e.User({
	                    'name' : 'bob',
	                    'age' : -1
	                }),
	                new e.User({
	                    'name' : 'bob',
	                    'age' : -10
	                }),
	                new e.User({
	                    'name' : 'bob',
	                    'age' : 401
	                }),
	              ]
            });

            describe(" set options{add:true} ",function(){

                beforeEach(function(){
                    this.callback.reset();
                    this.book.set( this.users , { add:true , del : true , merge : true } )
                });

                it("item should be registered and retreivable with get( <id> )", function() {
                    for(var i = this.users.length ; i -- ; ){
                    	expect( !!this.book.get( this.users[i].id ) ).toBe( true )
                    	expect( this.book.get( this.users[i].id ).attributes.name ).toBe( this.users[i].attributes.name )
                    }
                });

                it("item should be registered in models ordered", function() {
                    for(var i = this.book.models.length-1 ; i -- ; )
                    	expect( this.book.models[i].attributes.age ).toBeLessThan( this.book.models[i+1].attributes.age )
                });

                it("should have triggered add event on collection", function() {
                    for(var i=this.callback.calls().length;i--;)
                        if( this.callback.calls()[i][0] == 'add' )
                            break;
                    expect( i>=0 ).toBe( true )
                });

                it("should have triggered sort event on collection", function() {
                    for(var i=this.callback.calls().length;i--;)
                        if( this.callback.calls()[i][0] == 'sort' )
                            break;
                    expect( i>=0 ).toBe( true )
                });

                it("should have not triggered any other event", function() {
                    expect( this.callback.calls().length ).toBe( 2 )
                });

                it("should have triggered added event on the users", function() {
                    expect( this.callbackU.calls().length ).toBe( 1 )
                    expect( this.callbackU.calls()[0][0] ).toBe( "added" )
                });
            });
	
			describe(" set options{add:true} with non empty collection ",function(){

                beforeEach(function(){
                    this.callback.reset();
                    this.book.set( this.users.slice(0,3) , { add:true , merge : true } )
                    this.book.set( this.users.slice(0,6) , { add:true , merge : true } )
                    this.book.set( this.users.slice(5) , { add:true , merge : true } )
                });

                it("item should be registered and retreivable with get( <id> )", function() {
                    for(var i = this.users.length ; i -- ; ){
                    	expect( !!this.book.get( this.users[i].id ) ).toBe( true )
                    	expect( this.book.get( this.users[i].id ).attributes.name ).toBe( this.users[i].attributes.name )
                    }
                });

                it("item should be registered in models ordered", function() {
                    for(var i = this.book.models.length-1 ; i -- ; )
                    	expect( this.book.models[i].attributes.age ).toBeLessThan( this.book.models[i+1].attributes.age )
                });

                it("should have triggered add event on collection", function() {
                    for(var i=this.callback.calls().length;i--;)
                        if( this.callback.calls()[i][0] == 'add' )
                            break;
                    expect( i>=0 ).toBe( true )
                });

                it("should have triggered sort event on collection", function() {
                    for(var i=this.callback.calls().length;i--;)
                        if( this.callback.calls()[i][0] == 'sort' )
                            break;
                    expect( i>=0 ).toBe( true )
                });

                it("should have not triggered any other event", function() {
                    expect( this.callback.calls().length ).toBe( 6 )
                });

                it("should have triggered added event on the users", function() {
                    expect( this.callbackU.calls().length ).toBe( 1 )
                    expect( this.callbackU.calls()[0][0] ).toBe( "added" )
                });
            });
            
        });

    }
})