var mainPage = document.querySelector('#mainpage');

var sessionPage = document.createElement("section");

var behaviorPage = document.createElement("section");

var loginPage = document.createElement("section");

var actionText = document.createElement("section");

var client;

var bTech;

var myclock;

var clientDB;


window.onload = initiateSession;

function endSession(e){
  actionText.innerHTML = "Ended session with " + client.name + "<br />";
  client.endDay();
  showlogin();
  
  window.alert('test');
  //clientDB = openDatabase('clients','1.0','BCBA Client Data', 65536);
  
  sessionPage.innerHTML = "";
  actionText.innerHTML = actionText.innerHTML + "Behavior Totals: <br />";
  for (var i=0;i<client.behaviors.length;i++){
    var beh = client.behaviors[i];
    if (beh.count>0){
      actionText.innerHTML = actionText.innerHTML + beh.name + " ocurred " + beh.count + " times ";
      if (beh.startTime>0){
        var s = 0;
        for (var j=0;j<beh.duration.length;j++){
          s = s + beh.duration[j][0];
        }
        s = s/1000;
        s = Math.floor(s);
        var m = 0;
        if (s>59){
          m = s/60;
          m = Math.floor(m);
          s = s%60;
        }
        actionText.innerHTML = actionText.innerHTML + "for a total of ";
        if (m>0){
          actionText.innerHTML = actionText.innerHTML + m + " min and ";
        }
        actionText.innerHTML = actionText.innerHTML + s + " sec";
      }
      actionText.innerHTML = actionText.innerHTML + "<br />";
    }
  }
  actionText.innerHTML = actionText.innerHTML + "Program Totals<br />";
  for (var i=0;i<client.programs.length;i++){
    actionText.innerHTML = actionText.innerHTML + client.programs[i].name + ":<br />";
    for (var j=0;j<client.programs[i].targets.length;j++){
      var tot = 0;
      for (var k=0;k<client.programs[i].resultNames.length;k++){
        tot = tot + client.programs[i].targets[j].resultCount[k];
      }
      if (tot>0){
        actionText.innerHTML = actionText.innerHTML+client.programs[i].targets[j].name + ", ";
        for (var k=0;k<client.programs[i].resultNames.length;k++){
          actionText.innerHTML = actionText.innerHTML+client.programs[i].resultNames[k]+" "+client.programs[i].targets[j].resultCount[k]+", ";
        }
        actionText.innerHTML = actionText.innerHTML+"<br />";
      }
    }
  }
}

function behaviorOver(e){
  if (!e) var e = window.event;
  //e refers to the event
  
  var targ;
  if (e.target) targ = e.target;
	else if (e.srcElement) targ = e.srcElement;
	if (targ.nodeType == 3) // defeat Safari bug
		targ = targ.parentNode;
	
	targ.style.display = 'none';
  
  var beh = client.behaviors[client.activeBehavior];
  if (beh.startTime>0){
    clearInterval(myclock);
  }
  var butns = document.getElementsByTagName("Button");
  butns[beh.ant].style.backgroundColor = '';
  butns[parseInt(beh.cons)+8].style.backgroundColor = '';
  client.endBehavior();
  actionText.innerHTML = "Behavior Ended: " + beh.name + "<br />";
  if (beh.startTime>0){
    var s = beh.duration[beh.duration.length-1][0];
    var m =0;
    s = s/1000;
    s = Math.floor(s);
    if (s >59){
      m = s/60;
      m = Math.floor(m);
      s = s%60;
      actionText.innerHTML = actionText.innerHTML + "Total Time: " + m + " min " + s + " sec <br />";
    }else{
      actionText.innerHTML = actionText.innerHTML + "Total Time: " + s + " sec <br />";
    }
  }
  actionText.innerHTML = actionText.innerHTML + "Numer of Occurrances: " + beh.count + "<br />";
  actionText.innerHTML = actionText.innerHTML + "Antecedant: " + butns[beh.duration[beh.duration.length-1][1]].innerHTML + "<br />";
  actionText.innerHTML = actionText.innerHTML + "Consequence: " + butns[parseInt(beh.duration[beh.duration.length-1][2])+8].innerHTML + "<br />";
  showSession();
}

