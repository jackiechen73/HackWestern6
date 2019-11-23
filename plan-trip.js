const axios = require('axios');
const w2v = require('word2vec');
const pq = require('js-priority-queue')
const googleKey = "AIzaSyDMUPKgBpm5daZaNtE6CIe92xWHWFoiX64";
const searchRadius = 30000; // number in meters

/**
* @param {string} destination
* @param {integer} days 
* @param {string} name
* @returns {any}
*/
module.exports = async (destination = "Toronto", days = 1, name = 'World') => {
 
  
//  const resultTypes = ["tourist_attraction", "shopping_mall"];
  
  //Call google places
  //Custom algo determine places to visit
  //Call google directions
  
  const googleAttactions = "https://maps.googleapis.com/maps/api/place/textsearch/json"
   + "?query=tourist attractions near " + destination 
   + "&radius=" + searchRadius
   + "&language=en"
   + "&type=tourist_attraction"
   + "&key=" + googleKey;
  
  const googleHotels = "https://maps.googleapis.com/maps/api/place/textsearch/json"
   + "?query=hotels near " + destination 
   + "&radius=" + searchRadius
   + "&language=en"
   + "&key=" + googleKey;
  
  const googleRestarants = "https://maps.googleapis.com/maps/api/place/textsearch/json"
   + "?query=restaurants near " + destination 
   + "&radius=" + searchRadius
   + "&language=en"
   + "&key=" + googleKey;
  
  let attraction_data = "NONE";
  let attraction_data = [];
  try {
    attraction_data = await axios.get(googleAttactions).then(res => res.data);
  } catch (e) {
    console.error("Attractions query failed.");
  }
  console.log(attraction_data);
  let hotel_data = await axios.get(googleHotels).then(res => res.data);
  
  
  //Algo: Reviews, Preferences, Type of attraction, Location, Most popular time on the day.
                    
  let toConsider = [];
  let avgLong = 0;
  let avgLat = 0;
  const acceptableType0 = ["amusement_park", "aquarium", "art_gallery", "church", 
                           "city_hall", "mosque", "museum", "park", "restaurant", 
                           "shopping_mall", "spa", "stadium", "synagogue", "tourist_attraction", 
                           "travel_agency", "university", "zoo"];
  
  for (let i = 0; i < attraction_data["results"].length; i++){
    let type0 = attraction_data["results"][i]["types"][0];
    if (acceptableType1.indexOf(type0) !== -1) {
        let cleanData = {
            address: attraction_data["results"][i]["formatted_address"],
            name: attraction_data["results"][i]["name"],
            rating: attraction_data["results"][i]["rating"],
            totalRatings: attraction_data["results"][i]["user_ratings_total"],
            lat: attraction_data["results"][i]["geometry"]["location"]["lat"],
            long: attraction_data["results"][i]["geometry"]["location"]["lng"],
            place_id: attraction_data["results"][i]["place_id"]
        };
    toConsider.append(cleanData);
    }
  }

  
  for (let i = 0; i < toConsider.length; i++){
    let score = 0;
    score += 0.01 * (toConsider["rating"] - 2.5) * toConsider["totalRatings"];                      //Custom function to balance number of ratings and the average rating
    score -= Math.pow((avgLong-toConsider["long"]), 2) + Math.pow((avgLat-toConsider["lat"]), 2);   //Subtract distance from score, further it is away, the lower the score
    
  }


//   while(scheduleNotFilled){
//     let lowest = queue.dequeue(); 

//     const googleDetails = "maps.googleapis.com/maps/api/place/details/json"
//     + "?place_id= " + lowest["place_id"] 
//     + "&fields=opening_hours"
//     + "&key=" + googleKey;

//     let hours_data = await axios.get(googleDetails).then(res => res.data);
//   }

  for (let i = 0; i < 5; i++){  
    avgLong += cleanData["long"];
    avgLat += cleanData["lat"];
    
  }
  avgLong = avgLong / toConsider.length;
  avgLat = avgLat / toConsider.length;
  calculate scores
  pull from pq
  get top 5
  average their locations
  get closest hotel to this average location
  
  start there

  
  
  // const source = attraction_data["results"][0]["formatted_address"];
  // // console.log(source);
  // let locations = ""
  // for (let i = 1; i < attraction_data["results"].length; i++){
  //   locations += attraction_data["results"][i]["formatted_address"] + "|";
  // }
  // locations = locations.slice(0, -1);
  // // console.log(locations);
  // const googleDirections = "https://maps.googleapis.com/maps/api/directions/json"
  //  + "?origin=" + source
  //  + "&destination=" + source
  //  + "&mode=" + "driving"
  //  + "&language=en"
  //  + "&waypoints=" + locations
  //  + "&key=" + googleKey;
  //   let directions_data = "NONE";
  // try {
  //   directions_data = await axios.get(googleDirections).then(res => res.data);
  // } catch (e) {
  //   console.error("Directions query failed.");
  //   console.error(e);
  // }
  return "Pass"
  // return directions_data;
};