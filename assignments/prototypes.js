/*
  Object oriented design is commonly used in video games.  For this part of the assignment you will be implementing several constructor functions with their correct inheritance hierarchy.

  In this file you will be creating three constructor functions: GameObject, CharacterStats, Humanoid.  

  At the bottom of this file are 3 objects that all end up inheriting from Humanoid.  Use the objects at the bottom of the page to test your constructor functions.
  
  Each constructor function has unique properties and methods that are defined in their block comments below:
*/

/*
  === GameObject ===
  * createdAt
  * name
  * dimensions (These represent the character's size in the video game)
  * destroy() // prototype method that returns: `${this.name} was removed from the game.`
*/
const GameObject = function(gameObjectElements) {
  this.createdAt = gameObjectElements.createdAt;
  this.name = gameObjectElements.name;
  this.dimensions = gameObjectElements.dimensions;
};

GameObject.prototype.destroy = function(target) {
  return `${this.name}'s lifeforce has left the realm.`;
};

/*
  === CharacterStats ===
  * healthPoints
  * takeDamage() // prototype method -> returns the string '<object name> took damage.'
  * should inherit destroy() from GameObject's prototype
*/

const CharacterStats = function(characterStatsElements) {
  GameObject.call(this, characterStatsElements);
  this.healthPoints = characterStatsElements.healthPoints;
};

CharacterStats.prototype = Object.create(GameObject.prototype);

CharacterStats.prototype.takeDamage = function(target) {
  return `${this.name} took damage from ${target.name}.`;
};

/*
  === Humanoid (Having an appearance or character resembling that of a human.) ===
  * team
  * weapons
  * language
  * greet() // prototype method -> returns the string '<object name> offers a greeting in <object language>.'
  * should inherit destroy() from GameObject through CharacterStats
  * should inherit takeDamage() from CharacterStats
*/

const Humanoid = function(humandoidElements) {
  CharacterStats.call(this, humandoidElements);
  this.team = humandoidElements.team;
  this.weapons = humandoidElements.weapons;
  this.language = humandoidElements.language;
  this.attack = humandoidElements.attack;
  this.attackName = humandoidElements.attackName;
};

Humanoid.prototype = Object.create(CharacterStats.prototype);

Humanoid.prototype.greet = function(target) {
  return `${this.name} offers a greeting to ${target.name}.`;
};

Humanoid.prototype.battleCry = function() {
  this.attack = this.attack + 1;
  return `Character:${this.name} HP:${this.healthPoints} ATK:${this.attack} SB:${this.specialBonus} - ${this.name} yells 'FOR THE KING!'`;
};

Humanoid.prototype.basicAttack = function (attacker, target, whichItem) {
  target.healthPoints = target.healthPoints - this.attack;
  deadORalive(attacker,target);
  return `Character:${this.name} HP:${this.healthPoints} ATK:${this.attack} SB:${this.specialBonus} - ${this.name} has attacked ${target.name}:(HP${target.healthPoints}) with their ${this.weapons[whichItem]} for ${this.attack} damage.`;
}

Humanoid.prototype.activateSpecial = function(attacker,target) {
  target.healthPoints = target.healthPoints - attacker.specialBonus;
  deadORalive(attacker,target);
  if (target.healthPoints > 0) {
    return `Character:${attacker.name} HP:${attacker.healthPoints} ATK:${attacker.attack} SB:${attacker.specialBonus} - ${target.name}:(HP${target.healthPoints}) has been hurt by ${attacker.name}'s ${attacker.specialBonusName}!`;
  } else { return `${target.name} has been defeated by ${attacker.name}.`;
}
};

const deadORalive = function(attacker,target) {
  if (target.healthPoints > 0) {
    console.log(`${target.name}:(HP${target.healthPoints}) has been hurt by ${attacker.name}, but still endures the pain to fight!`);
  } else { console.log(`${target.name} has been defeated by ${attacker.name}.`);
}
};