function setCons(e){
  if (!e) var e = window.event;
  //e refers to the event
  
  var targ;
  if (e.target) targ = e.target;
	else if (e.srcElement) targ = e.srcElement;
	if (targ.nodeType == 3) // defeat Safari bug
		targ = targ.parentNode;
	
	
	var beh = client.behaviors[client.activeBehavior];	
	if (beh.cons == targ.id){
	  targ.style.backgroundColor = '#D0D3D4';
	  beh.cons = -1;
	  targ.content.style.display = "none";
	}else{
	  if (beh.cons>-1){
	    var butns = document.getElementsByTagName("Button");
	    //var num = parseInt(beh.cons) + 8;
	    //actionText.innerHTML = num;
	    butns[parseInt(beh.cons) + 8].style.backgroundColor = '';
	  }
	  targ.style.backgroundColor = '#58D68D';
	  beh.cons = targ.id;
	  if (beh.ant>-1){
	    targ.content.style.display = "block";
	  }
	}
}

function setAnt(e){
  if (!e) var e = window.event;
  //e refers to the event
  
  var targ;
  if (e.target) targ = e.target;
	else if (e.srcElement) targ = e.srcElement;
	if (targ.nodeType == 3) // defeat Safari bug
		targ = targ.parentNode;
	
	var beh = client.behaviors[client.activeBehavior];
	if (beh.ant == targ.id){
	  targ.style.backgroundColor = '#D0D3D4';
	  beh.ant = -1;
	  targ.content.style.display = "none";
	}else{
	  if(beh.ant>-1){
	    var butns = document.getElementsByTagName("Button");
	    butns[beh.ant].style.backgroundColor = '';
	  }
	  targ.style.backgroundColor = '#58D68D';
	  beh.ant = targ.id;
	  if (beh.cons>-1){
	    targ.content.style.display = "block";
	  }
	} 
	
}

function behaviorClock(){
  var beh = client.behaviors[client.activeBehavior];
  var s = new Date().getTime();
  s= s-client.behaviors[client.activeBehavior].startTime;
  s = s/1000;
  s = Math.floor(s);
  var m = 0;
  if (s>59){
    m = s/60;
    m = Math.floor(m);
    s = s%60;
  }
  actionText.innerHTML = "Number of occurrences: " + beh.count + "<br />";
  if (m>0){
    actionText.innerHTML = actionText.innerHTML + 'Duration: ' + m + ' min ' + s + ' sec<br />';
  }else{
    actionText.innerHTML = actionText.innerHTML + 'Duration: ' + s + ' sec <br />';
  }
  actionText.innerHTML = actionText.innerHTML + "Started Behavior: " + beh.name;
}

function setBehavior(e){
  if (!e) var e = window.event;
  //e refers to the event
  
  var targ;
  if (e.target) targ = e.target;
	else if (e.srcElement) targ = e.srcElement;
	if (targ.nodeType == 3) // defeat Safari bug
		targ = targ.parentNode;
  
  document.getElementsByTagName("Button")[1].content.style.display = "none";
  
  showBehavior();
  client.startBehavior(targ.id);
  var beh = client.behaviors[client.activeBehavior];
  targ.innerHTML = beh.name + " (" + beh.count +")";
  if (beh.startTime>0){
    actionText.innerHTML = "Number of occurrences: " + beh.count + "<br />";
    actionText.innerHTML = actionText.innerHTML + 'Duration: 0 sec <br />';
    actionText.innerHTML = actionText.innerHTML + "Started Behavior: " + beh.name;
    myclock = setInterval(behaviorClock,1000);
  }else{
    actionText.innerHTML = "Number of occurrences: " + beh.count + "<br />";
    actionText.innerHTML = actionText.innerHTML + "Started Behavior: " + beh.name;
  }
}

function behaviorList(){
  var dropcontent = document.createElement("div");
  dropcontent.style = "display:none;position:absolute";
  //dropcontent.innerHTML = client.behaviors.length;
  for (var i=0;i<client.behaviors.length;i++){
    var btn = document.createElement("Button");
    dropcontent.appendChild(btn);
    btn.onmouseenter = onhover;
    btn.onmouseout = offhover;
    btn.style = "display: block";
    btn.id = i;
    btn.innerHTML = client.behaviors[i].name + " (" + client.behaviors[i].count + ")";
    btn.style = "font-size: 20px; width:150px; display:block; box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2)";
    btn.onclick = setBehavior;
  }
  return dropcontent;
}

