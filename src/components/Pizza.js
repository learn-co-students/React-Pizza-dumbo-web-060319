import React from "react"

const Pizza = props => {
  const { selectPizzaToEdit, pizza } = props
  return(
    <tr>
      <td>{pizza.topping}</td>
      <td>{pizza.size}</td>
      <td>{pizza.vegetarian ? "Yes" : "No"}</td>
      <td>
        <button
          type="button"
          className="btn btn-primary"
          onClick={(e) => selectPizzaToEdit(e, pizza)}
        >
          Edit Pizza
        </button>
      </td>
    </tr>
  )
}

export default Pizza
