module.exports = {

	dist: {
		src: ['dist/email-inline.html'],
		overwrite: true,
		replacements: [{
			from: 'assets/images/',
			to: 'http://<%= ftpHost %>/<%= publicFolder %>'
		}]
	}	

//end of module.exports for replace text
};