function createBehaviorPage(){
  var hdr3 = document.createElement("h1");
  hdr3.innerHTML = "BTforMe";
  hdr3.style = "margin:auto; display:block; width:100%";
  hdr3.align = "center";
  behaviorPage.appendChild(hdr3);
  
  var ant = document.createElement("section");
  ant.style = "width:50%; float:left";
  behaviorPage.appendChild(ant);
  
  var hdr4 = document.createElement("h1");
  hdr4.innerHTML = "Choose Antecendent";
  ant.appendChild(hdr4);
  
  var stopbtn = document.createElement("Button");
  
  var antbuttons = [];
  for (i=0;i<8;i++){
    var butn = document.createElement("Button");
    ant.appendChild(butn);
    butn.onmouseenter = onhover;
    butn.onmouseout = offhover;
    butn.content = stopbtn;
    butn.onclick = setAnt;
    butn.id = i;
    butn.style = "width:90%;margin-bottom:10px";
    antbuttons.push(butn);
  }
  antbuttons[0].innerHTML = "Interruption or Transition";
  antbuttons[1].innerHTML = "Access Denied";
  antbuttons[2].innerHTML = "Wants Something";
  antbuttons[3].innerHTML = "Sensory Reinforcement is Valuable";
  antbuttons[4].innerHTML = "Demand at Table";
  antbuttons[5].innerHTML = "Demand in NET";
  antbuttons[6].innerHTML = "Unclear or Out of the Blue";
  antbuttons[7].innerHTML = "Other";
  
  var cons = document.createElement("section");
  cons.style = "width:50%: float:right";
  behaviorPage.appendChild(cons);
  
  var hdr5 = document.createElement("h1");
  hdr5.innerHTML = "Choose Consequence";
  cons.appendChild(hdr5);
  
  var consbuttons = [];
  for (i=0;i<7;i++){
    var butn = document.createElement("Button");
    cons.appendChild(butn);
    butn.onmouseenter = onhover;
    butn.onmouseout = offhover;
    butn.content = stopbtn;
    butn.onclick = setCons;
    butn.id = i;
    butn.style = "width:45%; margin-bottom:10px";
    consbuttons.push(butn);
  }
  consbuttons[0].innerHTML = "Physically Guide to Comply";
  consbuttons[1].innerHTML = "Ignored Problem or Behavior";
  consbuttons[2].innerHTML = "Count and Mand Procedure";
  consbuttons[3].innerHTML = "Block Access to Reinforcement";
  consbuttons[4].innerHTML = "Deny Access to Reinforcer and Physically Guide to Comply with Demand";
  consbuttons[5].innerHTML = "Escape Extinction";
  consbuttons[6].innerHTML = "Other";
  
  stopbtn.style = "width:150px; margin:auto; display:none; margin-top:50px;font-size:20px";
  stopbtn.innerHTML = "Behavior Over";
  stopbtn.onmouseenter = onhover;
  stopbtn.onmouseout = offhover;
  stopbtn.onclick = behaviorOver;
  behaviorPage.appendChild(stopbtn);
}

function setProgResult(e){
  if (!e) var e = window.event;
  //e refers to the event
  
  var targ;
  if (e.target) targ = e.target;
	else if (e.srcElement) targ = e.srcElement;
	if (targ.nodeType == 3) // defeat Safari bug
		targ = targ.parentNode;
		
	var prog = client.programs[targ.progId];
	var targ1 = prog.targets[targ.targId];
	prog.countResult(targ.targId, targ.id);
	targ.innerHTML = prog.resultNames[targ.id] + " (" + targ1.resultCount[targ.id] + ")";
	actionText.innerHTML = "Program Tested : " + prog.name + "<br />";
	actionText.innerHTML = actionText.innerHTML + "Target Tested: " + targ1.name + "<br />";
	var tot = 0;
	for (var i=0;i<targ1.resultCount.length;i++){
	  actionText.innerHTML = actionText.innerHTML + "Total " + prog.resultNames[i] + ": " + targ1.resultCount[i] + "<br />";
	  tot = tot + targ1.resultCount[i];
	}
	actionText.innerHTML = actionText.innerHTML + "Total Attempts: " + tot;
	if (tot > 4){
	  var targdiv = targ1.targdiv;
	  targdiv.style.backgroundColor = '#FF0000';
    targdiv.style.color = '#CCCCFF';
	}
	else if (tot >3){
	  var targdiv = targ1.targdiv;
	  targdiv.style.backgroundColor = '#FFD700';
    targdiv.style.color = '#2F4F4F';
	}
	
}

function programHover(e){
  if (!e) var e = window.event;
  //e refers to the event
  
  var targ;
  if (e.target) targ = e.target;
	else if (e.srcElement) targ = e.srcElement;
	if (targ.nodeType == 3) // defeat Safari bug
		targ = targ.parentNode;
		
	
}

