// import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState } from 'react'
import { ReactComponent as IconOpen } from './icon-open.svg';
import { ReactComponent as IconClose } from './icon-close.svg';

import Chatbot from './Components/Chatbot';

export const ChatbotComponent = ({ ws }) => {
  console.log(ws)
  const [isOpen, setIsOpen] = useState(false)
  const styles = `
    .hidden, .display-none {
      display: none !important;
    }
    .section-open-chatbot {
      position: fixed;
      right: 1rem;
      bottom: 1rem;
      padding: 0;
      border-radius: 50%;
      box-shadow: 0 2px 15px rgba(0, 0, 0, 0.3) !important;
      transition: 0.2s ease-in-out;
      transform: scale(.5);
    }
    .section-open-chatbot:hover {
      transform: scale(.7);
    }
    .section-open-chatbot .btn-toggle-chatbot {
      transition: 0.25s ease-in-out;
      transform: scale(.6);
    }
    .section-open-chatbot .btn-toggle-chatbot:hover {
      cursor: pointer;
      transform: scale(.75);
    }

    .chatbot-wrapper {
      position: fixed;
      right: 0.75rem;
      bottom: 0.75rem;
      padding: 0;
      transition: .25s ease-in-out;
      box-shadow: 0 5px 15px rgba(0, 0, 0, .5) !important;
      z-index: 9999;
    }
    .chatbot-wrapper .chatbot-header {
      display: flex;
      justify-content: flex-end;
      align-items: center;
      padding: 0.5rem 0.75rem;
      background-color: #659aaf;
      border-bottom: none;
    }
    #btn-close {
      width: 28px;
    }
    #btn-close:hover {
      cursor: pointer;
    }

    .chatbot-wrapper .chatbot-content {
      max-height: 68vh;
      height: 68vh;
      width: 380px;
      border: none;
    }

    /* Responsividade */

    @media only screen and (max-width: 600px) {
      .chatbot-wrapper {
        height: 100%;
        width: 100%;
        right: 0;
        bottom: 0;
      }
      .chatbot-wrapper .chatbot-content {
        height: calc(100% - 36px);
        width: 100%;
      }
      .chatbot-wrapper .chatbot-content {
        height: calc(100vh - 69px);
        width: 100%;
      }
    }
    /* End Responsividade */


    .chat-wrapper {
      display: flex;
      flex-direction: column;
      max-width: 860px;
      height: 100%;
      box-shadow: none;
      background: #efefef;
    }
    .chat-container {
      display: flex;
      flex-direction: column;
      overflow-y: auto;
      overflow-x: hidden;
      position: relative;
      padding: 1rem;
      transition: all 0.25s ease-in-out;
      margin: 0;
      height: calc(100% - 102px);
      background-image: url('https://atendimento.omnisiga.com/chatbot/static/img/pattern.png');
    }
    .chat-container .message-wrapper {
      height: 100%;
      display: flex;
      flex-direction: column;
      padding: 0;
    }
    .user-message {
      align-self: flex-end;
      margin-top: 1rem;
      margin-right: 0;
      margin-bottom: 0.8rem;
      width: auto;
      max-width: 90%;
      min-width: 3rem;
      word-wrap: break-word;
      word-break: break-word;
      font-size: 15px;
      position: relative;
      z-index: 0;
      display: inline-block;
      text-align: left;
      border-radius: 8px;
      background: #168942;
      color: #fff;
      box-shadow: none;
      padding: 1rem;
      font-weight: 400;
    }
    .user-message::after {
      display: none;
    }
    .user-message:first-child {
      border-radius: 16px 0 16px 16px;
    }
    .user-message:last-child {
      border-radius: 16px 16px 0 16px;
    }
    .user-message .time {
      font-size: 10px;
      text-align: right;
      display: block;
      color: #fff;
      font-weight: 100;
      padding-top: 0.15rem;
      margin-top: 0;
    }
    .user-message .avatar::before {
      content: attr(data-name);
      position: absolute;
      font-size: 12px;
      right: 4px;
      top: -18px;
      text-align: right;
      min-width: 50vw;
      display: block;
      color: #909090;
    }
    .bot-message {
      align-self: flex-start;
      margin-top: 1.5rem;
      margin-left: 5rem;
      margin-bottom: 0.8rem;
      width: auto;
      max-width: 90%;
      min-width: 3rem;
      word-wrap: break-word;
      word-break: break-word;
      font-size: 15px;
      position: relative;
      z-index: 0;
      display: inline-block;
      text-align: left;
      border-radius: 8px;
      color: #535354;
      box-shadow: none;
      background: #efefef;
      padding: 1rem;
    }
    .bot-message::before {
      content: "";
      width: 0;
      height: 0;
      transform: rotate(-92deg);
      position: absolute;
      border-top: 15px solid transparent;
      border-bottom: 15px solid transparent;
      border-right: 15px solid #fff;
      left: -8.5px;
      top: 0.5rem;
      z-index: -1;
      display: none;
    }
    .bot-message:first-child {
      border-radius: 0 16px 16px 16px;
    }
    .bot-message:last-child {
      border-radius: 16px 16px 16px 0;
    }
    .bot-message .time {
      font-size: 10px;
      text-align: right;
      color: #818181;
      font-weight: 400;
      padding-top: 0.15rem;
      margin-top: 0;
      display: none;
    }
    .bot-message .avatar {
      background-image: url("./img/bot-avatar.png");
      background-repeat: no-repeat;
      position: absolute;
      background-size: cover;
      left: -5.3rem;
      top: -2rem;
      margin-top: 0.8rem;
      height: 4.2rem;
      width: 4.2rem;
    }
    .bot-message .avatar::after {
      content: "";
      height: 4rem;
      width: 4rem;
      border-radius: 4rem;
      position: absolute;
      bottom: -0.5rem;
      left: -0.5rem;
      z-index: -1;
    }
    .bot-message .avatar::before {
      content: attr(data-name);
      position: absolute;
      margin-bottom: 0.3rem;
      font-size: 12px;
      left: 90px;
      bottom: 48px;
      text-align: left;
      min-width: 50vw;
      display: block;
      color: #909090;
    }
    .chat-message {
      width: auto;
      max-width: 90%;
      min-width: 3rem;
      word-wrap: break-word;
      word-break: break-word;
      padding: 1rem 1.5rem 0.5rem;
      margin-bottom: 0.8rem;
      border-radius: 0.5rem;
      font-size: 15px;
      position: relative;
      z-index: 0;
      display: inline-block;
      text-align: left;
      box-shadow: 1px 2px 4px rgba(0, 0, 0, 0.2);
    }
    .chat-message.image {
      max-width: 100%;
    }
    .chat-message.full-width {
      width: 100%;
    }
    .image.user-message {
      max-width: 100%;
    }
    .image.bot-message {
      max-width: 100%;
    }
    .full-width.user-message {
      width: 100%;
    }
    .full-width.bot-message {
      width: 100%;
    }
    .form-container {
      display: flex;
      background: #f7f7f7;
      box-shadow: 0px -5px 11px rgba(0, 0, 0, 0.2);
      padding: 5px 20px;
      height: 60px;
    }
    .form-container form {
      width: 100%;
      display: flex;
      margin: 0;
    }
    .form-container form .submit-container {
      display: flex;
      align-items: center;
      justify-content: flex-end;
      padding: 0;
      width: 100%;
    }
    .form-container form .submit-container input[type="text"], .form-container form .submit-container input[type="textarea"] {
      color: #272727;
      background: none;
      transition: all 0.2s ease;
      padding: 7px 10px;
      font-size: 15px;
      border: none;
      width: 100%;
      border-bottom: 2px solid #168942;
      transition: all 0.4s ease;
    }
    .form-container form .submit-container input[type="text"]:focus, .form-container form .submit-container input[type="textarea"]:focus {
      outline: none;
      transition: all 0.2s ease;
    }
    .form-container .icon-button {
      background: none;
      padding: 0 0.5rem;
      margin: 0 0 0 1rem;
      border: none;
      font-size: 24px;
      transition: all 0.3s ease;
      color: #3c8abb;
      cursor: pointer;
    }
    .form-container .icon-button:hover {
      color: #90acb8;
      outline: none;
    }
    .form-container .icon-button:focus {
      color: #90acb8;
      outline: none;
    }
    .options-container {
      border-top: 1px solid rgba(0, 0, 0, 0.1);
      text-align: left;
      padding-top: 0.5rem;
      display: flex;
      flex-wrap: wrap;
      width: fit-content;
      margin: 0 auto;
      border: none;
    }
    .options-container .option {
      margin: 0.5rem;
      display: inline-block;
      padding: 0.5rem 1rem;
      border: 2px solid #fff;
      border-radius: 0.5rem;
      cursor: pointer;
      box-shadow: 4px 4px 8px 0px rgba(149, 145, 145, 0.48);
      min-width: 70px;
    }
    .options-container .option:hover {
      border-color: #e0e0e0;
      color: white;
    }
    .btn-agenda {
      text-align: center;
      box-shadow: none !important;
      border-radius: 4px !important;
      cursor: pointer;
      transition: all 0.6s ease-in-out;
      border: solid 1px #cbdb2a !important;
      color: #168942;
      background: #cbdb2a !important;
      text-transform: uppercase;
      font-weight: 500;
    }
    .btn-agenda:hover {
      color: #168942 !important;
      filter: grayscale(90%) !important;
    }
    .btn-servico {
      text-align: center;
      box-shadow: none !important;
      border-radius: 4px !important;
      cursor: pointer;
      transition: all 0.6s ease-in-out;
      border: solid 1px #cbdb2a !important;
      color: #168942;
      background: #cbdb2a !important;
      text-transform: uppercase;
      font-weight: 500;
    }
    .btn-servico:hover {
      color: #168942 !important;
      filter: grayscale(90%) !important;
    }
    .context-btn-wrapper {
      display: flex;
      justify-content: center;
      background: rgba(22, 137, 66, 0.9);
      align-items: center;
      border-radius: 6px 6px 0 0;
      padding: 0 0.5rem;
      z-index: 0;
      height: 5rem;
      margin: 0 auto;
      width: 100%;
    }
    .context-btn-wrapper span {
      margin-right: auto;
      margin-left: 0.5rem;
      color: #fff;
    }
    .context-btn {
      line-height: 1.1;
      height: 2.7rem;
      font-size: 0.95rem;
      font-weight: 100;
      border: none;
      background: #fff;
      color: #168942;
      border-radius: 4px;
      margin: 0 0.25rem;
      padding: 0 0.5rem;
      cursor: pointer;
      transition: all 0.6s ease-in-out;
    }
    .context-btn:hover {
      box-shadow: 0 0 16px rgba(0, 0, 0, 0.3);
    }
    .context-btn:focus {
      outline: 0;
    }
    .slide-in {
      animation: slide-in 1s;
    }
    .slide-out {
      animation: slide-out 1s;
    }
    .cancel-btn {
      border: 1px solid #fff;
      color: #fff;
      background: none;
    }
    .cancel-btn:hover {
      background: #fff;
      color: #168942;
    }
    .thin-line {
      border-top: solid 1px rgba(0, 0, 0, 0.1);
    }
    @keyframes slide-in {
      0% {
        margin-bottom: -5rem;
        opacity: 0;
      }
      100% {
        margin-bottom: 5rem;
        opacity: 1;
      }
    }
    @keyframes slide-out {
      0% {
        margin-bottom: 5rem;
        opacity: 1;
      }
      100% {
        margin-bottom: -5rem;
        opacity: 0;
      }
    }
    .dados-cliente {
      line-height: 1.5rem;
      margin-bottom: 0;
    }
    .dados-cliente:last-child {
      margin-bottom: 0;
    }
    .dados-cliente div {
      display: flex;
      flex-wrap: nowrap;
      flex-direction: column;
      padding: 0.5rem 0;
      width: 100%;
      line-height: 1.15rem;
      border-bottom: 1px dashed rgba(0, 0, 0, 0.1);
    }
    .dados-cliente div:last-child {
      border-bottom: 0;
    }
    .dados-cliente span {
      color: gray;
      white-space: nowrap;
      font-size: 0.8rem;
    }
    .dados-cliente strong {
      font-size: 0.85rem;
      margin-left: 0;
    }
    .submit-container-blocked input[type="textarea"] {
      display: none;
    }
    .submit-container-blocked button i {
      display: none;
    }
    .display-none {
      display: none;
    }
    @media (min-width: 576px) {
      .container {
        max-width: 540px;
      }
    }
    @media (min-width: 768px) {
      .container {
        max-width: 720px;
      }
    }
    @media (min-width: 992px) {
      .container {
        max-width: 960px;
      }
    }
    @media (min-width: 1200px) {
      .container {
        max-width: 1140px;
      }
    }
    @media screen and (max-width: 576px) {
      .options-container .option {
        width: 100%;
        margin: 0.25rem auto;
      }
      .bot-message {
        margin-left: 3.25rem;
      }
      .bot-message .avatar {
        width: 3rem;
        height: 3rem;
        left: -3.5rem;
        top: -1.5rem;
      }
      .bot-message .avatar::before {
        font-size: 12px;
        left: 72px;
        bottom: 44px;
        margin-bottom: 0;
      }
      .btn-agenda {
        width: 30% !important;
      }
      .btn-sim-nao {
        width: 75px !important;
        margin: 0 0.25rem !important;
      }
    }
    @media screen and (max-width: 992px) {
      .chat-wrapper {
        max-width: unset;
      }
      .form-container {
        bottom: 0;
        left: 0;
        right: 0;
        margin: 0;
        width: 100%;
      }
    }

  `

  return (
    <div>
      <style>{styles}</style>
      {
        isOpen ?
          <div className="chatbot-wrapper uk-card uk-card-default">
            <div className="chatbot-header uk-card-header">
              <IconClose id="btn-close" className="chatbot-close-btn" alt="Fechar Chatbot" style={{ height: 53, width: 36 }} type="button" onClick={() => setIsOpen(false)} />
            </div>
            <div className="chatbot-content">
              <Chatbot webSoc={ws} />
              {/* <iframe width="500" height="500" title="Chatbot" src="http://panoramic-transport.surge.sh"></iframe> */}
            </div>
          </div>
          :
          <div className="section-open-chatbot">
            <IconOpen className="btn-toggle-chatbot" alt="Abrir Chatbot" type="button" onClick={() => setIsOpen(true)} />
          </div>
      }
    </div>
  )
}
