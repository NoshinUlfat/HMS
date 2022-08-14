import React from 'react'
import { useState } from 'react'
import List from './List'

const ToDoList = () => {

  const [currentItem,setCurrentItem] = useState('')
  const [items,setItems] = useState([])

  const onChangeHandler = (e) => {
    setCurrentItem(e.target.value)
  }

  const addCurrentItem = () => {
    setItems([...items,{id: Date.now(),value: currentItem}])
    setCurrentItem('')
  }

  console.log(items)
  
  return (
    <div className = "todolist">
        <div className="todoListContainer">
            <input value={currentItem} onChange={onChangeHandler}/>
            <button onClick={addCurrentItem}>Add</button>
        </div>
        <List items={items} setItems={setItems}/>
    </div>
  )
}

export default ToDoList