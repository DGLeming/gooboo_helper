function splicedPowLinear(exponent, increase, breakpoint, value) {
    return (Math.max(0, value - breakpoint) * increase + 1) * Math.pow(exponent, Math.min(breakpoint, value));
}

function fallbackArray(array = [], fallback = null, index = 0) {
    return (index >= 0 && index < array.length) ? array[index] : fallback;
}

function getSequence(base = 1, pos = 1) {
    return Math.round((base + (pos - 1) / 2) * pos);
}

class Resource {
	capacityMultiplier = 1;
	capacityAdditive = 1000;
	capacityTotal = 0;
	key;
	overCap = 0;
	achiementName;
	gain = -1;
	currentAmmount = 0;
	neededForAchievement = 0;
	timeForAchievement;
	constructor(key){
		this.key = key;
	}
	ready(){
		this.neededForAchievement = getAmmountForNextAchievement(this.key);
		this.currentAmmount = jsonObj.currency['village_'+this.key];
		this.neededForAchievement = getAmmountForNextAchievement(this.key);
		this.overCap = Math.floor(this.currentAmmount/this.capacityTotal);

		//testing values
		// this.neededForAchievement = 150;
		// this.capacityTotal = 100;
		// this.currentAmmount = 20;
		// this.gain = 1;
		//this.overCap = Math.floor(this.currentAmmount/this.capacityTotal);
		//result in 4 mins 40 sec (280 sec)

		var time = 0;
		time = resourceTimeToGoal(this.capacityTotal, this.neededForAchievement, this.currentAmmount, this.gain, this.key);
		var timeNow = Math.floor(new Date().getTime() / 1000);
		var timeFromExport = timeNow - jsonObj.timestamp;
		this.timeForAchievement = time - timeFromExport;
		printAchievement(this);
	}
	// overCapMultiplier(){
	// 	return overCapMultiplier(this.key, this.currentAmmount, this.capacityTotal);
	// }
}

var metal = new Resource('metal');
var water = new Resource('water');
var knowledge = new Resource('knowledge');

function printAchievement(resource){
	var block = document.createElement('h5');
	block.setAttribute('class', 'result text');
	if(resource.timeForAchievement > 0){
		block.innerHTML = 'Time to get next <b>'+resource.key+'</b> achievement: '+secondsToTime(resource.timeForAchievement);
	} else {
		block.innerHTML = 'Time to get next <b>'+resource.key+'</b> achievement: assign workers first';
	}
	
	document.getElementById('result_block').appendChild(block);
}

function getAmmountForNextAchievement(key){
	var lvl;
	switch(key){
		case 'metal':
			lvl = jsonObj.achievement.village_metal;
			return Math.pow(10, lvl) * 5000;
			break;
		case 'water':
			lvl = jsonObj.achievement.village_water;
			return Math.pow(20, lvl) * 5000;
			break;
		case 'knowledge':
			lvl = jsonObj.achievement.village_knowledge;
			return getSequence(2, lvl + 1) * 250;
			break;
		default:
			break;
	}
}

function getMultiplierForAllVillageResourcesCapacity(){
	var mult = 1;
	//obelisk
	if('village_obelisk' in jsonObj.upgrade)
		mult *= Math.pow(1.2, jsonObj.upgrade.village_obelisk[1]);

	if('village_trophyCase' in jsonObj.upgrade)
		mult *= Math.pow(1.4, jsonObj.upgrade.village_trophyCase[1]);

	return mult;
}

function getMultiplierForAllVillageResourcesGain(){
	var mult = 1;

	if('village_overtime' in jsonObj.upgrade)
		mult *= fallbackArray([1, 1.1], Math.pow(1.25, jsonObj.upgrade.village_overtime[1] - 1), jsonObj.upgrade.village_overtime[1]);

	if('card' in jsonObj){
		//active card effect
	    if('feature' in jsonObj.card){
	        if("village" in jsonObj.card.feature){
	            for(i = 0; i < jsonObj.card.feature.village.cardEquipped.length; i++){
	                switch(jsonObj.card.feature.village.cardEquipped[i]){
	                    case 'VI-0012':
	                        mult *= 1.1;
	                        break;
	                    default:
	                        break;
	                }
	            }
	        }
	    }
	}

	if('village_trophyCase' in jsonObj.upgrade)
		mult *= Math.pow(2, jsonObj.upgrade.village_trophyCase[1]);

	return mult;
}

