
declare module '@originjs/vite-plugin-content' {
  // The package exports a function directly
  const contentPlugin: () => {
    name: string;
    // Add other plugin properties as needed
    [key: string]: any;
  }
  
  export default contentPlugin;
}
