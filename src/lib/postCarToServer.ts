'use server';
import axios from 'axios';


export async function postCarToServer(formData: any, token: string) {
  try {
    let data = JSON.stringify(formData);

    let config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: 'https://poklikaj.top/api/p2p/listings/data',
      headers: { 
        'Content-Type': 'application/json', 
        'Authorization': `Bearer ${token}`
      },
      data: data,
    };

    // Await the axios request
    const response = await axios.request(config);

    // Return success response
    return {
      success: true,
      message: response.data,
    };
  } catch (error: any) {
    // Handle errors and return failure response
    return {
      success: false,
      message: error.response ? error.response.data : error.message,
    };
  }
}


export async function postAuctionToServer(formData: any, token: string) {
  try {
        let data = JSON.stringify(formData);
          
        let config = {
          method: 'post',
          maxBodyLength: Infinity,
          url: 'https://poklikaj.top/api/p2p/price-auctions/data',
          headers: { 
            'Content-Type': 'application/json', 
            'Authorization': `Bearer ${token}`
          },
          data : data
        };
        
          // Await the axios request
        const response = await axios.request(config);

        // Return success response
        return {
          success: true,
          message: response.data,
        };
      } catch (error: any) {
        // Handle errors and return failure response
        return {
          success: false,
          message: error.response ? error.response.data : error.message,
        };
      
      }    
}

