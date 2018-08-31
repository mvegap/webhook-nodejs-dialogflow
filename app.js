
const functions = require('firebase-functions');
const {WebhookClient} = require('dialogflow-fulfillment');
const {Card, Suggestion} = require('dialogflow-fulfillment');
const http = require('http');
 
process.env.DEBUG = 'dialogflow:debug'; // enables lib debugging statements
 
exports.webhookDNI = functions.https.onRequest((request, response) => {

  const agent = new WebhookClient({ request, response });
  console.log('Dialogflow Request headers: ' + JSON.stringify(request.headers));
  console.log('Dialogflow Request body: ' + JSON.stringify(request.body));
 
  function welcome(agent) {
    agent.add(`Welcome to my agent!`);
  }
 
  function fallback(agent) {
    agent.add(`I didn't understand`);
    agent.add(`I'm sorry, can you try again?`);
}

    
function testing_api(agent){
    agent.add(`Resultado:`);
     
}   
    
function obtener_dni(agent){
      
    const dni = agent.parameters.dni;

    
    if(dni == '74684743')
    {
        agent.add(`Bienvenido Miguel 😊`);
        agent.add(`Tu número de DNI es:  ${dni}`);
    }else{
        agent.add(`Al parecer tu DNI no se encuentra en nuestra base de datos.`);
        agent.add(`😢`);
    }
}

  let intentMap = new Map();
  intentMap.set('Default Welcome Intent', welcome);
  intentMap.set('Default Fallback Intent', fallback);
  intentMap.set('obtener_dni', obtener_dni);
  intentMap.set('testing_api', testing_api);
  // intentMap.set('your intent name here', yourFunctionHandler);
  // intentMap.set('your intent name here', googleAssistantHandler);
  agent.handleRequest(intentMap);
});
