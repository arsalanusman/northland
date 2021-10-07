import React, { useState, useEffect } from "react";
import { connect, styled, keyframes } from "frontity";
import Triangle from "../../img/triangle_graphic1-01.svg";
import ArrowDown from "../../img/icon_down-arrowRed.svg";

const Img = Triangle;
const downArrow = ArrowDown;

function Intro(props){

  //console.log(props.data);

  if(typeof window !== "undefined"){
    var wh = 2000;
  }
  
  const [bigHeight, setBigHeight] = useState();
  const [mobile, setMobile] = useState(false);

  useEffect(()=>{
    if(typeof window !== "undefined"){
      setBigHeight(window.outerHeight);
      setMobile(window.matchMedia('(max-device-width: 767px)').matches);

      $(window).on('resize',function(){
        setBigHeight(window.outerHeight);
        setMobile(window.matchMedia('(max-device-width: 767px)').matches);
      });
    }
  }, []);

  return(
    <Section id="mainIntro" 
    data-smooth-scrolling="on" 
    bgTriangle={Img} 
    intoBg={props.data.background_image} 
    intoBgMobile={props.data.mobile_background_image}
    height={bigHeight}
    >

      
      {mobile ? 
        <>
          <div className="animate__animated animate__fadeIn animate__delay-1s">
            <div className="obj1 control-animation"
            data-0="background-size: 175%; margin-bottom: 48px;"
            data-400="background-size: 245%; margin-bottom: -26px;"
            data-600="background-size: 322%;  margin-bottom: 0px;"
            data-800="background-size: 335%;"
            data-950="background-size: 340%;"
            data-1050="background-size: 345%;"></div>

            <div className="obj2 control-animation"
            data-0="opacity:1;  background-size: 420%; margin-bottom: 65px;"
            data-400="opacity:1; background-size: 550%; margin-bottom: 0px;"
            data-600="opacity:1; background-size: 1000%; margin-bottom: 0px;"
            data-800="opacity:1; background-size: 2640%; margin-bottom: 0px;"
            data-801="opacity:0;">
            </div>
          </div>
        </>
        :
        <>
          <div className="animate__animated animate__fadeIn animate__delay-1s">
              <div className="obj1 control-animation"
              data-0="background-size: 70%;"
              data-500={bigHeight > 900 ? 'background-size: 130%;' : 'background-size: 120%;'}
              data-600={bigHeight > 900 ? 'background-size: 200%;' : 'background-size: 125%;'}
              data-800={bigHeight > 900 ? 'background-size: 210%;' : 'background-size: 130%;'}
              data-950={bigHeight > 900 ? 'background-size: 215%;' : 'background-size: 140%;'}
              data-1050={bigHeight > 900 ? 'background-size: 220%;' : 'background-size: 150%;'}>
              </div>

              <div className="obj2 control-animation"
              data-0="opacity:1;  background-size: 160%;"
              data-400="opacity:1; background-size: 300%;"
              data-600="opacity:1; background-size: 600%;"
              data-800="opacity:1; background-size: 1550%;"
              data-801="opacity:0;"></div>
          </div>
        </>
      }
    
      <div className="textObj">
        <div>
          <span className="animate__animated animate__fadeInUp animate__delay-2s"><img src={props.data.logo} /></span>
          <h1 className="animate__animated animate__fadeInUp animate__delay-2s" dangerouslySetInnerHTML={{ __html: props.data.headline }}></h1>
        </div>
      </div>

     <div className="scrollDown animate__animated animate__fadeIn animate__delay-3s">
       <span>SCROLL</span>
       <img src={downArrow} />
     </div>

    </Section>
  );
}


const Section = styled.section`
  position:relative; 
  overflow:hidden; 
  height:2000px;
  height:${props => props.height*2.5}px;
  margin-bottom:0px;
  background:#ff0000;

  .obj1, .obj2{
    position: fixed;
    background-color: #000;
    margin: auto;
    left: 0;
    right: 0;
    top:0;
    bottom:0;
    width:100%;
    height:100%;
  }
  .obj1{
    background:#ff0000 url('${props => props.intoBg}') no-repeat center;
    background-size: 70%;
    z-index:1;
  }
  .obj2{
    background:url('${props => props.bgTriangle}') no-repeat center;
    border:0px solid #ff0000;
    background-size: 160%;
    overflow:hidden;
    z-index:2;
  }
  
  .textObj{
    position: fixed;
    text-align:center;
    display:flex;
    justify-content: center;
    align-items: center;
    margin: auto;
    left: 0;
    right: 0;
    top:0;
    bottom:0;
    width:100%;
    height:100%;
    padding: 0 15px;
  }
  .textObj h1{
    font-weight: normal;
    color:#fff;
    margin-top:0;
    font-family: "Ginto Normal Regular";
    b{
      font-family: "Ginto Normal Bold";
    }
  }
  .textObj span{
    display:inline-block;
    width:300px;
    height:60px;    
    margin-top:150px;
    margin-bottom:20px;
  }
  .scrollDown{
    position: fixed;
    left: 0;
    right: 0;
    margin: auto;
    bottom: 25px;
    width: 80px;
    color:#fff;
    font-size:14px;
    font-family: "Ginto Nord Bold";
    text-align: center;
    cursor: pointer;
    display:block;
    img{
      margin:auto;
      margin-top: 20px;
      animation: bounceArrow 1s;
      animation-direction: alternate; 
      animation-timing-function: cubic-bezier(.5, 0.05, 1, 1); 
      animation-iteration-count: infinite;
    }
  }

  @media (max-width:767px){
    .obj1{
      background:#ff0000 url('${props => {
        if(props.intoBgMobile)
          return props.intoBgMobile
        else
          return props.intoBg
      }}') no-repeat center;
      background-size: 175%;
    }
    .obj2{
      background-size: 420%;
      margin-bottom: 65px;
    }
    .textObj span{
      width:200px;
      height:40px;
      margin-top: 30px;
    }
    .scrollDown{
      font-size:12px;
      img{
        max-width:25px;
      }
    }
  }
`;

export default Intro;
