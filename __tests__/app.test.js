const fs = require('fs');
const request = require('supertest');
const app = require('../lib/app');
const pool = require('../lib/utils/pool');
const Quote = require('../lib/models/Quotes');




describe('app tests', () => {
  beforeEach(() => {
    return pool.query(fs.readFileSync('../../sql/setup.sql', 'utf-8'));
  });
  
  afterAll(() => {
    return pool.end();
  });
  
  it('creates a quote via POST', async() => {
    const response = await request(app)
      .post('/api/v1/quotes')
      .send({
        content: 'Be Careful Not To Choke On Your Convictions. - Darth Vader'
        
      });
  
    expect(response).toEqual({
      content: 'Be Careful Not To Choke On Your Convictions. - Darth Vader'

    });
  });

  it('finds a quote by id via GET', async() => {
    const quote = await Quote.insert({content: 'Be Careful Not To Choke On Your Convictions. - Darth Vader' });
    
    const response = await request(app)
      .get(`/api/v1/quotes/${quote.id}`);
    
    expect(response.body).toEqual(quote);
  });
    
  it('updates a lightsaber by id via PUT', async() => {
    const quote = await Quote.insert({ content: 'Train yourself to let go of everything you fear to lose. - Yoda' });
    
    const response = await request(app)
      .put(`/api/v1/lightsabers/${quote.id}`)
      .send({
        content: 'Train yourself to let go of everything you fear to lose. - Yoda'
        
      });
    
    expect(response.body).toEqual({
      ...quote,
      content: 'Train yourself to let go of everything you fear to lose. - Yoda'
    });
  });

  it('removes a quote by id via DELETE', async() => {
    const quote = await Quote.insert({ content: 'Be Careful Not To Choke On Your Convictions. - Darth Vader' });
    
    const response = await request(app)
      .delete(`/api/v1/quotes/${quote.id}`);
    
    expect(response.body).toEqual(quote);

  });
});
  
