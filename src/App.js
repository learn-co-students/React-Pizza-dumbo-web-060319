import React, { useState, useEffect, Fragment } from 'react';
import Header from './components/Header'
import PizzaForm from './components/PizzaForm'
import PizzaList from './containers/PizzaList'

const API = 'http://localhost:3000/pizzas'

const App = () => {
  const [pizzas, setPizzas] = useState([])
  const [pizzaSubmitted, setPizzaSubmitted] = useState(null)
  const [originalEditablePizza, setOriginalEditablePizza] = useState({})
  const [editablePizza, setEditablePizza] = useState({
    id: null,
    topping: null,
    size: null,
    vegetarian: null
  })

  const fetchPizzas = () => {
    fetch(API)
    .then(res => res.json())
    .then(data => setPizzas(data))
  }

  useEffect(() => {
    pizzaSubmitted === true ? setPizzaSubmitted(null) : fetchPizzas()
  }, [pizzaSubmitted])

  const selectPizzaToEdit = (e, pizza) => {
    setEditablePizza(pizza)
    setOriginalEditablePizza(pizza)
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setEditablePizza({
      ...editablePizza,
      [name]: value
    })
  }

  const handleSubmit = () => {
    if (editablePizza.id && editablePizza !== originalEditablePizza) {
      fetch(API + `/${editablePizza.id}`, {
        method: 'PUT',
        body: JSON.stringify(editablePizza),
        headers: {
          'Content-Type': 'application/json'
        }
      })
      .then(res => res.json())
      .then(setPizzaSubmitted(true))
      .then(setOriginalEditablePizza(editablePizza))
    }
  }

  return (
    <Fragment>
      <Header />
      <PizzaForm
        editablePizza={editablePizza}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
      />
      <PizzaList
        pizzas={pizzas}
        selectPizzaToEdit={selectPizzaToEdit}
      />
    </Fragment>
  )
}
export default App;
