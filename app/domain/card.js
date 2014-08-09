module.exports.Card = Card = function(pFamily, pValue){
  this.family = pFamily;
  this.value = pValue;

  this.getFamily = function(){
    return this.family;
  };

  this.getValue = function(){
    return this.value;
  };
};