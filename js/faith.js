function getFaithGainFromFile(){
	//default values

	faithGain = 0;
	if('upgrade' in jsonObj){
		//churches
		if("village_church" in jsonObj["upgrade"])
			faithGain += getSequence(1, jsonObj["upgrade"]["village_church"][1]) * 0.04;

		//mosque
		if("village_mosque" in jsonObj["upgrade"])
			faithGain += getSequence(2, jsonObj["upgrade"]["village_mosque"][1]) * 2;

		//more faith
		if('village_moreFaith' in jsonObj["upgrade"])
			faithGain *= 1+0.25*jsonObj["upgrade"]["village_moreFaith"][1];

		//cryolab
		if(jsonObj.unlock.cryolabFeature == true)
			if('village' in jsonObj.cryolab)
				faithGain *= 1+0.1*jsonObj.cryolab.village.level[0];
	}
	

	return faithGain;
}

function getFaithCapFromFile(){
	faithCap = 50;

	//deeper worship
	if('upgrade' in jsonObj){
		if("village_deeperWorship" in jsonObj["upgrade"])
			faithCap += 5*jsonObj["upgrade"]["village_deeperWorship"][1];

		//lost pages
		if("lostPages" in jsonObj["upgrade"])
			faithCap += 5*jsonObj["upgrade"]["lostPages"][1];

		//full basket
		if("fullBasket" in jsonObj["upgrade"])
			faithCap += 8*jsonObj["upgrade"]["fullBasket"][1];

		//cemetery
		if("cemetery" in jsonObj["upgrade"])
			faithCap += 8*jsonObj["upgrade"]["cemetery"][1];

		//temple
		if("village_temple" in jsonObj["upgrade"])
			for(i = 0; i < jsonObj["upgrade"]["village_temple"][1]; i++)
				faithCap *= 1.2;

		//deep worship
		if("village_deepWorship" in jsonObj["upgrade"])
			for(i = 0; i < jsonObj["upgrade"]["village_deepWorship"][1]; i++)
				faithCap *= 1.5;

		//deeper worship
		if("village_deeperWorship" in jsonObj["upgrade"])
			for(i = 0; i < jsonObj["upgrade"]["village_deeperWorship"][1]; i++)
				faithCap *= 1.35;


		//more faith premium
		if('village_moreFaith' in jsonObj["upgrade"])
			faithCap *= 1+0.25*jsonObj["upgrade"]["village_moreFaith"][1];
		

		//cryolab
		if(jsonObj.unlock.cryolabFeature == true)
			if('village' in jsonObj.cryolab)
				faithCap *= 1+0.1*jsonObj.cryolab.village.level[0];
	}

	return faithCap;
}

function calculateFaith() {
	clearOutputData();

	//parse data from file
	faithGain = getFaithGainFromFile();
	faithCap = getFaithCapFromFile();
	faithNow = Math.floor(jsonObj["currency"]["village_faith"]);

	//output values so player can check they are right
	//outputGottenValues(faithGain, faithCap);

	faithNeeded = parseInt(document.getElementById("faithNeeded").value);
	faithHours = 3*24;
	if(faithGain > 0){
		if(faithNeeded != 0){
			var time = 0;

			time = resourceTimeToGoal(faithCap, faithNeeded, faithNow, faithGain, 'faith');

			var block = document.createElement('h5');
			block.setAttribute('class', 'result text');
			block.innerHTML = 'Time to '+faithNeeded+' faith: '+secondsToTime(Math.floor(time));
			document.getElementById('result_block').appendChild(block);
		} else {
			overCap = Math.floor(faithNow/faithCap);
			timeRequested = faithHours*3600;
			var breakpoints = [overCap];
			var faithMilestones = [];
			var timeMilestones = [0];
			var timeSpent = 0;

			overCap++;

			timeSpent += (overCap*faithCap-faithNow) / faithGain / Math.pow(0.9, overCap-1);
			timeMilestones.push(Math.floor(timeSpent));
			faithMilestones.push(overCap*faithCap);
			breakpoints.push(overCap);

			while(timeSpent < timeRequested){
				var gainCurrent = faithGain*Math.pow(0.9, overCap);
				overCap++;
				timeSpent += faithCap / gainCurrent;
				timeMilestones.push(Math.floor(timeSpent));
				faithMilestones.push(overCap*faithCap);
				breakpoints.push(overCap);
			}

			for(i = 0; i < breakpoints.length-1; i++){
				var text = "overcap x"+breakpoints[i]+"->"+breakpoints[i+1]+" in "+secondsToTime(timeMilestones[i+1]-timeMilestones[i])+" : "+Math.floor(faithCap/(timeMilestones[i+1]-timeMilestones[i])*3600)+" faith/h";
				printResultText(text, 'h6');
				//text = "Total faith: "+Math.floor(breakpoints[i+1]*faithCap)+". Total time: "+secondsToTime(timeMilestones[i+1]-timeMilestones[i+1]%60)+"</br></br>";
				text = "Totas - faith: "+Math.floor(breakpoints[i+1]*faithCap)+", time: "+secondsToTime(timeMilestones[i+1]-timeMilestones[i+1]%60)+", "+Math.floor(faithCap*(i+1)/timeMilestones[i+1]*3600)+" faith/h</br></br>";
				printResultText(text, 'h6');
			}
		}
	} else {
		var block = document.createElement('h5');
		block.setAttribute('class', 'result text');
		block.innerHTML = 'Faith gain = 0. Forgot to build churches?)';
		document.getElementById('result_block').appendChild(block);
	}
}

calculateFaith();