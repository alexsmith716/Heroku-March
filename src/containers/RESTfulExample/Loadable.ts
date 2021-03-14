import loadable from '@loadable/component';

const RESTfulExample = loadable( () => import('./RESTfulExample') );

export default RESTfulExample;
