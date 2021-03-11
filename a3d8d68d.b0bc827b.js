(window.webpackJsonp=window.webpackJsonp||[]).push([[153],{231:function(e,n,r){"use strict";r.r(n),r.d(n,"frontMatter",(function(){return i})),r.d(n,"metadata",(function(){return s})),r.d(n,"toc",(function(){return c})),r.d(n,"default",(function(){return p}));var t=r(3),a=r(7),o=(r(0),r(322)),i={id:"relay-hooks-and-legacy-container-apis",title:"Relay Hooks and Legacy Container APIs",slug:"/migration-and-compatibility/relay-hooks-and-legacy-container-apis/"},s={unversionedId:"migration-and-compatibility/relay-hooks-and-legacy-container-apis",id:"migration-and-compatibility/relay-hooks-and-legacy-container-apis",isDocsHomePage:!1,title:"Relay Hooks and Legacy Container APIs",description:"Compatibility between Relay Hooks and Containers",source:"@site/docs/current/migration-and-compatibility/relay-hooks-and-legacy-container-apis.md",slug:"/migration-and-compatibility/relay-hooks-and-legacy-container-apis/",permalink:"/docs/next/migration-and-compatibility/relay-hooks-and-legacy-container-apis/",editUrl:"https://github.com/facebook/relay/edit/master/website-v2/docs/current/migration-and-compatibility/relay-hooks-and-legacy-container-apis.md",version:"current",lastUpdatedBy:"Juan Tejada",lastUpdatedAt:1615481907,sidebar:"docs",previous:{title:"Suspense Combatibility",permalink:"/docs/next/migration-and-compatibility/suspense-compatibility/"},next:{title:"Relay DevTools",permalink:"/docs/next/debugging/relay-devtools/"}},c=[{value:"Compatibility between Relay Hooks and Containers",id:"compatibility-between-relay-hooks-and-containers",children:[]},{value:"Migrating existing container-based code",id:"migrating-existing-container-based-code",children:[{value:"<code>QueryRenderer</code> \u2192 <code>useLazyLoadQuery</code>",id:"queryrenderer-\u2192-uselazyloadquery",children:[]},{value:"<code>QueryRenderer</code> \u2192 <code>useQueryLoader</code> + <code>usePreloadedQuery</code>",id:"queryrenderer-\u2192-usequeryloader--usepreloadedquery",children:[]},{value:"Fragment Container \u2192 <code>useFragment</code>",id:"fragment-container-\u2192-usefragment",children:[]},{value:"Refetch Container \u2192 <code>useRefetchableFragment</code>",id:"refetch-container-\u2192-userefetchablefragment",children:[]},{value:"Pagination Container \u2192 <code>usePaginationFragment</code>",id:"pagination-container-\u2192-usepaginationfragment",children:[]},{value:"QueryRenderer \u2192 useEntryPointLoader + EntryPointContainer",id:"queryrenderer-\u2192-useentrypointloader--entrypointcontainer",children:[]},{value:"commitMutation \u2192 useMutation",id:"commitmutation-\u2192-usemutation",children:[]},{value:"requestSubscription \u2192 useSubscription",id:"requestsubscription-\u2192-usesubscription",children:[]}]}],l={toc:c};function p(e){var n=e.components,r=Object(a.a)(e,["components"]);return Object(o.b)("wrapper",Object(t.a)({},l,r,{components:n,mdxType:"MDXLayout"}),Object(o.b)("h2",{id:"compatibility-between-relay-hooks-and-containers"},"Compatibility between Relay Hooks and Containers"),Object(o.b)("p",null,"Relay Hooks are fully compatible with Relay's ",Object(o.b)("a",Object(t.a)({parentName:"p"},{href:"../../api-reference/legacy-apis/"}),"container-based APIs"),", meaning that containers can render components that use Hooks, and vice-versa."),Object(o.b)("p",null,"This means that you can adopt Relay Hooks incrementally, either by using them exclusively for new code, or by migrating specific parts of your app, without affecting the rest of your existing application."),Object(o.b)("h2",{id:"migrating-existing-container-based-code"},"Migrating existing container-based code"),Object(o.b)("p",null,"As we've mentioned, migrating existing code to Relay Hooks is ",Object(o.b)("strong",{parentName:"p"},Object(o.b)("em",{parentName:"strong"},"not"))," required, and ",Object(o.b)("strong",{parentName:"p"},"container-based code will continue to work"),"."),Object(o.b)("p",null,"However, in this section we will go over common migration patterns you can follow if you do choose to migrate container-based code to Relay Hooks."),Object(o.b)("h3",{id:"queryrenderer-\u2192-uselazyloadquery"},Object(o.b)("inlineCode",{parentName:"h3"},"QueryRenderer")," \u2192 ",Object(o.b)("inlineCode",{parentName:"h3"},"useLazyLoadQuery")),Object(o.b)("p",null,"Converting from a ",Object(o.b)("inlineCode",{parentName:"p"},"QueryRenderer")," to the ",Object(o.b)("a",Object(t.a)({parentName:"p"},{href:"../../api-reference/use-lazy-load-query/"}),Object(o.b)("inlineCode",{parentName:"a"},"useLazyLoadQuery"))," Hook is the most straightforward conversion, and will have a similar behavior of fetching the specified query ",Object(o.b)("em",{parentName:"p"},"during render.")),Object(o.b)("p",null,"To convert a ",Object(o.b)("inlineCode",{parentName:"p"},"QueryRenderer")," to ",Object(o.b)("inlineCode",{parentName:"p"},"useLazyLoadQuery"),", you need to take the following steps:"),Object(o.b)("ol",null,Object(o.b)("li",{parentName:"ol"},"Render a ",Object(o.b)("a",Object(t.a)({parentName:"li"},{href:"../../api-reference/relay-environment-provider/"}),Object(o.b)("inlineCode",{parentName:"a"},"RelayEnvironmentProvider"))," where the QueryRenderer was, or above it. Usually, we recommend rendering the ",Object(o.b)("inlineCode",{parentName:"li"},"RelayEnvironmentProvider")," at the very root of your app:")),Object(o.b)("pre",null,Object(o.b)("code",Object(t.a)({parentName:"pre"},{className:"language-js"}),"<RelayEnvironmentProvider environment={MyAppEnvironment}>\n  <App />\n</RelayEnvironmentProvider>\n")),Object(o.b)("ol",{start:2},Object(o.b)("li",{parentName:"ol"},"Convert the ",Object(o.b)("inlineCode",{parentName:"li"},"QueryRenderer")," into ",Object(o.b)("inlineCode",{parentName:"li"},"useLazyLoadQuery"),":")),Object(o.b)("p",null,Object(o.b)("strong",{parentName:"p"},"Before:")),Object(o.b)("pre",null,Object(o.b)("code",Object(t.a)({parentName:"pre"},{className:"language-js"}),"import * as React from 'React';\nimport {graphql, QueryRenderer} from 'react-relay';\n\nexport default function Home() {\n  return (\n    <QueryRenderer\n      environment={MyAppEnvironment}\n      query={graphql`\n        query HomeQuery($id: ID!) {\n          user(id: $id) {\n            name\n          }\n        }\n      `}\n      variables={{id: 4}}\n      render={(props, error) => {\n        if (error) {\n          return <Error />;\n        }\n        if (!props) {\n          return <Loading />;\n        }\n        return <h1>{props.user?.name}</h1>\n      }}\n    />\n  );\n}\n")),Object(o.b)("p",null,Object(o.b)("strong",{parentName:"p"},"After:"),"\nFetch and render the query:"),Object(o.b)("pre",null,Object(o.b)("code",Object(t.a)({parentName:"pre"},{className:"language-js"}),"import * as React from 'React';\nimport {graphql, useLazyLoadQuery} from 'react-relay';\n\nexport default function Home() {\n  const data = useLazyLoadQuery(\n    graphql`\n      query HomeQuery($id: ID!) {\n        user(id: $id) {\n          name\n        }\n      }\n    `,\n    {id: 4},\n  );\n\n return <h1>{data.user?.name}</h1>;\n}\n")),Object(o.b)("p",null,Object(o.b)("a",Object(t.a)({parentName:"p"},{href:"../../guided-tour/rendering/loading-states/"}),"Loading states")," and ",Object(o.b)("a",Object(t.a)({parentName:"p"},{href:"../../guided-tour/rendering/error-states/"}),"error states")," are handled by Suspense and Error Boundaries:"),Object(o.b)("pre",null,Object(o.b)("code",Object(t.a)({parentName:"pre"},{className:"language-js"}),"<ErrorBoundary renderError={Error}>\n  <Suspense fallback={<Loading />}>\n    <Home />\n  </Suspense>\n</ErrorBoundary>\n")),Object(o.b)("h3",{id:"queryrenderer-\u2192-usequeryloader--usepreloadedquery"},Object(o.b)("inlineCode",{parentName:"h3"},"QueryRenderer")," \u2192 ",Object(o.b)("inlineCode",{parentName:"h3"},"useQueryLoader")," + ",Object(o.b)("inlineCode",{parentName:"h3"},"usePreloadedQuery")),Object(o.b)("p",null,"Unlike ",Object(o.b)("inlineCode",{parentName:"p"},"useLazyLoadQuery"),", using ",Object(o.b)("a",Object(t.a)({parentName:"p"},{href:"../../api-reference/use-query-loader/"}),Object(o.b)("inlineCode",{parentName:"a"},"useQueryLoader"))," in combination with ",Object(o.b)("a",Object(t.a)({parentName:"p"},{href:"../../api-reference/use-preloaded-query/"}),Object(o.b)("inlineCode",{parentName:"a"},"usePreloadedQuery"))," will start fetching the data ",Object(o.b)("em",{parentName:"p"},"ahead"),' of render, following the "render-as-you-fetch" pattern. This means that the data fetch will start sooner, and potentially speed up the time it takes to show content to users.'),Object(o.b)("p",null,"To make best use of this pattern, query loading is usually integrated at the router level, or other parts of your UI infra. To see a full example, see our ",Object(o.b)("a",Object(t.a)({parentName:"p"},{href:"https://github.com/relayjs/relay-examples/blob/master/issue-tracker/src/routes.js"}),Object(o.b)("inlineCode",{parentName:"a"},"issue-tracker"))," example app."),Object(o.b)("p",null,"To convert a ",Object(o.b)("inlineCode",{parentName:"p"},"QueryRenderer")," to ",Object(o.b)("inlineCode",{parentName:"p"},"useQueryLoader"),", you need to take the following steps:"),Object(o.b)("ol",null,Object(o.b)("li",{parentName:"ol"},"Render a ",Object(o.b)("a",Object(t.a)({parentName:"li"},{href:"../../api-reference/relay-environment-provider/"}),Object(o.b)("inlineCode",{parentName:"a"},"RelayEnvironmentProvider"))," where the QueryRenderer was, or above it. Usually, we recommend rendering the ",Object(o.b)("inlineCode",{parentName:"li"},"RelayEnvironmentProvider")," at the very root of your app:")),Object(o.b)("pre",null,Object(o.b)("code",Object(t.a)({parentName:"pre"},{className:"language-js"}),"<RelayEnvironmentProvider environment={MyAppEnvironment}>\n  <App />\n</RelayEnvironmentProvider>\n")),Object(o.b)("ol",{start:2},Object(o.b)("li",{parentName:"ol"},"Convert the ",Object(o.b)("inlineCode",{parentName:"li"},"QueryRenderer")," into ",Object(o.b)("inlineCode",{parentName:"li"},"useQueryLoader")," + ",Object(o.b)("inlineCode",{parentName:"li"},"usePreloadedQuery"),":")),Object(o.b)("p",null,Object(o.b)("strong",{parentName:"p"},"Before:")),Object(o.b)("pre",null,Object(o.b)("code",Object(t.a)({parentName:"pre"},{className:"language-js"}),"import * as React from 'React';\nimport {graphql, QueryRenderer} from 'react-relay';\n\nexport default function UserPopover() {\n  return (\n    <QueryRenderer\n      environment={MyAppEnvironment}\n      query={graphql`\n        query UserPopoverQuery($id: ID!) {\n          user(id: $id) {\n            name\n          }\n        }\n      `}\n      variables={{id: 4}}\n      render={(props, error) => {\n        if (error) {\n          return <Error />;\n        }\n        if (!props) {\n          return <Loading />;\n        }\n        return <h1>{props.user?.name}</h1>\n      }}\n    />\n  );\n}\n")),Object(o.b)("p",null,Object(o.b)("strong",{parentName:"p"},"After:"),"\nRender the preloaded query:"),Object(o.b)("pre",null,Object(o.b)("code",Object(t.a)({parentName:"pre"},{className:"language-js"}),"import * as React from 'React';\nimport {graphql, usePreloadedQuery} from 'react-relay';\n\nexport default function UserPopover(props) {\n  const data = usePreloadedQuery(\n    graphql`\n      query UserPopoverQuery($id: ID!) {\n        user(id: $id) {\n          name\n        }\n      }\n    `,\n    props.queryRef,\n  );\n\n return <h1>{data.user?.name}</h1>;\n}\n")),Object(o.b)("p",null,"Load the query with ",Object(o.b)("inlineCode",{parentName:"p"},"loadQuery")," from ",Object(o.b)("inlineCode",{parentName:"p"},"useQueryLoader"),". This part of the code would usually be integrated in your routing, or other parts of your UI infra:"),Object(o.b)("pre",null,Object(o.b)("code",Object(t.a)({parentName:"pre"},{className:"language-js"}),"import * as React from 'React';\nimport {useQueryLoader} from 'react-relay';\n\n// Import the query defined in the UserPopover component\nimport UserPopoverQuery from '__generated__/UserPopoverQuery.graphql';\n\n// This is *NOT* a real-world example, only used\n// to illustrate usage.\n\nexport default function UserPopoverButton(props) {\n  const [queryRef, loadQuery] = useQueryLoader(UserPopoverQuery)\n\n  const handleClick = useCallback(() => {\n    // Load the query in the event handler, onClick\n    loadQuery({id: props.userID})\n  }, [loadQuery, props.userID]);\n\n  return (\n    <>\n      <Button onClick={handleClick} />\n      {queryRef != null ?\n        <Popover>\n\n          {/* Loading and error states are handled by\n          Suspense and Error Boundaries */}\n          <ErrorBoundary renderError={Error}>\n            <Suspense fallback={<Loading />}>\n\n              {/*Pass the queryRef*/}\n              <UserPopover queryRef={queryRef} />\n\n            </Suspense>\n          </ErrorBoundary>\n        </Popover>\n        : null\n      }\n    </>\n  );\n}\n")),Object(o.b)("h3",{id:"fragment-container-\u2192-usefragment"},"Fragment Container \u2192 ",Object(o.b)("inlineCode",{parentName:"h3"},"useFragment")),Object(o.b)("p",null,"Fragment Containers will map directly into a ",Object(o.b)("a",Object(t.a)({parentName:"p"},{href:"../../api-reference/use-fragment/"}),Object(o.b)("inlineCode",{parentName:"a"},"useFragment"))," call:"),Object(o.b)("p",null,Object(o.b)("strong",{parentName:"p"},"Before:")),Object(o.b)("pre",null,Object(o.b)("code",Object(t.a)({parentName:"pre"},{className:"language-js"}),"import * as React from 'React';\nimport {graphql, createFragmentContainer} from 'react-relay';\n\nfunction UserComponent(props: Props) {\n  const user = props.user;\n  return (\n    <>\n      <h1>{user.name}</h1>\n      <div>\n        <img src={user.profile_picture?.uri} />\n      </div>\n    </>\n  );\n}\n\nexport default createFragmentContainer(UserComponent, {\n  user: graphql`\n    fragment UserComponent_user on User {\n      name\n      age\n      profile_picture(scale: 2) {\n        uri\n      }\n    }\n  `,\n});\n")),Object(o.b)("p",null,Object(o.b)("strong",{parentName:"p"},"After:")),Object(o.b)("pre",null,Object(o.b)("code",Object(t.a)({parentName:"pre"},{className:"language-js"}),"import * as React from 'React';\nimport {graphql, useFragment} from 'react-relay';\n\nexport default function UserComponent(props: Props) {\n  const data = useFragment(\n    graphql`\n      fragment UserComponent_user on User {\n        name\n        profile_picture(scale: $scale) {\n          uri\n        }\n      }\n    `,\n    props.user,\n  );\n\n  return (\n    <>\n      <h1>{data.name}</h1>\n      <div>\n        <img src={data.profile_picture?.uri} />\n      </div>\n    </>\n  );\n}\n")),Object(o.b)("h3",{id:"refetch-container-\u2192-userefetchablefragment"},"Refetch Container \u2192 ",Object(o.b)("inlineCode",{parentName:"h3"},"useRefetchableFragment")),Object(o.b)("p",null,"The refetch API for ",Object(o.b)("a",Object(t.a)({parentName:"p"},{href:"../../api-reference/use-refetchable-fragment/"}),Object(o.b)("inlineCode",{parentName:"a"},"useRefetchableFragment"))," has been simplified and reduced compared to the former Refetch Container. Migration will require mapping inputs into the new API."),Object(o.b)("p",null,Object(o.b)("strong",{parentName:"p"},"Before:")),Object(o.b)("pre",null,Object(o.b)("code",Object(t.a)({parentName:"pre"},{className:"language-js"}),"import * as React from 'React';\nimport {graphql, createRefetchContainer} from 'react-relay';\n\nfunction CommentBody(props: Props) {\n  const relay = props.relay;\n\n  return (\n    <>\n      <p>{data.body?.text}</p>\n      <Button\n        onClick={() => relay.refetch(\n          {lang: 'SPANISH'}, // fragmentVariables\n          null,  // renderVariables\n          error => { ... },\n          {force: true}\n        )}>\n        Translate Comment\n      </Button>\n    </>\n  );\n}\n\nexport default createRefetchContainer(\n  CommentBody,\n  {\n    user: graphql`\n      fragment CommentBody_comment on Comment {\n        body(lang: $lang) {\n          text\n        }\n      }\n    `,\n  },\n\n  // This option is no longer required, the refetch query\n  // will automatically be generated by Relay using the @refetchable\n  // directive.\n  graphql`\n    query AppQuery($id: ID!, lang: Lang) {\n      node(id: $id) {\n        ...CommentBody_comment\n      }\n    }\n  `,\n);\n")),Object(o.b)("p",null,Object(o.b)("strong",{parentName:"p"},"After:")),Object(o.b)("pre",null,Object(o.b)("code",Object(t.a)({parentName:"pre"},{className:"language-js"}),"import * as React from 'React';\nimport {graphql, useRefetchableFragment} from 'react-relay';\n\nexport default function CommentBody(props: Props) {\n  const [data, refetch] = useRefetchableFragment(\n    graphql`\n      fragment CommentBody_comment on Comment\n      @refetchable(queryName: \"CommentBodyRefetchQuery\") {\n        body(lang: $lang) {\n          text\n        }\n      }\n    `,\n    props.comment,\n  );\n\n  const handleClick = useCallback(() => {\n    refetch({lang: 'SPANISH'});\n  }, [refetch]);\n\n  return (\n    <>\n      <p>{data.body?.text}</p>\n      <Button\n        onClick={handleClick}>\n        Translate Comment\n      </Button>\n    </>\n  );\n}\n")),Object(o.b)("h3",{id:"pagination-container-\u2192-usepaginationfragment"},"Pagination Container \u2192 ",Object(o.b)("inlineCode",{parentName:"h3"},"usePaginationFragment")),Object(o.b)("p",null,"The pagination API for ",Object(o.b)("a",Object(t.a)({parentName:"p"},{href:"../../api-reference/use-pagination-fragment/"}),Object(o.b)("inlineCode",{parentName:"a"},"usePaginationFragment"))," has been greatly simplified and reduced compared to the former PaginationContainer. Migration will require mapping inputs into the new API."),Object(o.b)("p",null,Object(o.b)("strong",{parentName:"p"},"Before:")),Object(o.b)("pre",null,Object(o.b)("code",Object(t.a)({parentName:"pre"},{className:"language-js"}),'import * as React from \'React\';\nimport {graphql, createPaginationContainer} from \'react-relay\';\n\nclass UserContainerComponent extends React.Component {\n  render(): React.Node {\n    const isLoading = this.props.relay.isLoading() || this.state.loading;\n    const hasMore = this.props.relay.hasMore();\n\n    return (\n      <>\n        <FriendsList friends={this.props.user?.friends} />\n        <Button\n          onClick={() => this.loadMore()}\n          disabled={!hasMore || isLoading}>\n          Load More\n          {isLoading && <InlineSpinner />}\n        </Button>\n      </>\n    );\n  }\n\n  loadMore() {\n    if (\n      !this.props.relay.hasMore() ||\n      this.props.relay.isLoading() ||\n      this.state.loading\n    ) {\n      return;\n    }\n\n    this.setState({loading: true});\n\n    this.props.relay.loadMore(5, () => this.setState({loading: false}));\n  }\n}\n\nexport default createPaginationContainer(\n  UserContainerComponent,\n  {\n    user: graphql`\n      fragment UserContainerComponent_user on User\n      @argumentDefinitions(count: {type: "Int!"}, cursor: {type: "ID"})\n      @refetchable(queryName: "UserComponentRefetchQuery") {\n        friends(first: $count, after: $cursor)\n          @connection(key: "UserComponent_user_friends") {\n          edges {\n            node {\n              name\n            }\n          }\n        }\n      }\n    `,\n  },\n  {\n    // This option is no longer necessary, usePaginationFragment supports\n    // bi-directional pagination out of the box.\n    direction: \'forward\',\n\n    // This option is no longer required, and will be automatically\n    // determined by usePaginationFragment\n    getConnectionFromProps(props: Props) {\n      return props.user?.friends;\n    },\n\n    // This option is no longer required, and will be automatically\n    // determined by usePaginationFragment\n    getFragmentVariables(vars, count) {\n      return {...vars, count};\n    },\n\n    // This option is no longer required, and will be automatically\n    // determined by usePaginationFragment\n    getVariables(props: Props, {count, cursor}) {\n      return {\n        cursor,\n        count,\n      };\n    },\n\n    // This option is no longer required, the pagination query\n    // will automatically be generated by Relay using the @refetchable\n    // directive.\n    query: graphql`\n      query UserContainerComponentQuery {\n        viewer {\n          actor {\n            ... on User {\n              ...UserContainerComponent_user @arguments(count: 10)\n            }\n          }\n        }\n      }\n    `,\n  },\n);\n')),Object(o.b)("p",null,Object(o.b)("strong",{parentName:"p"},"After:")),Object(o.b)("pre",null,Object(o.b)("code",Object(t.a)({parentName:"pre"},{className:"language-js"}),"import * as React from 'React';\nimport {graphql, usePaginationFragment} from 'react-relay';\n\nexport default function UserComponent(props: Props) {\n  const {data, loadNext, hasNext, isLoadingNext} = usePaginationFragment(\n    graphql`\n      fragment UserComponent_user on User\n      @refetchable(queryName: \"UserComponentRefetchQuery\") {\n        friends(first: $count, after: $after)\n          @connection(key: \"UserComponent_user_friends\") {\n          edges {\n            node {\n              name\n            }\n          }\n        }\n      }\n    `,\n    props.user,\n  );\n\n  const handleClick = useCallback(() => {\n    loadNext(5)\n  }, [loadNext])\n\n  return (\n    <>\n      <FriendsList friends={data?.friends?.edges} />\n      <Button onClick={handleClick} disabled={!hasNext || isLoadingNext}>\n        Load More\n        {isLoadingNext && <InlineSpinner />}\n      </Button>\n    </>\n  );\n}\n")),Object(o.b)("hr",null),Object(o.b)("h3",{id:"queryrenderer-\u2192-useentrypointloader--entrypointcontainer"},"QueryRenderer \u2192 useEntryPointLoader + EntryPointContainer"),Object(o.b)("p",null,"TODO"),Object(o.b)("h3",{id:"commitmutation-\u2192-usemutation"},"commitMutation \u2192 useMutation"),Object(o.b)("p",null,"TODO"),Object(o.b)("h3",{id:"requestsubscription-\u2192-usesubscription"},"requestSubscription \u2192 useSubscription"),Object(o.b)("p",null,"TODO"))}p.isMDXComponent=!0},322:function(e,n,r){"use strict";r.d(n,"a",(function(){return u})),r.d(n,"b",(function(){return m}));var t=r(0),a=r.n(t);function o(e,n,r){return n in e?Object.defineProperty(e,n,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[n]=r,e}function i(e,n){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var t=Object.getOwnPropertySymbols(e);n&&(t=t.filter((function(n){return Object.getOwnPropertyDescriptor(e,n).enumerable}))),r.push.apply(r,t)}return r}function s(e){for(var n=1;n<arguments.length;n++){var r=null!=arguments[n]?arguments[n]:{};n%2?i(Object(r),!0).forEach((function(n){o(e,n,r[n])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):i(Object(r)).forEach((function(n){Object.defineProperty(e,n,Object.getOwnPropertyDescriptor(r,n))}))}return e}function c(e,n){if(null==e)return{};var r,t,a=function(e,n){if(null==e)return{};var r,t,a={},o=Object.keys(e);for(t=0;t<o.length;t++)r=o[t],n.indexOf(r)>=0||(a[r]=e[r]);return a}(e,n);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(t=0;t<o.length;t++)r=o[t],n.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(a[r]=e[r])}return a}var l=a.a.createContext({}),p=function(e){var n=a.a.useContext(l),r=n;return e&&(r="function"==typeof e?e(n):s(s({},n),e)),r},u=function(e){var n=p(e.components);return a.a.createElement(l.Provider,{value:n},e.children)},d={inlineCode:"code",wrapper:function(e){var n=e.children;return a.a.createElement(a.a.Fragment,{},n)}},b=a.a.forwardRef((function(e,n){var r=e.components,t=e.mdxType,o=e.originalType,i=e.parentName,l=c(e,["components","mdxType","originalType","parentName"]),u=p(r),b=t,m=u["".concat(i,".").concat(b)]||u[b]||d[b]||o;return r?a.a.createElement(m,s(s({ref:n},l),{},{components:r})):a.a.createElement(m,s({ref:n},l))}));function m(e,n){var r=arguments,t=n&&n.mdxType;if("string"==typeof e||t){var o=r.length,i=new Array(o);i[0]=b;var s={};for(var c in n)hasOwnProperty.call(n,c)&&(s[c]=n[c]);s.originalType=e,s.mdxType="string"==typeof e?e:t,i[1]=s;for(var l=2;l<o;l++)i[l]=r[l];return a.a.createElement.apply(null,i)}return a.a.createElement.apply(null,r)}b.displayName="MDXCreateElement"}}]);