declare type RouteConfig = {
  path: string;
  element: JSX.Element;
  nestedRoutes?: Array<RouteConfig>;
  shouldRender?: boolean;
};