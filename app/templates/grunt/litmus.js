module.exports = {
	

		test: {
      		src: ['dist/email-inline.html'],
      		options: {
      			subject: 'TEST - <%= projectName %>',
        		username: '<%= litmusUser %>',
        		password: '<%= litmusPassword %>',
       			url: 'https://<%= litmusDomain %>.litmus.com',
        		clients: [<%= _.words(litmusClients) %>]
      		}
    	}


};
//end of module.exports for litmus test