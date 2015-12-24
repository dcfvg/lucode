(function() {

  var text, code;

  jQuery.get('text.md', function(t) {

    text = t;

      $('#content').html( marked( text ) );

    jQuery.get('code.csv', function(csv) {

      code = csv.split('\n').map(function(line) {
        return line.split('\t');
      });

      code = _(code).indexBy(0).value();


      console.log(code);

      $('#content').html( marked( encrypt(text) ) );

    })
  });

  var encrypt = function(plaintext) {
      var rejected = [];

      var plaintext = plaintext.toLowerCase();
      var ciphertext = "";
      for(var i = 0; i < plaintext.length; i++) {
          var plainCharacter = plaintext.charAt(i);
          if(code[plainCharacter]){
           ciphertext += code[plainCharacter][1]
          } else {
            rejected.push(plainCharacter);
            ciphertext += plainCharacter;
          }
      }
      console.log(_.uniq(rejected));

      return ciphertext;
  }
})();
