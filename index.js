var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf, __hasOwnProp = Object.prototype.hasOwnProperty;
var __esm = (fn, res) => function() {
  return fn && (res = (0, fn[__getOwnPropNames(fn)[0]])(fn = 0)), res;
};
var __commonJS = (cb, mod) => function() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: !0 });
}, __copyProps = (to, from, except, desc) => {
  if (from && typeof from == "object" || typeof from == "function")
    for (let key of __getOwnPropNames(from))
      !__hasOwnProp.call(to, key) && key !== except && __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: !0 }) : target,
  mod
)), __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: !0 }), mod);

// server-assets-manifest:@remix-run/dev/assets-manifest
var assets_manifest_exports = {};
__export(assets_manifest_exports, {
  default: () => assets_manifest_default
});
var assets_manifest_default, init_assets_manifest = __esm({
  "server-assets-manifest:@remix-run/dev/assets-manifest"() {
    assets_manifest_default = { version: "b422ad4c", entry: { module: "/build/entry.client-X73MRCEI.js", imports: ["/build/_shared/chunk-WBSSJX4J.js", "/build/_shared/chunk-5XCBIPQZ.js"] }, routes: { root: { id: "root", parentId: void 0, path: "", index: void 0, caseSensitive: void 0, module: "/build/root-VBRQCUPN.js", imports: void 0, hasAction: !1, hasLoader: !1, hasCatchBoundary: !1, hasErrorBoundary: !1 }, "routes/_index": { id: "routes/_index", parentId: "root", path: void 0, index: !0, caseSensitive: void 0, module: "/build/routes/_index-NL6XAAOX.js", imports: void 0, hasAction: !1, hasLoader: !1, hasCatchBoundary: !1, hasErrorBoundary: !1 } }, cssBundleHref: void 0, hmr: void 0, url: "/build/manifest-B422AD4C.js" };
  }
});

// node_modules/@remix-run/css-bundle/dist/server.js
var require_server = __commonJS({
  "node_modules/@remix-run/css-bundle/dist/server.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: !0 });
    var assetsManifest = (init_assets_manifest(), __toCommonJS(assets_manifest_exports));
    function _interopDefaultLegacy(e) {
      return e && typeof e == "object" && "default" in e ? e : { default: e };
    }
    var assetsManifest__default = /* @__PURE__ */ _interopDefaultLegacy(assetsManifest), cssBundleHref2 = assetsManifest__default.default.cssBundleHref;
    exports.cssBundleHref = cssBundleHref2;
  }
});

// <stdin>
var stdin_exports = {};
__export(stdin_exports, {
  assets: () => assets_manifest_default,
  assetsBuildDirectory: () => assetsBuildDirectory,
  entry: () => entry,
  future: () => future,
  publicPath: () => publicPath,
  routes: () => routes
});
module.exports = __toCommonJS(stdin_exports);

