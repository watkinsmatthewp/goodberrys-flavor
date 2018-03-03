'use strict';

process.env.DEBUG = 'actions-on-google:*';
const App = require('actions-on-google').DialogflowApp;
const functions = require('firebase-functions');

const NAME_ACTION = 'get_flavor';
const DATE_ARGUMENT = 'date';

const CLOSED_FLAVOR = 'CLOSED';
const FLAVORS = {
  '2017-12-01': 'Sweet Cream',
  '2017-12-02': 'Jamocha',
  '2017-12-03': 'Strawberry',
  '2017-12-04': 'Peanut Butter',
  '2017-12-05': 'Blackberry',
  '2017-12-06': 'Pistachio',
  '2017-12-07': 'Pralines & Cream',
  '2017-12-08': 'Peppermint',
  '2017-12-09': 'Nutella',
  '2017-12-10': 'Pumpkin',
  '2017-12-11': 'Chocolate Malt',
  '2017-12-12': 'Burgundy Cherry',
  '2017-12-13': 'Raspberry',
  '2017-12-14': 'Butter Pecan',
  '2017-12-15': 'Mint Chocolate Chip',
  '2017-12-16': 'Creme Brulee',
  '2017-12-17': 'Nutella',
  '2017-12-18': 'Strawberry',
  '2017-12-19': 'Chocolate Chip Cookie Dough',
  '2017-12-20': 'Cinnamon Chocolate Chip',
  '2017-12-21': 'Cheesecake',
  '2017-12-22': 'Rum Raisin',
  '2017-12-23': 'Peppermint',
  '2017-12-24': 'Mint Chocolate Chip',
  '2017-12-25': CLOSED_FLAVOR,
  '2017-12-26': 'Jamocha',
  '2017-12-27': 'Chocolate Malt',
  '2017-12-28': 'Peanut Butter',
  '2017-12-29': 'Butter Pecan',
  '2017-12-30': 'Salted Caramel',
  '2017-12-31': 'Eggnog',
  '2018-01-01': 'Sweet Cream',
  '2018-01-02': 'Creme Brulee',
  '2018-01-03': 'Strawberry',
  '2018-01-04': 'Chocolate Malt',
  '2018-01-05': 'Chocolate Chip Cookie Dough',
  '2018-01-06': 'Peppermint',
  '2018-01-07': 'Nutella',
  '2018-01-08': 'Burgundy Cherry',
  '2018-01-09': 'Jamocha',
  '2018-01-10': 'Salted Caramel',
  '2018-01-11': 'Blackberry',
  '2018-01-12': 'Mint Chocolate Chip',
  '2018-01-13': 'Butter Pecan',
  '2018-01-14': 'Peanut Butter',
  '2018-01-15': 'Peppermint',
  '2018-01-16': 'Raspberry',
  '2018-01-17': 'Chocolate Chip Cookie Dough',
  '2018-01-18': 'Pistachio',
  '2018-01-19': 'Pralines & Cream',
  '2018-01-20': 'Sweet Cream',
  '2018-01-21': 'Mint Chocolate Chip',
  '2018-01-22': 'Chocolate Malt',
  '2018-01-23': 'Burgundy Cherry',
  '2018-01-24': 'Cinnamon Chocolate Chip',
  '2018-01-25': 'Butter Pecan',
  '2018-01-26': 'Jamocha',
  '2018-01-27': 'Salted Caramel',
  '2018-01-28': 'Strawberry',
  '2018-01-29': 'Cheesecake',
  '2018-01-30': 'Nutella',
  '2018-01-31': 'Peanut Butter',
  '2018-02-01': 'Sweet Cream',
  '2018-02-02': 'Chocolate Chip Cookie Dough',
  '2018-02-03': 'Mint Chocolate Chip',
  '2018-02-04': 'Burgundy Cherry',
  '2018-02-05': 'Chocolate Malt',
  '2018-02-06': 'Blackberry',
  '2018-02-07': 'Cheesecake',
  '2018-02-08': 'Raspberry',
  '2018-02-09': 'Butter Pecan',
  '2018-02-10': 'Jamocha',
  '2018-02-11': 'Banana Pudding',
  '2018-02-12': 'Pralines & Cream',
  '2018-02-13': 'Cinnamon Chocolate Chip',
  '2018-02-14': 'Strawberry',
  '2018-02-15': 'Peanut Butter',
  '2018-02-16': 'Pistachio',
  '2018-02-17': 'Nutella',
  '2018-02-18': 'Mint Chocolate Chip',
  '2018-02-19': 'Butter Pecan',
  '2018-02-10': 'Sweet Cream',
  '2018-02-21': 'Burgundy Cherry',
  '2018-02-22': 'Jamocha',
  '2018-02-23': 'Chocolate Malt',
  '2018-02-24': 'Salted Caramel',
  '2018-02-25': 'Chocolate Chip Cookie Dough',
  '2018-02-26': 'Peanut Butter',
  '2018-02-27': 'Banana Pudding',
  '2018-02-28': 'Coconut',
  2018-03-01': 'Sweet Cream',
  '2018-03-02': 'Strawberry',
  '2018-03-03': 'Chocolate Malt',
  '2018-03-04': 'Butter Pecan',
  '2018-03-05': 'Jamocha',
  '2018-03-06': 'Blackberry',
  '2018-03-07': 'Chocolate Chip Cookie Dough',
  '2018-03-08': 'Nutella',
  '2018-03-09': 'Pistachio',
  '2018-03-10': 'Burgundy Cherry',
  '2018-03-11': 'Peanut Butter',
  '2018-03-12': 'Coconut',
  '2018-03-13': 'Sweet Cream',
  '2018-03-14': 'Raspberry',
  '2018-03-15': 'Banana Pudding',
  '2018-03-16': 'Cheesecake',
  '2018-03-17': 'Mint Chocolate Chip',
  '2018-03-18': 'Pralines & Cream',
  '2018-03-19': 'Chocolate Malt',
  '2018-03-20': 'Strawberry',
  '2018-03-21': 'Butter Pecan',
  '2018-03-22': 'Salted Caramel',
  '2018-03-23': 'Chocolate Chip Cookie Dough',
  '2018-03-24': 'Pistachio',
  '2018-03-25': 'Mint Chocolate Chip',
  '2018-03-26': 'Burgundy Cherry',
  '2018-03-27': 'Jamocha',
  '2018-03-28': 'Peanut Butter',
  '2018-03-29': 'Pina COlada',
  '2018-03-30': 'Nutella',
  '2018-03-31': 'Banana Pudding'
};
const GOODBYE = '. If there\'s anything else you need, just summon me again by telling your Google Assistant to "talk to Goodberry\'s Flavor."'

