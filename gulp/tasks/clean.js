const clean = () => {
  return app.plugins.deleteAsync(app.paths.base.build);
};

export { clean };
