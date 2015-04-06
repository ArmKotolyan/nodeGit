var nodegit = require("nodegit");
var promisify = require("promisify-node");
var fse = promisify(require("fs-extra"));
var path = "/tmp/nodegit-clone-demo";

fse.remove(path).then(function() {
  var entry;

  nodegit.Clone(
    //please enter https copy for cloning //
    path,
    {
      remoteCallbacks: {
        certificateCheck: function() {
               ///for OSX///
          return 1;
        }
      }
    })
  .then(function(repo) {
    return repo.getCommit("commmmmmmit");
  })
  .then(function(commit) {
    return commit.getEntry("README.md");
  })
  .then(function(entryResult) {
    entry = entryResult;
    return entry.getBlob();
  })
  .done(function(blob) {
    console.log(entry.filename(), entry.sha(), blob.rawsize() + "b");
    console.log("========================================================\n\n");
    var firstTenLines = blob.toString().split("\n").slice(0, 10).join("\n");
    console.log(firstTenLines);
    console.log("...");
  });
});