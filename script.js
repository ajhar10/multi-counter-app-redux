const counterEl = document.getElementById("counter");
const incrementEl = document.getElementById("increment");
const decrementEl = document.getElementById("decrement");
const resetEl = document.getElementById("reset");

// Action Identifier 
const INCREMENT = 'increment'
const DECREMENT = 'decrement'
const RESET = 'reset'

// Action Creator 
const increment=(value)=>{
    return {
        type:INCREMENT,
        payload:value
    }
}

const decrement=(value)=>{
    return {
        type:DECREMENT,
        payload:value
    }
}

const reset =(value)=>{
    return {
        type:RESET,
        payload: value 
    }
}

//Initial State
const initialState={
    value:0
}

//Create Reducer

function counterReducer (state=initialState,action){
    if (action.type === "increment") {
        return {
            ...state,
            value: state.value + action.payload,
        };
    } else if (action.type === "decrement") {
        return {
            ...state,
            value: state.value - action.payload,
        };
    } else if(action.type === "reset"){
        return {
            ...state,
            value: state.value - action.payload
        }
    }
    else {
        return state;
    }
}

// create store
const store = Redux.createStore(counterReducer);

const render = () => {
    const state = store.getState();
    counterEl.innerText = state.value.toString();
};

// update UI initially
render();

store.subscribe(render);

// button click listeners
incrementEl.addEventListener("click", () => {
    store.dispatch(increment(5));
});

decrementEl.addEventListener("click", () => {
    store.dispatch(decrement(2));
});
resetEl.addEventListener("click", () => {
    store.dispatch(reset(6))
} )