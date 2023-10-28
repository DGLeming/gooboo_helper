const dweller = {
  startingDepth: 0,
  currentDepth: 0,
  secondDepth: 0,
  maxDepth: 0,
  speed: 0,
  gemMultiplier: 1,
  times: [],
  rewards: [],
  firstDepth: true,
  initiate: function(){
    this.grabValuesFromJson();
    this.calculateArrays();
  },
  stepReward: function(depth = this.currentDepth) {
    return Math.floor(Math.pow(1.15, depth) * depth * 10 * this.gemMultiplier);
  },
  grabValuesFromJson: function(){
    this.currentDepth = jsonObj.stat.mining_depthDweller0[0];
    this.startingDepth = this.currentDepth;
    this.maxDepth = jsonObj.stat.mining_maxDepth0[0]*(0.1+0.01*jsonObj.upgrade.mining_crystalDrill[1]);
    this.speed = getDwellerSpeed(jsonObj, this.maxDepth);
    this.gemMultiplier = greenCrystalMultipliers(jsonObj);
  },
  calculateArrays: function(){
    this.times.push(this.timeUntilNext());

    if(this.currentDepth - Math.floor(this.currentDepth) >= 0.5)
        this.currentDepth = Math.floor(this.currentDepth)+1;
    else
        this.currentDepth = Math.floor(this.currentDepth)+0.5;

    this.secondDepth = this.currentDepth;

    this.rewards.push(this.stepReward());

    while(this.currentDepth + 0.5 < this.maxDepth){
        this.times.push(this.timeUntilNext()+this.times[this.times.length-1]);
        this.currentDepth += 0.5;
        this.rewards.push(this.stepReward());
    }

    this.printResults();
  },
  printResults: function(){
    //block with previous progress
    var gemsAlreadyGot = Math.floor(this.stepReward(this.secondDepth-0.5));
    var timeInPrestige = jsonObj.stat.mining_timeSpent[0];
    var textProgress = "You already got "+gemsAlreadyGot+" crystals in "+secondsToTime(timeInPrestige)+", with rate of <p class='rateText'>"+fixed2(gemsAlreadyGot/timeInPrestige*3600)+"</p></br></br>";
    printResultText(textProgress, 'h6');
    
    var text1 = fixed2(this.startingDepth)+"m -> "+this.secondDepth+"m: "+this.rewards[0]+" crystals in "+secondsToTime(this.times[0])+", crystals/h: "+fixed2((this.rewards[0]-gemsAlreadyGot)/this.times[0]*3600, 2)+"</br>";
    var text2 = "Total time: "+secondsToTime(this.times[0])+", crystals/h total: <p class='rateText'>"+fixed2(this.rewards[0]/(this.times[0]+timeInPrestige)*3600, 2)+"</p></br>";
    printResultText(text1, 'h6');
    printResultText(text2, 'h6');

    for(var i = 1; i < this.times.length; i++){
        this.getRewardText(i);
    }

    colourRates(this.times.length);
  },
  getRewardText: function(i){
    var depthStart = this.secondDepth+0.5*(i-1);
    var depthFinish = depthStart+0.5;
    var rewardTotal = this.rewards[i];
    var rewardThisLevel = rewardTotal - this.rewards[i-1];
    var timeTotal = this.times[i];
    var timeThisLevel = timeTotal-this.times[i-1];
    var timeInPrestige = jsonObj.stat.mining_timeSpent[0];
    var crystalRateThisLevel = fixed2(rewardThisLevel/timeThisLevel*3600, 2);
    var text1 = depthStart+"m -> "+depthFinish+"m: "+rewardTotal+" crystals in "+secondsToTime(timeThisLevel)+", crystals/h: "+crystalRateThisLevel+"</br>";
    var text2 = "Total time: "+secondsToTime(timeTotal)+", crystals/h total: <p class='rateText'>"+fixed2(rewardTotal/(timeTotal+timeInPrestige)*3600, 2)+"</p></br>";
    printResultText(text1, 'h6');
    printResultText(text2, 'h6');
  },
  timeUntilNext: function(){
    var nextDepth = 0;
    if(this.currentDepth - Math.floor(this.currentDepth) >= 0.5)
        nextDepth = Math.floor(this.currentDepth)+1;
    else
        nextDepth = Math.floor(this.currentDepth)+0.5;

    return Math.floor(logX((nextDepth - 0.1 - this.maxDepth) / -(0.1 + this.maxDepth - this.currentDepth), 1 - this.speed));
  }

};


