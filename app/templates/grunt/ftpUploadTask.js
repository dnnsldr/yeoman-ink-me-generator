module.exports = {
	
	target1: {
        options: {
            user: '<%= ftpUsername %>',
            password: '<%= ftpPassword %>',
            port: 21,
            host: '<%= ftpHost %>'
        },
        files: [{
            expand: true,
            cwd: 'dist/assets/images/',
            dest: '<%= ftpFolder %>',
            src: ['*.png','*.jpg','*.gif','*.jpeg']
        }]
     
  }


};