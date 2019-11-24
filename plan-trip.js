const axios = require('axios');
const w2v = require('word2vec');
const pq = require('js-priority-queue')
const googleKey = "AIzaSyDMUPKgBpm5daZaNtE6CIe92xWHWFoiX64";
const searchRadius = 30000; // number in meters

/**
* @param {string} destination
* @param {integer} days 
* @returns {object}
*/
module.exports = async (destination = "Toronto", days = 1) => {
 
    
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
    
    // const googleRestarants = "https://maps.googleapis.com/maps/api/place/textsearch/json"
    //  + "?query=restaurants near " + destination 
    //  + "&radius=" + searchRadius
    //  + "&language=en"
    //  + "&key=" + googleKey;

    let attraction_data = [];
    try {
        attraction_data = await axios.get(googleAttactions).then(res => res.data);
    } catch (e) {
        console.error("Attractions query failed.");
    }
    // console.log(attraction_data);
    let hotel_data = []
    try {
        hotel_data = await axios.get(googleHotels).then(res => res.data);
    } catch (e) {
        console.error("Hotel query failed.");
    }
    
    //Algo: Reviews, Preferences, Type of attraction, Location, Most popular time on the day.
                                        
    let toConsider = [];
    let avgLong = 0;
    let avgLat = 0;
    const acceptableType1 = ["amusement_park", "aquarium", "art_gallery", "church", 
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
            avgLong += attraction_data["results"][i]["geometry"]["location"]["lng"];
            avgLat += attraction_data["results"][i]["geometry"]["location"]["lat"];
            toConsider.push(cleanData);
        }
    }
    
    avgLong = avgLong / toConsider.length;
    avgLat = avgLat / toConsider.length;
    
    for (let i = 0; i < toConsider.length; i++){
        let score = 0;
        score += 0.01 * (toConsider[i]["rating"] - 2.5) * toConsider[i]["totalRatings"];                      //Custom function to balance number of ratings and the average rating
        console.log('score1: ' + score);
        score = score - 5000*(Math.pow((avgLong-toConsider[i]["long"]), 2) + Math.pow((avgLat-toConsider[i]["lat"]), 2));   //Subtract distance from score, further it is away, the lower the score
        console.log('score2: ' + score);
        toConsider[i].ratingScore = score;
    }

// finding the top 5 ranked attractions and adding them to a separate array
// averaging their latitude and longitude to find their average position
    toConsider.sort((data1, data2) => {
        if (data2.ratingScore < data1.ratingScore) { return -1; }
        if (data2.ratingScore > data1.ratingScore) { return 1; }
        return 0;
    });
    
    let topChoices = [];
    let numChoices = 5;
    
    console.log("TOP CHOICES")
    for (let i = 0; i < numChoices; i++) {
      topChoices.push(toConsider[i]);
    }
    console.log(topChoices);
        
    avgLong = 0;
    avgLat = 0;
    let hotelIndex = 0;
    for (let i = 0; i < topChoices.length; i++) {
      avgLong += topChoices[i]['long'];
      avgLat += topChoices[i]['lat'];
    }
    avgLong = avgLong / topChoices.length;
    avgLat = avgLat / topChoices.length;
    console.log(avgLong);
    console.log(avgLat);
    let lat = hotel_data["results"][0]["geometry"]["location"]["lat"]
    let long = hotel_data["results"][0]["geometry"]["location"]["lng"]
    let dist = Math.pow(lat - avgLat, 2) + Math.pow(long - avgLong, 2); 
    // console.log("DIST " + dist);
    for (let i = 1; i < hotel_data["results"].length; i++) {
      lat = hotel_data["results"][i]["geometry"]["location"]["lat"];
      long = hotel_data["results"][i]["geometry"]["location"]["lng"];
      let distTemp = Math.pow(lat - avgLat, 2) + Math.pow(long - avgLong, 2);
      // console.log("DIST " + distTemp);
      if (distTemp < dist){
        hotelIndex = i;
        dist = distTemp;
      }    
    }
    
    let res = {
      topChoices: topChoices,
      hotel: {
        name: hotel_data["results"][hotelIndex]["name"],
        long: hotel_data["results"][hotelIndex]["geometry"]["location"]["lng"],
        lat: hotel_data["results"][hotelIndex]["geometry"]["location"]["lat"]
      }
    }
    // console.log("INDEX " + hotelIndex + " is the closest hotel.");
    // console.log(hotel_data["results"][hotelIndex]["formatted_address"]);
    // console.log(hotel_data["results"][hotelIndex]["name"]);    
    
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
    return res
    // return directions_data;
};