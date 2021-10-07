import React from "react";
import { connect, styled } from "frontity";
import ScrollAnimation from 'react-animate-on-scroll';

function Line(props){
	//console.log(props.data);
	const data = props.data;
  return(
  	<LineComponent background={ data.background_color } topPadding={data.vertical_padding['top']} bottomPadding={data.vertical_padding['bottom']} >
		<Container>
			<ScrollAnimation animateIn="fadeIn" animateOnce={true}>
				{data.background_color && <LineItem background={data.background_color} stroke={data.line_stroke}></LineItem>}
			</ScrollAnimation>
		</Container>
  	</LineComponent>
  );
}
export default Line;


export const LineComponent = styled.div`
	position:relative; 
	z-index:1;
	padding-top:${props=> {
		if(props.topPadding == 'default')
			return '12rem'
		if(props.topPadding == 'reduced')
			return '6rem'
		if(props.topPadding == 'none')
			return '0rem'
	}};
	padding-bottom:${props=> {
	if(props.bottomPadding == 'default')
		return '12rem'
	if(props.bottomPadding == 'reduced')
		return '6rem'
	if(props.bottomPadding == 'none')
		return '0rem'
	}};
	background-color:${props=> {
	if(props.background == 'red')
		return '#FF0000'
	if(props.background == 'navy')
		return '#01203F'
	if(props.background == 'white')
		return '#FFFFFF'
	}};
`;

export const Container = styled.div`
  max-width:1290px;
  margin:auto;
  padding:0px 15px;
`;

export const LineItem = styled.span`
  display:block;
  width:100%;
  border-top:${props=> {
	if(props.stroke == 'thin')
		return '1px'
	if(props.stroke == 'bold')
		return '2px'
  }} solid;
  color:${props=> {
	if(props.background == 'red')
		return '#01203F'
	if(props.background == 'navy')
		return '#FFFFFF'
	if(props.background == 'white')
		return '#01203F'
  }};
`;
