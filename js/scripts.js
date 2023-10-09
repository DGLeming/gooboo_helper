function calculateOvergrowth () {
	percent = document.getElementById("overgrowth_percent").value;
	cycles = document.getElementById("cycles").value;
	hours = document.getElementById("grow_hours").value;
	mins = document.getElementById("gorw_minutes").value;
	defaultGrowthTime = hours*60+mins;

	overgrowthMultiplier = 1/percent*100+1;
	cyclesTime = [];
	cyclesTime.push(parseInt(defaultGrowthTime));
	currentGrowthTime = defaultGrowthTime;
	for(i=0; i < cycles-1; i++){
		currentGrowthTime = Math.floor(currentGrowthTime*overgrowthMultiplier);
		cyclesTime.push(currentGrowthTime+cyclesTime[i]);
	}
	console.log(cyclesTime);

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