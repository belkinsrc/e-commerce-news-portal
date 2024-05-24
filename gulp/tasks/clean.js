import { deleteAsync } from 'del';

const clean = () => {
  return deleteAsync(app.paths.base.build);
}

export { clean };