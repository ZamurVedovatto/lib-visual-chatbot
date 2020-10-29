import React, { useState, useEffect, useRef } from 'react';
import BarLoader from "react-spinners/BarLoader"
import { nanoid } from 'nanoid'
import { css } from "@emotion/core"
import { ReactComponent as SndMsg } from './.././static/img/sndmsg.svg';
// import sndMsg from './.././static/img/sndmsg.svg'
import useInput from './../elements/useInput'
import BotMessage from './BotMessage'
import UserMessage from './UserMessage'

const Chatbot = ({ webSoc }) => {
  console.log(webSoc)
  const styles = `
    #reiniciar {
      position: sticky;
      top: 0;
    }
    #reiniciar .reset-btn-container {
      display: flex;
      justify-content: flex-end;
      border-bottom: 4px solid white;
      padding: 0.5rem 1rem 0.5rem 0;
    }
    #reiniciar .reset-btn-container button {
      background-color: white;
    }
    #container {
      background-image: url('https://atendimento.omnisiga.com/chatbot/static/img/pattern.png');
    }
  `;

  const initialGreetings = {
    message:'ATENDENTE VIRTUAL',
    type:'simpleChat',
    buttons:[
        {type:'simpleChat', value: 'Olá', label: 'Começar Atendimento'}
    ]
  }
  const { value:mensagem, bind:bindMensagem, reset: resetMensagem } = useInput("")
  const [chat, setChat] = useState([])
  const [ws, setWs] = useState(new WebSocket(webSoc)) //'wss://atendimento.omnisiga.com/chatbot/chatWS?cidade=1'
  const [idConnection, setIdConnection] = useState(null)
  const [firstB, setFirstB] = useState(true)
  const [reconnect, setReconnect] = useState(null)
  const [isLoading, setIsLoading] = useState(false)

  const containerArea = useRef()
  const barraAcao = useRef()
  const barraConfirmacao = useRef()
  const btnAlterarServico = useRef()
  const btnAlterarUnidade = useRef()
  const btnAlterarData = useRef()
  const reiniciar = useRef()

  useEffect(() => {
    connectWS()
  }, [ws, idConnection, firstB, isLoading])

  const connectWS = () => {
    // const protocol = window.location.protocol === 'https:' ? 'wss:' : 'ws:';
    // ws = new WebSocket(protocol + '//' + host + ':' + porta + '/chatbot/chatWS');
    // setWs(new WebSocket('wss://atendimento.omnisiga.com/chatbot/chatWS?cidade=1'));
    setReconnect(null);
    ws.onopen = () => {
      clearTimeout(reconnect);
    };
    ws.onmessage = (evt) => {
      const msg = JSON.parse(evt.data);
      setIsLoading(msg.loading)
      if (idConnection === null) {
        setIdConnection(msg.id)
        if (firstB) {
          setFirstB(false)
          createBotMessage(initialGreetings);
        }
      } else {
        if (msg.hasOwnProperty('message')) {
          createBotMessage(msg);
          parseState(msg);
        }
      }
    };
    ws.onclose = (e) => {
      setReconnect(setTimeout(() => {
        connectWS();
      }, 1000));
    };
    ws.onerror = (err) => {
      console.error('Socket encountered error: ', err.message, 'Closing socket');
      ws.close();
    };
    setIsLoading(false)
  }

	const createBotMessage = (msg) => {
    if (msg && msg.message) {
      if (msg.message.indexOf('__VAZIO__') !== -1) {
        console.log(msg.message, '!== -1');
        ws.send(JSON.stringify({
          id: idConnection,
          message : ''
        }));
      } else {
        let isHorario = false;
        if (msg.buttons) {
          for (let i = 0; i < msg.buttons?.length; i++) {
            if (msg.buttons[i].container === 'horario_agendamento') {
              isHorario = true;
              break;
            }
          }
        }
        msg.isHorario = isHorario;
        msg.time = Date.now();
        createMessage(msg, true);
        console.log(msg);
      }
    }
  }

  const parseState = (msg) => {
    let mostrarData = false;
    let mostrarServico = false;
    let mostrarUnidade = false;
    let horarioSetado = null;
    if (msg.hasOwnProperty('variables')) {
      let getVariables = (function (key, def) {
          for (let i = 0; i < this.length; i++)
            if (this[i]['key'] === key)
              return this[i]['value'];
          return def;
      }).bind(msg.variables);
      mostrarData = getVariables('data_agendamento', null) !== null;
      mostrarServico = getVariables('servico_agendamento', null) !== null;
      mostrarUnidade = getVariables('unidade_agendamento', null) !== null;
      horarioSetado = getVariables('horario_setado', null) !== null;
    }
    if (!((mostrarData || mostrarServico || mostrarUnidade) && !horarioSetado)) {
      barraAcao.current.classList.remove('slide-in');
      barraAcao.current.classList.add('display-none');
    } else {
      barraAcao.current.classList.remove('display-none');
      if (!barraAcao.current.classList.contains('slide-in')) {
        barraAcao.current.classList.add('slide-in');
      }
      btnAlterarServico.current.style.display = mostrarServico ? 'block' : 'none';
      btnAlterarUnidade.current.style.display = mostrarUnidade ? 'block' : 'none';
      btnAlterarData.current.style.display = mostrarData ? 'block' : 'none';
      if (mostrarServico || mostrarUnidade || horarioSetado || mostrarData) {
        reiniciar.current.classList.remove('display-none');
      } else {
        reiniciar.current.classList.add('display-none');
      }
    }
  }

  const adjustScroll = () => {
    const textarea = document.getElementById('container');
    if (containerArea.current) {
      containerArea.current.scrollTo({
        behavior: "smooth",
        top: textarea.scrollHeight
      });
    }
  }

  const formHandleSubmit = (event) => {
    event.preventDefault();
    if (mensagem.trim().length !== 0) {
      createMessage(mensagem, false);
      ws.send(JSON.stringify({ id: idConnection, message: mensagem }));
    }
    resetMensagem();
  }

  const createMessage = (content, bot) => {
    const msg = {
      time: "agora",
      content,
      bot
    }
    setChat(c => [...c, msg]);
    adjustScroll();
  }

  const onClickButton = (type, value, container, vars) => {
    console.log(type, value, container, vars)
		if (idConnection != null) {
			if (type !== 'simpleChat') {
				if (!vars) {
					vars = {}
        } else {
          vars = vars.toString().replace('#', '"');
        }
				try {
					vars = JSON.parse(vars);
				} catch (ex) {
					vars = {};
				}
				ws.send(JSON.stringify({
					id: idConnection,
					type: type,
					selectedValue : value,
					container: container,
					vars: vars
				}));
			} else {
				createMessage(value, false);
				ws.send(JSON.stringify({
					id: idConnection,
					message: value
				}));
			}
    }
    if (value === 'Quero consultar os meus agendamentos pendentes') {
      reiniciar.current.classList.remove('display-none');
    }
  }

  const reiniciarConversa = async () => {
    ws.close();
    setIsLoading(true)
    reiniciar.current.classList.add('display-none')
    barraAcao.current.classList.remove('slide-in');
    barraAcao.current.classList.add('display-none');
    setIdConnection(null)
    setFirstB(true)
    setReconnect(null)
    setChat([])
    setWs(new WebSocket(webSoc))
    connectWS();
  }

  return (
    <div className="chat-wrapper">
      <div className="slide-in-top display-none" id="reiniciar" ref={reiniciar}>
        <div className="reset-btn-container">
          <button className="uk-button uk-button-default uk-button-small" onClick={() => reiniciarConversa()}>Reiniciar Conversa</button>
        </div>
      </div>
      <div className="row chat-container" id="container" ref={containerArea}>

        <div className="col-lg-12 message-wrapper" id="messages">

          {
            chat && chat.map((msg) => (
              msg.bot ?
              <BotMessage key={nanoid()} msg={msg} onClickButton={onClickButton} />
              :
              <UserMessage key={nanoid()} msg={msg} />
              ))
          }

          <div ref={barraAcao} className="thin-line display-none">
            <div id="barraAcao" className="context-btn-wrapper">
              <button ref={btnAlterarServico} id="btnAlterarServico" className="context-btn cancel-btn" onClick={() => onClickButton('flow_action', 'alterar_servico', null, null)}>Alterar Serviço</button>
              <button ref={btnAlterarUnidade} id="btnAlterarUnidade" className="context-btn cancel-btn" onClick={() => onClickButton('flow_action', 'alterar_unidade', null, null)}>Alterar Agência</button>
              <button ref={btnAlterarData} id="btnAlterarData" className="context-btn cancel-btn" onClick={() => onClickButton('flow_action', 'alterar_data', null, null)}>Alterar Data</button>
            </div>
          </div>
        </div>

        <div ref={barraConfirmacao} id="barraConfirmacao" className="context-btn-wrapper slide-in display-none">
          <button className="context-btn">Alterar dado</button>
          <button className="context-btn">Cancelar</button>
        </div>

      </div>
      <div className="row form-container">
        <form id="msg" onSubmit={formHandleSubmit} className="row">
          {
            isLoading ?
              <div className="col-lg-12">
                <BarLoader
                  css={override}
                  color={"#168942"}
                  loading={isLoading}
                  height={10}
                  width={200}
                />
              </div>
              :
              <div className="col-lg-12 submit-container submit-container-blocked" id="barraText">
                <input type="text" {...bindMensagem} placeholder="Digite aqui a sua mensagem" autoComplete="off"/>
                <button type="submit" className="icon-button">
                  <SndMsg />
                  {/* <img src={sendMsg}></img> */}
                </button>
              </div>
          }
        </form>
      </div>
    </div>
  );
}

export default Chatbot;

const override = css `
  display: block;
  margin: 1rem auto 0;
  border-color: red;
`;
