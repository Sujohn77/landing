module.exports = function (fn) {
    return function(){
      var args = [].slice.apply(arguments);
      return new Promise(
        function(resolve,reject){
          fn.apply(
            null,
            args.concat([
              function(){
                var results = [].slice.apply(arguments);
                (results[0])//first argument of callback is error
                  ? reject(results[0])//reject with error
                  : resolve(results.slice(1,results.length))//resolve with result(s)
              }
            ])
          )
        }
      );
    }
  };