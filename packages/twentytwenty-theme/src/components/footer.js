import React, { useState, useEffect } from "react";
import { styled, connect } from "frontity";
import Link from "./link";
import SectionContainer from "./styles/section-container";
import globalStyle from "./styles/global-styles";

const Footer = ({ state }) => {
  const sidebar = state.source.get('sidebar');
  const menu = state.source.get('menus');
  const menuFooter = menu.items['footer'];
  const getsidebar = sidebar.items['sidebar-1'];
  const color = state.theme.colors;
  const newtabicon = <svg width="16px" height="14px" viewBox="0 0 16 14" version="1.1"><g id="icon_newtab"><g id="Group-4"><path d="M0 0L0 14L15.5556 14L15.5556 8.94444L14 8.94444L14 12.4444L1.55556 12.4444L1.55556 1.55556L6.61111 1.55556L6.61111 0L0 0Z" id="Fill-1" stroke="none" /><path d="M1.09978 6.73828L6.73828 1.09978L6.73828 0L5.6385 0L0 5.6385L1.09978 6.73828Z" transform="translate(5.703483 3.113833)" id="Fill-2" stroke="none" /><path d="M0 0L0 1.55556L3.95578 1.55556L3.95267 1.55828L5.05244 1.55828L5.05244 2.65806L5.05556 2.65533L5.05556 6.61111L6.61072 6.61111L6.61072 0L0 0Z" transform="translate(8.9446 0)" id="Fill-3"  stroke="none" /></g></g></svg>;

 // console.log(menuFooter);
  //console.log(getsidebar);

    //console.log(data);

       return(
        <FooterSection bg={color.red}>
          <Container textColor={color.navy}>
              <List>
                {menuFooter.map((item, index) => {
                  return(
                    [item.parent.title && 
                      <Item key={index}>
                        <ItemLink href={item.parent.url} target={item.parent.target}><div className="newtab"><span>{item.parent.title}</span> {item.parent.target && [newtabicon]}</div></ItemLink>
                      </Item>
                    ]
                  )
                })}
              </List>
              {getsidebar.map((items,index)=> {
                if(items.type == 'text')
                  return( 
                    <>
                      <span className="title">{items.instance.title}</span>
                      <div dangerouslySetInnerHTML={{ __html: items.instance.text }}></div>
                    </>
                  )
              })}
            </Container>
          </FooterSection>
        );
};

const FooterSection = styled.footer`
  position:relative;
	z-index:1;
  display:block;
  background:${props=>props.bg};
  font-family: "Ginto Normal Bold";
  padding: 100px 0 40px 0;
  text-align:center;
  .title{
    font-family: "Ginto Nord Bold";
    text-transform: uppercase;
    font-size:14px;
  }
  .flinks{
    font-family: "Ginto Normal Regular";
    font-size:14px;
    padding-top: 10px;
    a{
      padding:0 10px;
      &:hover{
        color:#fff;
      }
    }
  }
  .copyright{
    font-family: "Ginto Normal Regular";
    margin:auto;
    font-size:12px;
    border-top: 1px solid;
    padding: 20px 0 25px 0;
    margin-top: 45px;
    a{
      text-decoration: underline;
    }
  }

  @media (max-width:767px){
    padding: 40px 20px 20px 20px;
    ul{
      padding:0;
      margin-bottom: 20px;
      li{
        display:block;
        border-bottom:1px solid;
        a{
          padding:15px 0;
          display:inline-block;
        }
        &:last-child{
          border-bottom:0;
        }
        &:after{
          display:none;
        }
      }
    }
    .copyright{
      margin-top: 28px;
    }
  }

`;
const Container = styled.div`
  max-width:1290px;
  margin:auto;
  padding:0 15px;
  color:${props=>props.textColor};
  a{
    color:${props=>props.textColor};
  }
`;
const List = styled.ul`
  margin: 0;
  list-style: none;
  text-align: center;
  font-size: 14px;
  display:block;
  border-top:2px solid;
  border-bottom:1px solid;
  padding:12px 0 18px 0;
  margin-bottom: 40px;
`;
const Item = styled.li`
  display: inline-flex;
  &:after{
    content:'  ';
    display: inline-block;
    padding: 0 16px;
  }
  &:last-child{
    &:after{
      content:'';
      display:none;
    }
  }
`;
const ItemLink = styled.a`
  color:${props=>props.textColor};
  background:url(${props=>props.icon}) no-repeat;  
  &:hover{
    color:#fff;
  }
  &:hover svg{
    fill:#fff;
  }
  .newtab{
    display: flex;
    align-items: center;
    svg{
      margin-left: 10px;
      margin-bottom: -3px;
      fill:#01203F;
    }
    &:hover svg{
        fill:#fff;
      }
  }
`;



export default connect(Footer);
