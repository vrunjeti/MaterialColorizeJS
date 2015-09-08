var chai = require('chai');
var expect = chai.expect;
var mc = require('../lib/funcs');

describe('Material Colorize', function() {
  describe('#approximateColor', function(){
    it('should return 000000 when given 000000', function() {
      expect(mc.approximateColor('000000')).to.equal('000000');
    });
    it('should return ffffff when given ffffff', function() {
      expect(mc.approximateColor('ffffff')).to.equal('ffffff');
    });
    it('should return F44336 when given F44336', function() {
      expect(mc.approximateColor('F44336')).to.equal('F44336');
    });
    it('should return E91E63 when given E91E61', function() {
      expect(mc.approximateColor('E91E61')).to.equal('E91E63');
    });
    it('should return 9575CD when given 9575C8 and refine', function() {
      expect(mc.approximateColor('9575C8', true)).to.equal('9575CD');
    });
    it('should return 00838F when given 00838A and refine', function() {
      expect(mc.approximateColor('00838A', true)).to.equal('00838F');
    });
  });
  describe('#approximateColorN', function(){
    it('should return 000000 when given 000000', function() {
      expect(mc.approximateColorN('000000')).to.equal('000000');
    });
    it('should return ffffff when given ffffff', function() {
      expect(mc.approximateColorN('ffffff')).to.equal('ffffff');
    });
    it('should return F44336 when given F44336', function() {
      expect(mc.approximateColorN('F44336')).to.equal('F44336');
    });
    it('should return E91E63 when given E91E61', function() {
      expect(mc.approximateColorN('E91E61')).to.equal('E91E63');
    });
    it('should return 9575CD when given 9575C8', function() {
      expect(mc.approximateColorN('9575C8')).to.equal('9575CD');
    });
    it('should return 00838F when given 00838A', function() {
      expect(mc.approximateColorN('00838A')).to.equal('00838F');
    });
  });
  describe('#getRed', function(){
    it('should return 0xF1 when given F1A34B', function() {
      expect(mc.getRed(0xF1A34B)).to.equal(0xF1);
    });
    it('should return 0x12 when given 123121', function() {
      expect(mc.getRed(0x123121)).to.equal(0x12);
    });
  });
  describe('#getGreen', function(){
    it('should return 0xA3 when given F1A34B', function() {
      expect(mc.getGreen(0xF1A34B)).to.equal(0xA3);
    });
    it('should return 0x31 when given 123121', function() {
      expect(mc.getGreen(0x123121)).to.equal(0x31);
    });
  });
  describe('#getBlue', function(){
    it('should return 0x4B when given F1A34B', function() {
      expect(mc.getBlue(0xF1A34B)).to.equal(0x4B);
    });
    it('should return 0x21 when given 123121', function() {
      expect(mc.getBlue(0x123121)).to.equal(0x21);
    });
  });
});