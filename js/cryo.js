var levelUps = [];
class Feature {
	key;
	baseValue;
	currentLevel;
	currentExp;
	xpGain;
	logValue;
	timeToLevelUp;
	xpToLevelUp;
	getValues(){
		if(this.key in jsonObj["cryolab"]){
			$('#'+this.key+'Block')[0].style.display = 'inline-block';
			this.currentExp = jsonObj["cryolab"][this.key]["exp"][0];
			this.currentLevel = jsonObj["cryolab"][this.key]["level"][0];

			if(this.key == 'mining')
				this.xpGain = cryoXpGain(logX(jsonObj["stat"]["mining_bestPrestige0"][1],this.logValue));
			else if(this.key == 'farm')
				this.xpGain = cryoXpGain(jsonObj["stat"][this.key+"_bestPrestige"][1]);
			else
				this.xpGain = cryoXpGain(logX(jsonObj["stat"][this.key+"_bestPrestige"][1],this.logValue));

			this.xpToLevelUp = cryoXpToLevel(this.currentLevel);
			this.timeToLevelUp = Math.floor((this.xpToLevelUp-this.currentExp)/this.xpGain*3600*24);
			this.outputUpgrades();
		}
	}
	levelUp(){
		this.currentLevel++;
		this.currentExp = 0;
		this.xpToLevelUp = cryoXpToLevel(this.currentLevel);
		this.timeToLevelUp = Math.floor(this.xpToLevelUp/this.xpGain*3600*24);
	}
	outputUpgrades(){
		for(var i = 0; i < 3; i++){
			var block = document.createElement('h6');
			block.setAttribute('class', 'result text');

			block.innerHTML = "Lvl "+this.currentLevel+"->"+(this.currentLevel+1)+" in "+secondsToTime(this.timeToLevelUp)+"</br>";
			levelUps.push({'key' : this.key, 'time': this.timeToLevelUp, 'fromLevel': this.currentLevel});
			this.levelUp();

			document.getElementById(this.key+'Block').appendChild(block);
		}
	}
	constructor(key){
		this.key = key;

		if(this.key == 'horde')
			this.logValue = 9;
		else
			this.logValue = 3;

		this.getValues();
	}
	
}

function cryoXpGain(baseValue){
	return Math.round(baseValue * Math.pow(1.1, baseValue) * 40);
}

function cryoXpToLevel(level){
	return Math.pow(level + 2, 2) * Math.pow(2, level) * 25;
}

function calculateCryo() {
	mining = new Feature("mining");
	village = new Feature("village");
	horde = new Feature("horde");
	farm = new Feature("farm");
	gallery = new Feature("gallery");

	let sortedLevelUps = levelUps.sort(
    (p1, p2) => (p1.time > p2.time) ? 1 : (p1.time < p2.time) ? -1 : 0);
	
	for(var i = 0; i < 5; i++){
		var block = document.createElement('h6');
		block.setAttribute('class', 'result text');

		block.innerHTML = (i+1)+") "+sortedLevelUps[i]['key']+" lvl"+sortedLevelUps[i]['fromLevel']+"->"+(sortedLevelUps[i]['fromLevel']+1)+" in "+secondsToTime(sortedLevelUps[i]['time'])+"</br>";

		document.getElementById('cryoStrategy').appendChild(block);
	}
}

calculateCryo();