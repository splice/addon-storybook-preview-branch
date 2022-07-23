"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const styled_1 = __importDefault(require("@emotion/styled"));
const addons_1 = require("@storybook/addons");
const react_1 = __importDefault(require("react"));
const constants_1 = require("./constants");
const Label = styled_1.default.label `
  margin-right: 5px;
`;
const Form = styled_1.default.form `
  display: flex;
  align-items: center;
  font-size: 14px;
`;
const Input = styled_1.default.input `
  border-radius: 3px;
  border: 1px solid #eee;
  padding: 3px 5px;
`;
/**
 * Gets a cookie by name.
 * @param name The name of the target cookie
 */
function getCookie(name) {
    const cookies = {};
    document.cookie
        .split(';')
        .map(cookie => cookie.split('=').map(part => part.trim()))
        .forEach(cookie => {
        cookies[cookie[0]] = cookie[1];
    });
    return cookies[name];
}
let currentValue = getCookie('branch') || '';
/**
 * When the branch form is submitted. Saves the new value into the cookie and
 * refreshes the page.
 */
function onSubmit(event) {
    event.preventDefault();
    let cookie = `branch=${currentValue};path=/`;
    if (currentValue.trim() === '') {
        cookie = `${cookie};expires=Thu, 01 Jan 1970 00:00:01 GMT`;
    }
    document.cookie = cookie;
    location.href = location.href;
}
addons_1.addons.register(constants_1.ADDON_ID, api => {
    addons_1.addons.add(constants_1.ADDON_ID, {
        title: 'Preview Branch',
        type: addons_1.types.TOOL,
        match: ({ viewMode }) => viewMode === 'story',
        render: () => (react_1.default.createElement(Form, { onSubmit: onSubmit },
            react_1.default.createElement(Label, { htmlFor: "preview-branch" }, "Branch:"),
            react_1.default.createElement(Input, { id: "preview-branch", type: "text", placeholder: "default branch", defaultValue: currentValue, onChange: event => (currentValue = event.target.value.trim()) }))),
    });
});
//# sourceMappingURL=register.js.map