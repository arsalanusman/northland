import React from "react";
import { connect, styled } from "frontity";
import Intro from "./intro";
import Text from "./text";
import TextPair from "./text_pair";
import TextImage from "./text_image";
import Hero from "./hero";
import Image from "./image";
import Video from "./video";
import Accordion from "./accordion";
import List from "./list";
import Line from "./line";
import Articles from "./article"
import Form from "./form";
const Modules = (state) => {
	const Module = state.data['module'];

	return(
			Module && Module.map((mud,index)=>{
			if(mud.acf_fc_layout == "intro_component")
				return <Intro data={mud} key={index} />
			if(mud.acf_fc_layout == "text_component")
				return <Text data={mud} key={index} />
			if(mud.acf_fc_layout == "textpair_component")
				return <TextPair data={mud} key={index} />
			if(mud.acf_fc_layout == "textimage_component")
				return <TextImage data={mud} key={index} />
			if(mud.acf_fc_layout == "hero_component")
				return <Hero data={mud} key={index} />
			if(mud.acf_fc_layout == "article_component")
				return <Articles data={mud} key={index} />
			if(mud.acf_fc_layout == "image_component")
				return <Image data={mud} key={index} />				
			if(mud.acf_fc_layout == "video_component")
				return <Video data={mud} key={index} />
			if(mud.acf_fc_layout == "accordion_component")
				return <Accordion data={mud} key={index} />
			if(mud.acf_fc_layout == "list_component")
				return <List data={mud} key={index} />
			if(mud.acf_fc_layout == "line_component")
				return <Line data={mud} key={index} />
			if(mud.acf_fc_layout == "form_component")
				return <Form data={mud} key={index} />
			})
  )
}
export default connect(Modules);