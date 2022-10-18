const express = require("express");
const router = express.Router();
const fetch = require("node-fetch");
const { verifyToken } = require("../util/auth");

router.get("/characters", verifyToken, async (req, res) => {
  let queryParams = req.query;
  let url = new URL("https://rickandmortyapi.com/api/character");
  if (queryParams) {
    console.log("[characters] queryParams: ", queryParams);
    Object.keys(queryParams).forEach((key) => url.searchParams.append(key, queryParams[key]));
  }
  // console.log("URL: ", url);
  fetch(url, {
    method: "GET",
    queryParams: queryParams,
    headers: { "Content-Type": "application/json" },
  })
    .then((res) => res.text())
    .then((text) => {
      res.send(text);
    })
    .catch((error) => {
      console.log("ERROR: ", error);
      res.status(500).send(error);
    });
});
router.get("/characters/:id", verifyToken, (req, res) => {
  const id = req.params.id;
  let filters = req.query;
  console.log("[getCharactersByid] filters: ", filters);
  console.log("[getCharactersByid] id: ", id);
  fetch("https://rickandmortyapi.com/api/character/" + id, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  })
    .then((res) => res.text())
    .then((characters) => {
      console.log("GET character by id: ", characters);
      try {
        if (characters && characters.length > 0) {
          if (filters && Object.keys(filters).length > 0) {
            let filtered = filters ? filterCharacters(JSON.parse(characters), filters) : characters;
            console.log("[getCharactersById] filtered: ", filtered);
            res.send(filtered);
          } else {
            res.send(characters);
          }
        } else {
          res.send([]);
        }
      } catch (error) {
        console.log("ERROR: ", error);
        res.status(500).send(error);
      }
    })
    .catch((error) => {
      console.log("ERROR: ", error);
      res.status(500).send(error);
    });
});
const filterCharacters = function (charactersList, filters) {
  console.log("name: ", filters.name);
  console.log("specie: ", filters.specie);
  console.log("status: ", filters.status);
  console.log("gender: ", filters.gender);
  console.log("location: ", filters.location);
  console.log("episode: ", filters.episode);
  let charactersFilteredList = [];
  if (filters.name && filters.name.length > 0) {
    charactersFilteredList = genericfilter(charactersList, charactersFilteredList, filters.name.trim(), "name");
  }
  if (filters.specie && filters.specie.length > 0) {
    charactersFilteredList = genericfilter(charactersList, charactersFilteredList, filters.specie.trim(), "species");
  }
  if (filters.status && filters.status.length > 0) {
    charactersFilteredList = genericfilter(charactersList, charactersFilteredList, filters.status.trim(), "status");
  }
  if (filters.gender && filters.gender.length > 0) {
    charactersFilteredList = genericfilter(charactersList, charactersFilteredList, filters.gender.trim(), "gender");
  }
  if (filters.location && filters.location.length > 0) {
    charactersFilteredList = filterByLocation(charactersList, charactersFilteredList, filters.location.trim());
  }
  if (filters.episode && filters.episode.length > 0) {
    charactersFilteredList = filterByEpisode(charactersList, charactersFilteredList, filters.episode.trim());
  }
  return charactersFilteredList;
};
const genericfilter = function (charactersList, charactersFilteredList, filter, field) {
  if (charactersFilteredList.length > 1) {
    return charactersFilteredList.filter((item) => {
      if (item[field]) {
        return item[field].toLowerCase().includes(filter.toLowerCase());
      }
    });
  } else {
    return charactersList.filter((item) => {
      if (item[field]) {
        return item[field].toLowerCase().includes(filter.toLowerCase());
      }
    });
  }
};
const filterByLocation = function (charactersList, charactersFilteredList, locationFilter) {
  if (charactersFilteredList.length > 1) {
    return charactersFilteredList.filter((character) => {
      if (character.location && character.location.name) {
        if (character.location.name.toLowerCase().includes(locationFilter.toLowerCase())) return character;
      }
    });
  } else {
    let filtered = charactersList.filter((character) => {
      if (character.location && character.location.name) {
        if (character.location.name.toLowerCase().includes(locationFilter.toLowerCase())) return character;
      }
    });
    return filtered;
  }
};
const filterByEpisode = function (charactersList, charactersFilteredList, episodeFilters) {
  let episodes = episodeFilters.split(",");
  if (episodes && episodes.length > 0) {
    if (charactersFilteredList.length > 1) {
      return whichEpisodeHeis(charactersFilteredList, episodes);
    } else {
      return whichEpisodeHeis(charactersList, episodes);
    }
  } else {
    return charactersListFilter;
  }
};
let whichEpisodeHeis = function (charactersFilteredList, episodesSplit) {
  return charactersFilteredList.filter((character) => {
    let characterFound = findCharacterByEpisodes(character, episodesSplit);
    if (characterFound) {
      return characterFound;
    }
  });
};
let findCharacterByEpisodes = function (character, episodes) {
  if (character.episode && character.episode.length > 0) {
    let charcterEpisodesLength = character.episode.length;
    let episodesLength = episodes.length;
    for (let i = 0; i < charcterEpisodesLength; i++) {
      let urlsParts = character.episode[i].split("/");
      if (urlsParts && urlsParts.length > 0) {
        for (let j = 0; j < episodesLength; j++) {
          if ("" + urlsParts[urlsParts.length - 1] === "" + episodes[j]) {
            return character;
          }
        }
      }
    }
  }
  return null;
};

module.exports = router;
