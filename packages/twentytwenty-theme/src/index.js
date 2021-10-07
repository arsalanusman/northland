import Theme from "./components";
import image from "@frontity/html2react/processors/image";
import Comments from "./components/post/comments";
const menuHandler = {
  name: "menus",
  priority: 10,
  pattern: "menus",

  func: async ({ route, params, state, libraries }) => {

    const { api } = libraries.source;

    // 1. fetch the data you want from the endpoint page

    const response = await api.get({
      endpoint: "/wp/v2/menus",
    });

    // 2. get an array with each item in json format
    const items = await response.json();

    // 3. add data to source
    const currentPageData = state.source.data[route];
    Object.assign(currentPageData, {
      items,
      isMenu: true
    });
  }
};
const widgetHandler = {
  name: "sidebar",
  priority: 10,
  pattern: "sidebar",

  func: async ({ route, params, state, libraries }) => {

    const { api } = libraries.source;

    // 1. fetch the data you want from the endpoint page
    const response = await api.get({
      endpoint: "/wp/v2/widgets",
    });

    // 2. get an array with each item in json format
    const items = await response.json();

    // 3. add data to source
    const currentPageData = state.source.data[route];
    Object.assign(currentPageData, {
      items,
      isWidget: true
    });
  }
};
const defaultHandler = {
  name: "general",
  priority: 10,
  pattern: "general",

  func: async ({ route, params, state, libraries }) => {

    const { api } = libraries.source;

    // 1. fetch the data you want from the endpoint page
    const response = await api.get({
      endpoint: "/wp/v2/general",
    });

    // 2. get an array with each item in json format
    const items = await response.json();

    // 3. add data to source
    const currentPageData = state.source.data[route];
    Object.assign(currentPageData, {
      items,
      isDefault: true
    });
  }
};
const twentyTwentyTheme = {
  name: "@frontity/twentytwenty-theme",
  roots: {
    /**
     *  In Frontity, any package can add React components to the site.
     *  We use roots for that, scoped to the `theme` namespace.
     */
    theme: Theme,
  },
  state: {
    /**
     * State is where the packages store their default settings and other
     * relevant state. It is scoped to the `theme` namespace.
     */
    theme: {
      colors: {
        gray: {
          base: "#6D6D6D",
          light: "#DCD7CA",
          lighter: "#F5EFE0",
        },
        primary: "#cd2653",
        headerBg: "#ffffff",
        footerBg: "#ffffff",
        bodyBg: "#f5efe0",
        navy: "#01203F",
        red: "#ff0000",
        blue: "#0344DC",
        silver: "#BABAC4",
        orange: "#FF4F00",
        white: "#ffffff",
      },
      // Whether to show the search button in page header
      showSearchInHeader: true,
      // Menu links to display in the header
      menu: [],
      // State for the menu on mobile
      isMobileMenuOpen: false,
      // State for the search modal on mobile
      isSearchModalOpen: false,
      // Whether to show all post content or only excerpt (summary) in archive view
      showAllContentOnArchive: false,
      // Settings for the featured media (image or video)
      featuredMedia: {
        // Whether to show it on archive view
        showOnArchive: true,
        // Whether to show it on post
        showOnPost: true,
      },
      // Whether to auto-fetch links on a page. Values can be "no" | "all" | "in-view" | "hover"
      autoPreFetch: "hover",
      /**
       * At the moment, we only include the ascii characters of Inter font.
       * Values can be "us-ascii" | "latin" | "all"
       */
      fontSets: "all",
    },
  },
  /**
   * Actions are functions that modify the state or deal with other parts of
   * Frontity like libraries.
   */
  actions: {
    theme: {
      openMobileMenu: ({ state }) => {
        state.theme.isMobileMenuOpen = true;
      },
      closeMobileMenu: ({ state }) => {
        state.theme.isMobileMenuOpen = false;
      },
      openSearchModal: ({ state }) => {
        state.theme.isSearchModalOpen = true;
      },
      closeSearchModal: ({ state }) => {
        state.theme.isSearchModalOpen = false;
      },
      beforeSSR: ({ actions }) => async () => {
        await actions.source.fetch("menus");
        await actions.source.fetch("sidebar");
        await actions.source.fetch("general");

      },
    },
  },
  libraries: {
     source: {
      handlers: [menuHandler,widgetHandler,defaultHandler]
    },
    comments: {
      Comments
    },
    html2react: {
      /**
       * Add a processor to `html2react` so it processes the `<img>` tags
       * inside the content HTML. You can add your own processors too
       */
      processors: [image],
    },
  },
};

export default twentyTwentyTheme;
