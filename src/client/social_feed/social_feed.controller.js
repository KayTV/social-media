angular.module('app')
.controller('SocialfeedController', ['$scope', 'httpFactory', 'twitterFactory', function($scope, httpFactory, twitterFactory){
  $scope.title = 'Social Zone Feed';
  twitterFactory.on('newTweet', function (tweet) {
    console.log('newTweet', tweet);
    $scope.tweet = tweet.text
    $scope.user = tweet.user.screen_name
    //parse source from payload
    var source = tweet.source.split('>')[1].split('<')[0].split(' ')[2]
    //all hashtags in the tweet
    var hashtags = tweet.entities.hashtags.map(function(el){
      return el.text.toLowerCase()
    })

    //check source and increment for #trump tweets
    if (hashtags.indexOf('trump') !== -1){
      switch (source) {
        case 'iPhone': $scope.trumpData[0]++
        break;
        case 'iPad': $scope.trumpData[1]++
        break;
        case 'Android': $scope.trumpData[2]++
        break;
        case 'Web': $scope.trumpData[3]++
        break;
        default: $scope.trumpData[4]++
      }
    }

    //check source and increment for #feelthebern tweets
    else if (hashtags.indexOf('feelthebern') !== -1) {
      switch (source) {
        case 'iPhone': $scope.sandersData[0]++
        break;
        case 'iPad': $scope.sandersData[1]++
        break;
        case 'Android': $scope.sandersData[2]++
        break;
        case 'Web': $scope.sandersData[3]++
        break;
        default: $scope.sandersData[4]++
      }
    }
  });
}]);
