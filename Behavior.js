function Behavior(name, trackDur, id){
  this.name = name;
  this.id = id;
  this.duration = [];
  this.count = 0;
  this.startTime = trackDur;
  //this.totTime = 0;
  this.ant = -1;
  this.cons = -1;
}

Behavior.prototype.startBehavior = function(){
  if (this.startTime>0){
    this.startTime = new Date().getTime();
  } 
  this.count++;
};

Behavior.prototype.endBehavior = function(){
  if (this.startTime>0){
    this.duration.push([new Date().getTime()-this.startTime,this.ant,this.cons]);
  }else{
    this.duration.push([0,this.ant,this.cons]);
  }
  this.ant = -1;
  this.cons = -1;
};

Behavior.prototype.endDay = function(){
  for (var i=0;i<this.duration.length;i++){
    //this.totTime = duration[i][0]+this.totTime;
  }
};