//监听获得所有的commit message
var nodegit = require('nodegit');

nodegit.Repository.open('./oauth').then(function(repo){
    repo.getMasterCommit().then(function(commit) {
        var eventEmitter = commit.history();
        eventEmitter.on('commit', function(commit) {
          // Use commit
          console.log(commit.message());
        });
        eventEmitter.on('end', function(commits) {
          // Use commits
        });
        eventEmitter.on('error', function(error) {
          // Use error
        });
        eventEmitter.start()
    });
})

