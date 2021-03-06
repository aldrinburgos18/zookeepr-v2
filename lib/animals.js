const fs = require("fs");
const path = require("path");

function filterByQuery(query, animalsArray) {
  let personalityTraitsArray = [];
  let filteredResults = animalsArray;
  if (query.personalityTraits) {
    if (typeof query.personalityTraits === "string") {
      //if string, convert to array
      personalityTraitsArray = [query.personalityTraits];
    } else {
      //same query names becomes an array so conversion is not needed
      //ex. (?personalityTraits=quirky&personalityTraits=rash) becomes (personalityTraits: ['quirky', 'rash'])
      personalityTraitsArray = query.personalityTraits;
    }
    personalityTraitsArray.forEach((trait) => {
      filteredResults = filteredResults.filter(
        //returns animals with traits found in personalityTraitsArray
        //indexOf() = -1 means not found, so we're filtering out those results
        (animal) => animal.personalityTraits.indexOf(trait) !== -1
      );
    });
  }
  //show animals with specified query
  if (query.diet) {
    filteredResults = filteredResults.filter(
      (animal) => animal.diet === query.diet
    );
  }
  if (query.species) {
    filteredResults = filteredResults.filter(
      (animal) => animal.species === query.species
    );
  }
  if (query.name) {
    filteredResults = filteredResults.filter(
      (animal) => animal.name === query.name
    );
  }
  return filteredResults;
}

function findById(id, animalsArray) {
  const result = animalsArray.filter((animal) => animal.id === id)[0];
  return result;
}

function createNewAnimal(body, animalsArray) {
  const animal = body;
  animalsArray.push(animal);
  fs.writeFileSync(
    path.join(__dirname, "../data/animals.json"),
    JSON.stringify({ animals: animalsArray }, null, 2)
  );
  return animal;
}

function validateAnimal(animal) {
  if (!animal.name || typeof animal.name !== "string") {
    return false;
  }
  if (!animal.species || typeof animal.species !== "string") {
    return false;
  }
  if (!animal.diet || typeof animal.diet !== "string") {
    return false;
  }
  if (!animal.personalityTraits || !Array.isArray(animal.personalityTraits)) {
    return false;
  }
  return true;
}

module.exports = {
  filterByQuery,
  findById,
  createNewAnimal,
  validateAnimal,
};
