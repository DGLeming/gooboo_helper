function calculateOvergrowth () {
	percent = document.getElementById("overgrowth_percent").value;
	cycles = document.getElementById("cycles").value;
	hours = document.getElementById("grow_hours").value;
	mins = document.getElementById("gorw_minutes").value;
	defaultGrowthTime = hours*60+mins;
	growTimeWithBonuses = defaultGrowthTime;
	fertiliserUsed = document.getElementById("fertiliserUsed").checked;
	sprinklerUsed = document.getElementById("sprinklerUsed").checked;
	if(fertiliserUsed)
		fertiliserMultiplier = 1/1.75;
	else fertiliserMultiplier = 1;
	if(sprinklerUsed)
		sprinklerMultipler = 1/2;
	else sprinklerMultipler = 1;

	overgrowthMultiplier = 1/percent*100+1;
	cyclesTime = [];
	cyclesTime.push(Math.ceil(Math.round(defaultGrowthTime*fertiliserMultiplier)*sprinklerMultipler));
	currentGrowthTime = defaultGrowthTime;
	for(i=0; i < cycles-1; i++){
		currentGrowthTime = Math.ceil(Math.round(defaultGrowthTime*Math.pow(overgrowthMultiplier,i+1)*fertiliserMultiplier)*sprinklerMultipler);
		cyclesTime.push(currentGrowthTime+cyclesTime[i]);
	}
	var parent = document.getElementById('result_block');
	var delChild = parent.lastChild;
	while (delChild) {
		parent.removeChild(delChild);
		delChild = parent.lastChild;
	}

	for(i=0; i < cyclesTime.length; i++){
		var block = document.createElement('h5');
		block.setAttribute('class', 'result text');

		if(cyclesTime[i] < 1440){
			if(cyclesTime[i] < 60) {
				block.innerHTML = 'Harverst #'+(i+1)+': '+cyclesTime[i]+' mins';
			} else {
				hours = Math.floor(cyclesTime[i]/60);
				mins = cyclesTime[i]-hours*60;
				block.innerHTML = 'Harverst #'+(i+1)+': '+hours+' hours '+mins+' mins';
			}
		} else {
			days = Math.floor(cyclesTime[i]/1440);
			hours = Math.floor((cyclesTime[i]-days*1440)/60);
			mins = cyclesTime[i]-hours*60-days*1440;
			block.innerHTML = 'Harverst #'+(i+1)+': '+days+' days '+hours+' hours '+mins+' mins';
		}
			
		document.getElementById('result_block').appendChild(block);
	}
}

function switchFaithData (ttype) {
	if(ttype == "Manual"){
		document.getElementById("manual-data").style.display = "block";
		$("#manual-data-button").addClass("btn-outline-secondary");
		$("#manual-data-button").removeClass("btn-secondary");
		document.getElementById("file-data").style.display = "none";
		$("#file-data-button").addClass("btn-info");
		$("#file-data-button").removeClass("btn-outline-info");		
	} else if (ttype == "File"){
		document.getElementById("manual-data").style.display = "none";
		$("#manual-data-button").removeClass("btn-outline-secondary");
		$("#manual-data-button").addClass("btn-secondary");
		document.getElementById("file-data").style.display = "block";
		$("#file-data-button").removeClass("btn-info");
		$("#file-data-button").addClass("btn-outline-info");	
	}
}

var jsonObj;
$(document).on('change', '.form-file', function(event) {
  var reader = new FileReader();

  reader.onload = function(event) {
    jsonObj = JSON.parse(event.target.result);
  }

  reader.readAsText(event.target.files[0]);
  if(document.location.href.includes("index"))
  	setTimeout(checkSaveForUnlocks, 1000);
});

function checkSaveForUnlocks(){
	globalLevel = 0;
	keys = ["mining_0","village_0","horde_0","farm_0"];
	for(i = 0; i < keys.length; i++)
		globalLevel+= jsonObj["globalLevel"][keys[i]];

	document.cookie = "globalLevel="+globalLevel;
	document.location.href = "index.php";
}

function logX(val, base){
	return Math.log(val) / Math.log(base);
}

function cryoXpGain(baseValue){
	return Math.round(baseValue * Math.pow(1.1, baseValue) * 40);
}

function cryoXpToLevel(level){
	return Math.pow(level + 2, 2) * Math.pow(2, level) * 25;
}

function calculateCryo() {
	keys = ["mining","village","horde","farm"];
	cryo = {};
	for(i = 0; i < keys.length; i++){
		var temp = {"xp":0,"level":0,"xpGain":0,"levelupTime":0};
		cryo[keys[i]] = temp;
		if(keys[i] in jsonObj["cryolab"]){
			cryo[keys[i]]["xp"] = jsonObj["cryolab"][keys[i]]["exp"][0];
			cryo[keys[i]]["level"] = jsonObj["cryolab"][keys[i]]["level"][0];
		}
	}
	cryo["mining"]["xpGain"] = cryoXpGain(logX(jsonObj["stat"]["mining_bestPrestige0"]["total"],3));
	cryo["village"]["xpGain"] = cryoXpGain(logX(jsonObj["stat"]["village_bestPrestige"]["total"],3));
	cryo["horde"]["xpGain"] = cryoXpGain(logX(jsonObj["stat"]["horde_bestPrestige"]["total"],3));
	cryo["farm"]["xpGain"] = cryoXpGain(jsonObj["stat"]["farm_bestPrestige"]["total"]);

	for(i = 0; i < keys.length; i++){
		cryo[keys[i]]["levelupTime"] = Math.ceil(cryoXpToLevel(cryo[keys[i]]["level"]) / (cryo[keys[i]]["xpGain"]/1440));
	}
	console.log(cryo);
	var block = document.createElement('h5');
	block.setAttribute('class', 'result text');
	block.innerHTML = "Your optimal progress path is:<br />"
	for(i = 0; i < 10; i++){
		minKey = "mining";
		for(j = 1; j < keys.length; j++){
			if(cryo[keys[j]]["levelupTime"] < cryo[minKey]["levelupTime"])
				minKey = keys[j];
		}
		block.innerHTML += (i+1)+") "+minKey+" lvl"+cryo[minKey]["level"]+"->"+(cryo[minKey]["level"]+1)+" in "+(Math.floor(cryo[minKey]["levelupTime"]/1440))+" days "+(Math.floor((cryo[minKey]["levelupTime"]%1440)/60))+" hours "+(cryo[minKey]["levelupTime"]%60)+" mins<br />";
		cryo[minKey]["level"]++;
		cryo[minKey]["levelupTime"] = Math.ceil(cryoXpToLevel(cryo[minKey]["level"]) / (cryo[minKey]["xpGain"]/1440));
	}
	document.getElementById('result_block').appendChild(block);
}

