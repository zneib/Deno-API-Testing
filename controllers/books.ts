// import { config } from "https://deno.land/x/dotenv/mod.ts";
// const { DATA_API_KEY, APP_ID } = config();
const data_api_key = Deno.env.get("DATA_API_KEY")
const app_id = Deno.env.get("APP_ID")
const BASE_URI = `https://data.mongodb-api.com/app/${app_id}/endpoint/data/beta/action`;
const DATA_SOURCE = "deno-cluster";
const DATABASE = "books_db";
const COLLECTION = "books";

const options = {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    "api-key": data_api_key
  },
  body: ""
};

const addBook = async ({
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
      const book = await body.value;
      const URI = `${BASE_URI}/insertOne`;
      const query = {
        collection: COLLECTION,
        database: DATABASE,
        dataSource: DATA_SOURCE,
        document: book
      };
      options.body = JSON.stringify(query);
      const dataResponse = await fetch(URI, options);
      const { insertedId } = await dataResponse.json();
      
      response.status = 201;
      response.body = {
        success: true,
        data: book,
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

const getBooks = async ({ response }: { response: any }) => {
  try {
    const URI = `${BASE_URI}/find`;
    const query = {
      collection: COLLECTION,
      database: DATABASE,
      dataSource: DATA_SOURCE
    };
    options.body = JSON.stringify(query);
    const dataResponse = await fetch(URI, options);
    const allBooks = await dataResponse.json();

    if (allBooks) {
      response.status = 200;
      response.body = {
        success: true,
        data: allBooks,
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

const getBook = async ({
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
  const book = await dataResponse.json();
  
  if (book) {
    response.status = 200;
    response.body = {
      success: true,
      data: book,
    };
  } else {
    response.status = 404;
    response.body = {
      success: false,
      msg: "No book found",
    };
  }
};

const updateBook = async ({
  params,
  request,
  response,
}: {
  params: { id: string };
  request: any;
  response: any;
}) => {
  try {
    const body = await request.body();
    const { title, completed } = await body.value;
    const URI = `${BASE_URI}/updateOne`;
    const query = {
      collection: COLLECTION,
      database: DATABASE,
      dataSource: DATA_SOURCE,
      filter: { id: parseInt(params.id) },
      update: { $set: { title, completed } }
    };
    options.body = JSON.stringify(query);
    const dataResponse = await fetch(URI, options);
    const bookUpdated = await dataResponse.json();
    
    response.status = 200;
    response.body = { 
      success: true,
      bookUpdated 
    };
    
  } catch (err) {
    response.body = {
      success: false,
      msg: err.toString(),
    };
  }
};

const deleteBook = async ({
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
    const bookDeleted = await dataResponse.json();

    response.status = 201;
    response.body = {
      bookDeleted
    };
  } catch (err) {
    response.body = {
      success: false,
      msg: err.toString(),
    };
  }
};

export { addBook, getBooks, getBook, updateBook, deleteBook };