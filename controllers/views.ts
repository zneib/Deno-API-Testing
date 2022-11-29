const data_api_key = Deno.env.get("DATA_API_KEY")
const app_id = Deno.env.get("APP_ID")
const BASE_URI = `https://data.mongodb-api.com/app/${app_id}/endpoint/data/beta/action`;
const DATA_SOURCE = "deno-cluster";
const DATABASE = "views_db";
const COLLECTION = "views";

const options = {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    "api-key": data_api_key
  },
  body: ""
};

const addView = async ({
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
      const view = await body.value;
      const URI = `${BASE_URI}/insertOne`;
      const query = {
        collection: COLLECTION,
        database: DATABASE,
        dataSource: DATA_SOURCE,
        document: view
      };
      options.body = JSON.stringify(query);
      const dataResponse = await fetch(URI, options);
      const { insertedId } = await dataResponse.json();
      
      response.status = 201;
      response.body = {
        success: true,
        data: view,
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

export { addView };