const data_api_key = Deno.env.get("DATA_API_KEY")
const app_id = Deno.env.get("APP_ID")
const BASE_URI = `https://data.mongodb-api.com/app/${app_id}/endpoint/data/beta/action`;
const DATA_SOURCE = "deno-cluster";
const DATABASE = "coughs_db";
const COLLECTION = "coughs";

const options = {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    "api-key": data_api_key
  },
  body: ""
};

const addCough = async ({
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
      const cough = await body.value;
      const URI = `${BASE_URI}/insertOne`;
      const query = {
        collection: COLLECTION,
        database: DATABASE,
        dataSource: DATA_SOURCE,
        document: cough
      };
      options.body = JSON.stringify(query);
      const dataResponse = await fetch(URI, options);
      const { insertedId } = await dataResponse.json();
      
      response.status = 201;
      response.body = {
        success: true,
        data: cough,
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

const getCoughs = async ({ response }: { response: any }) => {
  try {
    const URI = `${BASE_URI}/find`;
    const query = {
      collection: COLLECTION,
      database: DATABASE,
      dataSource: DATA_SOURCE
    };
    options.body = JSON.stringify(query);
    const dataResponse = await fetch(URI, options);
    const allCoughs = await dataResponse.json();

    if (allCoughs) {
      response.status = 200;
      response.body = {
        success: true,
        data: allCoughs,
      };
    } else {
      response.status = 500;
      response.body = {
        success: false,
        msg: "Internal Server Error",
      };
    }
  } catch (err) {
    response.body = {
      success: false,
      msg: err.toString(),
    };
  }
};

const getCough = async ({
  params,
  response,
}: {
  params: { id: string };
  response: any;
}) => {
  const URI = `${BASE_URI}/findOne`;
  const query = {
    collection: COLLECTION,
    database: DATABASE,
    dataSource: DATA_SOURCE,
    filter: { id: parseInt(params.id) }
  };
  options.body = JSON.stringify(query);
  const dataResponse = await fetch(URI, options);
  const cough = await dataResponse.json();
  
  if (cough) {
    response.status = 200;
    response.body = {
      success: true,
      data: cough,
    };
  } else {
    response.status = 404;
    response.body = {
      success: false,
      msg: "No book found",
    };
  }
};

const deleteCough = async ({
  params,
  response,
}: {
  params: { id: string };
  response: any;
}) => {
  try {
    const URI = `${BASE_URI}/deleteOne`;
    const query = {
      collection: COLLECTION,
      database: DATABASE,
      dataSource: DATA_SOURCE,
      filter: { id: parseInt(params.id) }
    };
    options.body = JSON.stringify(query);
    const dataResponse = await fetch(URI, options);
    const coughDeleted = await dataResponse.json();

    response.status = 201;
    response.body = {
      coughDeleted
    };
  } catch (err) {
    response.body = {
      success: false,
      msg: err.toString(),
    };
  }
};

export { addCough, getCoughs, getCough, deleteCough };