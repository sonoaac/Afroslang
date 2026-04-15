// Allow side-effect CSS imports throughout the project
declare module '*.css' {
  const _: Record<string, string>;
  export default _;
}
