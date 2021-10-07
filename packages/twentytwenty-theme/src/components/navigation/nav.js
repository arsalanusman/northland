import React, { useEffect, useState } from "react";
import { connect, styled, fetch  } from "frontity";
import Link from "../link";
import axios from 'axios';
/**
 * Navigation Component
 *
 * It renders the navigation links
 */

function Navigation(res) {
    const [post, setPost] = useState([]);
   // 1. post is now [{title: 'TestPost'}]

   useEffect(() => { // on this cycle this useEffect callback will not run because 'slug' did not change
          axios.get(res.state.source.api+'/wp/v2/menus')
           .then(res => {
              const postContent =  res.data.primary
             setPost(postContent)
          });
      }, [])

  return(
    <div>
       <NavWrapper>
          <MenuNav>
            <Menu>
            {post ? post.map((items,index)=> 
                  <MenuItem>
                    <MenuLink link={'/'+items.parent.slug}>
                      {items.parent.type == 'custom' ? <button>{items.parent.title}</button> : items.parent.title}
                    </MenuLink>
                  </MenuItem>
             ):''}     
            </Menu>
          </MenuNav>
        </NavWrapper>
    </div>
  )
};

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
