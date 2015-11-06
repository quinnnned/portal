var InvokrClient = (function () {
    function InvokrClient() {
        console.log({
            name: this.constructor.name,
            stuff: this.getOwnPropertyNames,
            self: this
        });
    }
    return InvokrClient;
})();
exports.InvokrClient = InvokrClient;
function Invokable(what) {
    return function (target, name, descriptor) {
        console.log({ message: 'decorating:' + what, args: arguments });
        if (!descriptor)
            return;
        target.invokables = target.invokables || {};
        target.invokables[what] = descriptor.value;
    };
}
exports.Invokable = Invokable;
;
