const _through = require( 'through2' );
const _file = require( 'vinyl' );
const Config = require( 'pwa-config' );

module.exports = options => {

    const _config = new Config( options );

    return _through.obj( function( file, enc, cb ){

        if( file.path.split( '/' ).pop() === 'index.html' ){

            this.push(
                new _file( {
                    path: 'manifest.json',
                    contents: new Buffer( JSON.stringify( _config.manifest ) )
                } )
            );

            file.contents = new Buffer(
                file.contents
                    .toString()
                    .replace( `</head>`, `${_config.tags}</head>` )
            );

        }

        return cb( null, file );

    } );

};
