const path = require('path');


module.exports = {
	alias : {
		"common/methods" : path.resolve(__dirname , "src/COMMON/Methods/index.tsx") ,
		"common/declarations" : [
			"src/COMMON/Declarations",
		] ,
		"commmon/components" : [
			"src/COMMON/Components",
		],
	},
};