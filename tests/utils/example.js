define( [
	"model/Model",

	] , function( Model ){


	var User = Model.extend({
	})

	var Transaction = Model.extend({
		references : { 
			'user' :null
		}
	})

	return {
		User : User,
		Transaction : Transaction
	}
});