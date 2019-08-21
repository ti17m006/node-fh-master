/**
	model - Start
*/

	const UserModelAsync = {
		id: {
			type: Number,
			min: 2,
			required:true
		},
		username: {
			type: String,
			minlen: 3,
			maxlen: 255,
			// validator - no numbers or special characters are allowed
		},
		isActive: {
			type: Boolean,
			default: false,
			required: true
		},
		date: {
			type: Date,
			default: Date.now()
		},
		fullname: {
			type: String,
			minlen: 3,
			maxlen: 255
			// validator - no numbers or special characters are allowed
		},
		email: {
			type: String,
			minlen: 10,
			maxlen: 255
			// validator - valid email address format!
		},
		phone: {
			type: String,
			required: false,
			minlen: 10,
			maxlen: 50
			// validator - valid phone number format!
		}
	}
	
	// arbitrary testing data!!!
	const UserModelData = {
		first: {
			id:2 ,
			username: "user-a",
			isActive: true,
			date: Date.now(),
			fullname: "John Smith",
			email: "a_inbox@mail.com",
			phone: "+433334837348"
		},
		second: {
			id: 3,
			username: "user-b",
			isActive: true,
			date: Date.now(),
			fullname: "Adam Smith",
			email: "b_inbnox@gmail.com",
			phone: "+389453434465"
		},
		third: {
			id: 4,
			username: "user-c",
			isActive: false,
			date: Date.now(),
			fullname: "Jim Benson",
			email: "c_inbox@mail.com",
			phone: "+3847598347394"
		},
		fourth: {
			id: 5,
			username: "user-d",
			isActive: false,
			date: Date.now(),
			fullname: "Gemma Gordon",
			email: "d_inbox@mail.com",
			phone: "+2342344235"
		},
		fifth: {
			id: 6,
			username: "user-e",
			isActive: true,
			date: Date.now(),
			fullname: "Emma Stone",
			email: "e_inbox@mail.com",
			phone: "+89430958390"
		},
		sixth: {
			id: 7,
			username: "user-f",
			isActive: false,
			date: Date.now(),
			fullname: "Robert Holt",
			email: "f_inbox@mail.com",
			phone: "+439084500349"
		}
	}
	
module.exports.UserModel = UserModelAsync
module.exports.UserData = UserModelData;

/**
	model - End
*/
