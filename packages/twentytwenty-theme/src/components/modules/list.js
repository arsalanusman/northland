import React from "react";
import { connect, styled } from "frontity";
import ScrollAnimation from 'react-animate-on-scroll';

function List(props){
	//console.log(props.data);
	const data = props.data;
    const list_items = data.list_items;

  return(
  	<ListComponent background={ data.background_color } topPadding={data.vertical_padding['top']} bottomPadding={data.vertical_padding['bottom']} >
		<Container>
			<ScrollAnimation animateIn="fadeIn" animateOnce={true}>
				{data.section_title.length > 0 && <SubHeading background={data.background_color}>{data.section_title}</SubHeading>}
				<ListItem article_columns={data.article_columns} data-column={data.article_columns}>
					{list_items.map((item, index) => <li key={index}><span>{item.list_item}</span></li>)}
				</ListItem>
			</ScrollAnimation>
		</Container>
  	</ListComponent>
  );
}
export default List;

export const ListComponent = styled.div`
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
			return '#01203F'
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
		padding-bottom: 4rem;
	}
`;
export const Container = styled.div`
  max-width:1030px;
  margin:auto;
  padding:0px 15px;
`;

export const SubHeading = styled.div`
  display: block;
  font-family: "Ginto Nord Bold";
  text-transform: uppercase;
  font-size: 22px;
  line-height: 18px;
  letter-spacing: -0.46px;
  padding-bottom: 20px;
  color:${props=> {
	if(props.background == 'red')
		return '#FFFFFF'
	if(props.background == 'navy')
		return '#FF0000'
	if(props.background == 'white')
		return '#FF0000'
  }};

  @media (max-width:1023px){
	font-size: 14px;
    line-height: 18px;
  }

`;
export const ListItem = styled.ul`
  padding:0;
  margin:0;
  list-style:none;
  display:flex;
  flex-flow: wrap;
  margin-left:-20px;
  margin-right:-20px;
  li{
	  letter-spacing:-0.03px;
	  line-height:24px;
	  padding: 0 20px;
	  display: block;
	  width:${props=> {
		if(props.article_columns == '2')
			return '50%'
		if(props.article_columns == '3')
			return '33%'
		if(props.article_columns == '4')
			return '25%'
	  }};
	  span{
		height: 100%;
		border-bottom: 1px solid;
		padding: 28px 0px 10px 0px;
		display:block;
	  }
  }

  @media (max-width:1023px){
	flex-flow: column;
	margin:0;
	li{
		width:100%;
		font-size:14px;
		line-height:19px;
		padding:0;
		span{
			padding: 20px 0px 15px 0px;
		}
	}
  }

`;
