var jsonObj;
if(window.localStorage.getItem('save') != null){
	jsonObj = JSON.parse(window.localStorage.getItem('save'));
	if(getGlobalLevel() >= 130){
		$('#navbarOvergrowth')[0].style.display = "block";
	}

	if(getGlobalLevel() >= 290){
		$('#navbarCryo')[0].style.display = "block";
	}
	$('#navbarVillage')[0].style.display = "block";
	$('#navbarMining')[0].style.display = "block";
}

function clearOutputData(){
	var parent = document.getElementById('result_block');
	var delChild = parent.lastChild;
	while (delChild) {
		parent.removeChild(delChild);
		delChild = parent.lastChild;
	}
}

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
	clearOutputData();

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
			block.innerHTML = 'Harvest #'+(i+1)+': '+days+' days '+hours+' hours '+mins+' mins';
		}
			
		document.getElementById('result_block').appendChild(block);
	}
}

$(document).on('change', '.form-file', function(event) {
  var reader = new FileReader();

  reader.onload = function(event) {
    jsonObj = JSON.parse(atob(event.target.result));
    console.log(jsonObj);
    //if(document.location.href.includes("index") || document.location.href == 'https://gooboohelp.site/' || document.location.href == 'http://gooboohelp.site/')
    	loadDataFromSave();
  }

  reader.readAsText(event.target.files[0]);
});

function getGlobalLevel(){
	globalLevel = 0;
	keys = ["mining_0","village_0","horde_0","farm_0","gallery_0"];
	for(i = 0; i < keys.length; i++)
		if(keys[i] in jsonObj["globalLevel"])
			globalLevel+= jsonObj["globalLevel"][keys[i]];

	return globalLevel;
}

function logX(val, base){
	return Math.log(val) / Math.log(base);
}

function secondsToTime(time) {
	if(time < 60){
		return time+' seconds';
	} else if (time >= 60 && time < 3600){
		mins = Math.floor(time/60);
		seconds = time-mins*60;
		var text = mins+' minutes';
		if(seconds != 0)
			text += ' '+seconds+' seconds';
		return text;
	} else if (time >= 3600 && time < 86400){
		hours = Math.floor(time/3600);
		mins = Math.floor((time-hours*3600)/60);
		seconds = time-mins*60-hours*3600;
		var text = hours+' hours';
		if(mins != 0)
			text += ' '+mins+' minutes';
		if(seconds != 0)
			text += ' '+seconds+' seconds';
		return text;
	} else {
		days = Math.floor(time/86400);
		hours = Math.floor((time-days*86400)/3600);
		mins = Math.floor((time-hours*3600-days*86400)/60);
		seconds = time-mins*60-hours*3600-days*86400;
		var text = days+' days';
		if(hours != 0)
			text += ' '+hours+' hours';
		if(mins != 0)
			text += ' '+mins+' minutes';
		if(seconds != 0)
			text += ' '+seconds+' seconds';
		return text;
	}
}





function getSequence(base = 1, pos = 1) {
    return Math.round((base + (pos - 1) / 2) * pos);
}

function loadDataFromSave(){
	/*//update file load time
	window.localStorage.setItem('lastFileLoad', new Date().getTime());
	//update global level
	window.localStorage.setItem('globalLevel', getGlobalLevel());*/
	window.localStorage.setItem('save', JSON.stringify(jsonObj));
	window.localStorage.setItem('lastFileLoad', new Date().getTime());
	window.location.reload();
}

function fixed2(num){
	return parseFloat(num.toFixed(2));
}

function printResultText(text, weight){
	var block = document.createElement(weight);
  block.setAttribute('class', 'result text');
  block.innerHTML = text;
  document.getElementById('result_block').appendChild(block);
}