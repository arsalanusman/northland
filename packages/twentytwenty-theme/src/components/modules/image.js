import React, { useState, useEffect }  from "react";
import { connect, styled } from "frontity";
import {BrowserView, MobileView} from 'react-device-detect';
import ScrollAnimation from 'react-animate-on-scroll';

function Image(props){
	//console.log(props.data);
	const data = props.data;
	const phone_mobile = data.media['photo_mobile']['url'] ? data.media['photo_mobile']['url'] : data.media['photo_desktop']['url']


	const [isMobile, setIsMobile] = useState(false);
	useEffect(()=>{
		if(typeof window !== "undefined"){
			setIsMobile(window.matchMedia('(max-width: 600px)').matches);
			$(window).on('resize',function(){
				setIsMobile(window.matchMedia('(max-width: 600px)').matches)
			});
		}
	});

	return(
	data.layout_options.background_option == 'background' ?
			<ImgComponent background={ data.layout_options.background_option == 'background' ? data.layout_options.background_color : ''} topPadding={data.vertical_padding['top']} bottomPadding={data.vertical_padding['bottom']} >
				<Container>
					{isMobile ?
							<ScrollAnimation animateIn="fadeIn" duration={1} animateOnce={true}>
								<ImgImage><img src={phone_mobile} style={{width:'100%'}}
											   data-image="mobile"/></ImgImage>
							</ScrollAnimation>
							:
							<ScrollAnimation animateIn="fadeIn" duration={1} animateOnce={true}>
								<ImgImage><img src={data.media['photo_desktop']['url']} style={{width:'100%'}}
											   data-image="desktop"/></ImgImage>
							</ScrollAnimation>
					}
					<ScrollAnimation animateIn="fadeIn" duration={1} animateOnce={true}>
						{data.caption_text &&	<Caption>{data.caption_text}</Caption> }
					</ScrollAnimation>
				</Container>
			</ImgComponent>
	:
			<ImgComponentWithBackground background={ data.layout_options.background_option == 'no_background' ? data.layout_options.background_color : ''}>
				{isMobile ?
					<ScrollAnimation animateIn="fadeIn" duration={1} animateOnce={true}>
						<img src={phone_mobile} data-image="mobile" />
					</ScrollAnimation>
						:
					<ScrollAnimation animateIn="fadeIn" duration={1} animateOnce={true}>
						<img src={data.media['photo_desktop']['url']} data-image="desktop" />
					</ScrollAnimation>
				}
			</ImgComponentWithBackground>
	);
}
export default Image;

export const ImgComponent = styled.div`
	position: relative;
	z-index: 1;
	background-color:${ props=> {
	if(props.background == 'red')
		return '#FF0000'
	if(props.background == 'navy')
		return '#01203F'
	if(props.background == 'white')
		return '#FFFFFF'
	}};

	color:${ props=> {
	if(props.background == 'red')
		return '#01203F'
	if(props.background == 'navy')
		return '#FFFFFF'
	if(props.background == 'white')
		return '#FF0000'
	}};

    padding-top:${ props=> {
	if(props.topPadding == 'default')
		return '12rem'
	if(props.topPadding == 'reduced')
		return '6rem'
	if(props.topPadding == 'none')
		return '0rem'
	}};

    padding-bottom:${ props=> {
	if(props.bottomPadding == 'default')
		return '12rem'
	if(props.bottomPadding == 'reduced')
		return '6rem'
	if(props.bottomPadding == 'none')
		return '0rem'
	}};

	margin-left: auto;
	margin-right: auto;

	@media (max-width:1023px){
		padding-top: 4rem;
    	padding-bottom: 5.5rem;
	}

`;
export const ImgComponentWithBackground = styled.div`
	position: relative;
	z-index: 1;
	background-color:${ props=> {
		if(props.background == 'red')
			return '#FF0000'
		if(props.background == 'navy')
			return '#01203F'
		if(props.background == 'white')
			return '#FFFFFF'
	}};
	img{
		object-fit: cover;
		width: 100vw;
	}
	@media (max-width:1023px){
		img{
			width: 100%;
    		height: auto;	
		}
	}
`;
export const Caption = styled.div`
  padding-top: 1rem;
  font-size:14px;
  line-height:22px;
  font-family: "Ginto Normal Bold";
  max-width: 58%;
  margin-left: 0;
  @media (max-width:1023px){
	max-width: 100%;
	font-size:14px;
	line-height:18px;
	padding-top: 2rem;
  }
`;
export const ImgImage = styled.div`
  padding-top: 1rem;
`;
export const Container = styled.div`
  max-width:1290px;
  margin:auto;
  padding:0px 15px;
`;