function setClient(e){
  if (!e) var e = window.event;
  //e refers to the event
  
  var targ;
  if (e.target) targ = e.target;
	else if (e.srcElement) targ = e.srcElement;
	if (targ.nodeType == 3) // defeat Safari bug
		targ = targ.parentNode;
	
	var allbtns = document.getElementsByTagName("Button");
	var btbtns = allbtns[0].content.getElementsByTagName("Button");
	allbtns[btbtns.length+1].content.style.display = "none";
	allbtns[btbtns.length+1].style.display = "none";
	allbtns[0].style.display = "block";
	
	client = new Patient(targ.name,targ.id);
	client.getBehaviors();
	actionText.innerHTML = "Started session with " + client.name;
	
	var hdr2 = document.createElement("h1");
  hdr2.innerHTML = "BTforMe";
  hdr2.align = "center";
  
  btn3 = document.createElement("Button");
  btn3.innerHTML = "End Session";
  btn3.style = "float:right; font-size:20px; width: 150px";
  btn3.onmouseenter = onhover;
  btn3.onmouseout = offhover;
  btn3.onclick = endSession;
  hdr2.appendChild(btn3);
  
  btn4 = document.createElement("Button");
  btn4.innerHTML = "Start Behavior";
  btn4.style = "float:left; font-size:20px; width 150px";
  btn4.onmouseenter = onhover;
  btn4.onmouseout = offhover;
  btn4.onclick = dropdownClick;
  btn4.content = behaviorList();
  hdr2.appendChild(btn4);
  hdr2.appendChild(btn4.content);
  
  sessionPage.appendChild(hdr2);
  
  var hdr3 = document.createElement("h1");
  hdr3.innerHTML = "Programs";
  hdr3.align = "center";
  sessionPage.appendChild(hdr3);
  
  client.getPrograms();
  client.programs[1].targets[0].lasttested = 1;
  
  for (var i=0;i<client.programs.length;i++){
    var progdiv = document.createElement("div");
    progdiv.style = "width:50%; float: left";
    //progdiv.onmouseover = onhover;
    //progdiv.onmouseout = offhover;
    
    var prog = client.programs[i];
    
    sessionPage.appendChild(progdiv);
    var hdr4 = document.createElement("h1");
    hdr4.innerHTML = client.programs[i].name;
    progdiv.appendChild(hdr4);
    
    var progdet = document.createElement("div");
    //progdet.innerHTML = prog.details;
    //progdet.style = "display:none; position: absolute; width:25%";
    //progdet.style.backgroundColor = '#ffCC99';
    //progdet.style.color = '#000033';
    //progdiv.content = progdet;
    progdet.style = "float:right; margin-right: 20px; width: 40%";
    hdr4.appendChild(progdet);
    
    var btn = document.createElement("Button");
    btn.innerHTML = "See Details >>";
    btn.onclick = dropdownClick;
    btn.onmouseenter = onhover;
    btn.onmouseout = offhover;
    btn.style = "margin-left:20px";
    progdet.appendChild(btn);
    
    var progcontent = document.createElement("div");
    progcontent.innerHTML = prog.details;
    progcontent.style = "display: none; position: absolute; font-size: 15px; font-weight: normal; float: left";
    progcontent.style.backgroundColor = '#ffCC99';
    progcontent.style.color = '#000033';
    progdet.appendChild(progcontent);
    btn.content = progcontent;
    
    var targcount = 0;
    var j = 0;
    while (j<prog.targets.length){
      var targ1 = prog.targets[j];
      if ((targ1.lasttested>0) && (targ1.numdays < 4)){
        var d = new Date().getTime();
        d = d-targ1.lasttested;
        d= d/1000; //msec to sec
        d= d/60; // sec to min
        d = d/60; //min to hr
        d = d/24; //hr to days
        if (d>6.5){
          var targdiv = targ1.targdiv;
          progdiv.appendChild(targdiv);
          targdiv.innerHTML = targ1.name;
          targdiv.style = "margin-top: 10px";
          targdiv.style.backgroundColor = '#33CC33';
          targdiv.style.color = '#000033';
          for (var k=0;k<prog.resultNames.length;k++){
            var targBtn = document.createElement("Button");
            targBtn.innerHTML = prog.resultNames[k] + " (" + targ1.resultCount[k] + ")";
            targBtn.style = "margin-left: 10px";
            targdiv.appendChild(targBtn);
            targBtn.onmouseenter = onhover;
            targBtn.onmouseout = offhover;
            targBtn.onclick = setProgResult;
            targBtn.progId = prog.id;
            targBtn.targId = targ1.id;
            targBtn.id = k;
          }
        }
      }
      j++;
    }
    
    j=0;
    while ((j<prog.targets.length) && (targcount< prog.targetnum)){
      var targ1 = prog.targets[j];
      if (targ1.lasttested==0){
        var targdiv = targ1.targdiv;
        progdiv.appendChild(targdiv);
        targdiv.innerHTML = targ1.name;
        targdiv.style = "margin-top: 10px";
        for (var k=0;k<prog.resultNames.length;k++){
          var targBtn = document.createElement("Button");
          targBtn.innerHTML = prog.resultNames[k] + " (" + targ1.resultCount[k] + ")";
          targBtn.style = "margin-left: 10px";
          targdiv.appendChild(targBtn);
          targBtn.onmouseenter = onhover;
          targBtn.onmouseout = offhover;
          targBtn.onclick = setProgResult;
          targBtn.progId = prog.id;
          targBtn.targId = targ1.id;
          targBtn.id = k;
        }
        targcount++;
      }
      j++;
    }
  }
	
	showSession();
	createBehaviorPage();
}

