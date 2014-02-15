define( [
	"model/Model",
	"model/Collection"

	] , function( Model , Collection ){


	var User = Model.extend({
	})

	var Transaction = Model.extend({
		references : { 
			'user' :null
		}
	})

	var Book = Collection.extend({
		Model : User,
		comparator : 'age'
	})

	return {
		User : User,
		Transaction : Transaction,
		Book : Book
	}
});