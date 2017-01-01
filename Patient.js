function Patient(name, id){
  this.name = name;
  this.id = id;
  this.behaviors = [];
  this.programs = [];
  this.totTime = new Date().getTime();
  this.activeBehavior = -1;
}

Patient.prototype.startBehavior = function(id){
  this.activeBehavior = id;
  this.behaviors[this.activeBehavior].startBehavior();
};

Patient.prototype.endBehavior = function(){
  this.behaviors[this.activeBehavior].endBehavior();
  this.activeBehavior = -1;
};

Patient.prototype.getPrograms = function(){
  for (var i=0;i<4;i++){
    var prog = new Program("Program " + i, i);
    this.programs.push(prog);
    prog.getTargets();
    prog.targetnum = 5;
    prog.addResult("Correct");
    prog.addResult("Incorrect");
    prog.addResult("Prompted");
    //prog.details = "This is where you can put in a lot more details about the program";
  }
};

Patient.prototype.getBehaviors = function(){
  for (var i=0;i<5;i++){
    var bool = ((i+2)%2);
    this.behaviors.push(new Behavior("Behavior " + i,bool, i));
  }
};

Patient.prototype.endDay = function(){
  this.totTime = new Date().getTime() - this.totTime;
  for (var i=0; i<this.programs.length; i++){
    this.programs[i].endDay();
  }
};