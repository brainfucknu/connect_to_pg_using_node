var pg = require('pg');
var fs = require('fs');
fs.readFile('.pgconf.json', 'utf8', function (err, data) {
  if (err) throw err;
  var config = JSON.parse(data);
  pg.connect(config,function(err, client, done) {
    if(err) {
      return console.error('error fetching client from pool', err);
    }
    client.query('SELECT $1::int AS number', ['1'], function(err, result) {
      //call `done()` to release the client back to the pool
      done();

      if(err) {
        return console.error('error running query', err);
      }
      console.log(result.rows[0].number);
      //output: 1
      client.end();
    });
  });
});
