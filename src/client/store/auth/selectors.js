
const user = ({ auth: { user = {} } }) => user;

const isLoading = ({ auth: { isLoading = false } }) => isLoading;

export default {
  user,
  isLoading,
};
