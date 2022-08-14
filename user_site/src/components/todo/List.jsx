import React from 'react'

const List = ({items,setItems}) => {

  const deleteItem = (id) => { 
    const newItems = items.filter(item => item.id !== id)
    setItems(newItems)

    setItems(newItems)
  }
  return (
    <div className='list'>
        <div className="listContainer">
            <ol>
            {items.map((item,index) => {
                return (
                    <li className="listItem" key={index}>
                        {item.value}
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