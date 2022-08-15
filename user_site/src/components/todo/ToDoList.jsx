import React from 'react'
import { useState } from 'react'
import List from './List'
import "./todolist.scss"

const ToDoList = ({setListItems}) => {

  const [currentItem,setCurrentItem] = useState({})
  const [items,setItems] = useState([])

  const onChangeHandler = (e) => {
    setCurrentItem({...currentItem, [e.target.id]: e.target.value })
  }

  const addCurrentItem = () => {
    setItems([...items,{value:currentItem, id: Date.now()}])
    setCurrentItem({mealItemName:"",mealItemAmmount:"",mealItemPrice:""})
    setListItems([...items,{value:currentItem, id: Date.now()}])
  }
  
  return (
    <div className = "todolist">
        <div className="todolistContainer">
            <input id="mealItemName" value={currentItem.mealItemName} onChange={onChangeHandler} placeholder="food item"/>
            <input id="mealItemAmmount" value={currentItem.mealItemAmmount} onChange={onChangeHandler} placeholder="food amount"/>
            <input id="mealItemPrice" value={currentItem.mealItemPrice} onChange={onChangeHandler} placeholder="price"/>
            <button onClick={addCurrentItem}>+</button>
        </div>
        <List items={items} setItems={setItems}/>
    </div>
  )
}

export default ToDoList