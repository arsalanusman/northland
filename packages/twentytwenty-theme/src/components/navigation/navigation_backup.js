
import React, { Component } from "react";
import { connect, styled, fetch  } from "frontity";
import Link from "../link";
/**
 * Navigation Component
 *
 * It renders the navigation links
 */
const data = []
class Navigation extends Component {
   constructor(props) {
    super(props);
    this.state = {
      // data:'',
      isLoading: false,
    }
  }
 async componentWillMount(){
    await fetch(this.props.data.source.api+'/wp/v2/menus/2')
      .then(response => response.json())
      .then(res => data.push(res.items));
      this.forceUpdate()
  }
  render() {
    return (
     <NavWrapper>
    <MenuNav>
      <Menu>
        {console.log(data)}
        {data.length ? data.map((items,index)=> {
            <MenuItem key={index}>
              {/* If link url is the current page, add `aria-current` for a11y */}
              <MenuLink
                link={index}
                // aria-current={isCurrentPage ? "page" : undefined}
              >
             {console.log(items,'asdf')}
                {items.title}
              </MenuLink>
            </MenuItem>
          })
       :''}
      </Menu>
    </MenuNav>
  </NavWrapper>
    );

  }
}

export default connect(Navigation);


const NavWrapper = styled.div`
  align-items: center;
  display: flex;
`;

const MenuNav = styled.nav`
  display: none;
  @media (min-width: 1000px) {
    display: block;
    width: 100%;
  }
`;

const Menu = styled.ul`
  display: flex;
  font-size: 1.8rem;
  font-weight: 500;
  letter-spacing: -0.0277em;
  flex-wrap: wrap;
  justify-content: flex-end;
  list-style: none;
  margin: 0;

  @media (min-width: 1220px) {
    margin-top: -0.8rem;
    margin-right: 0px;
    margin-bottom: 0px;
    margin-left: -2.5rem;
  }
`;

const MenuItem = styled.li`
  font-size: inherit;
  line-height: 1.25;
  position: relative;
  margin: 0.8rem 0 0 1.6rem !important;

  @media (min-width: 1220px) {
    margin: 0.8rem 0 0 2.5rem !important;
  }
`;

const MenuLink = styled(Link)`
  display: block;
  line-height: 1.2;
  text-decoration: none;

  &:hover,
  &[aria-current="page"] {
    text-decoration: underline;
  }
`;