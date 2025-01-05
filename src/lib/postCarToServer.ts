'use server';
import axios from 'axios';

export async function postCarToServer(formData: any, token: string) {
    console.log(token);

    let data = JSON.stringify(formData);
      
    let config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: 'http://rso.poklikaj.si/api/p2p/listings/data',
      headers: { 
        'Content-Type': 'application/json', 
        'Authorization': `Bearer ${token}`
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

    
    // const axios = require('axios');
    // let data = JSON.stringify({
    //   "title": "test 12 3 333 44433333333333333333333333333444",
    //   "user_price": 1000,
    //   "firstReg": "10/05/2019"
    // });
    
    // let config = {
    //   method: 'post',
    //   maxBodyLength: Infinity,
    //   url: 'http://rso.poklikaj.si/api/p2p/listings/data',
    //   headers: { 
    //     'Content-Type': 'application/json', 
    //     'Authorization': 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhdXRoZW50aWNhdGVkIiwicm9sZSI6ImF1dGhlbnRpY2F0ZWQiLCJzdWIiOiJjMWQwNDM4MS0yMDg1LTQ3ZDAtOTFkMS00MGY1MDliYWI2YjAifQ.Gg7Z0r0RdD7pQQGUZhII8NVTADKn6d4aLobQ1ghoHNA'
    //   },
    //   data : data
    // };
    
    // axios.request(config)
    // .then((response) => {
    //   console.log(JSON.stringify(response.data));
    // })
    // .catch((error) => {
    //   console.log(error);
    // });
    


}