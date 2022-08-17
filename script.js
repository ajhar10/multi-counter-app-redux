//Select DOM Element
const counterContainerEl=document.getElementById('counter_container');
const addButtonEl=document.getElementById('add_counter_btn');
const resetButtonEl=document.getElementById('reset_btn');

//Action Identifier
const INCREMENT = 'increment'
const DECREMENT = 'decrement'

//Action Creator
const increment= (valueObj)=>{
    return {
        type:INCREMENT,
        payload:valueObj
    };
};
const decrement= (valueObj)=>{
    return {
        type:DECREMENT,
        payload:valueObj
    };
};

//Generate Counter Block Using js node creator
function generateCounterBlock(counter_index){
    const counter_div = document.createElement("div");
    counter_div.className = 'p-4 h-auto flex flex-col items-center justify-center space-y-5 bg-white rounded shadow';
    counter_div.id='counter_' + counter_index;

    const result_div = document.createElement("div");
    result_div.className = 'text-2xl font-semibold';
    result_div.id = 'result_' + counter_index;
    result_div.innerText = '0';
    counter_div.appendChild(result_div);

    const action_div = document.createElement("div");
    action_div.className = 'flex space-x-3';
    counter_div.append(action_div);

    const increment_div = document.createElement("button");
    increment_div.className = 'bg-indigo-400 text-white px-3 py-2 rounded shadow';
    increment_div.id = 'increment_btn_' + counter_index;
    increment_div.innerText = "Increment";
    increment_div.onclick=()=>incrementHandler(counter_index);
    action_div.append(increment_div)

    const decrement_div = document.createElement("button");
    decrement_div.className = 'bg-red-400 text-white px-3 py-2 rounded shadow';
    decrement_div.id = 'decrement_btn_' + counter_index;
    decrement_div.innerText = "Decrement";
    decrement_div.onclick=()=>decrementHandler(counter_index);
    action_div.append(decrement_div)

    return counter_div
}

//Counter Array and setup counter initially
const counters = [{value:0, item_index:0}]
counters.map((val,index)=>{
    //render initially block first time
    counterContainerEl.append(generateCounterBlock(index))
})

//Create Reducer Function
function counterReducer(state=counters, action){
    if(action.type === INCREMENT){
        const current_index = action.payload.item_index;
        const local_state = JSON.parse(JSON.stringify(state));
        local_state[current_index].value = local_state[current_index].value + action.payload.data;
        return local_state;
    }else if(action.type === DECREMENT){
        const current_index = action.payload.item_index;
        const local_state = JSON.parse(JSON.stringify(state));
        local_state[current_index].value = local_state[current_index].value - action.payload.data;
        return local_state;
    }else{
        return state;
    }
}

//Create Store
const store = Redux.createStore(counterReducer);

// Render Work 
const render = ()=>{
    const state = store.getState();
    state.map((data,index)=>{
        const result_el = document.getElementById('result_' + index)
        result_el.innerText = data.value.toString();
    });
}
render();
store.subscribe(render);

//btn click listener
addButtonEl.addEventListener("click", ()=>{
    const next_index = counters.length;
    counters.push({value:0, item_index: next_index})
    if(!store.getState()[next_index]) store.getState().push({value: 0, item_index: next_index})
    counterContainerEl.append(generateCounterBlock(next_index));
});
resetButtonEl.addEventListener('click', ()=>{
    counters.map((data, index)=>{
        counters[index].value = 0
        store.getState()[index].value = 0;
    })
    render();
})
function incrementHandler(counter_index){
    const dynamic_val = 5 + counter_index +2 ;
    store.dispatch(increment({data: dynamic_val, item_index: counter_index}))
}
function decrementHandler(counter_index){
    const dynamic_val = 5 + counter_index +1 ;
    store.dispatch(decrement({data: dynamic_val, item_index: counter_index}))
}








