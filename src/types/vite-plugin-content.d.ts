
declare module '@originjs/vite-plugin-content' {
  // Define it as a default export since it's a CommonJS module
  const contentPlugin: {
    content: () => {
      name: string;
      // Add other plugin properties as needed
      [key: string]: any;
    }
  };
  
  export default contentPlugin;
}
