require('../utils/reflect.shared');
var Metadata = (function () {
    function Metadata() {
    }
    Metadata.Has = function (cls, fieldKey) {
        return Reflect.getMetadataKeys(Metadata.getTarget(cls, fieldKey)).length;
    };
    Metadata.Set = function (metadataKey, metadataValue, cls, fieldKey) {
        Reflect.defineMetadata(metadataKey, metadataValue, Metadata.getTarget(cls, fieldKey), fieldKey);
    };
    Metadata.Get = function (metadataKey, cls, fieldKey) {
        var target = fieldKey ? cls.prototype : cls;
        return Reflect.getMetadata(metadataKey, target, fieldKey);
    };
    Metadata.Decorate = function (key, value) {
        return function (target, propertyKey) {
            Reflect.decorate([
                Reflect.metadata(key, value)
            ], target, propertyKey);
        };
    };
    Metadata.PrintAll = function (cls, fieldKeys, log) {
        if (fieldKeys === void 0) { fieldKeys = []; }
        if (log === void 0) { log = null; }
        log = log || console.log;
        fieldKeys.unshift(undefined);
        log();
        fieldKeys.forEach(function (fieldKey) {
            var suffix = fieldKey ? "." + fieldKey : '';
            var target = fieldKey ? cls.prototype : cls;
            log("Metadata for " + cls.name + suffix);
            Reflect.getMetadataKeys(target, fieldKey).forEach(function (key) {
                var value = Reflect.getMetadata(key, target, fieldKey);
                log("  " + key + " : " + value);
            });
        });
    };
    Metadata.prototype.getTarget = function (cls, fieldKey) {
        return fieldKey ? cls.prototype : cls;
    };
    Metadata.DecorateMultiple = Reflect.decorate;
    return Metadata;
})();
exports.Metadata = Metadata;
