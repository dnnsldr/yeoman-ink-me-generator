module.exports = {
    dist: {
        src: ['index.html'],
        dest: 'dist/css/tidy.css',
        options: {
            report: 'min' // optional: include to report savings
        }
    }
};