function calculateKnowledge(){
	knowledge.capacityAdditive = 100;
	if('job' in jsonObj.village){
		if('librarian' in jsonObj.village.job){
			knowledge.gain = jsonObj.village.job.librarian*0.03;

			if('relic' in jsonObj){
				for(var i = 0; i < jsonObj.relic.length; i++){
					switch(jsonObj.relic[i]){
						case 'dictionary':
							knowledge.gain *= 1.1;
							break;
						default:
							break;
					}
				}
			}

			if('village_book' in jsonObj.upgrade)
				knowledge.gain *= Math.pow(1.04, jsonObj.upgrade.village_book[1]);

			if('village_breakthrough' in jsonObj.upgrade)
				knowledge.capacityAdditive += jsonObj.upgrade.village_breakthrough[1]*5;

			if('village_understanding' in jsonObj.upgrade)
				knowledge.capacityMultiplier *= 1 + 0.1*jsonObj.upgrade.village_understanding[1];

			if('village_monk' in jsonObj.upgrade){
				knowledge.capacityAdditive += jsonObj.upgrade.village_monk[1]*10;
				knowledge.gain *= 1 + 0.2*jsonObj.upgrade.village_monk[1];
			}

			//add passive and active card effect
			if('card' in jsonObj){
				//active card effect
		        if('feature' in jsonObj.card){
		            if("village" in jsonObj.card.feature){
		                for(i = 0; i < jsonObj.card.feature.village.cardEquipped.length; i++){
		                    switch(jsonObj.card.feature.village.cardEquipped[i]){
			                    case 'VI-0022':
			                        knowledge.capacityMultiplier *= 1.1;
			                        break;
			                    case 'VI-0027':
			                        knowledge.gain *= 1.35;
			                        break;
			                    case 'VI-0009':
			                        knowledge.gain *= 1.1;
			                        break;
			                    default:
			                        break;
		                    }
		                }
		            }
		        }

		        //passive card effect
		        if('card' in jsonObj.card){
		        	var cards = 0;

		        	for(var i = 0; i < 10; i++){
		        		if('VI-000'+i in jsonObj.card.card)
		        			cards++;
		        	}
		        	
		        	for(var i = 10; i < 100; i++){
		        		if('VI-00'+i in jsonObj.card.card)
		        			cards++;
		        	}
		        	knowledge.gain *= 1 + 0.03*cards
		        }
		    }

		    if('village_moreKnowledge' in jsonObj.upgrade)
				knowledge.gain *= Math.pow(1.75, jsonObj.upgrade.village_moreKnowledge[1]);

			if('village_library' in jsonObj.upgrade)
				if(jsonObj.upgrade.village_library[1] > 1)
					knowledge.capacityAdditive += 5 * (jsonObj.upgrade.village_library[1] - 1);

			if('village_knowledgeTower' in jsonObj.upgrade)
				knowledge.capacityAdditive += jsonObj.upgrade.village_knowledgeTower[1]*3;

			if('village_school' in jsonObj.upgrade)
				knowledge.capacityAdditive += jsonObj.upgrade.village_school[1]*5;

			if('village_lostPages' in jsonObj.upgrade)
				knowledge.capacityAdditive += jsonObj.upgrade.village_lostPages[1]*8;

			if('village_marbleStatue' in jsonObj.upgrade)
				knowledge.capacityMultiplier *= 1 + 0.1*jsonObj.upgrade.village_marbleStatue[1];

			//add treasure effect to gain
		    if('treasure' in jsonObj){
		    	if('items' in jsonObj.treasure){
		    		var multiplier = 0;
		    		var startStat = 0.1;
		    		var upgradeStat = startStat / 5;
		    		for(var i = 0; i < jsonObj.treasure.items.length; i++){
		    			if(jsonObj.treasure.items[i] != null){
		    				if(jsonObj.treasure.items[i].effect[0] == 'villageMentalGain'){
		    					var typeMultiplier = 1;
		    					if(jsonObj.treasure.items[i].type == "empowered")
		    						typeMultiplier = 2;
		    					var thisRelicEffect;
		    					//default relic values (0.25 effect + 0.05 per level)
		    					thisRelicEffect = jsonObj.treasure.items[i].level * upgradeStat + startStat;
		    					//multiply effect on relic tier
		    					thisRelicEffect *= Math.pow(2, jsonObj.treasure.items[i].tier);
		    					//multiply effect on relic type (empowered form merchant are x2)
		    					thisRelicEffect *= typeMultiplier;

		    					console.log(thisRelicEffect);
		    					multiplier += thisRelicEffect;
		    				}
		    			}
		    		}
		    		knowledge.gain *= 1 + multiplier;
		    	}
		    }

		    //offerings
		    if('offering' in jsonObj.village)
		    	if('knowledge' in jsonObj.village.offering)
		    		if('upgradeBought' in jsonObj.village.offering.knowledge)
		    			knowledge.capacityAdditive += 2*jsonObj.village.offering.knowledge.upgradeBought;

		    knowledge.capacityTotal = knowledge.capacityAdditive * knowledge.capacityMultiplier;
		}
	}

	knowledge.ready();
}

