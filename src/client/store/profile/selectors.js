
const data = ({ profile: { data = {} } }) => data;

const loading = ({ profile: { isLoading }}) => isLoading;

export default {
  data,
  loading,
};
