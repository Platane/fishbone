define( [
    "model/Model",
    "testUtils/Callback",
    "testUtils/example",

    ] , function( Model , Callback , e ){

    return function(){

        describe("Model Reference Attr", function() {

            beforeEach(function(){
                this.callback = new Callback();
                this.tr = new e.Transaction().on( 'all' , this.callback.fn )
                this.ana = new e.User({
                    'name' : 'ana',
                    'surname' : 'wow',
                    'age' : 15
                })
            });

            describe(" set ref attr ",function(){

                beforeEach(function(){
                    this.callback.reset();
                    this.tr.set( { 'user' : this.ana , 'amount' : 3 } )
                });

                it("should trigger change:amount event", function() {
                    for(var i=this.callback.calls().length;i--;)
                        if( this.callback.calls()[i][0] == 'change:amount' )
                            break;
                    expect( i>=0 ).toBe( true )
                });

                it("should trigger change:user event", function() {
                    for(var i=this.callback.calls().length;i--;)
                        if( this.callback.calls()[i][0] == 'change:user' )
                            break;
                    expect( i>=0 ).toBe( true )
                });

                it("should trigger change:user.< name | surname | age > event", function() {
                    expect( this.callback.called() ).toBe( true );

                    for(var i=this.callback.calls().length;i--;)
                        if( this.callback.calls()[i][0] == 'change:user.age' )
                            break;
                    expect( i>=0 ).toBe( true )

                    for(var i=this.callback.calls().length;i--;)
                        if( this.callback.calls()[i][0] == 'change:user.name' )
                            break;
                    expect( i>=0 ).toBe( true )

                    for(var i=this.callback.calls().length;i--;)
                        if( this.callback.calls()[i][0] == 'change:user.surname' )
                            break;
                    expect( i>=0 ).toBe( true )
                });
                
                it("should trigger change event", function() {
                    expect( this.callback.calls()[0][0] ).toBe( "change" );
                });
            });
    

            describe(" set ref attr options{silent : true }",function(){

                beforeEach(function(){
                    this.callback.reset();
                    this.tr.set( { 'user' : this.ana , 'amount' : 3 } , { silent : true } )
                });

                it("should not trigger any event", function() {
                    expect( this.callback.called() ).toBe( false );
                });
            })

            describe(" set attr on a ref",function(){

                beforeEach(function(){
                    
                    this.tr.set( { 'user' : this.ana , 'amount' : 3 } )
                    this.callback.reset();
                    this.ana.set({ 'name' : 'ana2' })
                });

                it("should trigger change:user.name event", function() {
                    expect( this.callback.calls().length ).toBe( 2 )
                    for(var i=this.callback.calls().length;i--;)
                        if( this.callback.calls()[i][0] == 'change:user.name' )
                            break;
                    expect( i>=0 ).toBe( true )
                });
                it("should trigger change:user event", function() {
                    for(var i=this.callback.calls().length;i--;)
                        if( this.callback.calls()[i][0] == 'change:user' )
                            break;
                    expect( i>=0 ).toBe( true )
                });
            });

            
        });

    }
})