/*
 * Inheritance chain: GameObject -> CharacterStats -> Humanoid
 * Instances of Humanoid should have all of the same properties as CharacterStats and GameObject.
 * Instances of CharacterStats should have all of the same properties as GameObject.
 */

/*
  === Hero ===
  * Special Bonus(%) & Special Bonus Name
  *  activateSpecial() // prototype method -> does some math and maybe a cool if else statement!
  * should inherit from Humanoid
*/
const Hero = function(heroElements) {
  Humanoid.call(this, heroElements);
  this.specialBonus = heroElements.specialBonus;
  this.specialBonusName = heroElements.specialBonusName;
  this.specialItem =  heroElements.specialItem;
};

Hero.prototype = Object.create(Humanoid.prototype);

Hero.prototype.drink = function() {
  this.healthPoints = this.healthPoints * 1.2;
  this.specialBonus = this.specialBonus * 2;
  this.attack = this.attack + this.attack/2;
  return `Character:${this.name} HP:${this.healthPoints} ATK:${this.attack} SB:${this.specialBonus} - ${this.name} drinks ${this.specialItem}. Blessings invigorate our Hero!`;
};


/*
  === Villian ===
  * Special Bonus & Special Bonus Name
  * activateSpecial() // prototype method -> does some math and maybe a cool if else statement!
  * should inherit from Humanoid
*/
const Villain = function(villainElements) {
  Humanoid.call(this, villainElements);
  this.specialBonus = villainElements.specialBonus;
  this.specialBonusName = villainElements.specialBonusName;
  this.specialItem =  villainElements.specialItem;
};

Villain.prototype = Object.create(Humanoid.prototype);

Villain.prototype.disrespect = function(target) {
  this.healthPoints = this.healthPoints + 2;
  return `Character:${this.name} HP:${this.healthPoints} ATK:${this.attack} SB:${this.specialBonus} - ${this.name} spits on the ground and mocks ${target.name}.`;
};

Villain.prototype.smoke = function() {
  this.healthPoints = this.healthPoints - 5;
  if (this.healthPoints <= 0) {
    return `Character:${this.name} HP:${this.healthPoints} ATK:${this.attack} SB:${this.specialBonus} - ${this.name} have been consumed by their addiction.`;
  } else {
    this.specialBonus = this.specialBonus * 1.2;
    return `Character:${this.name} HP:${this.healthPoints} ATK:${this.attack} SB:${this.specialBonus} - ${this.name} pulls out their ${this.specialItem}. Power flows from the Underworld!`;
  }
};

Villain.prototype.ritual = function() {
  this.healthPoints = this.healthPoints + 10;
  this.attack = this.attack + 1;
  return `Character:${this.name} HP:${this.healthPoints} ATK:${this.attack} SB:${this.specialBonus} - ${this.name} chants in ${this.language[1]} while shadows surround them.`;
};


Villain.prototype.activateSpecial = function(attacker,target) {
  attacker.healthPoints = attacker.healthPoints - (attacker.specialBonus/2);
  if (attacker.healthPoints <= 0) {
      return `Character:${attacker.name} HP:${attacker.healthPoints} ATK:${attacker.attack} SB:${attacker.specialBonus} - ${attacker.name} have killed themselves using ${attacker.specialBonusName}.`;
    } else {
      target.healthPoints = target.healthPoints - attacker.specialBonus;
      deadORalive(attacker,target);
      console.log(`Character:${attacker.name} HP:${attacker.healthPoints} ATK:${attacker.attack} SB:${attacker.specialBonus} - ${target.name} has been badly damaged by ${attacker.name}'s ${attacker.specialBonusName}.`);
    }
    
};

// Test you work by un-commenting these 3 objects and the list of console logs below:

const knight = new Hero({
  createdAt: new Date(),
  dimensions: {
    length: 3,
    width: 2,
    height: 4
  },
  healthPoints: 55,
  name: "Sir Lord Dragon Teeth",
  team: "High kingdom",
  weapons: ["Wyvern Banishing Bow", "Greatsword of High Kingdom"],
  language: ["Common Tongue", " Shadow Speak"],
  specialBonus: 10,
  specialBonusName: "Ultimate Strike for the King",
  specialItem: "Golden Mead of the Gods",
  attack: 5,
  attackName: "Heroic Lunge"
});

