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

GameObject.prototype.destroy = function() {
  return `${this.name} was removed from the game.`;
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

CharacterStats.prototype.takeDamage = function() {
  return `${this.name} took damage.`;
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
};

Humanoid.prototype = Object.create(CharacterStats.prototype);

Humanoid.prototype.greet = function() {
  return `${this.name} offers a greeting in ${this.language}.`;
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
};

Hero.prototype = Object.create(Humanoid.prototype);

Hero.prototype.activateSpecial = function() {
  attackDamage = warlock.healthPoints - this.specialBonus;
  if (attackDamage > 0) {
    console.log(
      `${warlock.name} has been hurt by ${knight.name}'s ${
        knight.specialBonusName
      }, but still LIVES!`
    );
  } else {
    console.log(
      `${warlock.name} has been defeated by ${knight.name} using ${
        knight.specialBonusName
      }. Long live the King!`
    );
  }
  return `${this.name} has activated their ${this.specialBonusName} causing  ${
    warlock.name
  } to have their health reduced by ${this.specialBonus}. `;
};

/*
  === Villian ===
  * Special Bonus(%) & Special Bonus Name
  * activateSpecial() // prototype method -> does some math and maybe a cool if else statement!
  * should inherit from Humanoid
*/
const Villain = function(villainElements) {
  Humanoid.call(this, villainElements);
  this.specialBonus = villainElements.specialBonus;
  this.specialBonusName = villainElements.specialBonusName;
};

Villain.prototype = Object.create(Humanoid.prototype);

Villain.prototype.disrespect = function() {
  return `${this.name} spits on the ground and mocks ${knight.name}'s haircut.`;
};

Villain.prototype.activateSpecial = function() {
  if (this.healthPoints < this.specialBonus) {
    return `${this.name} have killed themselves using ${this.specialBonusName}.`
  } else {
    attackDamage = knight.healthPoints - this.specialBonus;
    if (attackDamage > 0) {
      return `${knight.name} has been hurt by ${warlock.name}'s ${warlock.specialBonusName}, but still endures the pain to fight for good!`
    } else { return `${knight.name} has been defeated by ${warlock.name} using ${warlock.specialBonusName}. Long live the evil ${warlock.name}!`}
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
  language: ["Common Tongue", "Shadow Speak"],
  specialBonus: 10,
  specialBonusName: "Ultimate Strike for the King"
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
  weapons: ["Occult Staff of Reaping", "Summoning Book of Underworld", "Robes of Fire", "Circlet of Power", "Rings of Torment"],
  language: ["Common Tongue", "Shadow Speak", "Wyvern Tongue", "Snake Speak"],
  specialBonus: 50,
  specialBonusName: "Sacrificial Summonings"
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
  weapons: ["Staff of Shamalama"],
  language: "Common Tongue"
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
  language: "Common Tongue"
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
  weapons: ["Bow", "Dagger"],
  language: "Elvish"
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

console.log
console.log(warlock.activateSpecial());