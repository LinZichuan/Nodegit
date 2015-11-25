//git commit
var nodegit = require('nodegit');
var Commit = nodegit.Commit;
var Repo = nodegit.Repository;
var Signature = nodegit.Signature;
var express = require('express');
var bodyParser = require('body-parser');

var app = express();
app.use(bodyParser());
app.post('/post/commit', function(req, res) {
    var userdir = req.body.userdir;
    var message = req.body.message;
    var filespath = req.body.filespath;
    var username = req.body.username;
    var email = req.body.email;
    console.log('received');
    Repo.open(userdir).then(function(repo){
        var ar = filespath.split(';');
        var sig = Signature.create(username, email, 1, 10);
        repo.createCommitOnHead(ar, sig, 
            sig, message).then(function(oid) {
            console.log (oid);
        }) 
    })
    res.send('commit success\n');
    return 200;
})

app.post('/post/createbranch', function(req, res) {
    Repo.open('./user1').then(function(repo){
        var username = 'LinZichuan';
        var email = 'linzichuan12@163.com';
        var branch_name = req.body.branch_name;
        var sig = Signature.create(username, email, 1, 10);
        repo.createBranch(branch_name, 'f175f74801de78bc1d9b63ca57b040b6a13f3325', false, sig, "create-branch1").then(function(ref) {
            console.log ('get new branch!');
            repo.setHead(ref.name()).then(function(result) {
                console.log('checkout branch to ' + ref.name());
            })
        })
    })
    res.send('create branch success\n');
    return 200;
})
//给定oid获得某一个commit
app.post('/post/open', function(req, res) {
    nodegit.Repository.open("./oauth").then(function(repo){
        //return repo.getHeadCommit();
        //return repo.getCommit("50444d364d3c00077a8efc305c0e5aca59ba6a67");
        return nodegit.Commit.lookup(repo, "50444d364d3c00077a8efc305c0e5aca59ba6a67");
        //return repo.getBranchCommit("master");   
    })
    .then(function(commit){
        return commit.message();
    })
    .then(function(message) {
        console.log(message);
    });
})
//git clone
var gitclone = function() {
    nodegit.Clone.clone('https://github.com/LinZichuan/oauth.git', './oauth', {}).then(
        function(repo){
            console.log (repo);
            console.log("yes");
        },function(err) {
            console.log(err);
        }
    )
}
//git init
var initRepo = function() {
    var cloneOptions = {};
    nodegit.Repository.init("./user1/.git", 0).then(
    function(repo) {
        console.log ("yes");
    }, function(err) {
        console.log (err);
    });
}
app.listen(7000);