function setBT(e){
  if (!e) var e = window.event;
  //e refers to the event
  
  var targ;
  if (e.target) targ = e.target;
	else if (e.srcElement) targ = e.srcElement;
	if (targ.nodeType == 3) // defeat Safari bug
		targ = targ.parentNode;
	
	var allbtns = document.getElementsByTagName("Button");
	var btbtns = allbtns[0].content.getElementsByTagName("Button");
	allbtns[0].content.style.display = "none";
	allbtns[0].style.display = "none";
	var btn = allbtns[btbtns.length+1];
	btn.style.display = "block";
	
	bTech = new BehaviorTech(targ.innerHTML,targ.id);
	
	btn.content = bTech.clientList();
	loginPage.appendChild(btn.content);
  actionText.innerHTML = "Therapist Set: " + bTech.name;
}

function BTList(){
  
  var dropcontent = document.createElement("div");
  dropcontent.style = "display:none;position:absolute; margin-left: auto; margin-right: auto; left:0; right: 0";
  
  for (var i=0;i<3;i++){
    var btn = document.createElement("Button");
    dropcontent.appendChild(btn);
    btn.onmouseenter = onhover;
    btn.onmouseout = offhover;
    btn.id = i;
    btn.name = "Behavior Tech " + i;
    btn.innerHTML = btn.name;
    btn.style = "font-size: 15px; width:150px; margin: auto; display:block; box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2)";
    btn.onclick = setBT;
  }
  
  //var txtFile = "assets/sessionSetup/clientList.txt";
  //var file = new File(txtFile);
  
  return dropcontent;
}

function initiateSession(){
  mainPage.style.backgroundColor = '#2F4F4F';
  mainPage.style.color = '#FFD700';
  
  var hdr1 = document.createElement("h1");
  hdr1.innerHTML = "Welcome to BTforMe!\n";
  var pic = document.createElement("img");
  pic.src = "assets/puzzle.jpeg";
  pic.height = 400;
  pic.width = 400;
  
  var dropdiv = document.createElement("div");
  var dropbtn = document.createElement("Button");
  dropbtn.innerHTML = "Behavior Tech";
  dropbtn.onmouseenter = onhover;
  dropbtn.onmouseout = offhover;
  dropbtn.style = "font-size: 20px; width:150px; margin:auto; display: block";
  dropdiv.appendChild(dropbtn);
  dropbtn.onclick = dropdownClick;
  dropbtn.content = BTList();
  dropdiv.appendChild(dropbtn.content);
  loginPage.appendChild(hdr1);
  loginPage.appendChild(pic);
  loginPage.appendChild(dropdiv);
  
  var dropdiv2 = document.createElement("div");
  var dropbtn2 = document.createElement("Button");
  dropbtn2.innerHTML = "Client";
  dropbtn2.onmouseenter = onhover;
  dropbtn2.onmouseout = offhover;
  dropbtn2.style = "font-size: 20px; width:150px; margin:auto; display: none";
  dropdiv2.appendChild(dropbtn2);
  dropbtn2.onclick = dropdownClick;
  dropbtn2.content = document.createElement("div");
  loginPage.appendChild(dropdiv2);
  dropdiv2.appendChild(dropbtn2.content);
  
  actionText.style = "float:left; display:block; width: 100%";
  
  showlogin();
}

function showSession(){
  mainPage.innerHTML = "";
  mainPage.appendChild(sessionPage);
  mainPage.appendChild(actionText);
}

function showBehavior(){
  mainPage.innerHTML = "";
  mainPage.appendChild(behaviorPage);
  mainPage.appendChild(actionText);
}

function showlogin(){
  mainPage.innerHTML = "";
  mainPage.appendChild(loginPage);
  mainPage.appendChild(actionText);
}
