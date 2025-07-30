


function raiseDetails() {

	document.getElementById('characterDisplay').style.transform = 'translateY(-30vh)';


}


function lowerDetails() {

	document.getElementById('characterDisplay').style.transform = '';

}

function listWithAnd(arr) {
  if (arr.length === 0) return '';
  if (arr.length === 1) return arr[0];
  if (arr.length === 2) return arr[0] + ' and ' + arr[1];
  return arr.slice(0, -1).join(', ') + ', and ' + arr[arr.length - 1];
}


function displayFullObject(obj, indent = 0) {
  let output = '';
  const pad = ' '.repeat(indent);

  for (let key in obj) {
    if (typeof obj[key] === 'object' && obj[key] !== null) {
      output += `${pad}${key}:\n` + displayFullObject(obj[key], indent + 2);
    } else {
      output += `${pad}${key}: ${obj[key]}\n`;
    }
  }

  console.log(output);

  const el = document.getElementById('characterDisplayDetails');
  el.innerText = output;
  el.style.whiteSpace = 'pre';
  el.style.overflow = 'scroll';
}

function displayCharacter() {

	document.getElementById('counter-overlay-text').innerText = character.short;

	document.getElementById('counter-square').style.backgroundColor = character.color;


	document.getElementById('cdmDescription').innerHTML = '<span id="characterDisplayName">' + character.name +'</span><br>';
	document.getElementById('cdmDescription').innerHTML += character.race + ' ' + character.class +'<br>';

	document.getElementById('cdmAttributes').innerHTML = '<span class="cdmAttrName">ST:</span> ' + character.ST + ( character.ST === character.adjST ? '' : ' (' + character.adjST + ')' ) + '<br>';

	document.getElementById('cdmAttributes').innerHTML += '<span class="cdmAttrName">DX:</span> ' + character.DX + ( character.DX === character.adjDX ? '' : ' (' + character.adjDX + ')' ) + '<br>';

	document.getElementById('cdmAttributes').innerHTML += '<span class="cdmAttrName">IQ:</span> ' + character.IQ + ( character.IQ === character.adjIQ ? '' : ' (' + character.adjIQ + ')' ) + '<br>';

	document.getElementById('cdmAttributes').innerHTML += '<span class="cdmAttrName">MA:</span> ' + character.MA + ( character.MA === character.adjMA ? '' : ' (' + character.adjMA + ')' ) + '<br>';

	let meleeList = [];
	let armorList = [];
	let shieldList = [];

	for ( let i = 0; i < character.inventory.length; i++ ) {

		if ( character.inventory[i].ready ) {
			switch ( character.inventory[i].type ) {

				case 'melee':
				case 'missile':
				case 'thrown':
					meleeList.push(character.inventory[i].display)
					break;
				case 'armor':
					armorList.push(character.inventory[i].display)
					break;
				case 'shield':
					shieldList.push(character.inventory[i].display)
					break;

			}
		}
	}

	if ( shieldList.length > 0 ) {
		meleeList.push( shieldList[0] );
	}

	document.getElementById('cdmDescription').innerHTML += listWithAnd( meleeList ) + "<br>";

	document.getElementById('cdmDescription').innerHTML += listWithAnd( armorList ) + "<br>";


	if ( character.hits > 0 ) {
		document.getElementById('cdmStats').innerHTML = "Hits: " + character.hits + "<br>";
	} else {		
		document.getElementById('cdmStats').innerHTML = "Uninjured" + "<br>";
	}

	if ( character.fatigue > 0 ) {
		document.getElementById('cdmStats').innerHTML += "Fatigue: " + character.fatigue + "<br>";
	}
		
	if ( character.gm.engaged ) {
		document.getElementById('cdmStats').innerHTML += "Engaged<br>";
	} else {
		document.getElementById('cdmStats').innerHTML += "Unengaged<br>";
	}

	if ( character.gm.target ) {
		document.getElementById('cdmStats').innerHTML += "Target:" + character.gm.target + "<br>";
	}

	if ( character.turn_hits > 0 ) {
		document.getElementById('cdmStats').innerHTML += "Hits this turn: " + character.turn_hits + "<br>";
	}

	if ( character.gm.state !== 'standing' ) {
		document.getElementById('cdmStats').innerHTML += character.gm.state + "<br>";
	}




	const talentsToRemember = ['Alertness','Naturalist','Tactics','Architect/Builder'];
	let ttr=[];

	for ( let i = 0; i < character.skills.length; i++ ) {

		if ( talentsToRemember.includes( character.skills[i].name ) ) {
			ttr.push(character.skills[i].name);
		}

	}

	if ( ttr.length > 0 ) {

		document.getElementById('cdmNotes').innerHTML = "Talents to Remember:<br>";

		for ( let i = 0; i < ttr.length; i++ ) {
			document.getElementById('cdmNotes').innerHTML += ttr[i] + "<br>";
		}

	} else {

		document.getElementById('cdmNotes').innerHTML = "";

	}

	document.getElementById('cdmInventory').innerHTML = "Inventory:<br>";

	for ( let i = 0; i < character.inventory.length; i++ ) {

		document.getElementById('cdmInventory').innerHTML += character.inventory[i].display;

		if ( character.inventory[i].type === 'armor' ) {
		document.getElementById('cdmInventory').innerHTML += " armor";			
		}

		if ( character.inventory[i].ready ) {
			if ( character.inventory[i].type == 'armor' ) {
				document.getElementById('cdmInventory').innerHTML += ' (worn)';
			} else {
				document.getElementById('cdmInventory').innerHTML += ' (ready)';
			}
		}

		document.getElementById('cdmInventory').innerHTML += '<br>';

	}

	document.getElementById('cdmInventory').innerHTML += '<br>';
	document.getElementById('cdmInventory').innerHTML += 'Protection: ' + character.protection + '<br>';

	if ( character.skills.length > 0 && character.skills[0].type == 'talent' ) {

		document.getElementById('cdmTalents').innerHTML = "Talents:<br>";

	}

	let spellsStarted = 0;

	for ( let i = 0; i < character.skills.length; i++ ) {

		if ( spellsStarted == 0 && character.skills[i].type == 'spell' ){
			spellsStarted = 1;
			document.getElementById('cdmTalents').innerHTML += "<br>Spells:<br>";

		}

		if ( character.skills[i].type == 'talent' ) {

			document.getElementById('cdmTalents').innerHTML += character.skills[i].name + " (IQ " + character.skills[i].IQ + ", cost " + character.skills[i].cost + ")<br>";
		} else {

			document.getElementById('cdmTalents').innerHTML += character.skills[i].name + " (IQ " + character.skills[i].IQ + ", " + character.skills[i].kind[0].toUpperCase() + " cast " + character.skills[i].cast  + '/' + character.skills[i].maintain + ")<br>";
		}


	}

	document.getElementById('cdmStatus').innerHTML = "Status:<br>";
	document.getElementById('cdmStatus').innerHTML += "Class - " + character.class + "<br>";
	document.getElementById('cdmStatus').innerHTML += "Race - " + character.race + "<br>";
	document.getElementById('cdmStatus').innerHTML += "Sex - " + character.sex + "<br>";
	document.getElementById('cdmStatus').innerHTML += "Color - " + character.color + "<br>";
	document.getElementById('cdmStatus').innerHTML += "XP - " + character.XP + "<br>";
	document.getElementById('cdmStatus').innerHTML += "Turn Hits - " + character.turn_hits + "<br>";
	document.getElementById('cdmStatus').innerHTML += "Wound (count) - " + character.wounds.length + "<br>";
	document.getElementById('cdmStatus').innerHTML += "ST - " + character.ST + '('+character.adjST+ ")<br>";
	document.getElementById('cdmStatus').innerHTML += "DX - " + character.DX + '('+character.adjST+ ")<br>";
	document.getElementById('cdmStatus').innerHTML += "IQ - " + character.IQ + '('+character.adjST+ ")<br>";
	document.getElementById('cdmStatus').innerHTML += "MA - " + character.MA + '('+character.adjST+ ")<br>";

	document.getElementById('cdmGM').innerHTML = "GM:<br>";
	document.getElementById('cdmGM').innerHTML += "Creator - " + character.gm.creator + "<br>";
	document.getElementById('cdmGM').innerHTML += "Action - " + character.gm.action + "<br>";
	document.getElementById('cdmGM').innerHTML += "Engaged - " + character.gm.engaged + "<br>";
	document.getElementById('cdmGM').innerHTML += "Target - " + character.gm.target + "<br>";
	document.getElementById('cdmGM').innerHTML += "Hidden - " + character.gm.hidden + "<br>";
	document.getElementById('cdmGM').innerHTML += "Moved - " + character.gm.moved + "<br>";
	document.getElementById('cdmGM').innerHTML += "Position - " + character.gm.position.row + ',' + character.gm.position.col + " facing " + character.gm.position.facing + "<br>";
	document.getElementById('cdmGM').innerHTML += "State - " + character.gm.state + "<br>";
	document.getElementById('cdmGM').innerHTML += "Turn Damage Dealt - " + character.gm.turn_damage_dealt + "<br>";


	if ( character.log.length > 0 ) {

		document.getElementById('cdmLog').innerHTML = character.log;

	} else {

		document.getElementById("cdmLog")?.remove();
		
	}


}