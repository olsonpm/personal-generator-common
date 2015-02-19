'use strict';


//---------//
// Imports //
//---------//

var bFs = require('fs-bluebird')
    , path = require('path');


//------//
// Init //
//------//

var PROJECT_NAME_REGEX = /^[\w.-]+$/
    , PROJECT_NAME_REGEX_S = "^[\w.-]+$";


//------//
// Main //
//------//

function ProjectNameState(ctx_) {
    this.projectName = ctx_.projectName;
    this.ctx = ctx_;
    if (this.projectName) {
        ctx_.destinationRoot(path.join(ctx_.destinationRoot(), this.projectName));
    }
    if (this.projectName && !this.projectName.match(PROJECT_NAME_REGEX)) {
        throw new Error("project name '" + this.projectName + "' did not match the validation regex: " + PROJECT_NAME_REGEX_S + "\nPlease enter a valid project name.");
    }
}

ProjectNameState.prototype.getPrompt = function getProjectNamePrompt() {
    var self = this;
    return {
        'name': 'projectName'
        , 'message': "Project name or empty for current directory"
        , 'type': 'input'
        , 'validate': function(v) {
                return !v.match(PROJECT_NAME_REGEX) && v !== ''
                    ? "Project name must match the regex: " + PROJECT_NAME_REGEX_S
                    : true;
            }
        , 'when': function() {
            return !self.projectName;
        }
    };
};

module.exports = {
    ProjectNameState: ProjectNameState
};
