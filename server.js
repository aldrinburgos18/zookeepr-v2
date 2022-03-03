const e = require("express");
const express = require("express");
const app = express();

const { animals } = require("./data/animals.json");

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

app.get("/api/animals", (req, res) => {
  let results = animals;
  console.log(req.query);
  if (req.query) {
    results = filterByQuery(req.query, results);
  }
  res.json(results);
});

app.listen(3001, () => {
  console.log(`API server now on port 3001!`);
});
