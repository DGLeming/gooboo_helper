//file operating
if(window.localStorage.getItem('save') == null){
	var block = document.createElement('h6');
	block.innerHTML = "It seems like i cant find your save, upload one so i can open all the features to you!";
	document.getElementById('welcome-block').appendChild(block);
} else {
	$('#indexMiningBlock')[0].style.display = "inline-block";
	$('#indexVillageBlock')[0].style.display = "inline-block";
	date = new Date(null);
	date.setTime(window.localStorage.getItem('lastFileLoad')); // specify value for SECONDS here
	var block = document.createElement('h6');
	block.innerHTML = "Im operating on save file that was uploaded "+date.toDateString()+", "+date.toISOString().slice(11, 19);
	document.getElementById('welcome-block').appendChild(block);

	if(getGlobalLevel() >= 130){
		$('#indexFarmBlock')[0].style.display = "inline-block";
	}

	if(getGlobalLevel() >= 290){
		$('#indexCryoBlock')[0].style.display = "inline-block";
	}
}