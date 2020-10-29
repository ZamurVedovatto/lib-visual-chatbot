import React, { Fragment } from 'react'
import { nanoid } from 'nanoid'
import LabelElement from '../elements/LabelElement'
import TimeButtons from './TimeButtons'

const BotMessage = (props) => {
  const styles = `
    .bot-message-buttons {
      display: flex;
      flex-direction: column;
      margin: 0;
    }
      ul.ul-data-panel {
        margin: 1rem 0;
    }
      ul.ul-data-panel li span {
        font-weight: bold;
        margin-right: 0.15rem;
    }
  `
  const { msg, onClickButton } = props

  const renderItemLabel = ({ key, value }) => {
    switch (key) {
      case 'servico_agendamento':
        return <li key={key}><span>Serviço:</span>{value}</li>
      case 'unidade_agendamento':
        return <li key={key}><span>Unidade:</span> {value}</li>
      case 'data_selecionada':
        return <li key={key}><span>Data:</span> {value}</li>
      case 'horario_agendamento':
        return <li key={key}><span>Hora:</span> {value}</li>
      case 'nome_cliente':
        return <li key={key}><span>Nome:</span> {value}</li>
      case 'cpf_cliente':
        return <li key={key}><span>CPF:</span> {value}</li>
      case 'email_cliente':
        return <li key={key}><span>Email:</span> {value}</li>
      default:
        break;
    }
  }

  const renderDataPanel = () => {
    return (
      <ul key={nanoid()} className="uk-list uk-list-striped uk-list-collapse ul-data-panel">
        { msg.content.variables.map((variable) => renderItemLabel(variable)) }
      </ul>
    )
  }

  const renderItemsPanel = () => {

    return (
      <ul key={nanoid()} className="uk-list uk-list-striped uk-list-collapse mt-4">
        { msg.items.map((item) => (
          <li key={item.id}>
            <div className="option dados-cliente">
              <div><span>Serviço: </span><strong>{item.servico}</strong></div>
              <div><span>Unidade: </span><strong>{item.unidade}</strong></div>
              <div><span>Número: </span><strong>{item.numero}</strong></div>
              <div><span>Data: </span><strong>{item.data}</strong></div>
              <div><span>Hora: </span><strong>{item.horario}</strong></div>
            </div>
          </li>
          )
        )}
      </ul>
    )
  }

  const renderButton = ({ type, value, container, vars, label }) => {
    console.log(msg)

    if (type === 'panel' && msg.content.variables) return renderDataPanel()
    else if (msg.type === 'agenda' && msg.items) return renderItemsPanel()
    else {
      return <button className="uk-button uk-button-primary uk-button-small my-1" key={nanoid()} onClick={() => onClickButton(type, value, container, vars)}>{label}</button>
    }
  }

  const renderNormalButtons = () => {
    return (
      msg && !msg.isHorario && msg.content?.buttons && msg.content?.buttons.map((btn) =>
        renderButton(btn)
      )
    )
  }

  const renderTimeButtons = () => {
    return (
      <TimeButtons buttons={msg.content.buttons} onClickButton={onClickButton} />
    )
  }

  return (
    <Fragment>
      <style>{styles}</style>
      <div className="bot-message">
        <div className="avatar" data-name="Assistente PBH"></div>
        { msg.content.message && <LabelElement mensagem={msg.content.message} /> }
        <div className="bot-message-buttons">
          { (msg.content.isHorario) ?  renderTimeButtons() : renderNormalButtons() }
        </div>
        <span className="time">{msg.time}</span>
      </div>
    </Fragment>
  )
}

export default BotMessage
