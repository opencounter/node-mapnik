"use strict";

var mapnik = require('../');
var assert = require('assert');
var exists = require('fs').existsSync || require('path').existsSync;
var helper = require('./support/helper');
var path = require('path');

mapnik.register_datasource(path.join(mapnik.settings.paths.input_plugins,'shape.input'));

describe('mapnik sync rendering ', function() {
    it('should render to a file', function() {
        var map = new mapnik.Map(256, 256);
        map.loadSync('./test/stylesheet.xml');
        map.zoomAll();
        var filename = helper.filename();

        // Test some bad parameter passings
        assert.throws(function() { map.renderFileSync(); });
        assert.throws(function() { map.renderFileSync(1); });
        assert.throws(function() { map.renderFileSync(filename, null); });
        assert.throws(function() { map.renderFileSync(filename, {format:null}); });
        assert.throws(function() { map.renderFileSync(filename, {palette:null}); });
        assert.throws(function() { map.renderFileSync(filename, {palette:{}}); });
        assert.throws(function() { map.renderFileSync(filename, {palette:{}}); });
        assert.throws(function() { map.renderFileSync(filename, {scale:null}); });
        assert.throws(function() { map.renderFileSync(filename, {scale_denominator:null}); });
        assert.throws(function() { map.renderFileSync(filename, {buffer_size:null}); });

        map.renderFileSync(filename);
        assert.ok(exists(filename));
    });
    
    it('should render to a file - empty format', function() {
        var map = new mapnik.Map(256, 256);
        map.loadSync('./test/stylesheet.xml');
        map.zoomAll();
        var filename = helper.filename();
        map.renderFileSync(filename, {format:''});
        assert.ok(exists(filename));
    });
    
    it('should render to a file - tiff', function() {
        var map = new mapnik.Map(256, 256);
        map.loadSync('./test/stylesheet.xml');
        map.zoomAll();
        var filename = helper.filename();
        map.renderFileSync(filename, {format:'tiff'});
        assert.ok(exists(filename));
    });
    
    it('should render to a file - pdf', function() {
        var map = new mapnik.Map(256, 256);
        map.loadSync('./test/stylesheet.xml');
        map.zoomAll();
        var filename = helper.filename();
        map.renderFileSync(filename, {format:'pdf'});
        assert.ok(exists(filename));
    });
    
    it('should render to a file - scale', function() {
        var map = new mapnik.Map(256, 256);
        map.loadSync('./test/stylesheet.xml');
        map.zoomAll();
        var filename = helper.filename();
        map.renderFileSync(filename, {scale:2});
        assert.ok(exists(filename));
    });
    
    it('should render to a file - scale_denominator', function() {
        var map = new mapnik.Map(256, 256);
        map.loadSync('./test/stylesheet.xml');
        map.zoomAll();
        var filename = helper.filename();
        map.renderFileSync(filename, {scale_denominator:2});
        assert.ok(exists(filename));
    });
    
    it('should render to a file - buffer_size', function() {
        var map = new mapnik.Map(256, 256);
        map.loadSync('./test/stylesheet.xml');
        map.zoomAll();
        var filename = helper.filename();
        map.renderFileSync(filename, {buffer_size:2});
        assert.ok(exists(filename));
    });
    
    it('should render to a file - zoom to box', function() {
        var map = new mapnik.Map(256, 256);
        map.loadSync('./test/stylesheet.xml');
        assert.throws(function() { map.zoomToBox(1); });
        assert.throws(function() { map.zoomToBox('1',2,3,4); });
        map.zoomToBox([10,10,11,11]);
        map.zoomToBox(10,10,11,11);
        var filename = helper.filename();
        map.renderFileSync(filename);
        assert.ok(exists(filename));
    });
    
    it('should fail to zoomAll properly - throwing exception', function() {
        var map = new mapnik.Map(256, 256);
        map.loadSync('./test/stylesheet.xml');
        var layer = map.layers();
        map.srs = 'pie';
        layer[0].srs = 'pizza';
        assert.throws(function() { map.zoomAll(); });
    });
});
