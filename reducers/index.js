import {combineReducers} from 'redux'

const ID_COLLECT = 'ID_COLLECT';
const ID_UNCOLLECT = 'ID_UNCOLLECT';



function collectionIdReducer(state=[], action){
	switch(action.type){
		case ID_COLLECT:
			console.log('ID_COLLECT:',state)
			state.push(action.id)
			return state;
		case ID_UNCOLLECT:
			console.log('ID_UNCOLLECT')
			return state.filter(id=>id!=action.id)
	}
  return state;
}

const reducers = combineReducers({
    collectionIds: collectionIdReducer    
});

export const collectId = (id)=>{
	return {type:ID_COLLECT,id}
}

export const unCollectId = (id)=>{
	return {type:ID_UNCOLLECT,id}
}
export default reducers;