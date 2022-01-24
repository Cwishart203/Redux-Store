// Store, Reducer, Action, Disptach, State are important elements in Redux archteicture
// The following code is to return the store to the caller which imports this file
// TODO:
//  import { createStore }  from 'redux' with object destructure
//  import reducers from './reducers', the file you created
//  export default the createStore function and pass reducers as input argument


import { createStore } from 'redux';
import reducers from './reducers';

export default createStore(reducers);