import React, { useEffect, useState, Fragment } from 'react'
// import { Pagination } from '@material-ui/lab'
import { nanoid } from 'nanoid'

const TimeButtons = (props) => {
  const styles = `
    .time-buttons-wrapper {
      min-height: 200px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
    }
    .time-buttons-wrapper .time-buttons-items {
      margin-bottom: 0.75rem;
    }
    .time-buttons-wrapper .time-buttons-items button {
      margin: 0.15rem;
    }
  `
  const {buttons, onClickButton} = props
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(3)
  const [items, setItems] = useState([])

  useEffect(() => {
    setTotalPages(Math.ceil(buttons.length / 16))
  }, [totalPages])

  useEffect(() => {
    let secondIndex = (buttons.length < (page * 16)) ? buttons.length : (page * 16)
    setItems(buttons.slice(0, secondIndex))
    handleChange(null, 1)
  }, [buttons])

  const handleChange = (event, value) => {
    console.log(value)
    setPage(value)
    let firstIndex = (value - 1) * 16
    let secondIndex = (buttons.length < (value * 16)) ? buttons.length : (value * 16)
    setItems(buttons.slice(firstIndex, secondIndex))
  }

  return (
    <Fragment>
      <style>{styles}</style>
      <div className="time-buttons-wrapper">
        <div className="time-buttons-items">
          {
            items && items.map((btn) => <button className="uk-button uk-button-primary uk-button-small" key={nanoid()}
            onClick={() => onClickButton(btn.type, btn.value, btn.container, btn.vars)}
            >{btn.label}</button>)
          }
        </div>
        {/* <Pagination count={totalPages} page={page} onChange={handleChange} size="large" /> */}
      </div>
    </Fragment>
  )
}

export default TimeButtons
