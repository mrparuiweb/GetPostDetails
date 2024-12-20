import { Client, Users } from 'node-appwrite';

// This Appwrite function will be executed every time your function is triggered
export default async ({ req, res, log, error }) => {
  // You can use the Appwrite SDK to interact with other services
  // For this example, we're using the Users service
  const client = new Client()
    .setEndpoint(process.env.APPWRITE_FUNCTION_API_ENDPOINT)
    .setProject(process.env.APPWRITE_FUNCTION_PROJECT_ID)
    .setKey(req.headers['x-appwrite-key'] ?? '');
  const users = new Users(client);

  try {
    const response = await users.list();
    // Log messages and errors to the Appwrite Console
    // These logs won't be seen by your end users
    log(`Total users: ${response.total}`);
  } catch(err) {
    error("Could not list users: " + err.message);
  }

  // The req object contains the request data
  if (req.path === "/ping") {
    // Use res object to respond with text(), json(), or binary()
    // Don't forget to return a response!
    return res.text("Pong");
  }

  return res.json({
    motto: "Build like a team of hundreds_",
    connect: "https://www.paruidev.com",
    text:"now try to create all the function"
  });
};


// const sdk = require("node-appwrite");

// module.exports = async function (req, res) {
//     const client = new sdk.Client();
//     const databases = new sdk.Databases(client);

//     client
//         .setEndpoint(req.variables.APPWRITE_FUNCTION_ENDPOINT) // Your Appwrite API endpoint
//         .setProject(req.variables.APPWRITE_FUNCTION_PROJECT_ID) // Project ID
//         .setKey(req.variables.API_SECRET_KEY); // Secret API key

//     try {
//         const posts = await databases.listDocuments("SocialAppDB", "Posts");
//         res.json({ success: true, data: posts.documents });
//     } catch (error) {
//         res.json({ success: false, error: error.message });
//     }
// };


