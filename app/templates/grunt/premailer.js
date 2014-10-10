module.exports = {
	main: {
    	options: {
      		verbose: true,
      		removeComments: true
    	},
    	files: {
      		'dist/email-inline.html': ['dist/email.html']
    	}
  	}
};