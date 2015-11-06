var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") return Reflect.decorate(decorators, target, key, desc);
    switch (arguments.length) {
        case 2: return decorators.reduceRight(function(o, d) { return (d && d(o)) || o; }, target);
        case 3: return decorators.reduceRight(function(o, d) { return (d && d(target, key)), void 0; }, void 0);
        case 4: return decorators.reduceRight(function(o, d) { return (d && d(target, key, o)) || o; }, desc);
    }
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var angular2_1 = require('angular2/angular2');
var hub_client_1 = require('./bits/hub/hub.client');
var socket_client_1 = require('./bits/socket/socket.client');
var invokrTest_client_1 = require('./bits/invokrTest/invokrTest.client');
var invokr_client_1 = require('./bits/invokr/invokr.client');
var AppComponent = (function () {
    function AppComponent(module, module2) {
        this.module = module;
        this.module2 = module2;
        this.thing = 'this is a thing';
        this.stuff = 'and some stuff';
        var socket = new socket_client_1.Socket();
        var test = new invokrTest_client_1.InvokrTest();
        this.invokables.myfunction("blah");
    }
    AppComponent.prototype.thingfunction = function (data) {
        console.log(data);
    };
    Object.defineProperty(AppComponent.prototype, "thingfunction",
        __decorate([
            invokr_client_1.Invokable('myfunction'), 
            __metadata('design:type', Function), 
            __metadata('design:paramtypes', [Object]), 
            __metadata('design:returntype', void 0)
        ], AppComponent.prototype, "thingfunction", Object.getOwnPropertyDescriptor(AppComponent.prototype, "thingfunction")));
    AppComponent = __decorate([
        invokr_client_1.Invokable('AppComponent'),
        angular2_1.Component({
            selector: 'my-app',
            template: '<h1>My First {{thing}} {{stuff}} Angular 2 App</h1>'
        }), 
        __metadata('design:paramtypes', [hub_client_1.Module, hub_client_1.Module2])
    ], AppComponent);
    return AppComponent;
})();
exports.AppComponent = AppComponent;
