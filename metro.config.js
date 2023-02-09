const nodeLibs = require('node-libs-react-native')


module.exports = {
  resolver: {
    extraNodeModules: {...nodeLibs, fs: require.resolve("react-native-level-fs") },
  },
};