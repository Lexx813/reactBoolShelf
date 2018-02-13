const config = {
  production:{
    SECRET: process.env.SECRET,
    DATABASE:process.env.MONODB_URI 
  },
  default:{
         SECRET:'UIVUYVUVUYDUVYTCYC1234',
         DATABASE: 'mongodb://localhost:27017/bookshelf'
  }
}



exports.get = function get(env) {
  return config[env] || config.default
}