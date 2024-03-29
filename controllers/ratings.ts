// import { config } from "https://deno.land/x/dotenv/mod.ts";
// const { DATA_API_KEY, APP_ID } = config();
const data_api_key = Deno.env.get("DATA_API_KEY")
const app_id = Deno.env.get("APP_ID")
const BASE_URI = `https://data.mongodb-api.com/app/${app_id}/endpoint/data/beta/action`;
const DATA_SOURCE = "deno-cluster";
const DATABASE = "rating_db";
const COLLECTION = "ratings";

const options = {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    "api-key": data_api_key
  },
  body: ""
};

const addRating = async ({
  request,
  response,
}: {
  request: any;
  response: any;
}) => {
  try {
    if (!request.hasBody) {
      response.status = 400;
      response.body = {
        success: false,
        msg: "No Data",
      };
    } else {
      const body = await request.body();
      const rating = await body.value;
      const URI = `${BASE_URI}/insertOne`;
      const query = {
        collection: COLLECTION,
        database: DATABASE,
        dataSource: DATA_SOURCE,
        document: rating
      };
      options.body = JSON.stringify(query);
      const dataResponse = await fetch(URI, options);
      const { insertedId } = await dataResponse.json();
      
      response.status = 201;
      response.body = {
        success: true,
        data: rating,
        insertedId
      };
    }
  } catch (err) {
    response.body = {
      success: false,
      msg: err.toString(),
    };
  }
};



export { addRating };
