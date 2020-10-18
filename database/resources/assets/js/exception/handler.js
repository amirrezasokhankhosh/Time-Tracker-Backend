import {store} from "../store";
import * as types from "../store/mutation-types";

export default function(e) {

  console.log('handlgin error') ;
  store.commit(types.ERROR, null , {root: true})

  setTimeout(() => {
    store.commit(types.ERROR, e.message , {root: true}) ;
    store.commit(types.SHOW_ERROR, false , {root: true});
  }, 0)
}