Date.prototype.addHours = function(h) {    
   this.setTime(this.getTime() + (h*60*60*1000)); 
   return this;   
}

Date.prototype.toStandardString = function() {
  return (
    this.getFullYear() + '-' +
    ('00' + (this.getMonth() + 1)).slice(-2) + '-' +
    ('00' + this.getDate()).slice(-2)
  );
}


exports.getFlavor = functions.https.onRequest((request, response) => {
  const app = new App({request, response});
  console.log('Request headers: ' + JSON.stringify(request.headers));
  console.log('Request body: ' + JSON.stringify(request.body));

  function getFlavor (app) {
    let todayDateStr = new Date().addHours(-5).toStandardString(); // EST
    let dateStr = app.getArgument(DATE_ARGUMENT) || todayDateStr;
    console.log('User wants to know the flavor of the day for ' + dateStr);
    let flavor = FLAVORS[dateStr];
    console.log(flavor);
    
    let relativeDateToSay = dateStr === todayDateStr ? 'today' : 'on that day';
    if (flavor) {
      if (flavor === CLOSED_FLAVOR) {
        app.tell('Actually, Goodberry\'s is closed ' + relativeDateToSay + GOODBYE);
      } else {
        app.tell('The flavor of the day ' + relativeDateToSay + ' is ' + flavor + GOODBYE);
      }
    } else {
      app.tell('Sorry, I don\'t have information for ' + relativeDateToSay + GOODBYE);
    }
  }

  let actionMap = new Map();
  actionMap.set(NAME_ACTION, getFlavor);
  
  app.handleRequest(actionMap);
});
