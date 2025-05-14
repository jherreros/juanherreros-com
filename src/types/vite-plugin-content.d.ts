
declare module '@originjs/vite-plugin-content' {
  // The plugin seems to export an object with a content function property
  const plugin: {
    content: () => {
      name: string;
      // Add other plugin properties as needed
      [key: string]: any;
    }
  };
  
  export { plugin };
}
