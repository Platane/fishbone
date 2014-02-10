define( [
	"model/Model",
	"testUtils/Callback",
	"testUtils/example",

	] , function( Model , Callback , e ){

	return function(){

		describe("Model Primitive Attr", function() {

			beforeEach(function(){
				this.callback = new Callback();
				this.ana = new e.User({
					'name' : 'ana',
					'surname' : 'wow',
					'age' : 15
				}).on( 'all' , this.callback.fn )
			});

			describe(" set attr ",function(){

				beforeEach(function(){
					this.callback.reset();
					this.ana.set( {'name':'ana2' , 'surname':'such wow' } )
				});

				it("should trigger change:name event", function() {
                    expect( this.callback.called() ).toBe( true );

                    //order is not important
                    if( this.callback.calls()[2][0] == 'change:name' )
                    	expect( this.callback.calls()[2][0] ).toBe( 'change:name' );
                    else
                    	expect( this.callback.calls()[1][0] ).toBe( 'change:name' );
                });
                it("should trigger change:surname event", function() {
                    expect( this.callback.called() ).toBe( true );
                   	
                   	//order is not important
                    if( this.callback.calls()[2][0] == 'change:surname' )
                    	expect( this.callback.calls()[2][0] ).toBe( 'change:surname' );
                    else
                    	expect( this.callback.calls()[1][0] ).toBe( 'change:surname' );
                });

                it("should trigger change event", function() {
                    expect( this.callback.called() ).toBe( true );
                    expect( this.callback.calls()[0][0] ).toBe( 'change' );
                });
			});
	

			describe(" set attr options{silent : true }",function(){

				beforeEach(function(){
					this.callback.reset();
					this.ana.set( {'name':'ana2' , 'surname':'such wow' } , {silent:true} )
				});

				it("should not trigger any event", function() {
                    expect( this.callback.called() ).toBe( false );
                });
            })
		});

	}
})