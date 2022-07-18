import axios from 'axios';
import config from '../config';

class SearchAPI {
    locationSearch(data){
       return axios.get(config.baseurl+"/search",{params :{data}});
    }
    saveSearchData(data){
       return axios.post(config.baseurl+"/save-search-data", data);
    }
}

export default new SearchAPI();