
declare module '@originjs/vite-plugin-content' {
  // Properly define the module export as a function that returns a plugin
  const content: () => {
    name: string;
    // Add other plugin properties as needed
    [key: string]: any;
  };
  
  export default content;
}