function calculateWater(){
	if('job' in jsonObj.village){
		if('wellWorker' in jsonObj.village.job){
			water.gain = jsonObj.village.job.wellWorker*3;

			if('village_wateringCan' in jsonObj.upgrade)
				water.gain *= Math.pow(1.22, jsonObj.upgrade.village_wateringCan[1]);

			console.log(water.gain, 'village_wateringCan');

			if('village_pump' in jsonObj.upgrade)
				water.gain *= Math.pow(1.24, jsonObj.upgrade.village_pump[1]);

			console.log(water.gain, 'village_pump');

			if('village_holyWater' in jsonObj.upgrade){
				water.gain *= 1 + 0.2*jsonObj.upgrade.village_holyWater[1];
				water.capacityMultiplier *= Math.pow(1.25, jsonObj.upgrade.village_holyWater[1]);
			}

			console.log(water.gain, 'village_holyWater');

			//relics
			if('relic' in jsonObj){
				for(var i = 0; i < jsonObj.relic.length; i++){
					switch(jsonObj.relic[i]){
						case 'mudBrick':
							water.gain *= 1.5;
							break;
						case 'cupOfWater':
							water.gain *= 1.12;
							break;
						default:
							break;
					}
				}
			}

			console.log(water.gain, 'relic');

			if('village_moreWater' in jsonObj.upgrade){
				water.gain *= Math.pow(1.75, jsonObj.upgrade.village_moreWater[1]);
				water.capacityMultiplier *= 1 + 0.1*jsonObj.upgrade.village_moreWater[1];
			}

			if('village_well' in jsonObj.upgrade){
				if(jsonObj.upgrade.village_well[1] > 1){
					water.capacityMultiplier *= Math.pow(1.5, Math.min(jsonObj.upgrade.village_well[1] - 1, 9));
					water.capacityAdditive += (1000 * Math.min(jsonObj.upgrade.village_well[1] - 1, 9));
				}
			}

			if('village_fountain' in jsonObj.upgrade){
				water.capacityMultiplier *= Math.pow(2, jsonObj.upgrade.village_fountain[1]);
				water.gain *= Math.pow(1.4, jsonObj.upgrade.village_fountain[1]);
			}

			if('village_shed' in jsonObj.upgrade)
				water.capacityMultiplier *= 1+ 0.2*jsonObj.upgrade.village_shed[1];

			if('village_knowledgeTower' in jsonObj.upgrade)
				water.capacityMultiplier *= 1+ 0.2*jsonObj.upgrade.village_knowledgeTower[1];

			if('village_waterTower' in jsonObj.upgrade)
				water.gain *= Math.pow(1.2, jsonObj.upgrade.village_waterTower[1]) * (jsonObj.upgrade.village_waterTower[1] * 0.5 + 1);

			if('village_bigStorage' in jsonObj.upgrade)
				water.capacityMultiplier *= splicedPowLinear(1.25, 0.2, 20, jsonObj.upgrade.village_bigStorage[1]);

			if('village_waterTurbine' in jsonObj.upgrade)
				water.gain *=  Math.pow(1.15, jsonObj.upgrade.village_waterTurbine[1]);

			//add passive and active card effect
			if('card' in jsonObj){
				//active card effect
		        if('feature' in jsonObj.card){
		            if("village" in jsonObj.card.feature){
		                for(i = 0; i < jsonObj.card.feature.village.cardEquipped.length; i++){
		                    switch(jsonObj.card.feature.village.cardEquipped[i]){
			                    case 'VI-0003':
			                        water.gain *= 1.5;
			                        water.capacityMultiplier *= 1.2;
			                        break;
			                    case 'VI-0036':
			                        water.capacityMultiplier *= 1.5;
			                        break;
			                    default:
			                        break;
		                    }
		                }
		            }
		        }

		        //passive card effect
		        if('card' in jsonObj.card){
		        	var cards = 0;

		        	for(var i = 0; i < 10; i++){
		        		if('VI-000'+i in jsonObj.card.card)
		        			cards++;
		        	}
		        	
		        	for(var i = 10; i < 100; i++){
		        		if('VI-00'+i in jsonObj.card.card)
		        			cards++;
		        	}
		        	water.gain *= 1 + 0.03*cards
		        }
		    }
		    console.log(water.gain, 'card');
		    //add treasure effect to gain
		    if('treasure' in jsonObj){
		    	if('items' in jsonObj.treasure){
		    		var multiplier = 0;
		    		var startStat = 0.25;
		    		var upgradeStat = 0.05;
		    		for(var i = 0; i < jsonObj.treasure.items.length; i++){
		    			if(jsonObj.treasure.items[i] != null){
		    				if(jsonObj.treasure.items[i].effect[0] == 'villageMaterialGain'){
		    					var typeMultiplier = 1;
		    					if(jsonObj.treasure.items[i].type == "empowered")
		    						typeMultiplier = 2;
		    					var thisRelicEffect;
		    					//default relic values (0.25 effect + 0.05 per level)
		    					thisRelicEffect = jsonObj.treasure.items[i].level * 0.05 + 0.25;
		    					//multiply effect on relic tier
		    					thisRelicEffect *= Math.pow(2, jsonObj.treasure.items[i].tier);
		    					//multiply effect on relic type (empowered form merchant are x2)
		    					thisRelicEffect *= typeMultiplier;


		    					multiplier += thisRelicEffect;
		    				}
		    			}
		    		}
		    		water.gain *= 1 + multiplier;
		    	}
		    }
		    console.log(water.gain, 'treasure');
		    //offerings
		    if('offering' in jsonObj.village)
		    	if('water' in jsonObj.village.offering)
		    		if('upgradeBought' in jsonObj.village.offering.water)
		    			water.capacityAdditive += 500*jsonObj.village.offering.water.upgradeBought;
		    console.log('offerings', water.gain, water.capacityMultiplier, water.capacityAdditive);
		    water.gain *= getMultiplierForAllVillageResourcesGain();
		    water.capacityMultiplier *= getMultiplierForAllVillageResourcesCapacity();

		    water.capacityTotal = water.capacityAdditive * water.capacityMultiplier;
		}
	}


	water.ready();
}

