
define( [] , function( Observable ){

return function Callback (){ 
    var called = false;
    var args = null;
    var ctx = null;

    var calls = [];

    this.fn = function(){
        called = true;
        args = arguments;
        ctx = this;
        calls.unshift( arguments );
    }

    this.reset = function(){
        called = false;
        args = null;
        ctx = null;
        calls = [];
    }

    this.called = function(){
        return called;
    }

    this.args = function(){
        return args;
    }

    this.ctx = function(){
        return ctx;
    }

    this.calls = function(){
        return calls;
    }
}

});