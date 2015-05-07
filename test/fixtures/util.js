var colors = require('colors')
  , simplediff = require('simplediff');

var util = {};

util.displayDiff = function(first, second) {
    console.log();
    var diff = simplediff.diff(first, second);
    
    console.log('testz');
    diff.forEach(function(part){
        // green for additions, red for deletions
        // grey for common parts
        var color = part[0] == '+' ? 'green' :
            part[0] == '-' ? 'red' : 'grey';
        
        var output;
        if (part[1] == '\n') {
            output = '\\n\n'[color];
        } else {
            output = part[1][color];
        }
        process.stderr.write(output);
    });
    
    console.log();
}

module.exports = util;