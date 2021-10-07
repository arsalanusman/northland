import React from "react";
import { connect, styled } from "frontity";
import ScrollAnimation from 'react-animate-on-scroll';

function Video(props){
	console.log(props.data);
	const data = props.data;

  return(
  	<VideoComponent background={ data.background_color } topPadding={data.vertical_padding['top']} bottomPadding={data.vertical_padding['bottom']} >
		<Container>
			<ScrollAnimation animateIn="fadeIn" duration={1} animateOnce={true}>
				{data.media == 'vimeo' && 
					<Embedded>
						<iframe src={'https://player.vimeo.com/video/' + data.vimeo_youtube_id } frameBorder="0" webkitallowfullscreen="true" mozallowfullscreen="true" ></iframe>
					</Embedded>
				}
				{data.media == 'youtube' && 
					<Embedded>
						<iframe src={'https://www.youtube.com/embed/' + data.youtube_video_id } frameBorder="0" webkitallowfullscreen="true" mozallowfullscreen="true" ></iframe>
					</Embedded>
				}
				{data.caption_text && <Caption>{data.caption_text}</Caption>}
			</ ScrollAnimation>
		</Container>
  	</VideoComponent>
  );
}
export default Video;

export const VideoComponent = styled.div`
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

export const Caption = styled.div`
  padding-top: 1rem;
  font-size:14px;
  line-height:22px;
  font-family: "Ginto Normal Bold";
  max-width: 58%;
  margin-left: 0;
  letter-spacing: -0.026px;
  @media (max-width:1023px){
	max-width: 100%;
	font-size:14px;
	line-height:18px;
	padding-top: 2rem;
  }
`;
export const Embedded = styled.div`
	position: relative;
	width: 100%;
	overflow: hidden;
	padding-top: 56.25%; /* 16:9 Aspect Ratio */
	iframe{
		position: absolute;
		top: 0;
		left: 0;
		bottom: 0;
		right: 0;
		width: 100%;
		height: 100%;
		border: none;
	}
`;
export const Container = styled.div`
  max-width:1290px;
  margin:auto;
  padding:0px 15px;
`;
