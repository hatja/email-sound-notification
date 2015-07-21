module.exports = {
  start: function() {

    var Imap = require('imap'),
        inspect = require('util').inspect;
        
    var config = require('./config');

    var imap = new Imap({
      user: config.user,
      password: config.password,
      host: config.host_name,
      port: config.port_number,
      tls: true
    });

    function openInbox(cb) {
      imap.openBox('INBOX', true, cb);
    }

    /*imap.once('ready', function() {
      openInbox(function(err, box) {
        if (err) throw err;
        var f = imap.seq.fetch('1:3', {
          bodies: 'HEADER.FIELDS (FROM TO SUBJECT DATE)',
          struct: true
        });
        f.on('message', function(msg, seqno) {
          console.log('Message #%d', seqno);
          var prefix = '(#' + seqno + ') ';
          msg.on('body', function(stream, info) {
            var buffer = '';
            stream.on('data', function(chunk) {
              buffer += chunk.toString('utf8');
            });
            stream.once('end', function() {
              console.log(prefix + 'Parsed header: %s', inspect(Imap.parseHeader(buffer)));
            });
          });
          msg.once('attributes', function(attrs) {
            console.log(prefix + 'Attributes: %s', inspect(attrs, false, 8));
          });
          msg.once('end', function() {
            console.log(prefix + 'Finished');
          });
        });
        f.once('error', function(err) {
          console.log('Fetch error: ' + err);
        });
        f.once('end', function() {
          console.log('Done fetching all messages!');
          imap.end();
        });
      });
    });*/

    imap.once('ready', function() { 
      openInbox(function (err, box) { 
        if (err){ 
          throw err; 
        } else{ 
          imap.on('mail', function (num){ 
            console.log("New message arrived: ", num);
            var Player = require('player');
            var player = new Player('murloc.mp3');
            player.play(); 
          });  
        } 
      }); 
    });

    imap.once('error', function(err) {
      console.log(err);
    });

    imap.once('end', function() {
      console.log('Connection ended');
    });

    imap.connect();
  }
};
