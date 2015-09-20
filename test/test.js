var chai = require('chai');
var expect = chai.expect;
var mc = require('../lib/funcs');

describe('Material Colorize', function() {
  describe('#approximateColor', function(){
    it('should return 000000 when given 000000', function() {
      expect(mc.approximateColor('000000')).to.equal('000000');
    });
    it('should return FFFFFF when given FFFFFF', function() {
      expect(mc.approximateColor('FFFFFF')).to.equal('FFFFFF');
    });
    it('should return F44336 when given F44336', function() {
      expect(mc.approximateColor('F44336')).to.equal('F44336');
    });
    it('should return E91E63 when given E91E61', function() {
      expect(mc.approximateColor('E91E61')).to.equal('E91E63');
    });
    it('should return 9575CD when given 9575C8', function() {
      expect(mc.approximateColor('9575C8')).to.equal('9575CD');
    });
    it('should return 00838F when given 00838A', function() {
      expect(mc.approximateColor('00838A')).to.equal('00838F');
    });
  });
  describe('#getColorFamily', function(){
    it('should return red palette when given F44335', function() {
      var palette = mc.getColorFamily('F44335');
      expect(palette[400]).to.equal('EF5350');
    });
    it('should return light blue palette when given 0288D1', function() {
      var palette = mc.getColorFamily('0288D1');
      expect(palette[400]).to.equal('29B6FC');
    });
    it('should return blue gray palette when given 263238', function() {
      var palette = mc.getColorFamily('263238');
      expect(palette[400]).to.equal('78909C');
    });
    it('should return black and white when given 000000', function() {
      var result = mc.getColorFamily('000000');
      expect(result.Black).to.equal('000000');
      expect(result.White).to.equal('FFFFFF');
    });
    it('should return black and white when given FFFFFF', function() {
      var result = mc.getColorFamily('FFFFFF');
      expect(result.Black).to.equal('000000');
      expect(result.White).to.equal('FFFFFF');
    });
  });
});