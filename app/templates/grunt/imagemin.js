module.exports = {

	dist: {
		files: [{
			expand: true,
			cwd: 'assets/images/',
			src: '{,*/}*.{png,jpg,jpeg,gif}',
			dest: 'dist/assets/images/'
		}]
	}	

//end of module.exports for imagemin
};