const nextConfig = {
  reactStrictMode: false, // Opcjonalnie możesz to ustawić w zależności od potrzeb
  typescript: {
    ignoreBuildErrors: true, // Wyłącza błędy TypeScript w `next build`
  },
  // devIndicators: {
  //   buildActivity: false, // Wyłącza wskaźnik aktywności kompilacji w rogu ekranu
  // },
  // webpack: (config, { dev }) => {
  //   if (dev) {
  //     config.devServer = {
  //       overlay: false, // Wyłącza czerwony popup błędów
  //     };
  //   }
  //   return config;
  // },
};

export default nextConfig;