function calculateMetal(){
	if('job' in jsonObj.village){
		if('miner' in jsonObj.village.job){
			metal.gain = jsonObj.village.job.miner*0.5;

			if('village_forge' in jsonObj.upgrade){
				metal.gain *= 1 + 0.1*jsonObj.upgrade.village_forge[1];
				metal.capacityAdditive += 200*jsonObj.upgrade.village_forge[1];
			}

			if('village_miniatureSmith' in jsonObj.upgrade)
				metal.gain *= 1 + 0.1*jsonObj.upgrade.village_miniatureSmith[1];

			if('village_oilStorage' in jsonObj.upgrade){
				metal.gain *= Math.pow(1.1, jsonObj.upgrade.village_oilStorage[1]);
				metal.capacityMultiplier *= Math.pow(1.4, jsonObj.upgrade.village_oilStorage[1]);
			}

			if('village_pickaxe' in jsonObj.upgrade)
				metal.gain *= Math.pow(1.08, jsonObj.upgrade.village_pickaxe[1]);

			if('village_processing' in jsonObj.upgrade)
				metal.gain *= Math.pow(1.1, jsonObj.upgrade.village_processing[1]);

			if('village_moreMetal' in jsonObj.upgrade){
				metal.gain *= Math.pow(1.75, jsonObj.upgrade.village_moreMetal[1]);
				metal.capacityMultiplier *= 1 + 0.1*jsonObj.upgrade.village_moreMetal[1];
			}

			if('village_holyMetal' in jsonObj.upgrade){
				metal.gain *= 1 + 0.2*jsonObj.upgrade.village_holyMetal[1];
				metal.capacityMultiplier *= Math.pow(1.25, jsonObj.upgrade.village_holyMetal[1]);
			}

			if('village_storage' in jsonObj.upgrade)
				if(jsonObj.upgrade.village_storage[1] > 5)
					metal.capacityMultiplier *= splicedPowLinear(1.2, 0.1, 15, jsonObj.upgrade.village_storage[1] - 5);

			if('village_aquarium' in jsonObj.upgrade)
				metal.capacityMultiplier *= 1 + 0.15*jsonObj.upgrade.village_aquarium[1];

			if('village_luxuryStorage' in jsonObj.upgrade)
				metal.capacityMultiplier *= Math.pow(1.3, jsonObj.upgrade.village_luxuryStorage[1]);

			if('village_metalBag' in jsonObj.upgrade)
				metal.capacityAdditive += 400*jsonObj.upgrade.village_metalBag[1];



			//add passive and active card effect
			if('card' in jsonObj){
				//active card effect
		        if('feature' in jsonObj.card){
		            if("village" in jsonObj.card.feature){
		                for(i = 0; i < jsonObj.card.feature.village.cardEquipped.length; i++){
		                    switch(jsonObj.card.feature.village.cardEquipped[i]){
			                    case 'VI-0004':
			                        metal.gain *= 1.5;
			                        metal.capacityMultiplier *= 1.2;
			                        break;
			                    case 'VI-0037':
			                        metal.capacityMultiplier *= 1.25;
			                        break;
			                    default:
			                        break;
		                    }
		                }
		            }
		        }

		        //passive card effect
		        if('card' in jsonObj.card){
		        	var cards = 0;

		        	for(var i = 0; i < 10; i++){
		        		if('VI-000'+i in jsonObj.card.card)
		        			cards++;
		        	}
		        	
		        	for(var i = 10; i < 100; i++){
		        		if('VI-00'+i in jsonObj.card.card)
		        			cards++;
		        	}
		        	metal.gain *= 1 + 0.03*cards
		        }
		    }

		    //add treasure effect to gain
		    if('treasure' in jsonObj){
		    	if('items' in jsonObj.treasure){
		    		var multiplier = 0;
		    		var startStat = 0.25;
		    		var upgradeStat = 0.05;
		    		for(var i = 0; i < jsonObj.treasure.items.length; i++){
		    			if(jsonObj.treasure.items[i] != null){
		    				if(jsonObj.treasure.items[i].effect[0] == 'villageMaterialGain'){
		    					var typeMultiplier = 1;
		    					if(jsonObj.treasure.items[i].type == "empowered")
		    						typeMultiplier = 2;
		    					var thisRelicEffect;
		    					//default relic values (0.25 effect + 0.05 per level)
		    					thisRelicEffect = jsonObj.treasure.items[i].level * 0.05 + 0.25;
		    					//multiply effect on relic tier
		    					thisRelicEffect *= Math.pow(2, jsonObj.treasure.items[i].tier);
		    					//multiply effect on relic type (empowered form merchant are x2)
		    					thisRelicEffect *= typeMultiplier;


		    					multiplier += thisRelicEffect;
		    				}
		    			}
		    		}
		    		metal.gain *= 1 + multiplier;
		    	}
		    }

		    //offerings
		    if('offering' in jsonObj.village)
		    	if('metal' in jsonObj.village.offering)
		    		if('upgradeBought' in jsonObj.village.offering.metal)
		    			metal.capacityAdditive += 200*jsonObj.village.offering.metal.upgradeBought;
		    
		    metal.gain *= getMultiplierForAllVillageResourcesGain();
		    metal.capacityMultiplier *= getMultiplierForAllVillageResourcesCapacity();

		    metal.capacityTotal = metal.capacityAdditive * metal.capacityMultiplier;
		}
	}

	metal.ready();
}

function calculateResources(){
	calculateMetal();
	calculateWater();
	calculateKnowledge();
}

calculateResources();