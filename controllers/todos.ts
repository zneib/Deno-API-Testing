// import { config } from "https://deno.land/x/dotenv/mod.ts";
// const { DATA_API_KEY, APP_ID } = config();
const data_api_key = Deno.env.get("DATA_API_KEY")
const app_id = Deno.env.get("APP_ID")
const BASE_URI = `https://data.mongodb-api.com/app/${app_id}/endpoint/data/beta/action`;
const DATA_SOURCE = "deno-cluster";
const DATABASE = "todo_db";
const COLLECTION = "todos";

const options = {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    "api-key": data_api_key
  },
  body: ""
};

const addTodo = async ({
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
      const todo = await body.value;
      const URI = `${BASE_URI}/insertOne`;
      const query = {
        collection: COLLECTION,
        database: DATABASE,
        dataSource: DATA_SOURCE,
        document: todo
      };
      options.body = JSON.stringify(query);
      const dataResponse = await fetch(URI, options);
      const { insertedId } = await dataResponse.json();
      
      response.status = 201;
      response.body = {
        success: true,
        data: todo,
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

const getTodos = async ({ response }: { response: any }) => {
  try {
    const URI = `${BASE_URI}/find`;
    const query = {
      collection: COLLECTION,
      database: DATABASE,
      dataSource: DATA_SOURCE
    };
    options.body = JSON.stringify(query);
    const dataResponse = await fetch(URI, options);
    const allTodos = await dataResponse.json();

    if (allTodos) {
      response.status = 200;
      response.body = {
        success: true,
        data: allTodos,
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

const getTodo = async ({
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
    filter: { todoId: parseInt(params.id) }
  };
  options.body = JSON.stringify(query);
  const dataResponse = await fetch(URI, options);
  const todo = await dataResponse.json();
  
  if (todo) {
    response.status = 200;
    response.body = {
      success: true,
      data: todo,
    };
  } else {
    response.status = 404;
    response.body = {
      success: false,
      msg: "No todo found",
    };
  }
};

export { addTodo, getTodos, getTodo };