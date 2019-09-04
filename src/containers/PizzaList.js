import React from 'react';
import Pizza from '../components/Pizza'


const PizzaList = props => {
  const { pizzas } = props

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
        {pizzas.map(pizza =>
          <Pizza
            key={pizza.id}
            pizza={pizza}
            selectPizzaToEdit={props.selectPizzaToEdit}
          />
        )}
      </tbody>
    </table>
  );
}

export default PizzaList;
