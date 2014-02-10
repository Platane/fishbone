define( [
    "model/Observable",
    "testUtils/Callback"
    ] , function( Observable , Callback ){

    return function(){

        describe("Observable", function() {

            beforeEach(function(){
                this.obs = new Observable();   
            })

            describe("register event with on", function() {

                describe("with param <eventName> , <fn>", function() {

                    beforeEach(function(){
                        this.callback = new Callback();
                        this.obs.on( 'a' , this.callback.fn ).trigger('a')
                    })

                    it("callback should have been called", function() {
                        expect( this.callback.called() ).toBe( true );
                    });
                    it("callback should have been called with correct params", function() {
                        expect( this.callback.args().length ).toBe( 1 );
                        expect( this.callback.args()[0] ).toBe( 'a' );
                    });
                });

                describe("with param <eventName> , <context> , <fn>", function() {

                    beforeEach(function(){
                        this.ctx = { key : 'boat' }
                        this.callback = new Callback();
                        this.obs.on( 'a' , this.ctx , this.callback.fn ).trigger('a')
                    })

                    it("callback should have been called", function() {
                        expect( this.callback.called() ).toBe( true );
                    });
                    it("callback should have been called in specified context", function() {
                        expect( this.callback.ctx().key ).toBe( 'boat' );
                    });
                    it("callback should have been called with correct params", function() {
                        expect( this.callback.args().length ).toBe( 1 );
                        expect( this.callback.args()[0] ).toBe( 'a' );
                    });
                });

                describe("with param <eventName> , <fn> , <data>", function() {

                    beforeEach(function(){
                        this.callback = new Callback();
                        this.obs.on( 'a' , this.callback.fn , 'wow' ).trigger('a')
                    })

                    it("callback should have been called", function() {
                        expect( this.callback.called() ).toBe( true );
                    });
                    it("callback should have been called with correct params", function() {
                        expect( this.callback.args().length ).toBe( 2 );
                        expect( this.callback.args()[0] ).toBe( 'a' );
                        expect( this.callback.args()[1] ).toBe( 'wow' );
                    });
                });

                describe("with param <eventName> , <data> , <fn> , <context>", function() {

                    beforeEach(function(){
                        this.ctx = { key : 'boat' }
                        this.callback = new Callback();
                        this.obs.on( 'a' , this.ctx , this.callback.fn , 'wow' ).trigger('a')
                    })

                    it("callback should have been called", function() {
                        expect( this.callback.called() ).toBe( true );
                    });
                    it("callback should have been called with correct params", function() {
                        expect( this.callback.args().length ).toBe( 2 );
                        expect( this.callback.args()[0] ).toBe( 'a' );
                        expect( this.callback.args()[1] ).toBe( 'wow' );
                    });
                    it("callback should have been called in specified context", function() {
                        expect( this.callback.ctx().key ).toBe( 'boat' );
                    });
                });
            });

            describe("unregister event with off", function() {

                beforeEach(function(){
                    this.ctx = { key : 'boat' }
                    this.callback1 = new Callback();
                    this.callback2 = new Callback();
                    this.callback3 = new Callback();
                    this.callback4 = new Callback();
                    this.obs.on( 'a' , this.ctx ,  this.callback1.fn , 'wow'  )
                    this.obs.on( 'a' , { key : 'plane' } , this.callback2.fn , 'wow'  )
                    this.obs.on( 'b' , this.ctx , this.callback3.fn , 'wow' )
                    this.obs.on( 'a' , this.ctx , this.callback4.fn , '8' )
                })

                describe("with no param", function() {

                    beforeEach(function(){
                        this.obs.off(  ).trigger( 'a' ).trigger( 'b' )
                    })

                    it("all listeners should be removed, no one should get notified", function() {
                        expect( this.callback1.called() ).toBe( false );
                        expect( this.callback2.called() ).toBe( false );
                        expect( this.callback3.called() ).toBe( false );
                        expect( this.callback4.called() ).toBe( false );
                    });
                });

                describe("with param <eventName>", function() {

                    beforeEach(function(){
                        this.obs.off( 'a' ).trigger( 'a' ).trigger( 'b' )
                    })

                    it("only the specific listeners should be removed", function() {
                        expect( this.callback1.called() ).toBe( false );
                        expect( this.callback2.called() ).toBe( false );
                        expect( this.callback3.called() ).toBe( true );
                        expect( this.callback4.called() ).toBe( false );
                    });
                });

                describe("with param <context>", function() {

                    beforeEach(function(){
                        this.obs.off( this.ctx ).trigger( 'a' ).trigger( 'b' )
                    })

                    it("only the specific listeners should be removed", function() {
                        expect( this.callback1.called() ).toBe( false );
                        expect( this.callback2.called() ).toBe( true );
                        expect( this.callback3.called() ).toBe( false );
                        expect( this.callback4.called() ).toBe( false );
                    });
                });

                describe("with param <event> <context>", function() {

                    beforeEach(function(){
                        this.obs.off( "a" , this.ctx ).trigger( 'a' ).trigger( 'b' )
                    })

                    it("only the specific listeners should be removed", function() {
                        expect( this.callback1.called() ).toBe( false );
                        expect( this.callback2.called() ).toBe( true);
                        expect( this.callback3.called() ).toBe( true );
                        expect( this.callback4.called() ).toBe( false );
                    });
                });

                describe("with param <event> null <data> ", function() {

                    beforeEach(function(){
                        this.obs.off( "a" , null , 'wow' ).trigger( 'a' ).trigger( 'b' )
                    })

                    it("only the specific listeners should be removed", function() {
                        expect( this.callback1.called() ).toBe( false );
                        expect( this.callback2.called() ).toBe( false);
                        expect( this.callback3.called() ).toBe( true );
                        expect( this.callback4.called() ).toBe( true );
                    });
                });

                describe("with param <event> <context> <data> ", function() {

                    beforeEach(function(){
                        this.obs.off( "a" , this.ctx , 'wow' ).trigger( 'a' ).trigger( 'b' )
                    })

                    it("only the specific listeners should be removed", function() {
                        expect( this.callback1.called() ).toBe( false );
                        expect( this.callback2.called() ).toBe( true );
                        expect( this.callback3.called() ).toBe( true );
                        expect( this.callback4.called() ).toBe( true );
                    });
                });
            });

            describe("trigger", function() {

                beforeEach(function(){
                    this.callback1 = new Callback();
                    this.callback2 = new Callback();
                    this.obs.on( 'a' , this.callback1.fn , 'wow' )
                    this.obs.on( 'b' , this.callback2.fn , '8' )
                })

                describe("trigger specifc event", function() {

                    beforeEach(function(){
                        this.obs.trigger( 'a' )
                    })

                    it("should trigger only concerned event", function() {
                        expect( this.callback1.called() ).toBe( true );
                        expect( this.callback2.called() ).toBe( false );
                    });
                });

                describe("register \"all\" event name" , function() {

                    beforeEach(function(){
                        this.callback3 = new Callback();
                        this.obs.on( 'all' , this.callback3.fn )
                        this.obs.trigger( 'a' )
                    })

                    it("should allways be triggered", function() {
                        expect( this.callback1.called() ).toBe( true );
                        expect( this.callback2.called() ).toBe( false );
                        expect( this.callback3.called() ).toBe( true );
                    });
                });

                describe("trigger with an optionnal argument" , function() {

                    beforeEach(function(){
                        this.obs.trigger( 'a' , 'such param' )
                    })

                    it("argument should be passed after the the one registered with on", function() {
                        expect( this.callback1.called() ).toBe( true );
                        expect( this.callback1.args().length ).toBe( 3 );
                        expect( this.callback1.args()[0] ).toBe( 'a' );
                        expect( this.callback1.args()[1] ).toBe( 'wow' );
                        expect( this.callback1.args()[2] ).toBe( 'such param' );
                    });
                });
            });

        });
    }
})