const warlock = new Villain({
  createdAt: new Date(),
  dimensions: {
    length: 4,
    width: 4,
    height: 6
  },
  healthPoints: 30,
  name: "Dunder Proto",
  team: "Netherlands",
  weapons: ["Occult Staff of Reaping", " Summoning Book of the Underworld", " Robes of DarkFyre", " Circlet of Power", " Rings of Torment"],
  language: ["Common Tongue ", " Shadow Speak", " Wyvern Tongue", " Snake Speak"],
  specialBonus: 50,
  specialBonusName: "Sacrificial Summonings",
  specialItem: "Astral Pipe",
  attack: 7,
  attackName: "Spectral Bolt"
});


const mage = new Humanoid({
  createdAt: new Date(),
  dimensions: {
    length: 2,
    width: 1,
    height: 1
  },
  healthPoints: 5,
  name: "Bruce",
  team: "Mage Guild",
  weapons: ["Staff of Shamalama", "Scroll of Magika"],
  language: "Common Tongue",
  attack: 4,
  attackName: "Fireball"
});

const swordsman = new Humanoid({
  createdAt: new Date(),
  dimensions: {
    length: 2,
    width: 2,
    height: 2
  },
  healthPoints: 15,
  name: "Sir Mustachio",
  team: "The Round Table",
  weapons: ["Giant Sword", "Shield"],
  language: "Common Tongue",
  attack: 2,
  attackName: "Slash"
});

const archer = new Humanoid({
  createdAt: new Date(),
  dimensions: {
    length: 1,
    width: 2,
    height: 4
  },
  healthPoints: 10,
  name: "Lilith",
  team: "Forest Kingdom",
  weapons: ["Elven Bow" , "Dagger of the Stars"],
  language: "Elvish",
  attack: 2,
  attackName: "Precise Strike"
});

/*
console.log(mage.createdAt); // Today's date
console.log(archer.dimensions); // { length: 1, width: 2, height: 4 }
console.log(swordsman.healthPoints); // 15
console.log(mage.name); // Bruce
console.log(swordsman.team); // The Round Table
console.log(mage.weapons); // Staff of Shamalama
console.log(archer.language); // Elvish
console.log(archer.greet()); // Lilith offers a greeting in Elvish.
console.log(mage.takeDamage()); // Bruce took damage.
console.log(swordsman.destroy()); // Sir Mustachio was removed from the game.
*/
// Stretch task:
// * Create Villain and Hero constructor functions that inherit from the Humanoid constructor function.
// * Give the Hero and Villains different methods that could be used to remove health points from objects which could result in destruction if health gets to 0 or drops below 0;
// * Create two new objects, one a villain and one a hero and fight it out with methods!

const welcome = function() {
  console.log(
    `Hello. Welcome to the land of JavaScriptia. An evil warlock has been troubling these lands. His name is ${warlock.name}. A group of warriors have assembled; ${archer.name} 
    of the ${archer.team} carrying her ${archer.weapons[0]} and ${archer.weapons[1]},  ${mage.name} of the ${mage.team} carrying his ${mage.weapons[0]} and ${mage.weapons[1]},  
    and  ${swordsman.name} of the ${swordsman.team} carrying his ${swordsman.weapons[0]} and ${swordsman.weapons[1]}. How will they compare to the mighty ${warlock.name}? He is 
    so powerful, coming from the ${warlock.team}. He has so many items of power ${warlock.weapons} and even more that I do not speak of. We shall hope that this mismatched group
    can take on such a powerful enemy. Who would save us otherwise?`
  )
}



