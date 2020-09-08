module.exports = {
  async redirects() {
    return [
      {
        source: "/",
        destination: "https://github.com/thesilican",
        permanent: true,
      },
    ];
  },
};