// app/entry.server.tsx
var entry_server_exports = {};
__export(entry_server_exports, {
  default: () => handleRequest
});
var import_node_stream = require("node:stream"), import_node = require("@remix-run/node"), import_react = require("@remix-run/react"), import_isbot = __toESM(require("isbot")), import_server = require("react-dom/server"), import_jsx_runtime = require("react/jsx-runtime"), ABORT_DELAY = 5e3;
function handleRequest(request, responseStatusCode, responseHeaders, remixContext) {
  return (0, import_isbot.default)(request.headers.get("user-agent")) ? handleBotRequest(
    request,
    responseStatusCode,
    responseHeaders,
    remixContext
  ) : handleBrowserRequest(
    request,
    responseStatusCode,
    responseHeaders,
    remixContext
  );
}
function handleBotRequest(request, responseStatusCode, responseHeaders, remixContext) {
  return new Promise((resolve, reject) => {
    let { pipe, abort } = (0, import_server.renderToPipeableStream)(
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
        import_react.RemixServer,
        {
          context: remixContext,
          url: request.url,
          abortDelay: ABORT_DELAY
        }
      ),
      {
        onAllReady() {
          let body = new import_node_stream.PassThrough();
          responseHeaders.set("Content-Type", "text/html"), resolve(
            new import_node.Response(body, {
              headers: responseHeaders,
              status: responseStatusCode
            })
          ), pipe(body);
        },
        onShellError(error) {
          reject(error);
        },
        onError(error) {
          responseStatusCode = 500, console.error(error);
        }
      }
    );
    setTimeout(abort, ABORT_DELAY);
  });
}
function handleBrowserRequest(request, responseStatusCode, responseHeaders, remixContext) {
  return new Promise((resolve, reject) => {
    let { pipe, abort } = (0, import_server.renderToPipeableStream)(
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
        import_react.RemixServer,
        {
          context: remixContext,
          url: request.url,
          abortDelay: ABORT_DELAY
        }
      ),
      {
        onShellReady() {
          let body = new import_node_stream.PassThrough();
          responseHeaders.set("Content-Type", "text/html"), resolve(
            new import_node.Response(body, {
              headers: responseHeaders,
              status: responseStatusCode
            })
          ), pipe(body);
        },
        onShellError(error) {
          reject(error);
        },
        onError(error) {
          console.error(error), responseStatusCode = 500;
        }
      }
    );
    setTimeout(abort, ABORT_DELAY);
  });
}

