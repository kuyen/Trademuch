import axios from 'axios';

module.exports = {

  init: async() => {
    try {
      let result = await axios.put(`http://${sails.config.elasticsearch.host}/trademuch`,{
        mappings: {
          post: {
            properties: {
              id: {
                type: "string"
              },
              title: {
                type: "string"
              },
              location: {
                type: "geo_point"
              }
            }
          }
        }
      });
      sails.log.info("Mappings OK!",result.data);
      return result.data
    } catch (e) {
      sails.log.error(e)
      throw e
    }
  },

  addPost: async({id, title, location}) => {
    try {
      let result = await axios.post(`http://${sails.config.elasticsearch.host}/trademuch/post`,{
        id: id,
        title: title,
        location: {
          lat: location.lat,
          lon: location.lon
        }
      });
      sails.log.info(result.data);
      return result.data
    } catch (e) {
      sails.log.error(e);
      throw e
    }
  },

  postPlace: async({distance, location, keyword}) => {
    try {
      let geoFilter;
      let filterQuery = {
        match_all: {}
      };
      let sort = [];
      if(keyword){
        filterQuery = {
          term: {
            title: keyword
          }
        }
      }
      if(location){
        geoFilter = {
          geo_distance: {
            distance: distance || '10km',
            location: {
              lat: location.lat,
              lon: location.lon
            }
          }
        }
        sort.push( {
          _geo_distance: {
            location: {
              lat: location.lat,
              lon: location.lon
            },
            order: "asc",
            unit: "km",
            distance_type: "plane"
          }
        })
      }
      let data = {
        query: {
          filtered: {
            query: filterQuery,
            filter: geoFilter
          }
        },
        sort: sort
      };

      let result = await axios({
        method: 'get',
        url: `http://${sails.config.elasticsearch.host}/trademuch/post/_search`,
        data: data
      });
      sails.log.info("query data",JSON.stringify(data, null, 2));
      sails.log.info("return data",JSON.stringify(result.data, null, 2));
      return result.data.hits.hits
    } catch (e) {
      sails.log.error(e);
    }
  },

}