const ourJourneyBegins = function() {
  console.log(`Our group of warriors have started tracking ${warlock.name}. ${archer.name} had the best tracking skills of any
  woodlands ranger. She had heard of the warlock, ${warlock.name}, his addiction left a pungent aroma wafting for days in his waking trail. His desire for power had possessed his life. While his origins unknown, ${warlock.name} had been exposed 
  at a young age to Astral Dust. Made in the Underworld, it's payment was in sacrifice. ${archer.name} had heard of the power that those who used the ${warlock.specialItem} could
  have immense power. ${mage.name} spoke up, dusting off his robes. "We have been traveling for days. Let us take rest at the next town. I could use a strong drink and soft cot."
  They all agreed. ${archer.name} had a strange feeling. The ${archer.weapons[1]} contained the pure energy of her home starlight, and she had learned from experience to trust it.
  Like a mirage, a town appeared in the distance. The sun grew hotter. The wind blew harder. A smell. Sand kidcked and blew into their faces. A stench. Suffocating humidity, and the sun chased away by dark, foreboding clouds.
  The pungent smell could not be escaped. Engulfing each of the warriors lungs, the thought of a town could not even be contained. Timlessness. Each warrior seemed lost in time
  itself, only to awaken again to that smell. A flicker among the shadows. No definable feauters, just a shadow among them. The warriors rally their strength. "Take formation"
  yelled ${swordsman.name} hoisting his ${swordsman.weapons[0]} high in the air. From the shadows, dark flames danced all around them. They knew, it was time.
  `)
  while (archer.healthPoints > 0 || mage.healthPoints > 0 || swordsman.healthPoints > 0) {
    battleSequence();
  }
  console.log(`The group has been defeated. Evil lives on. Hopefully a hero will come soon!`);
}

const finalScene = function() {
  while ( knight.healthPoints > 0 || warlock.healthPoints > 0) {
    finalBattle();
  }
  console.log(`Awakening...${knight.name} open's his eyes. Frozen in place, mind racing, franticly breathing the hero sits upright in bed. He looks around and recognizes the decor.
  The sweet smell wafting through the open windows looking down on to a city below. He stands and walks towards the balcony, shivering his terrors away. "Could that really have been
  just a dream?". Pondering to himself now, leaning onto the railing questioning his own paranoia. He sees a scout team riding in the distance, and they are making haste for the 
  guard tower positioned on the outskirts. A thought crawls into his head, "Could this be what I dreamt of, has the evil warlock ${warlock.name} struck down the group of warriors?"...`);
  
}


let battleSequence = function() {
  let whoTOattack = function() {
    if (archer.healthPoints > 0) {
      return archer; 
    } else if (mage.healthPoints >0) {
      return mage;
    } else (swordsman.healthPoints >0); {
      return swordsman;
    }
  }
  if (archer.healthPoints > 0) {
    console.log(archer.battleCry());
    console.log(archer.basicAttack(archer, warlock, 0));
  } 
  if (mage.healthPoints > 0) {
    console.log(mage.battleCry());
    console.log(mage.basicAttack(mage, warlock, 0));
  } 
  if (swordsman.healthPoints > 0) {
    console.log(swordsman.battleCry());
    console.log(swordsman.basicAttack(swordsman, warlock, 0));
  } 
  if (archer.healthPoints > 0 || mage.healthPoints > 0 || swordsman.healthPoints > 0) {
    if (warlock.healthPoints > 0) {
      if (warlock.healthPoints > 10) {
      console.log(warlock.disrespect(whoTOattack()));  
      console.log(warlock.basicAttack(warlock, whoTOattack(), 0));
      } else (warlock.healthPoints < 10); {
      console.log(warlock.ritual());
      }
    }
  } 
}