// app/root.tsx
var root_exports = {};
__export(root_exports, {
  default: () => App,
  links: () => links
});
var import_css_bundle = __toESM(require_server()), import_react2 = require("@remix-run/react"), import_jsx_runtime2 = require("react/jsx-runtime"), links = () => [
  ...import_css_bundle.cssBundleHref ? [{ rel: "stylesheet", href: import_css_bundle.cssBundleHref }] : []
];
function App() {
  return /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("html", { lang: "en", children: [
    /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("head", { children: [
      /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("meta", { charSet: "utf-8" }),
      /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("meta", { name: "viewport", content: "width=device-width,initial-scale=1" }),
      /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(import_react2.Meta, {}),
      /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(import_react2.Links, {})
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("body", { children: [
      /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(import_react2.Outlet, {}),
      /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(import_react2.ScrollRestoration, {}),
      /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(import_react2.Scripts, {}),
      /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(import_react2.LiveReload, {})
    ] })
  ] });
}

// app/routes/_index.tsx
var index_exports = {};
__export(index_exports, {
  default: () => Index,
  links: () => links2,
  meta: () => meta
});
var import_react4 = require("react");

// app/models/utils.tsx
var import_jsx_runtime3 = require("react/jsx-runtime");
function SwitchStateButton({ name, select }) {
  return /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("div", { children: /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("button", { className: "switchStateButton", onClick: select, children: [
    " ",
    name,
    " "
  ] }) });
}
var default_filler_leaf = {
  data: {
    id: -1,
    text: "filler",
    options: []
  },
  subbranches: {}
};
function populateDefaultTree(setTree) {
  fetch("http://131.191.25.178:8000/getpart?item_id=1", {
    method: "GET",
    headers: {
      "Content-Type": "application/json"
    }
  }).then((response) => response.ok ? response.json() : default_filler_leaf.data).then((data) => {
    setTree({
      data,
      subbranches: []
    });
  });
}

// app/models/story.tsx
var import_react3 = require("react"), import_jsx_runtime4 = require("react/jsx-runtime");
function Story({ tree, setTree, currentHistory, setCurrentHistory }) {
  let [newPart, setNewPart] = (0, import_react3.useState)(null);
  function traverseTree(choices, callback) {
    if (!tree)
      return default_filler_leaf;
    let currentBranch = tree;
    callback(currentBranch);
    for (let choice of choices)
      currentBranch = currentBranch.subbranches[choice], callback(currentBranch);
    return currentBranch;
  }
  function getBranch(leaf, newHistory) {
    let choice = newHistory[newHistory.length - 1];
    fetch("http://131.191.25.178:8000/getpart?item_id=" + choice, {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    }).then((response) => response.ok ? response.json() : default_filler_leaf.data).then((data) => {
      leaf.subbranches[choice] = {
        data,
        subbranches: []
      }, setTree(tree), setCurrentHistory(newHistory);
    });
  }
  function createNewPart(option, content) {
    fetch("http://131.191.25.178:8000/newpart", {
      method: "POST",
      body: JSON.stringify(content),
      headers: {
        "Content-Type": "application/json"
      }
    }).then((response) => response.json()).then((data) => {
      option.child_part = data.id, setTree(tree), setNewPart(null);
    });
  }
  function selectOption(history, choice) {
    if (choice.child_part) {
      setNewPart(null);
      let newHistory = [...history, choice.child_part], leaf = traverseTree(history, () => {
      });
      choice.child_part in leaf.subbranches ? setCurrentHistory(newHistory) : getBranch(leaf, newHistory);
    } else
      setCurrentHistory(history), setNewPart(choice);
  }
  let parts_data = [];
  traverseTree(currentHistory, (b) => parts_data.push(b.data));
  let chosen = parts_data.map((p, index) => {
    if (index >= currentHistory.length)
      return newPart ? newPart.id : -1;
    for (let option of p.options)
      if (option.child_part === currentHistory[index])
        return option.id;
    return -1;
  }), parts = parts_data.map((p, index) => ({
    data: p,
    history: currentHistory.slice(0, index),
    select: selectOption,
    chosen: chosen[index]
  }));
  return /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("div", { className: "story", children: [
    parts.map(({ data, history, select, chosen: chosen2 }) => /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(Part, { data, history, select, chosen: chosen2 }, history.join("-") + "p")),
    newPart ? /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(CreatePart, { option: newPart, create: createNewPart }) : ""
  ] });
}
function CreatePart({ option, create }) {
  let [mainText, setMainText] = (0, import_react3.useState)(""), [options, setOptions] = (0, import_react3.useState)([]);
  function setOption(value, index) {
    setOptions([...options.slice(0, index), { text: value }, ...options.slice(index + 1)]);
  }
  return /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("div", { className: "createPart", children: [
    /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("h1", { children: " Create a new part! " }),
    /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("p", { children: " You can finish the story, or leave room for someone else to extend it by adding options." }),
    /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("span", { children: " Main Story Text: " }),
    /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("textarea", { className: "mainText", value: mainText, onChange: (e) => setMainText(e.target.value) }),
    /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("span", { children: " Options: " }),
    options.map((option2, index) => /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("div", { className: "optionDiv", children: [
      /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(
        "textarea",
        {
          className: "optionText",
          value: options[index].text,
          onChange: (e) => setOption(e.target.value, index)
        }
      ),
      /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(
        "button",
        {
          className: "deleteOptionButton",
          onClick: () => setOptions([
            ...options.slice(0, index),
            ...options.slice(index + 1)
          ]),
          children: "Delete option"
        }
      )
    ] }, index + "-newoption")),
    /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("button", { className: "newOptionButton", onClick: () => setOptions([...options, { text: "" }]), children: " New Option" }),
    /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("button", { className: "submitButton", onClick: () => create(option, { text: mainText, parent: option.id, options }), children: "Submit" })
  ] });
}
function Part({ data, history, select, chosen }) {
  return /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("div", { className: "part", children: [
    /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("div", { className: "partHeader", children: [
      " ",
      data.text,
      " "
    ] }),
    data.options.map((o) => /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(Option, { data: o, history, selected: o.id === chosen, select: () => select(history, o) }, history.join("-") + "p" + o.id))
  ] });
}
function Option({ data, history, selected, select }) {
  return selected ? /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("button", { className: "option selected", onClick: select, children: [
    " ",
    data.text,
    " "
  ] }) : /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("button", { className: "option", onClick: select, children: [
    " ",
    data.text,
    " "
  ] });
}

// app/models/tree.tsx
var import_jsx_runtime5 = require("react/jsx-runtime");
function Tree({ tree, setTree, currentHistory, setCurrentHistory }) {
  let subbranches = tree.data.options.map((option) => option.child_part);
  return /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("div", { children: [
    /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("div", { className: "treeLayer", children: /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(Node, { id: tree.data.id, selected: tree.data.id === currentHistory[0], select: () => setCurrentHistory([]) }) }),
    /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("div", { className: "treeLayer", children: subbranches.map((subbranch, index) => subbranch && tree.subbranches[subbranch] ? /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(
      Tree,
      {
        tree: tree.subbranches[subbranch],
        setTree,
        currentHistory: currentHistory.slice(1),
        setCurrentHistory: (hist) => {
          setCurrentHistory([subbranch, ...hist]);
        }
      },
      tree.data.id + "-" + subbranch
    ) : /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(UnexploredNode, {}, tree.data.id + "-" + index + "unexplored")) })
  ] });
}
function Node({ id, selected, select }) {
  return selected ? /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("span", { className: "node selected", onClick: select, children: [
    " ",
    id,
    " "
  ] }) : /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("span", { className: "node", onClick: select, children: [
    " ",
    id,
    " "
  ] });
}
function UnexploredNode() {
  return /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("span", { className: "unexplored node", children: " ??? " });
}

// app/styles/index.css
var styles_default = "/build/_assets/index-YSGDN657.css";

// app/routes/_index.tsx
var import_jsx_runtime6 = require("react/jsx-runtime"), links2 = () => [
  { rel: "stylesheet", href: styles_default }
], meta = () => [{ title: "Build Your Own Adventure" }];
function Index() {
  let [currentState, setCurrentState] = (0, import_react4.useState)(0 /* story */), [tree, setTree] = (0, import_react4.useState)(), [currentHistory, setCurrentHistory] = (0, import_react4.useState)([]);
  if (!tree)
    return populateDefaultTree(setTree), /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("div", {});
  let body, buttondata;
  switch (currentState) {
    case 0 /* story */:
      body = /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(
        Story,
        {
          tree,
          setTree,
          currentHistory,
          setCurrentHistory
        }
      ), buttondata = {
        name: "tree",
        select: () => setCurrentState(1 /* tree */)
      };
      break;
    case 1 /* tree */:
      body = /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("div", { className: "treeContainer", children: /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(
        Tree,
        {
          tree,
          setTree,
          currentHistory: [1, ...currentHistory],
          setCurrentHistory
        }
      ) }), buttondata = {
        name: "story",
        select: () => setCurrentState(0 /* story */)
      };
      break;
  }
  return /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)("div", { children: [
    /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(SwitchStateButton, { name: buttondata.name, select: buttondata.select }),
    body
  ] });
}

// server-entry-module:@remix-run/dev/server-build
init_assets_manifest();
var assetsBuildDirectory = "public/build", future = { unstable_dev: !1, unstable_postcss: !1, unstable_tailwind: !1, v2_errorBoundary: !0, v2_meta: !0, v2_normalizeFormMethod: !0, v2_routeConvention: !0 }, publicPath = "/build/", entry = { module: entry_server_exports }, routes = {
  root: {
    id: "root",
    parentId: void 0,
    path: "",
    index: void 0,
    caseSensitive: void 0,
    module: root_exports
  },
  "routes/_index": {
    id: "routes/_index",
    parentId: "root",
    path: void 0,
    index: !0,
    caseSensitive: void 0,
    module: index_exports
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  assets,
  assetsBuildDirectory,
  entry,
  future,
  publicPath,
  routes
});
/*! Bundled license information:

@remix-run/css-bundle/dist/server.js:
  (**
   * @remix-run/css-bundle v1.16.0
   *
   * Copyright (c) Remix Software Inc.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE.md file in the root directory of this source tree.
   *
   * @license MIT
   *)
*/
