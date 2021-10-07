import React, { useRef } from "react";
import { styled, connect, Global } from "frontity";
import Link from "../link";
import Navigation from "../navigation/navigation";
import ButtonLink from "../styles/button"

const MobileMenuModal = ({ state }) => {
  const menu = state.source.get('menus');
  const baseUrl = state.frontity.url;
  const newtabicon = <svg width="16px" height="14px" viewBox="0 0 16 14" version="1.1"><g id="icon_newtab"><g id="Group-4"><path d="M0 0L0 14L15.5556 14L15.5556 8.94444L14 8.94444L14 12.4444L1.55556 12.4444L1.55556 1.55556L6.61111 1.55556L6.61111 0L0 0Z" id="Fill-1" stroke="none" /><path d="M1.09978 6.73828L6.73828 1.09978L6.73828 0L5.6385 0L0 5.6385L1.09978 6.73828Z" transform="translate(5.703483 3.113833)" id="Fill-2" stroke="none" /><path d="M0 0L0 1.55556L3.95578 1.55556L3.95267 1.55828L5.05244 1.55828L5.05244 2.65806L5.05556 2.65533L5.05556 6.61111L6.61072 6.61111L6.61072 0L0 0Z" transform="translate(8.9446 0)" id="Fill-3"  stroke="none" /></g></g></svg>;
  //console.log(menu, 'MY MENU');
  return (
    <Modal id="mobileModal">
      <ModalContainer>
        <div className="bottom">
          <ul className="primaryMenu">
            {menu.items.primary.map((nav, index) => {
              return (
                  <li key={index}><a href={nav.parent.url && (nav.parent.url.indexOf(baseUrl) > -1) ? "/" + nav.parent.url.split(baseUrl).join('') : nav.parent.url.split(baseUrl).join('')} target={nav.parent.target}>{nav.parent.title}</a></li>
              )
            })}
          </ul>
          <ul className="secondryMenu">
            {menu.items.footer.map((nav, index) => {
              return (
              <li key={index}><a href={nav.parent.url.split(baseUrl).join("")} target={nav.parent.target}>{nav.parent.title} {newtabicon}</a></li>
              )
            })}
          </ul>
          {menu.items.primary.map((nav, index) => {
              return (
                  <>
                    {nav.parent.type == 'custom' && <ButtonLink className="primary" key={index} href={nav.parent.url} color={'blue'} target={nav.parent.target}>{nav.parent.title}</ButtonLink>}
                  </>
              )
          })}
        </div>
      </ModalContainer>
    </Modal>
  );

};

const Modal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: #ff0000;
  z-index: 10;
  display: none;
  @media (min-width:1023px){
    display:none;
  }
`;
const ModalContainer = styled.div`
  padding:0 25px;
  width: auto;
  margin-top: 60px;
  border-top: 1px solid;
  margin-left: 15px;
  margin-right: 15px;
  height: 90%;
  overflow: auto;
  ul{
    margin:0;
    list-style:none;
    color:#01203F;
    li{
      border-bottom:1px solid;
      a{
        color:#01203F;
        display:block;
        padding:15px 0;
        svg{
          position: relative;
          float: right;
          top: 6px;
            fill:#01203F;
        }
      }
    }
  }

  ul.primaryMenu{
    li{
      font-size:24px;
      line-height:24px;
      font-family: "Ginto Normal Bold";
      letter-spacing: -0.5px;
    }
  }
  ul.secondryMenu{
    margin-bottom: 40px;
    li{
      font-size:16px;
      line-height:24px;
      font-family: "Ginto Normal Regular";
    }
  }

  .bottom{
    width:100%;
    padding-bottom:10px;
    padding-top: 20%;
    > a{
      display:block;
      max-width: 100%;
    }
  }

`;

export default connect(MobileMenuModal);
