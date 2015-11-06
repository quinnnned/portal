var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var invokr_client_1 = require('../invokr/invokr.client');
var InvokrTest = (function (_super) {
    __extends(InvokrTest, _super);
    function InvokrTest() {
        _super.call(this);
    }
    InvokrTest.prototype.publicmethod = function () {
    };
    InvokrTest.prototype.privatemethod = function () {
    };
    return InvokrTest;
})(invokr_client_1.InvokrClient);
exports.InvokrTest = InvokrTest;
