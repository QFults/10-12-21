import { useQuery, useMutation } from '@apollo/client'
import { useState, useEffect } from 'react'
import { useStoreContext } from '../../utils/GlobalState.js'
import { QUERY_ITEMS } from '../../utils/queries.js'
import { ADD_ITEM, MARK_DONE, DELETE_ITEM } from '../../utils/mutations'

const Home = () => {
  const [state, dispatch] = useStoreContext()
  const { loading, data } = useQuery(QUERY_ITEMS)
  
  const [addItem] = useMutation(ADD_ITEM)
  const [markDone] = useMutation(MARK_DONE)
  const [deleteItem] = useMutation(DELETE_ITEM)

  const handleInputChange = ({ target: { value } }) => dispatch({
    type: 'UPDATE_TEXT',
    text: value
  })

  const handleAddItem = async event => {
    event.preventDefault()
    const item = {
      text: state.text,
      isDone: false
    }

    try {
      const { data } = await addItem({
        variables: item
      })
      dispatch({
        type: 'ADD_ITEM',
        item
      })
    } catch (err) {
      console.error(err)
    }
  }

  useEffect(() => {
    if (data) {
      dispatch({
        type: 'GET_ITEMS',
        items: data.items
      })
    }
  }, [data])

  return (
    <>
      <h1>The Home Page</h1>
      <form>
        <p>
          <label htmlFor='text'>item</label>
          <input
            type='text'
            name='text'
            value={state.text}
            onChange={handleInputChange}
          />
        </p>
        <button onClick={handleAddItem}>Add Item</button>
      </form>
      {
        loading ? (
          <span>loading... please wait</span>
        ) : (
          state.items.map(item => (
            <li>{item.text}</li>
          ))
        )
      }
    </>
  )
}

export default Home
