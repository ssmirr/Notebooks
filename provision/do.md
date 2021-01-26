# Provision Workshop

> Using the DigitalOcean API to provision remote virtual machines

## Setup

Before we get started, you need to make sure you have an [DigitalOcean account](https://m.do.co/c/1f1bebc48191). DigitalOcean is one of the cheapest and simpliest cloud providers available.

Once you have an account, from the dashboard, menu on the left-hand side, all the way on the bottom, you can click "API", under "Tokens/Keys" click the "Generate New Token" button. Make sure to assign Read and Write scope to the token, so you are allowed to create a virtual machine.

Once you have your API key, store this securely. To use in this workshop, paste in variable box above, so you can use within this notebooks. Remember, you can always edit or delete a token.

```bash | {type: 'command', variables: 'api_token'}
echo -n "{{api_token}}" > TOKEN
```

```bash | {type: 'command', failed_when:'exitCode!=0'}
TOKEN=$(cat TOKEN)
curl -X GET -H 'Content-Type: application/json' -H "Authorization: Bearer $TOKEN" "https://api.digitalocean.com/v2/account"
```

If you see some JSON results related to your account, that means you've succeeded in authenicating with your API token!


## Understanding REST APIs

While many cloud providers provide wrappers and libraries for accessing their services, it is still very useful to understand the how they work under the hood. In most cases, that means working directly with a REST API. 

Briefly, a REST API allows access to clients using a set of request verbs and resource locations. For example, if an API was created to enable an application to get information about user accounts, create new ones, update them, or delete them, the REST API could simply be defined by combining the following HTTP VERBS (`GET`, `POST`, `PUT`, `DELETE`), with resource paths, such as `/users/`.

| HTTP Verb	| Action             |	Example	       |Result  | 
| --------- | ------------------ | --------------- |------- |
| GET	    | Retrieve record(s) | GET /users/	   | Retrieves all users|
| POST	    | Create record	     | POST /users/	   | Creates a new user|
| PUT	    | Update record	     | PUT /users/6	   | Updates user 6|
| DELETE	| Delete record(s)	 | DELETE /users/1 | Deletes user with id 1|

Query parameters can be provided to provide additional information to the request. For example, `GET /users?country=France` would return a list of all users in France.

#### Practicting with a REST Client

Let's see how a client application can communicate with a server using a REST API call.

1. Here we are sending a plain request, using the `GET` verb and providing the resource path `/anything`. We will not get back much, except information about our original request.

```bash | {type: 'command',failed_when: 'exitCode!=0'}
curl --request GET https://httpbin.org/anything
```

2. Here we a sending a request with a payload. Using the `PUT` verb, we send JSON data in our request body to the server. We add headers to our request in order to let the server know we are encoding our request body as JSON.

```bash | {type: 'command', failed_when: 'exitCode!=0'}
curl --request PUT -H "Content-Type: application/json" --data '{"coffee":1,"milk":1,"sugar":1,"chocolate":1}' https://httpbin.org/anything
```

#### Requests and Responses

Once you send a request to a server, you will get back a [response](https://www.tutorialspoint.com/http/http_message_examples.htm). A response typically is composed of several parts: including headers, status code, and body.

<img src="https://github.com/CSC-510/REST/blob/master/img/http.png?raw=true" width=50%>

Headers will may useful information, such as rate-limits quotas, or properties of the response, such as whether it is encoded or compressed in a particular format. The [status code](https://en.wikipedia.org/wiki/List_of_HTTP_status_codes) will allow you to verify the success of an operation or indicate different types of failures. Additional error information may be sent via the request body.

The body will typically contain a JSON-formated object or an array. Some actions, such as deleting an object, may not return any data in the response body.

## Workshop

Now that we understand a bit more about REST APIs, we are going to practice using nodejs to make REST API calls to the [digitalocean api v2](https://developers.digitalocean.com/v2/) to perform several tasks related to provisioning new Virtual Machines.

You will be experimenting with code for provisioning a new server from a cloud provider at a particular region, that is initialized with a specified virtual machine image. The code makes use of the [got api](https://github.com/sindresorhus/got#readme) for making http requests, suitable for interacting with a REST API.

Complete the remaining 7 tasks:

1. List regions.
2. List VM images.
3. Create droplet.
4. Get droplet ip
5. Ping ip
6. Destroy droplet
7. Ping ip, make sure dead.

Remember: You can use `curl` to help debug your calls.

```bash | {type: 'command', failed_when:'exitCode!=0'}
TOKEN=$(cat TOKEN)
curl -X GET -H 'Content-Type: application/json' -H "Authorization: Bearer $TOKEN" "https://api.digitalocean.com/v2/images"
```

1. **List regions**: Run the following code snippet and observe the output of the call. *Modify the code* to print the name of the region (using the `slug` property).

```js | {type: 'script'}
const got    = require('got');

const headers = // Configure our headers to use our token when making REST api requests.
{
	'Content-Type':'application/json',
	'Authorization': 'Bearer ' + require('fs').readFileSync('TOKEN').toString()
};

( async () => {


let response = await got('https://api.digitalocean.com/v2/regions', { headers: headers, responseType: 'json' })
                    .catch(err => console.error(`listRegions ${err}`));

console.log( response.body.regions );

for( var region of response.body.regions) 
{
    console.log( /*Fill in me*/ ); 
}

})()

```

2. **List images**: *Complete the code* to retrieve the [available system images](https://developers.digitalocean.com/documentation/v2/#images). Note by appending `?type=distribution`, you can exclude custom made images. Note, that some images are only available in some regions.

```js | {type: 'script'}
const got    = require('got');

const headers = // Configure our headers to use our token when making REST api requests.
{
	'Content-Type':'application/json',
	'Authorization': 'Bearer ' + require('fs').readFileSync('TOKEN').toString()
};

( async () => {


let response = await got('https://api.digitalocean.com/v2/', { headers: headers, responseType: 'json' })
                    .catch(err => console.error(`listImages ${err}`));

})()

```


3. **Create droplet**: Create an droplet with the specified name, region, and image. You will need to fill in the appropriate variable values in the code below. Note, each time you run this, a new VM will be created!
**Note the value of the droplet.id**, so you can use in the next step.

```js | {type: 'script'}
const got    = require('got');

const headers = // Configure our headers to use our token when making REST api requests.
{
	'Content-Type':'application/json',
	'Authorization': 'Bearer ' + require('fs').readFileSync('TOKEN').toString()
};

( async () => {

var name = "YourName" // Fill in your name!
var region = ""; // Fill one in from #1
var image = ""; // Fill one in from #2

await createDroplet(name,region, image);

async function createDroplet (dropletName, region, imageName )
{
    if( dropletName == "" || region == "" || imageName == "" )
    {
        console.log("You must provide non-empty parameters for createDroplet!" );
        return;
    }

    var data = 
    {
        "name": dropletName,
        "region":region,
        "size":"s-1vcpu-1gb",
        "image":imageName,
        "ssh_keys":null,
        "backups":false,
        "ipv6":false,
        "user_data":null,
        "private_networking":null
    };

    console.log("Attempting to create: "+ JSON.stringify(data) );

    let response = await got.post("https://api.digitalocean.com/v2/droplets", 
    {
        headers:headers,
        json: data
    }).catch( err => 
        console.error(`createDroplet: ${err}`) 
    );

    if( !response ) return;

    console.log(response.statusCode);
    let droplet = JSON.parse( response.body ).droplet;
    console.log(droplet);

    if(response.statusCode == 202)
    {
        console.log(`Created droplet id ${droplet.id}`);
    }
}

})()

```

4. **Get Droplet Information**: Although we have a droplet, we don't know much about it, even it's IP address! Using the [api end point for retrieving a droplet](https://developers.digitalocean.com/documentation/v2/#retrieve-an-existing-droplet-by-id), print out the ip address.

```js | {type: 'script'}
const got    = require('got');

const headers = // Configure our headers to use our token when making REST api requests.
{
	'Content-Type':'application/json',
	'Authorization': 'Bearer ' + require('fs').readFileSync('TOKEN').toString()
};

( async () => {


let response = await got('https://api.digitalocean.com/v2/droplets', { headers: headers, responseType: 'json' })
                    .catch(err => console.error(`listImages ${err}`));

})()

```

5. **Ping**: Ensure you can communicate with your server by pinging its IP address. Update with the following with your IP address from above.

```bash | {type: 'command' }
ping -c 4 
```

6. **Delete droplet**: Delete the droplet, [given the droplet id](https://developers.digitalocean.com/documentation/v2/#delete-a-droplet). This will require you to complete the actual API request. *Hint*: You will know you have successfully deleted the droplet when you get 204 as the statusCode. Remember to select the appropriate HTTP verb to send for the request. 

```js | {type: 'script'}
const got    = require('got');

const headers = // Configure our headers to use our token when making REST api requests.
{
	'Content-Type':'application/json',
	'Authorization': 'Bearer ' + require('fs').readFileSync('TOKEN').toString()
};

( async () => {

/* Fill in your code here! */

})()
```

7. **Ping**: Ensure you can *no longer* communicate with your server by pinging its IP address. Update with the following with your IP address from step 4 above.

```bash | {type: 'command' }
ping -c 4 
```

🏆 Congratulations! If you have successfully completed all these steps, you know a lot more about REST APIs and about automatically provisioning virtual machines from a cloud provider. You can imagine there are many ways to extend this code to automatically maintain and scale your production environment.