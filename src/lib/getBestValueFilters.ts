import axios from 'axios';

// Definiraj tip za podatke
type AuctionListing = {
    fuel: string;
    location: string;
    margin: string;
    color: string;
    engineSize: string;
    transmission: string;
};

// Definiraj tip za filtre
type Filters = {
    fuel: string[];
    location: string[];
    margin: string[];
    color: string[];
    engineSize: string[];
    transmission: string[];
};

export default async function getBestValueFilters() {
    const response = await axios.post('https://poklikaj.top/api/best-value/auctions/graphql', {
        query: `
            query AuctionListings {
                auctionListings {
                    fuel
                    location
                    color
                    engineSize
                    transmission
                }
            }
        `
    });

    const data: AuctionListing[] = response.data.data.auctionListings;

    const filters = {
        fuel: [...new Set(data.map((item) => item.fuel))],
        location: [...new Set(data.map((item) => item.location))],
        color: [...new Set(data.map((item) => item.color))],
        engineSize: [...new Set(data.map((item) => item.engineSize))],
        transmission: [...new Set(data.map((item) => item.transmission))]
    };

    return filters;
}


export async function getBestValueCars() {
    const response = await axios.post('https://poklikaj.top/api/best-value/auctions/graphql', {
        query: `
            query AuctionListings {
    auctionListings {
        id
        created_at
        vendor
        vendorId
        title
        url
        firstReg
        mileage
        fuel
        transmission
        kw
        engineSize
        vin
        color
        vat
        margin
        location
        possiblePrice
        deliveryPrice
        reservedPrice
        deliveryWindowStart
        deliveryWindowEnd
        photos {
            img
        }
    }
}

        `
    });

    return response.data.data.auctionListings;


}


export async function getBestValueCarById(id: string) {
    //console.log(id)
    if(id){
    const response = await axios.post('https://poklikaj.top/api/best-value/auctions/graphql', {
        query: `
query AuctionListing {
    auctionListing(id: "${id}") {
        id
        created_at
        vendor
        vendorId
        title
        url
        firstReg
        mileage
        fuel
        transmission
        kw
        engineSize
        vin
        color
        vat
        margin
        location
        possiblePrice
        deliveryPrice
        reservedPrice
        deliveryWindowStart
        deliveryWindowEnd
        photos {
            id
            created_at
            auction_listing_id
            img
            number
        }
    }
}

        `
    });
    //console.log(response.data);
    return response.data.data.auctionListing;
}

}