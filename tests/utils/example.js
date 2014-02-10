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
		comparator : function( user1 , user2 ){ return user1.attributes.age < user2.attributes.age ? -1 : 1 }
	})

	return {
		User : User,
		Transaction : Transaction,
		Book : Book
	}
});