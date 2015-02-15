'use strict';

var bFs = require('fs-bluebird')
    , path = require('path');

var PROJECT_NAME_REGEX = new RegExp("^[\w.-]+$")
    , PROJECT_NAME_REGEX_S = "/^[\w.-]+$/";

function ProjectNameState(projectName_, ctx_) {
    this.projectName = projectName_;
    this.ctx = ctx_;
    if (projectName_) {
        ctx_.destinationRoot(path.join(ctx_.destinationRoot(), projectName_));
    }
    if (projectName_ && !projectName_.match(PROJECT_NAME_REGEX)) {
        throw new Error("project name '" + projectName_ + "' did not match the validation regex: " + PROJECT_NAME_REGEX_S + "\nPlease enter a valid project name.");
    }
}

ProjectNameState.prototype.getPrompt = function getProjectNamePrompt() {
    var self = this;
    return {
        'name': 'projectName'
        , 'message': 'Project name'
        , 'type': 'input'
        , 'validate': function(v) {
                // must match valid directory regex
                //   and also the directory must not already exist
                return !!v.match(PROJECT_NAME_REGEX) && !bFs.existsSync(path.join(self.ctx.destinationRoot(), v));
            }
        , 'when': function() {
            return !self.projectName;
        }
    };
};

module.exports = {
    ProjectNameState: ProjectNameState
};
