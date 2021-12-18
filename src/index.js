import {App} from './app';

/**
 * Command Line Script app initiator
 */
function bootstrap(){
    const app = new App();
    app.demo();
    app.listen();
}
bootstrap();