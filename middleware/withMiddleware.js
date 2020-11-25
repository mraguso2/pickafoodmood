// import withDatabase from './withDatabase';
import withAuth from './withAuth';
import withErrorHandler from './withErrorHandler';

const middleware = handler => withErrorHandler(withAuth(handler));

export default middleware;
