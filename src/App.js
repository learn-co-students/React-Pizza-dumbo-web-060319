import React, { Component, Fragment } from 'react';
import Header from './components/Header'
import PizzaForm from './components/PizzaForm'
import PizzaList from './containers/PizzaList'
class App extends Component {

  state = {
    allPizzas: [],
    selectedPizza: {}
  }

  componentDidMount(){
    fetch("http://localhost:3000/pizzas")
    .then(resp => resp.json())
    .then(data => this.setState({
      allPizzas: data
    }))
  }

  selectPizza = (pizza) => {
    this.setState({
      selectedPizza: pizza
    })
  }

  editToppingAndSize = (e) => {
    this.setState({
      selectedPizza: {
      ...this.state.selectedPizza,
        [e.target.name]: e.target.value
      }
    })
  }

  editVegetarianStatus = (e) => {
    console.log(e.target.value)
    if (e.target.value === "Vegetarian") {
      this.setState({
        selectedPizza: {
          ...this.state.selectedPizza,
            vegetarian: true
        }
      })
    } 
    else {
      this.setState({
        selectedPizza: {
          ...this.state.selectedPizza,
            vegetarian: false
        }
      })
    }
  }

  patchThatPie = (selectedPizza) => {

    fetch(`http://localhost:3000/pizzas/${selectedPizza.id}`, {
      method: "PATCH",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(selectedPizza)
    })
    // if our pizza id matches the id of the selected pizza, change the state
    const newPizzas = this.state.allPizzas.map(pizza => {
      if (pizza.id === selectedPizza.id) {
        return selectedPizza
      } 
      else {
        return pizza
      }
    })
    this.setState({
      allPizzas: newPizzas
    })

    
  }



  render() {
    return (
      <Fragment>
        <Header/>
        <PizzaForm pizza={this.state.selectedPizza} 
          changeHandler={this.editToppingAndSize} 
          handleRadioButton={this.editVegetarianStatus}
          handleSubmit={this.patchThatPie}
        />
        <PizzaList pizzas={this.state.allPizzas} clickHandler={this.selectPizza}/>
      </Fragment>
    );
  }
}

export default App;