function calculateFaith() {
	if(jsonObj === undefined){
		faithGain = parseFloat(document.getElementById("faithGain").value);
		faithCap = parseFloat(document.getElementById("faithCap").value);
		faithNow = parseInt(document.getElementById("faithNow").value);
	} else {
		//default values
		faithGain = 0;
		faithCap = 50;

		//buildings and pray upgrades
		//church for faith gain
		for(i = 1; i <= jsonObj["upgrade"]["village_church"].level; i++)
			faithGain += i*0.04;
		//deep worship for faith cap
		for(i = 0; i < jsonObj["upgrade"]["village_deepWorship"].level; i++)
			faithCap *= 1.5;
		//temple building for cap
		for(i = 0; i < jsonObj["upgrade"]["village_temple"].level; i++)
			faithCap *= 1.2;

		faithNow = Math.floor(jsonObj["currency"]["village_faith"]);

		faithPremiumMulti = [1.25, 1.2, 1.166, 1.142, 1.125, 1.111, 1.1, 1.09, 1.083, 1.076, 1.071];
		villagePremiumBought = jsonObj["upgrade"]["village_moreFaith"].level;
		for(i = 0; i < villagePremiumBought; i++){
			faithGain *= faithPremiumMulti[i];
			faithCap *= faithPremiumMulti[i];
		}

	}
	
	faithNeeded = parseInt(document.getElementById("faithNeeded").value);
	faithHours = parseInt(document.getElementById("faith_hours").value);
	faithMins = parseInt(document.getElementById("faith_mins").value);
	if(faithNeeded != 0){
		overCap = Math.floor(faithNow/faithCap);
		time = 0;
		current = faithNow;
		while(current < faithNeeded){
			if(current + faithCap < faithNeeded){
				beforeCap = faithCap-(current-Math.floor(current/faithCap)*faithCap);
				times = Math.floor(beforeCap/faithGain*Math.pow(0.9, overCap))+1;
				current += faithGain*Math.pow(0.9, overCap)*times;
				time += times;
				overCap = Math.floor(current/faithCap);
			} else {
				current += faithGain*Math.pow(0.9, overCap);
				time += 1;
			}
			if(faithGain*Math.pow(0.9, overCap) <= 0.002)
				break;
		}
		var block = document.createElement('h5');
		block.setAttribute('class', 'result text');
		if(current < faithNeeded) {
			block.innerHTML = 'Unable to reach that much faith. In the reasonable amount of time only '+Math.floor(current)+' can be collected (in ~'+Math.floor(time/3600)+' hours';
		} else {
			if(time < 60){
				block.innerHTML = 'Time to '+faithNeeded+' faith: '+time+' seconds';
			} else if (time >= 60 && time < 3600){
				mins = Math.floor(time/60);
				seconds = time-mins*60;
				block.innerHTML = 'Time to '+faithNeeded+' faith: '+mins+' minutes '+seconds+' seconds';
			} else if (time >= 3600 && time < 86400){
				hours = Math.floor(time/3600);
				mins = Math.floor((time-hours*3600)/60);
				seconds = time-mins*60-hours*3600;
				block.innerHTML = 'Time to '+faithNeeded+' faith: '+hours+' hours '+mins+' minutes '+seconds+' seconds';
			} else {
				days = Math.floor(time/86400);
				hours = Math.floor((time-days*86400)/3600);
				mins = Math.floor((time-hours*3600-days*86400)/60);
				seconds = time-mins*60-hours*3600-days*86400;
				block.innerHTML = 'Time to '+faithNeeded+' faith: '+days+' days '+hours+' hours '+mins+' minutes '+seconds+' seconds';
			}
		}
		document.getElementById('result_block').appendChild(block);
	}
	if(faithHours != 0 || faithMins != 0) {
		overCap = Math.floor(faithNow/faithCap);
		timeRequested = faithHours*3600 + faithMins * 60;
		for(i = 0; i < timeRequested; i++){
			faithNow += faithGain*Math.pow(0.9, overCap);
			if(Math.floor(faithNow/faithCap) > overCap)
				overCap++;
		}

		var block = document.createElement('h5');
		block.setAttribute('class', 'result text');
		block.innerHTML = "If you idle for "+faithHours+" hours "+faithMins+" mins you will have "+Math.floor(faithNow)+" faith.";
		document.getElementById('result_block').appendChild(block);
	}
}