let finalBattle = function() {
  let knightBattleFunctions = [f1, f2, f3, f4, f5, f6, f7, f8, f9, f10];
 
    function f1() {
      console.log(knight.drink());
    }
    function f2() {
      console.log(knight.drink());
    }
    function f3() {
      console.log(knight.battleCry());
    }
    function f4() {
      console.log(knight.battleCry());
    }
    function f5() {
      console.log(knight.basicAttack(knight, warlock, 0));
    }
    function f6() {
      console.log(knight.basicAttack(knight, warlock, 0));
    }
    function f7() {
      console.log(knight.basicAttack(knight, warlock, 0));
    }
    function f8() {
      knight.activateSpecial(knight, warlock);
    }
    function f9() {
      console.log(knight.basicAttack(knight, warlock, 0));
    }
    function f10() {
      knight.activateSpecial(knight, warlock);
    }

    function randomNumber(n) {
      return Math.floor( Math.random() * n );
    }
    
  if (knight.healthPoints > 0) {
    console.log(`Knight ************************************************************************************turn`);
    
    knightBattleFunctions[ randomNumber( knightBattleFunctions.length ) ]();
    if (warlock.healthPoints > 30) {
      knightBattleFunctions[ randomNumber( knightBattleFunctions.length ) ]();
      knightBattleFunctions[ randomNumber( knightBattleFunctions.length ) ]();
    } else if (warlock.healthPoints > 0) {
      knightBattleFunctions[ randomNumber( knightBattleFunctions.length ) ]();
    } else {
      console.log(`The realm is saved.`);
    }
    
  }
  let  warlockBattleFunctions = [fn1, fn2, fn3, fn4, fn5, fn6, fn7, fn8, fn9, fn10];
 
  function fn1() {
    console.log(warlock.smoke());
  }
  function fn2() {
    console.log(warlock.smoke());
  }
  function fn3() {
    console.log(warlock.disrespect(knight));
  }
  function fn4() {
    console.log(warlock.disrespect(knight));
  }
  function fn5() {
    console.log(warlock.basicAttack(warlock, knight, 0));
  }
  function fn6() {
    console.log(warlock.basicAttack(warlock, knight, 0));
  }
  function fn7() {
    warlock.activateSpecial(warlock, knight);
  }
  function fn8() {
    console.log(warlock.basicAttack(warlock, knight, 0));
  }
  function fn9() {
    console.log(warlock.basicAttack(warlock, knight, 0));
  }
  function fn10() {
    warlock.activateSpecial(warlock, knight);
  }

  function randomNumber(n) {
    return Math.floor( Math.random() * n );
  }
  if (knight.healthPoints > 0) {
    console.log(`Warlock **************************************************************turn`);
    warlockBattleFunctions[ randomNumber( warlockBattleFunctions.length ) ]();
    if (warlock.healthPoints > 30) {
      warlockBattleFunctions[ randomNumber( warlockBattleFunctions.length ) ]();
      warlockBattleFunctions[ randomNumber( warlockBattleFunctions.length ) ]();
    } else if (warlock.healthPoints > 0) {
      warlockBattleFunctions[ randomNumber( warlockBattleFunctions.length ) ]();
    } else if (warlock.healthPoints <= 0) {
      warlock.healthPoints =  100;
      warlock.attack = 25;
      warlock.specialBonus = 50;
      console.log(`The realm is saved. Or is it? ${knight.name} celebrates! Hoisting his ${knight.specialItem} shouting "For the King and Glory!". 
      Shadows stir all around him. A dark pit forms upon the ground, he looks to find ${warlock.name}'s body. Absent, his mind scratches to reason and comprehend,
      before...
      
      "You thought it would be this easy, you were wrong." A deep, ominous voice whispers, "You will be in my world now, the Underworld. Only you could have freed me of my mortal body. I have prepared for this,
      witness my true form!"`);
    } else if (knight.healthPoints<= 0){console.log(`Awakening...${knight.name} open's his eyes. Frozen in place, mind racing, franticly breathing the hero sits upright in bed. He looks around and recognizes the decor.
    The sweet smell wafting through the open windows looking down on to a city below. He stands and walks towards the balcony, shivering his terrors away. "Could that really have been
    just a dream?". Pondering to himself now, leaning onto the railing questioning his own paranoia. He sees a scout team riding in the distance, and they are making haste for the 
    guard tower positioned on the outskirts. A thought crawls into his head, "Could this be what I dreamt of, has the evil warlock ${warlock.name} struck down the group of warriors?"...`);}
  }  
}

welcome();
ourJourneyBegins();
finalScene();






