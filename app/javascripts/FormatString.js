/*global define*/
/**
 * @author wangye.zhao@wandoujia.com
 */
(function (window) {
    define([], function () {

        var FormatString = function (input, values) {
            var result;
            if (typeof values === "object") {
                var vars = values;
                result = input.replace(/\{(\w+)\}/g, function (origin, target) {
                    return vars[target];
                });
            } else {
                var args = arguments;
                result = input.replace(/\{(\d+)\}/g, function (origin, target) {
                    return args[target];
                });
            }

            return result;
        };
        return FormatString;
    });
}(this));
