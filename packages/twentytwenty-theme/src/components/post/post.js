import { styled, connect } from "frontity";
import React, { useState, useEffect } from "react";
import FeaturedMedia from "./featured-media";
import {
  EntryContent,
  Post as _Post,
  PostHeader,
  PostInner,
  PostTitle,
  SectionContainer,
} from "./post-item";
import PostCategories from "./post-categories";
import PostMeta from "./post-meta";
import PostTags from "./post-tags";
import Modules from "./../modules";

const Post = ({ state, actions, libraries }) => {
  // Get information about the current URL.
  const data = state.source.get(state.router.link);
  // Get the data of the post.
  const post = state.source[data.type][data.id];
  // Get the data of the author.
  // const author = state.source.author[post.author];
  // Get a human readable date.
  // const date = new Date(post.date);
  const acf = post['acf'];

  // console.log(post, 'CONTACT');
  // Get the html2react component.
  const Html2React = libraries.html2react.Component;

  // Get all categories
  const allCategories = state.source.category;
  /**
   * The item's categories is an array of each category id
   * So, we'll look up the details of each category in allCategories
   */
  const categories =
    post.categories && post.categories.map((catId) => allCategories[catId]);

  // Get all tags
  const allTags = state.source.tag;
  /**
   * The item's categories is an array of each tag id
   * So, we'll look up the details of each tag in allTags
   */
  const tags = post.tags && post.tags.map((tagId) => allTags[tagId]);
    if(typeof window !== "undefined"){
        if(!acf['module'] && acf['module'].acf_fc_layout != "intro_component"){

              //console.log(acf['module'],'post')

               $('#site-header').removeClass('activeIntro')

        }

        $(document).ready(() => {
          var s = skrollr.init({
              render: function (data) {},
              forceHeight: false,
              smoothScrolling: true,
              smoothScrollingDuration: 200,
              mobileCheck: function() {
                //hack - forces mobile version to be off
                return false;
              }
          });
          setTimeout(() => {
            s.refresh($(".control-animation"));
          },1000);
        })

      }

      
  /**
   * Once the post has loaded in the DOM, prefetch both the
   * home posts and the list component so if the user visits
   * the home page, everything is ready and it loads instantly.
   */
  useEffect(() => {
    actions.source.fetch("/");
    if(typeof window !== "undefined"){
      $(window).on('resize',function(){
        //console.log('WINRESIZE');
        var s = skrollr.init({
            render: function (data) {},
            forceHeight: false,
            smoothScrolling: true,
            smoothScrollingDuration: 300,
            mobileCheck: function() {
              //hack - forces mobile version to be off
              return false;
            }
        });
        setTimeout(() => {
          s.refresh($(".control-animation"));
        },500);
      });
    }
  }, []);

  // Load the post, but only if the data is ready.
  return data.isReady ? (
    <PostArticle>
     { acf['module'] ?  <Modules data={acf} /> :
         <>
       <Header>
        <SectionContainer>
          {/* If the post has categories, render the categories */}
          {post.categories && <PostCategories categories={categories} />}

          <PostTitle
            as="h1"
            className="heading-size-1"
            dangerouslySetInnerHTML={{ __html: post.title.rendered }}
          />

          {/* The post's metadata like author, publish date, and comments */}
          <PostMeta item={post} />
        </SectionContainer>
      </Header>

      {/*
       * If the want to show featured media in the
       * list of featured posts, we render the media.
       */}
      {state.theme.featuredMedia.showOnPost && (
        <FeaturedImage id={post.featured_media} isSinglePost={true} />
      )}

      {/* If the post has an excerpt (short summary text), we render it */}
      {post.content && (
        <PostInner size="thin">
          <EntryContent>
            <Html2React html={post.content.rendered} />
          </EntryContent>
          {/* If the post has tags, render it */}
          {post.tags && <PostTags tags={tags} />}
        </PostInner>
      )}
         </>
     }

    </PostArticle>
  ) : null;
};

export default connect(Post);

const Header = styled(PostHeader)`
  background-color: #fff;
  margin: 0;
  padding: 4rem 0;
  @media (min-width: 700px) {
    padding: 8rem 0;
  }
`;

const PostArticle = styled(_Post)`
  padding-top: 0 !important;
`;

const FeaturedImage = styled(FeaturedMedia)`
  margin-top: 0 !important;
  position: relative;

  > div {
    position: relative;
  }

  &:before {
    background: #fff;
    content: "";
    display: block;
    position: absolute;
    bottom: 50%;
    left: 0;
    right: 0;
    top: 0;
  }
`;
