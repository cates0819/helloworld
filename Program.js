function Program(name,id){
  this.name = name;
  this.id = id;
  this.details = "Here are details about the program."; //A more detailed explination of the program
  this.targets = [];
  this.targetnum = 0;
  this.resultNames = [];
  //this.resultCount = [];
  //this.numdays = 0;
  //this.lasttested=0;
}

Program.prototype.getTargets = function(){
  for (var j=0;j<10;j++){
    var targ = new Target("Target " +j, j);
    this.targets.push(targ);
  }
};

Program.prototype.countResult = function(n, m){
  this.targets[n].countResult(m);
};

Program.prototype.addResult = function(name){
  this.resultNames.push(name);
  for (var i=0;i<this.targets.length;i++){
    this.targets[i].resultCount.push(0);
  }
  //this.resultCount.push(0);
};

Program.prototype.endDay = function(){
  for (var i = 0; i<this.targets.length; i++){
    this.targets[i].endDay();
  }
};