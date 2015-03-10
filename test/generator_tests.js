var generator = require('../lib/generator');
var hoek = require('hoek');
var async = require('async');
var fixtures = require('./fixtures');



//hoek.assert(condition, message)


suite('generator', function() {
    suite('renderModelIndex', function() {
        setup(function(done) {
            fixtures.generator.initModelIndex(function() {
                done();
            });
        });
        test('should match expected output fixtures', function(done) {
            //fixtures.generator.model_index is an array of {name, input, output}
            hoek.assert(fixtures.generator.model_index.length > 0, 'No renderModelIndex fixtures exist.');
            async.each(fixtures.generator.model_index, function(fixture, fixtureDone) {
                generator.renderModelIndex(fixture.input, function(err, output) {
                    hoek.assert(err === null, 'Error from generator.renderModelIndex() for fixture test: ' + fixture.name + ' ' );
                    
                    //test if output is what we expect
                    fixture.output = fixture.output.toString();
                    output = output.data;
                    var theyMatch = fixture.output == output;
                    if (!theyMatch) fixtures.util.displayDiff(fixture.output,output);
                    hoek.assert(theyMatch, 'Mismatch output generator.renderModelIndex() for fixture test: ' + fixture.name + '\n');
                    
                    fixtureDone();
                });
            }, function(err) {
                done();
            });
        })
    })
    
    
    suite('renderModel', function() {
        setup(function(done) {
            fixtures.generator.initModel(function() {
                done();
            });
        });
        test('should match expected output fixtures', function(done) {
            //fixtures.generator.model is an array of {name, input, output}
            hoek.assert(fixtures.generator.model.length > 0, 'No renderModel fixtures exist.');
            async.each(fixtures.generator.model, function(fixture, fixtureDone) {
                generator.renderModel(fixture.input, function(err, output) {
                    hoek.assert(err === null, 'Error from generator.renderModel() for fixture test: ' + fixture.name + ' ' );
                    hoek.assert(output.length == 1, 'Length of output expected to equal 1');
                    
                    //test if output is what we expect
                    fixture.output = fixture.output.toString();
                    output = output[0].data;
                    var theyMatch = fixture.output == output;
                    if (!theyMatch) fixtures.util.displayDiff(fixture.output,output);
                    hoek.assert(theyMatch, 'Mismatch output generator.renderModel() for fixture test: ' + fixture.name + '\n');
                    
                    fixtureDone();
                });
            }, function(err) {
                done();
            });
        })
    })
})