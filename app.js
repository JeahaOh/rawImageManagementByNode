const dir = './';
const fs = require('fs');
fs.mkdir('./toDelete', ( err ) => {
  if( !err || err.code != 'EEXIST' ) {
    console.log( err );
    return;
  }
});

let aCuts = [];
let arws = [];

console.log( 'START\n');

fs.readdir( dir , (err, all) => {
  if( err ) {
    console.log( err );
    return;
  }
  console.log( 'Total File Length : ' + all.length );

  for( i in all ) {
    if( all[i].indexOf('_.JPG') > 0 ) {
      // console.log( all[i] );
      aCuts.push( ( all[i].replace( '_.JPG', '' ).trim() ) );
      // console.log( all[i] );
    } else if ( all[i].indexOf('.ARW') > 0 ) {
      // console.log( all[i] );
      arws.push( all[i] );
    }
  }
  console.log( 'aCuts' );
  console.log( aCuts );
  console.log( 'arws Length : ' + arws.length );
  // console.log( arws );

  console.log('\n\n');
  for( i in arws ) {
    // arws[i] = arws[i].replace('.ARW', '').trim()
    for( j in aCuts ) {
      console.log(
        '\narw \t\t: %s\naCuts index \t: %d'
        , arws[i]
        , j );
      if( String(arws[i]).indexOf( String(aCuts[j]) ) >= 0 ) {
        console.log(
          String(arws[i]).indexOf( String(aCuts[j]) )
        );
        arws.splice(i, 1);
        // aCuts.splice( j, 1 );
      }
    }
  }
  console.log('\n\n');

  console.log( 'arws Length : ' + arws.length );
  console.log( 'arws toDelete : ');
  console.log( arws );

  for( i in arws ) {
    fs.rename( arws[i], './toDelete/' + arws[i], (err) => {
      console.log( err );
      return;
    })
  }
  
  console.log( '\nEND' );
});
