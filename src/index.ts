import {CodyConfig} from "./board/code";
import config from './lib/config' ;
import codyServer from './server' ;

const codyConfig: CodyConfig = require('../codyconfig');

const server = codyServer(codyConfig);

server.listen( config.PORT, () => {
  console.log( 'Server listening at port %d', config.PORT );
  console.log({config});
} );

process.on( 'SIGTERM', () => {
  console.log( 'Received SIGTERM, shutting down server' );
  server.close();
  process.exit( 0 );
});
