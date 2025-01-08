'use server';
import axios from 'axios';

export async function getPriceAuction(token: string) {
    console.log(token);

    var data = {
        'query': {
            'has_ended': true,
            'is_flash': false
        }
    }
      
    let config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: 'https://poklikaj.top/api/p2p/price-auctions/data',
      headers: { 
        'Content-Type': 'application/json', 
        //'Authorization': `Bearer ${token}`
      },
      data : data
    };
      axios.request(config)
      .then((response) => {
        console.log(JSON.stringify(response.data));
        return {
            success: true,
            message: response.data
        }
      })
      .catch((error) => {
        console.log(JSON.stringify(error));
        return {
            success: false,
            message: JSON.stringify(error)
        }
      });
    


}