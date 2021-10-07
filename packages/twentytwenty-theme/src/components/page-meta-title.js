import React from "react";
import { Head, connect, decode } from "frontity";

const Title = ({ state }) => {
  // Get data about the current URL.
  const data = state.source.get(state.router.link);
  // Set the default title.
  let title = state.frontity.title;
  let description = state.frontity.description;
  let image = '';

  if (data.isTaxonomy) {
    // Add titles to taxonomies, like "Category: Nature - Blog Name" or "Tag: Japan - Blog Name".
    // 1. Get the taxonomy entity from the state to get its taxonomy term and name.
    const { taxonomy, name } = state.source[data.taxonomy][data.id];
    // 2. Uppercase first letter of the taxonomy term (from "category" to "Category").
    const taxonomyCapitalized =
      taxonomy.charAt(0).toUpperCase() + taxonomy.slice(1);
    // 3. Render the proper title.
    title = `${taxonomyCapitalized}: ${decode(name)} - ${state.frontity.title}`;
  } else if (data.isAuthor) {
    // Add titles to authors, like "Author: Jon Snow - Blog Name".
    // 1. Get the author entity from the state to get its name.
    const { name } = state.source.author[data.id];
    // 2. Render the proper title.
    title = `Author: ${name} - ${state.frontity.title}`;
  } else if (data.isPostType) {
    // Add titles to posts and pages, using the title and ending with the Blog Name.
    // 1. Get the post entity from the state and get its title.
    let postTitle = state.source[data.type][data.id]['acf']['title'] ? state.source[data.type][data.id]['acf']['title'] : state.source[data.type][data.id].title.rendered;
    let postDescription = state.source[data.type][data.id]['acf']['description'];
    let postImage = state.source[data.type][data.id]['acf']['image'];
    //if(state.source[data.type][data.id]['acf']){
    //  if(state.source[data.type][data.id]['acf']['title']){
    //     postTitle = state.source[data.type][data.id].acf.title
    //  }
    //}
    // 2. Remove any HTML tags found in the title.
    const cleanTitle = decode(postTitle);
    const cleanDescription = decode(postDescription);
    const cleanImage = decode(postImage);
    // 3. Render the proper title.
    title = `${cleanTitle}`;
    description = cleanDescription;
    image = cleanImage;
  } else if (data.is404) {
    // Add titles to 404's.
    title = `404 Not Found - ${state.frontity.title}`;
  }

  return (
    <Head>
      <title>{title}</title>
      <meta name="description"  content={description} />
       <meta property="og:locale" content="en_US" />
      <meta property="og:type" content="website" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content="https://northlandzdegree.com/" />
      <meta property="og:site_name" content={state.frontity.title} />
      <meta property="og:image" content={image} />
      <meta property="og:image:secure_url" content={image} />
      <meta property="og:image:width" content="1333" />
      <meta property="og:image:height" content="1333" />
      <meta property="og:image:alt" content={title} />

    </Head>
  );
};

export default connect(Title);
