
const data = ({ profile: { data = {} } }) => data;

const loading = ({ profile: { isLoading }}) => isLoading;

const all = ({ profile: { all = {} } }) => all;

export default {
  data,
  loading,
  all,
};
