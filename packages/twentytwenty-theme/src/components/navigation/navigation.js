import React from "react";
import { connect, styled } from "frontity";
import Link from "../link";
import ButtonLink from "../styles/button"

/**
 * Navigation Component
 *
 * It renders the navigation links
 */

const Navigation = ({ state }) => {
  const menu = state.source.get('menus'); 
  
  const baseurl = state.frontity.url
  //console.log(baseurl,'menuTesting')
  return(
    <NavWrapper>
      <MenuNav>
        <Menu>
          {menu.items.primary.map((nav, index) => {
            // Check if the link matched the current page url
            return (
              <MenuItem key={index} className={nav.parent.slug}>
                {/* If link url is the current page, add `aria-current` for a11y */}
                    {nav.parent.type == 'custom' ? 
                      <ButtonLink className={nav.parent.type + ' primary'} href={nav.parent.url} color={'navy'}>{nav.parent.title}</ButtonLink>
                     : 
                      <MenuLink className={nav.parent.type} color={state.theme.colors['navy']} link={'/'+ nav.parent.url.split(baseurl).join("")}>{nav.parent.title}</MenuLink>
                    }
                  {nav.child && nav.child.map((childs,i) => {
                      return (
                       <MenuItem key={i}>
                          <MenuLink color={state.theme.colors['red']} link={'/'+ nav.parent.url.split(baseurl).join("")}>{childs.title}</MenuLink>
                        </MenuItem>
                      )
                    })}
              </MenuItem>
            );
          })}
        </Menu>
      </MenuNav>
    </NavWrapper>
  );
}
export default connect(Navigation);

const NavWrapper = styled.div`
  
`;

const MenuNav = styled.nav`
  @media (max-width:1023px){
    margin-top: 0px;
  }
`;

const Menu = styled.ul`
  list-style: none;
  margin: 0;
  @media (max-width:1023px){
   display:flex;
   li:not(.request-information){
     display:none;
   } 
  }
`;

const MenuItem = styled.li`
  display: inline-block;
  padding-left: 25px;
  a.custom:hover{
    border-bottom:0;
    &:before, &:after{
      display:none;
    }
  }

  @media (max-width:1023px){
    padding-left:0;
  }

`;

const MenuLink = styled(Link)`
  font-size: 18px;
  line-height: 24px;
  color:${props=>props.color};
  font-family: "Ginto Nord Bold";
  text-transform: uppercase;
  letter-spacing: -0.45px;
  position:relative;

  &:before, &:after{
    transition: width 0.4s cubic-bezier(0.22, 0.61, 0.36, 1);
    -webkit-transition: width 0.4s cubic-bezier(0.22, 0.61, 0.36, 1);
    content: '';
    position: absolute;
    width: 0%;
    height: 2px;
    bottom: -4px;
    margin-top: 0px;
  }
  &:before{
    left: 0px;
  }
  &:after{
    right: 2.5px;
    background: ${props=>props.color};
    transition: width 0.4s cubic-bezier(0.22, 0.61, 0.36, 1);
	  -webkit-transition: width 0.4s cubic-bezier(0.22, 0.61, 0.36, 1);
  }

  &:hover{
    &:before, &:after{
      background: ${props=>props.color};
      width: 100%;
      transition: width 0.4s cubic-bezier(0.22, 0.61, 0.36, 1);
      -webkit-transition: width 0.4s cubic-bezier(0.22, 0.61, 0.36, 1);
    }
    &:after{
      background: transparent;
      width: 100%;
      transition: 0s;
    }
  }
`;
