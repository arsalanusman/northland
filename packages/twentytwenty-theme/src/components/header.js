import React, { useState, useEffect } from "react";
import { connect, styled } from "frontity";
import Link from "./link";
import Navigation from "./navigation/navigation";
import Logo from './styles/logo';
import $ from 'jquery';
import { fadeIn } from 'react-animations';

const Header = ({ state }) => {
  const { title, description } = state.frontity;
  const general = state.source.get('general');

  if(typeof window !== "undefined"){    
    $(document).ready(() => {
      
      $(window).on('scroll', () => {
        var w = $(window).scrollTop();
        if($('#mainIntro').length < 1){
          w > 10 ? $('#site-header').addClass('active') : $('#site-header').removeClass('active');
        }

        if($('#mainIntro').length > 0){
          w > 684 ? $('#site-header').addClass('activeIntro') : $('#site-header').removeClass('activeIntro');
        }

        if($('#mainIntro').length > 0){
          if(w > 1647){
            $('#site-header').removeClass('activeIntro');
            $('#site-header').addClass('active');
          }else{
            //$('#site-header').addClass('activeIntro');
            $('#site-header').removeClass('active');
          }
        }

        //console.log('Top Postition:', w);

      });

      $('#mobileModal .bottom').hide();
      $(document).on('click', '#mobileToggle', function(){
          $('nav').css({"opacity":"0"});
          $(this).addClass('open');
          $('html').addClass('overflow-hidden');
          $(this).parent().removeClass('active');
          $('#mobileModal').fadeIn('fast');
          $('#mobileModal .bottom').fadeIn(1000);
      });
      $(document).on('click', '#mobileToggle.open', function(){
          $(this).removeClass('open');
          $('nav').css({"opacity":"1"});
          $('#mobileModal').fadeOut();
          $('html').removeClass('overflow-hidden');
          $('#mobileModal .bottom').fadeOut();
          if($(window).scrollTop() > 10){
            $(this).parent().addClass('active');
          }else{
            $(this).parent().removeClass('active');
          }
      });
      
      $(document).on('click', '.mobileLogo', function(){
        if($('#mobileToggle').hasClass('open')){
          $('#mobileToggle').trigger('click');
        }
      });

    }); 
    
  }

  return (
      <PageHeader id="site-header" className="animate__animated animate__fadeInDown animate__delay-1s">
            <MobileToggle id="mobileToggle" />
            <StyledLink link="/" className="mobileLogo"><Logo color={state.theme.colors['navy']} /></StyledLink>
            <Navigation />
      </PageHeader>
  );
};
// Connect the Header component to get access to the `state` in it's `props`
export default connect(Header);

const PageHeader = styled.header`
  z-index: 100;
  position: fixed;
  width:100%;
  background:none;
  left:0;
  top:0;
  display:flex;
  justify-content: space-between;
  align-items: center;
  padding: 40px 40px;
  transition: all .2s ease;
  a.custom{
    margin-top: 0;
    min-width: auto;
  }
  &.active{
    padding:15px 40px;
    background-color: rgba(1,32,63,0.85); 
    -webkit-backdrop-filter: saturate(180%) blur(20px); 
    backdrop-filter: saturate(180%) blur(20px);
    svg g{
      path{
        fill: #ffffff;
      }
    }

    > span{
      &:before, &:after{
        background:#ffffff;
      }
    }

    a{
      color:#ffffff;
      display: block;
      &:after{
        background:#fff;
      }
      &:hover{
        &:before{
          background:#fff;
        }
        &:after{
          background: transparent;
        }
      }
      &.custom{
        background:#fff;
        color:#01203F;
        margin-top: 0;
        &:hover{
          color:#0344DC;
        }
      }
    }

  }

  &.activeIntro{
    background-color: none;
    -webkit-backdrop-filter: none;
    backdrop-filter: none;
    svg g{
      path{
        fill: #ffffff;
      }
    }

    > span{
      &:before, &:after{
        background:#ffffff;
      }
    }

    a{
      color:#ffffff;
      display: block;
      &:after{
        background:#fff;
      }
      &:hover{
        &:before{
          background:#fff;
        }
        &:after{
          background: transparent;
        }
      }
      &.custom{
        background-color:#fff;
        color:#01203F;
        &:hover{
          color:#0344DC;
        }
      }
    }


  }

  @media (max-width:1023px){
    padding: 20px 15px;
    a.custom{
      background:none;
      color:#01203F;
      font-size:13px;
      padding: 0;
      width: 72px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: clip;
      border-radius:0;
      &:hover{
        background:none;
      }
    }
    &.active{
      padding:15px 15px;
      a.custom{
        background:none;
        border-radius:0;
        color:#fff;
        &:hover{
          color:#fff;
        }

      }
    }

    &.activeIntro{
      a{
        &.custom{
          background:none;
          color: #fff;
        }
      }
    }

  }

`;
const StyledLink = styled(Link)`
  max-width:236px;
  @media (max-width:1023px){
    max-width:137px;
  }
`;
const MobileToggle = styled.span`
  width:26px;
  height:10px;
  display:none;
  cursor: pointer;
  transition:all 0.3s;
  position: relative;

  &:before, &:after{
    content: ' ';
    display:block;
    width:100%;
    height:2px;
    background:#01203F;
    
    transition:all 0.3s;
  }
  &:after{
    margin-top:6px;
  }

  @media (max-width:1023px){
    display: block;
    margin-top: 0px;
    margin-right: 40px;
    height: 22px;
    padding-top: 6px;
    &.open{
      height:25px;
      margin-right: 40px;
      &:before{
        position: absolute;
        transform: rotate(40deg);
        margin: 6px 0 0 0; 
      }
      &:after{
        position: absolute;
        transform: rotate(-40deg);
      }
    }
  }
`;