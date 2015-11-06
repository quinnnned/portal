var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var invokr_server_1 = require('../invokr/invokr.server');
var InvokrTest = (function (_super) {
    __extends(InvokrTest, _super);
    function InvokrTest() {
        _super.call(this);
    }
    return InvokrTest;
})(invokr_server_1.InvokrServer);
exports.InvokrTest = InvokrTest;
