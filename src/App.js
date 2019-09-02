import React, { Component, Fragment } from 'react';
import Header from './components/Header'
import PizzaForm from './components/PizzaForm'
import PizzaList from './containers/PizzaList'
class App extends Component {

  // What parts of state should live here?
  // Pizzas --> Sends the data down to the pizza list and render
  state = {
    pizzas: [],
    selectedPizza: {}
  }


  // We want at least one place to render
  // So we use this to make sure to wait for render
  componentDidMount() {
    fetch("http://localhost:3001/pizzas")
    .then(res => res.json())                // Takes a response object and converts it to JSON; returns a Promise
    .then(data => {
      this.setState({
        pizzas: data
      })
    })
  }


  // When I click on the edit button, I need to change the selected Pizza
  handleClick = (pizzaObj) => {
    this.setState({
      selectedPizza: pizzaObj
    })
  }

  handleChange = (e) => {

    // const newPizza = {
    //   ...this.state.selectedPizza,
    //   [e.target.name]: e.target.value
    // }
    // this.setState({
    //   selectedPizza: newPizza
    // })

    this.setState({
      selectedPizza: {
        ...this.state.selectedPizza,
        [e.target.name]: e.target.value
      }
    })
  }

  handleRadioButtonChange = (e) => {
    console.log(e.target.value)
    // If it is vegetarian
    // State should be true
    // If it is not vegetarian
    // State should be false
    if(e.target.value === "Vegetarian") {
      this.setState({
        selectedPizza: {
          ...this.state.selectedPizza,
          vegetarian: true
        }
      })
    } else {
      this.setState({
        selectedPizza: {
          ...this.state.selectedPizza,
          vegetarian: false
        }
      })
    }
  }

  handleSubmit = (selectedPizza) => {
    // PATCH request because I need to persist
    fetch(`http://localhost:3001/pizzas/${selectedPizza.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json"
      }, 
      body: JSON.stringify(selectedPizza)
    })
    // Grab the selectedPizza and update the PizzaList
    const newPizzas = this.state.pizzas.map(pizza => {
      if(pizza.id === selectedPizza.id) {
        //I want to change that pizza
        return selectedPizza
      } else {
        // return back the pizza that was there
        return pizza
      }
    })

    this.setState({
      pizzas: newPizzas
    })
    // console.log('This is after we update our pizza: ', newPizzas)
  }



  render() {
    return (
      <Fragment>
        <Header/>
        <PizzaForm handleSubmit={this.handleSubmit} handleRadioButtonChange={this.handleRadioButtonChange} handleChange={this.handleChange} pizza={this.state.selectedPizza} />
        <PizzaList handleClick={this.handleClick} pizzas={this.state.pizzas} />
      </Fragment>
    );
  }
}

export default App;