function BehaviorTech(name, id){
  this.name = name;
  this.id = id;
}

BehaviorTech.prototype.clientList = function(){
  var dropcontent = document.createElement("div");
  dropcontent.style = "display:none;position:absolute; margin-left: auto; margin-right: auto; left:0; right: 0";
  
  for (i=0;i<3;i++){
    var btn = document.createElement("Button");
    dropcontent.appendChild(btn);
    btn.onmouseenter = onhover;
    btn.onmouseout = offhover;
    btn.id = i;
    btn.name = "Name " + i;
    btn.innerHTML = btn.name;
    btn.style = "font-size: 15px; width:150px; margin: auto; display:block; box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2)";
    btn.onclick = setClient;
  }
  
  //var txtFile = "assets/sessionSetup/clientList.txt";
  //var file = new File(txtFile);
  
  return dropcontent;
};