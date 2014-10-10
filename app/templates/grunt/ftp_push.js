module.exports = {

  your_target: {
      options: {
        username: "<%= ftpUsername %>",
        password: "<%= ftpPassword %>",
        host: "<%= ftpHost %>",
        dest: "<%= ftpFolder %>",
        port: 21
      },
      files: [
        {
          expand: true,
          cwd: 'dist/assets/images/',
          src: ['*.png','*.jpg','*.gif','*.jpeg']
        }
      ]
    }


};