import React from 'react'
import "./list.scss"

const List = ({items,setItems}) => {

  const deleteItem = (id) => { 
    const newItems = items.filter(item => item.id !== id)
    setItems(newItems)

    // setItems(newItems)
  }
  return (
    <div className='list'>
        <div className="listContainer">
            <ol>
            {items.map((item,index) => {
                return (
                    <li className="listItem" key={index}>
                        <span>Item Name:  {item.value.mealItemName}</span>
                        <span>Item Amount:{item.value.mealItemAmmount}</span>
                        <span>Item Price: {item.value.mealItemPrice}</span>
                        <button className="delete" onClick={() => deleteItem(item.id)}>
                            x
                        </button>
                    </li>
                )
            })}
            </ol>
        </div>
    </div>
  )
}

export default List