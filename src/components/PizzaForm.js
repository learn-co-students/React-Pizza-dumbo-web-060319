import React from "react"

const PizzaForm = props => {
  const { handleChange, handleSubmit, editablePizza } = props

  return (
    <div className="form-row">
      <div className="col-5">
        <input name="topping" onChange={(e) => handleChange(e)} type="text" className="form-control" placeholder="Pizza Topping" value={
          editablePizza.topping !== null ? editablePizza.topping : ''
        }/>
      </div>
      <div className="col">
        <select name="size" onChange={(e) => handleChange(e)} value={editablePizza.size !== null ? editablePizza.size : ''} className="form-control">
          <option value="Small">Small</option>
          <option value="Medium">Medium</option>
          <option value="Large">Large</option>
        </select>
      </div>
      <div className="col">
        <div className="form-check">
          <input name="vegetarian" className="form-check-input" type="radio" value={true} defaultChecked={editablePizza ? editablePizza.vegetarian : null}/>
          <label className="form-check-label">
            Vegetarian
          </label>
        </div>
        <div className="form-check">
          <input name="vegetarian" className="form-check-input" type="radio" onChange={(e) => handleChange(e)} value={false} defaultChecked={editablePizza ? !editablePizza.vegetarian : null}/>
          <label className="form-check-label">
            Not Vegetarian
          </label>
        </div>
      </div>
      <div className="col">
        <button type="submit" className="btn btn-success" onClick={() => handleSubmit()}>Submit</button>
      </div>
    </div>
  )
}

export default PizzaForm
