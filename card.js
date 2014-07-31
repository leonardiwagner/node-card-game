Card = function(pFamily, pValue){
  this.family = pFamily;
  this.value = pValue;

  getFamily = function(){
    return this.family;
  };

  getValue = function(){
    return this.value;
  };
};