function Target(name,id){
  this.name = name;
  this.id = id;
  this.resultCount = [];
  this.numdays = 0;
  this.lasttested=0;
  this.targdiv = document.createElement("div");
}

Target.prototype.countResult = function(i){
  this.resultCount[i] = this.resultCount[i]+1;
};

Target.prototype.endDay = function(){
  var total=0;
  
  for (var j=0; j<this.resultCount.length; j++){
    total = total + this.resultCount[j];
  }
  if((total > 3) && (this.resultCount[0]/total >= 0.8)){
    this.numdays++;
  }else{
    this.numdays = 0;
  }
  if (this.numdays>2){
    this.lasttested= new Date().getTime();
  }
};