function greenCrystalMultipliers(jsonObj){
    var multiplier = 1;
    //gem upgrade
    if("mining_moreGreenCrystal" in jsonObj.upgrade)
        multiplier *= 1+0.25*jsonObj.upgrade.mining_moreGreenCrystal[1];
    //coal upgrade
    if("mining_starForge" in jsonObj.upgrade)
        multiplier *= 1+0.075*jsonObj.upgrade.mining_starForge[1];
    //cryolab
    if("cryolab" in jsonObj)
        if("mining" in jsonObj.cryolab)
            multiplier *= 1+0.1*jsonObj.cryolab.mining.level[0];

    //cards
    if('card' in jsonObj){
        if('feature' in jsonObj.card){
            if("mining" in jsonObj.card.feature){
                for(i = 0; i < jsonObj.card.feature.mining.cardEquipped.length; i++){
                    switch(jsonObj.card.feature.mining.cardEquipped[i]){
                    case 'MI-0020':
                        multiplier *= 1.2;
                        break;
                    case 'MI-0021':
                        multiplier *= 1.1;
                        break;
                    case 'MI-0022':
                        multiplier *= 1.15;
                        break;
                    case 'MI-0028':
                        multiplier *= 1.08;
                        break;
                    default:
                        break;
                    }
                }
            }
        }
    }
    return multiplier;
}

function getDwellerSpeed(jsonObj, maxDepth){
    var dwellerSpeed = 0.0001 / maxDepth;

    //drill fuel (scrap upgrade)
    if("mining_drillFuel" in jsonObj.upgrade)
        dwellerSpeed *= Math.pow(1.05, jsonObj.upgrade.mining_drillFuel[1]) * (jsonObj.upgrade.mining_drillFuel[1] * 0.05 + 1);

    //cards
    if('card' in jsonObj){
        if('feature' in jsonObj.card){
            if("mining" in jsonObj.card.feature){
                for(i = 0; i < jsonObj.card.feature.mining.cardEquipped.length; i++){
                    switch(jsonObj.card.feature.mining.cardEquipped[i]){
                    case 'MI-0019':
                        dwellerSpeed *= 1.75;
                        break;
                    case 'MI-0021':
                        dwellerSpeed *= 1.5;
                        break;
                    case 'MI-0025':
                        dwellerSpeed *= 1.25;
                        break;
                    default:
                        break;
                    }
                }
            }
        }
    }
    
    return dwellerSpeed;
}

function colourRates(){
    var bestIndex = 0;
    var bestRate = 0;
    for(var i = 1; i < $('.rateText').length; i++){
        var currentRate = parseFloat($('.rateText')[i].innerHTML);
        //console.log(currentRate);
        if(currentRate >= bestRate){
            bestRate = currentRate;
            bestIndex = i;
        }
    }
    for(var i = bestIndex+1; i <= dweller.times.length; i++){
        $('.rateText')[i].style.color = 'red';
        //console.log(i);
    }
    printStrategy(bestIndex-1);
}

function printStrategy(bestIndex) {
    var block = document.createElement('h6');
    block.setAttribute('class', 'result text');
    block.innerHTML = "For best crystals/h you should prestige in <b>"+secondsToTime(dweller.times[bestIndex]-dweller.times[bestIndex]%60)+"</b> at depth <b>"+(dweller.secondDepth+0.5*bestIndex)+"m</b>";
    block.innerHTML += "</br>It will result in rate of <b>"+parseFloat($('.rateText')[bestIndex+1].innerHTML)+"</b> crystals per hour";
    document.getElementById('result_strategy').appendChild(block);
}

dweller.initiate();


