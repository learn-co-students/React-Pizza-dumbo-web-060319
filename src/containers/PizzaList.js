import React, { Component } from 'react';
import Pizza from '../components/Pizza'
class PizzaList extends Component {

  renderAllPizzas = () => {
    // Map over my pizza props and convert them all to Pizza components
    return this.props.pizzas.map((pizza) => {
      return <Pizza handleClick={this.props.handleClick} key={pizza.id} pizza={pizza} />
      // return <Pizza key={pizza.id} {...pizza} />
    })
  }

  render() {
    return (
      <table className="table table-striped">
        <thead>
          <tr>
            <th scope="col">Topping</th>
            <th scope="col">Size</th>
            <th scope="col">Vegetarian?</th>
            <th scope="col">Edit</th>
          </tr>
        </thead>
        <tbody>
          {
           this.renderAllPizzas()
          }
        </tbody>
      </table>
    );
  }

}

export default PizzaList;