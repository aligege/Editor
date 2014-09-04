﻿/// <reference path="./Tests.html" />
/// <reference path="../Core/BabylonEditorUtils.js" />

/* File creating BabylonEditorUtils.js tests */

module("Parsers", {
    setup: function () {
        /// Nothing
    },
    teardown: function () {
        /// Nothing
    }
});

test("toFloat test", function () {
    equal(BABYLON.Editor.Utils.toFloat("3.14"), 3.14, 'dot : equals PI');
    equal(BABYLON.Editor.Utils.toFloat("3,14"), 3.14, 'coma : equals PI');
    equal(BABYLON.Editor.Utils.toFloat('3.14'), 3.14, 'dot : equals PI');
    equal(BABYLON.Editor.Utils.toFloat('3,14'), 3.14, 'coma : equals PI');
});
