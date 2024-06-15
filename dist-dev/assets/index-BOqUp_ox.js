var _a;
(function polyfill() {
  const relList = document.createElement("link").relList;
  if (relList && relList.supports && relList.supports("modulepreload")) {
    return;
  }
  for (const link of document.querySelectorAll('link[rel="modulepreload"]')) {
    processPreload(link);
  }
  new MutationObserver((mutations) => {
    for (const mutation of mutations) {
      if (mutation.type !== "childList") {
        continue;
      }
      for (const node of mutation.addedNodes) {
        if (node.tagName === "LINK" && node.rel === "modulepreload")
          processPreload(node);
      }
    }
  }).observe(document, { childList: true, subtree: true });
  function getFetchOpts(link) {
    const fetchOpts = {};
    if (link.integrity) fetchOpts.integrity = link.integrity;
    if (link.referrerPolicy) fetchOpts.referrerPolicy = link.referrerPolicy;
    if (link.crossOrigin === "use-credentials")
      fetchOpts.credentials = "include";
    else if (link.crossOrigin === "anonymous") fetchOpts.credentials = "omit";
    else fetchOpts.credentials = "same-origin";
    return fetchOpts;
  }
  function processPreload(link) {
    if (link.ep)
      return;
    link.ep = true;
    const fetchOpts = getFetchOpts(link);
    fetch(link.href, fetchOpts);
  }
})();
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const t$2 = globalThis, i$3 = t$2.trustedTypes, s$3 = i$3 ? i$3.createPolicy("lit-html", { createHTML: (t2) => t2 }) : void 0, e$3 = "$lit$", h$3 = `lit$${Math.random().toFixed(9).slice(2)}$`, o$4 = "?" + h$3, n$4 = `<${o$4}>`, r$4 = document, l$1 = () => r$4.createComment(""), c$3 = (t2) => null === t2 || "object" != typeof t2 && "function" != typeof t2, a$1 = Array.isArray, u$1 = (t2) => a$1(t2) || "function" == typeof (t2 == null ? void 0 : t2[Symbol.iterator]), d$1 = "[ 	\n\f\r]", f$3 = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, v = /-->/g, _ = />/g, m = RegExp(`>|${d$1}(?:([^\\s"'>=/]+)(${d$1}*=${d$1}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g"), p$1 = /'/g, g = /"/g, $$1 = /^(?:script|style|textarea|title)$/i, y$1 = (t2) => (i3, ...s2) => ({ _$litType$: t2, strings: i3, values: s2 }), x = y$1(1), w = Symbol.for("lit-noChange"), T = Symbol.for("lit-nothing"), A = /* @__PURE__ */ new WeakMap(), E = r$4.createTreeWalker(r$4, 129);
function C(t2, i3) {
  if (!Array.isArray(t2) || !t2.hasOwnProperty("raw")) throw Error("invalid template strings array");
  return void 0 !== s$3 ? s$3.createHTML(i3) : i3;
}
const P = (t2, i3) => {
  const s2 = t2.length - 1, o2 = [];
  let r2, l2 = 2 === i3 ? "<svg>" : "", c2 = f$3;
  for (let i4 = 0; i4 < s2; i4++) {
    const s3 = t2[i4];
    let a2, u2, d2 = -1, y2 = 0;
    for (; y2 < s3.length && (c2.lastIndex = y2, u2 = c2.exec(s3), null !== u2); ) y2 = c2.lastIndex, c2 === f$3 ? "!--" === u2[1] ? c2 = v : void 0 !== u2[1] ? c2 = _ : void 0 !== u2[2] ? ($$1.test(u2[2]) && (r2 = RegExp("</" + u2[2], "g")), c2 = m) : void 0 !== u2[3] && (c2 = m) : c2 === m ? ">" === u2[0] ? (c2 = r2 ?? f$3, d2 = -1) : void 0 === u2[1] ? d2 = -2 : (d2 = c2.lastIndex - u2[2].length, a2 = u2[1], c2 = void 0 === u2[3] ? m : '"' === u2[3] ? g : p$1) : c2 === g || c2 === p$1 ? c2 = m : c2 === v || c2 === _ ? c2 = f$3 : (c2 = m, r2 = void 0);
    const x2 = c2 === m && t2[i4 + 1].startsWith("/>") ? " " : "";
    l2 += c2 === f$3 ? s3 + n$4 : d2 >= 0 ? (o2.push(a2), s3.slice(0, d2) + e$3 + s3.slice(d2) + h$3 + x2) : s3 + h$3 + (-2 === d2 ? i4 : x2);
  }
  return [C(t2, l2 + (t2[s2] || "<?>") + (2 === i3 ? "</svg>" : "")), o2];
};
class V {
  constructor({ strings: t2, _$litType$: s2 }, n3) {
    let r2;
    this.parts = [];
    let c2 = 0, a2 = 0;
    const u2 = t2.length - 1, d2 = this.parts, [f3, v2] = P(t2, s2);
    if (this.el = V.createElement(f3, n3), E.currentNode = this.el.content, 2 === s2) {
      const t3 = this.el.content.firstChild;
      t3.replaceWith(...t3.childNodes);
    }
    for (; null !== (r2 = E.nextNode()) && d2.length < u2; ) {
      if (1 === r2.nodeType) {
        if (r2.hasAttributes()) for (const t3 of r2.getAttributeNames()) if (t3.endsWith(e$3)) {
          const i3 = v2[a2++], s3 = r2.getAttribute(t3).split(h$3), e2 = /([.?@])?(.*)/.exec(i3);
          d2.push({ type: 1, index: c2, name: e2[2], strings: s3, ctor: "." === e2[1] ? k : "?" === e2[1] ? H : "@" === e2[1] ? I : R }), r2.removeAttribute(t3);
        } else t3.startsWith(h$3) && (d2.push({ type: 6, index: c2 }), r2.removeAttribute(t3));
        if ($$1.test(r2.tagName)) {
          const t3 = r2.textContent.split(h$3), s3 = t3.length - 1;
          if (s3 > 0) {
            r2.textContent = i$3 ? i$3.emptyScript : "";
            for (let i3 = 0; i3 < s3; i3++) r2.append(t3[i3], l$1()), E.nextNode(), d2.push({ type: 2, index: ++c2 });
            r2.append(t3[s3], l$1());
          }
        }
      } else if (8 === r2.nodeType) if (r2.data === o$4) d2.push({ type: 2, index: c2 });
      else {
        let t3 = -1;
        for (; -1 !== (t3 = r2.data.indexOf(h$3, t3 + 1)); ) d2.push({ type: 7, index: c2 }), t3 += h$3.length - 1;
      }
      c2++;
    }
  }
  static createElement(t2, i3) {
    const s2 = r$4.createElement("template");
    return s2.innerHTML = t2, s2;
  }
}
function N(t2, i3, s2 = t2, e2) {
  var _a2, _b;
  if (i3 === w) return i3;
  let h2 = void 0 !== e2 ? (_a2 = s2._$Co) == null ? void 0 : _a2[e2] : s2._$Cl;
  const o2 = c$3(i3) ? void 0 : i3._$litDirective$;
  return (h2 == null ? void 0 : h2.constructor) !== o2 && ((_b = h2 == null ? void 0 : h2._$AO) == null ? void 0 : _b.call(h2, false), void 0 === o2 ? h2 = void 0 : (h2 = new o2(t2), h2._$AT(t2, s2, e2)), void 0 !== e2 ? (s2._$Co ?? (s2._$Co = []))[e2] = h2 : s2._$Cl = h2), void 0 !== h2 && (i3 = N(t2, h2._$AS(t2, i3.values), h2, e2)), i3;
}
let S$1 = class S {
  constructor(t2, i3) {
    this._$AV = [], this._$AN = void 0, this._$AD = t2, this._$AM = i3;
  }
  get parentNode() {
    return this._$AM.parentNode;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  u(t2) {
    const { el: { content: i3 }, parts: s2 } = this._$AD, e2 = ((t2 == null ? void 0 : t2.creationScope) ?? r$4).importNode(i3, true);
    E.currentNode = e2;
    let h2 = E.nextNode(), o2 = 0, n3 = 0, l2 = s2[0];
    for (; void 0 !== l2; ) {
      if (o2 === l2.index) {
        let i4;
        2 === l2.type ? i4 = new M(h2, h2.nextSibling, this, t2) : 1 === l2.type ? i4 = new l2.ctor(h2, l2.name, l2.strings, this, t2) : 6 === l2.type && (i4 = new L(h2, this, t2)), this._$AV.push(i4), l2 = s2[++n3];
      }
      o2 !== (l2 == null ? void 0 : l2.index) && (h2 = E.nextNode(), o2++);
    }
    return E.currentNode = r$4, e2;
  }
  p(t2) {
    let i3 = 0;
    for (const s2 of this._$AV) void 0 !== s2 && (void 0 !== s2.strings ? (s2._$AI(t2, s2, i3), i3 += s2.strings.length - 2) : s2._$AI(t2[i3])), i3++;
  }
};
class M {
  get _$AU() {
    var _a2;
    return ((_a2 = this._$AM) == null ? void 0 : _a2._$AU) ?? this._$Cv;
  }
  constructor(t2, i3, s2, e2) {
    this.type = 2, this._$AH = T, this._$AN = void 0, this._$AA = t2, this._$AB = i3, this._$AM = s2, this.options = e2, this._$Cv = (e2 == null ? void 0 : e2.isConnected) ?? true;
  }
  get parentNode() {
    let t2 = this._$AA.parentNode;
    const i3 = this._$AM;
    return void 0 !== i3 && 11 === (t2 == null ? void 0 : t2.nodeType) && (t2 = i3.parentNode), t2;
  }
  get startNode() {
    return this._$AA;
  }
  get endNode() {
    return this._$AB;
  }
  _$AI(t2, i3 = this) {
    t2 = N(this, t2, i3), c$3(t2) ? t2 === T || null == t2 || "" === t2 ? (this._$AH !== T && this._$AR(), this._$AH = T) : t2 !== this._$AH && t2 !== w && this._(t2) : void 0 !== t2._$litType$ ? this.$(t2) : void 0 !== t2.nodeType ? this.T(t2) : u$1(t2) ? this.k(t2) : this._(t2);
  }
  S(t2) {
    return this._$AA.parentNode.insertBefore(t2, this._$AB);
  }
  T(t2) {
    this._$AH !== t2 && (this._$AR(), this._$AH = this.S(t2));
  }
  _(t2) {
    this._$AH !== T && c$3(this._$AH) ? this._$AA.nextSibling.data = t2 : this.T(r$4.createTextNode(t2)), this._$AH = t2;
  }
  $(t2) {
    var _a2;
    const { values: i3, _$litType$: s2 } = t2, e2 = "number" == typeof s2 ? this._$AC(t2) : (void 0 === s2.el && (s2.el = V.createElement(C(s2.h, s2.h[0]), this.options)), s2);
    if (((_a2 = this._$AH) == null ? void 0 : _a2._$AD) === e2) this._$AH.p(i3);
    else {
      const t3 = new S$1(e2, this), s3 = t3.u(this.options);
      t3.p(i3), this.T(s3), this._$AH = t3;
    }
  }
  _$AC(t2) {
    let i3 = A.get(t2.strings);
    return void 0 === i3 && A.set(t2.strings, i3 = new V(t2)), i3;
  }
  k(t2) {
    a$1(this._$AH) || (this._$AH = [], this._$AR());
    const i3 = this._$AH;
    let s2, e2 = 0;
    for (const h2 of t2) e2 === i3.length ? i3.push(s2 = new M(this.S(l$1()), this.S(l$1()), this, this.options)) : s2 = i3[e2], s2._$AI(h2), e2++;
    e2 < i3.length && (this._$AR(s2 && s2._$AB.nextSibling, e2), i3.length = e2);
  }
  _$AR(t2 = this._$AA.nextSibling, i3) {
    var _a2;
    for ((_a2 = this._$AP) == null ? void 0 : _a2.call(this, false, true, i3); t2 && t2 !== this._$AB; ) {
      const i4 = t2.nextSibling;
      t2.remove(), t2 = i4;
    }
  }
  setConnected(t2) {
    var _a2;
    void 0 === this._$AM && (this._$Cv = t2, (_a2 = this._$AP) == null ? void 0 : _a2.call(this, t2));
  }
}
class R {
  get tagName() {
    return this.element.tagName;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  constructor(t2, i3, s2, e2, h2) {
    this.type = 1, this._$AH = T, this._$AN = void 0, this.element = t2, this.name = i3, this._$AM = e2, this.options = h2, s2.length > 2 || "" !== s2[0] || "" !== s2[1] ? (this._$AH = Array(s2.length - 1).fill(new String()), this.strings = s2) : this._$AH = T;
  }
  _$AI(t2, i3 = this, s2, e2) {
    const h2 = this.strings;
    let o2 = false;
    if (void 0 === h2) t2 = N(this, t2, i3, 0), o2 = !c$3(t2) || t2 !== this._$AH && t2 !== w, o2 && (this._$AH = t2);
    else {
      const e3 = t2;
      let n3, r2;
      for (t2 = h2[0], n3 = 0; n3 < h2.length - 1; n3++) r2 = N(this, e3[s2 + n3], i3, n3), r2 === w && (r2 = this._$AH[n3]), o2 || (o2 = !c$3(r2) || r2 !== this._$AH[n3]), r2 === T ? t2 = T : t2 !== T && (t2 += (r2 ?? "") + h2[n3 + 1]), this._$AH[n3] = r2;
    }
    o2 && !e2 && this.j(t2);
  }
  j(t2) {
    t2 === T ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, t2 ?? "");
  }
}
class k extends R {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(t2) {
    this.element[this.name] = t2 === T ? void 0 : t2;
  }
}
class H extends R {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(t2) {
    this.element.toggleAttribute(this.name, !!t2 && t2 !== T);
  }
}
class I extends R {
  constructor(t2, i3, s2, e2, h2) {
    super(t2, i3, s2, e2, h2), this.type = 5;
  }
  _$AI(t2, i3 = this) {
    if ((t2 = N(this, t2, i3, 0) ?? T) === w) return;
    const s2 = this._$AH, e2 = t2 === T && s2 !== T || t2.capture !== s2.capture || t2.once !== s2.once || t2.passive !== s2.passive, h2 = t2 !== T && (s2 === T || e2);
    e2 && this.element.removeEventListener(this.name, this, s2), h2 && this.element.addEventListener(this.name, this, t2), this._$AH = t2;
  }
  handleEvent(t2) {
    var _a2;
    "function" == typeof this._$AH ? this._$AH.call(((_a2 = this.options) == null ? void 0 : _a2.host) ?? this.element, t2) : this._$AH.handleEvent(t2);
  }
}
class L {
  constructor(t2, i3, s2) {
    this.element = t2, this.type = 6, this._$AN = void 0, this._$AM = i3, this.options = s2;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(t2) {
    N(this, t2);
  }
}
const Z = t$2.litHtmlPolyfillSupport;
Z == null ? void 0 : Z(V, M), (t$2.litHtmlVersions ?? (t$2.litHtmlVersions = [])).push("3.1.4");
const j = (t2, i3, s2) => {
  const e2 = (s2 == null ? void 0 : s2.renderBefore) ?? i3;
  let h2 = e2._$litPart$;
  if (void 0 === h2) {
    const t3 = (s2 == null ? void 0 : s2.renderBefore) ?? null;
    e2._$litPart$ = h2 = new M(i3.insertBefore(l$1(), t3), t3, void 0, s2 ?? {});
  }
  return h2._$AI(t2), h2;
};
/**
 * @license
 * Copyright 2020 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const f$2 = (o2) => void 0 === o2.strings;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const t$1 = { ATTRIBUTE: 1, CHILD: 2, PROPERTY: 3, BOOLEAN_ATTRIBUTE: 4, EVENT: 5, ELEMENT: 6 }, e$2 = (t2) => (...e2) => ({ _$litDirective$: t2, values: e2 });
let i$2 = class i {
  constructor(t2) {
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AT(t2, e2, i3) {
    this._$Ct = t2, this._$AM = e2, this._$Ci = i3;
  }
  _$AS(t2, e2) {
    return this.update(t2, e2);
  }
  update(t2, e2) {
    return this.render(...e2);
  }
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const s$2 = (i3, t2) => {
  var _a2;
  const e2 = i3._$AN;
  if (void 0 === e2) return false;
  for (const i4 of e2) (_a2 = i4._$AO) == null ? void 0 : _a2.call(i4, t2, false), s$2(i4, t2);
  return true;
}, o$3 = (i3) => {
  let t2, e2;
  do {
    if (void 0 === (t2 = i3._$AM)) break;
    e2 = t2._$AN, e2.delete(i3), i3 = t2;
  } while (0 === (e2 == null ? void 0 : e2.size));
}, r$3 = (i3) => {
  for (let t2; t2 = i3._$AM; i3 = t2) {
    let e2 = t2._$AN;
    if (void 0 === e2) t2._$AN = e2 = /* @__PURE__ */ new Set();
    else if (e2.has(i3)) break;
    e2.add(i3), c$2(t2);
  }
};
function h$2(i3) {
  void 0 !== this._$AN ? (o$3(this), this._$AM = i3, r$3(this)) : this._$AM = i3;
}
function n$3(i3, t2 = false, e2 = 0) {
  const r2 = this._$AH, h2 = this._$AN;
  if (void 0 !== h2 && 0 !== h2.size) if (t2) if (Array.isArray(r2)) for (let i4 = e2; i4 < r2.length; i4++) s$2(r2[i4], false), o$3(r2[i4]);
  else null != r2 && (s$2(r2, false), o$3(r2));
  else s$2(this, i3);
}
const c$2 = (i3) => {
  i3.type == t$1.CHILD && (i3._$AP ?? (i3._$AP = n$3), i3._$AQ ?? (i3._$AQ = h$2));
};
let f$1 = class f extends i$2 {
  constructor() {
    super(...arguments), this._$AN = void 0;
  }
  _$AT(i3, t2, e2) {
    super._$AT(i3, t2, e2), r$3(this), this.isConnected = i3._$AU;
  }
  _$AO(i3, t2 = true) {
    var _a2, _b;
    i3 !== this.isConnected && (this.isConnected = i3, i3 ? (_a2 = this.reconnected) == null ? void 0 : _a2.call(this) : (_b = this.disconnected) == null ? void 0 : _b.call(this)), t2 && (s$2(this, i3), o$3(this));
  }
  setValue(t2) {
    if (f$2(this._$Ct)) this._$Ct._$AI(t2, this);
    else {
      const i3 = [...this._$Ct._$AH];
      i3[this._$Ci] = t2, this._$Ct._$AI(i3, this, 0);
    }
  }
  disconnected() {
  }
  reconnected() {
  }
};
function getCleanupNode(effect) {
  var _a2;
  let cleanupNode = effect.cleanupTree;
  (_a2 = effect.cleanupTreeNodePointer) === null || _a2 === void 0 ? void 0 : _a2.forEach((part) => {
    cleanupNode = cleanupNode === null || cleanupNode === void 0 ? void 0 : cleanupNode.get(part);
  });
  return cleanupNode;
}
function traverseAndEvaluate(cleanupNode) {
  let nextChildNode = 0;
  while (cleanupNode === null || cleanupNode === void 0 ? void 0 : cleanupNode.get(nextChildNode)) {
    if (nextChildNode === 0) {
      const cleanupSet = cleanupNode.get(0);
      cleanupSet.forEach((cleanup) => {
        cleanup();
      });
      cleanupSet.clear();
    } else {
      const nextCleanupNode = cleanupNode.get(nextChildNode);
      traverseAndEvaluate(nextCleanupNode);
    }
    nextChildNode++;
  }
}
function effectAndDescendantCleanup(effect) {
  const cleanupNode = getCleanupNode(effect);
  traverseAndEvaluate(cleanupNode);
}
const effectContexts = [];
function observableSubscriptionsCleanup(effect) {
  effect.observableSubscriptionSets.forEach((observableSubscriptionSet) => {
    observableSubscriptionSet.delete(effect);
  });
  effect.observableSubscriptionSets.clear();
}
function setCleanupSet(effect) {
  var _a2;
  let cleanupNode = effect.cleanupTree;
  (_a2 = effect.cleanupTreeNodePointer) === null || _a2 === void 0 ? void 0 : _a2.forEach((part) => {
    if (!(cleanupNode === null || cleanupNode === void 0 ? void 0 : cleanupNode.get(part))) {
      cleanupNode === null || cleanupNode === void 0 ? void 0 : cleanupNode.set(part, /* @__PURE__ */ new Map());
    }
    cleanupNode = cleanupNode === null || cleanupNode === void 0 ? void 0 : cleanupNode.get(part);
  });
  if (!(cleanupNode === null || cleanupNode === void 0 ? void 0 : cleanupNode.get(0))) {
    cleanupNode === null || cleanupNode === void 0 ? void 0 : cleanupNode.set(0, /* @__PURE__ */ new Set());
  }
}
function setInitialParameters(effect) {
  const parentEffect = effectContexts[effectContexts.length - 1];
  if (parentEffect) {
    parentEffect.childCount++;
    effect.position = parentEffect.childCount;
    effect.level = parentEffect.level + 1;
    effect.cleanupTree = parentEffect.cleanupTree;
    effect.cleanupTreeNodePointer = [
      ...parentEffect.cleanupTreeNodePointer
    ];
    let effectCleanupTreeNodePointerLength = effect.cleanupTreeNodePointer.length;
    if (effectCleanupTreeNodePointerLength === effect.level) {
      effect.cleanupTreeNodePointer[effectCleanupTreeNodePointerLength - 1] = effect.position;
    } else if (effectCleanupTreeNodePointerLength < effect.level) {
      effect.cleanupTreeNodePointer[effectCleanupTreeNodePointerLength] = effect.position;
    } else if (effectCleanupTreeNodePointerLength > effect.level) {
      effect.cleanupTreeNodePointer.pop();
      effect.cleanupTreeNodePointer[effectCleanupTreeNodePointerLength - 2] = effect.position;
    }
  } else {
    effect.level = 1;
    effect.position = 1;
    effect.cleanupTreeNodePointer = [1];
    effect.cleanupTree = /* @__PURE__ */ new Map();
  }
}
function unsetParameters(effect) {
  effect.level = null;
  effect.position = null;
  effect.cleanupTreeNodePointer = null;
  effect.cleanupTree = null;
  effect.childCount = 0;
}
function baseExecuteFn(effect, fn) {
  var _a2;
  effectAndDescendantCleanup(effect);
  setInitialParameters(effect);
  setCleanupSet(effect);
  effectContexts.push(effect);
  const cleanupSet = (_a2 = getCleanupNode(effect)) === null || _a2 === void 0 ? void 0 : _a2.get(0);
  fn(cleanupSet);
  cleanupSet === null || cleanupSet === void 0 ? void 0 : cleanupSet.add(() => observableSubscriptionsCleanup(effect));
  cleanupSet === null || cleanupSet === void 0 ? void 0 : cleanupSet.add(() => unsetParameters(effect));
  effectContexts.pop();
}
function implicitDependencyExecuteFn(effect, fn) {
  baseExecuteFn(effect, (cleanupSet) => internalFn$1(effect, fn, cleanupSet));
  return () => effectAndDescendantCleanup(effect);
}
function internalFn$1(effect, fn, cleanupSet) {
  const fnReturnValue = fn(effect.returnValue);
  const returnValueCleanup = () => {
    if (typeof fnReturnValue === "function") {
      effect.returnValue = fnReturnValue();
    }
  };
  cleanupSet === null || cleanupSet === void 0 ? void 0 : cleanupSet.add(returnValueCleanup);
}
function dependencyArrayExecuteFn(effect, fn, depArray, options = {}) {
  baseExecuteFn(effect, (cleanupSet) => internalFn(effect, fn, depArray, options, cleanupSet));
  return () => effectAndDescendantCleanup(effect);
}
function internalFn(effect, fn, depArray, options = {}, cleanupSet) {
  if (effect.firstRun && options.defer) {
    effect.firstRun = false;
  } else {
    const fnReturnValue = fn(effect.returnValue, effect.argsArray);
    const returnValueCleanup = () => {
      if (typeof fnReturnValue === "function") {
        effect.returnValue = fnReturnValue();
      }
    };
    cleanupSet === null || cleanupSet === void 0 ? void 0 : cleanupSet.add(returnValueCleanup);
  }
  effect.tracking = "implicit";
  effect.argsArray = depArray.map((state) => state());
  effect.tracking = "depArray";
}
const executeFns = {
  implicit: implicitDependencyExecuteFn,
  depArray: dependencyArrayExecuteFn
};
const asyncEffectArray1 = [];
const asyncEffectArray2 = [];
let one$1 = true;
function addAsyncEffect(fn) {
  const asyncEffectArray = one$1 ? asyncEffectArray1 : asyncEffectArray2;
  const newOne = one$1 ? false : true;
  asyncEffectArray.push(fn);
  if (asyncEffectArray.length === 1) {
    setTimeout(() => {
      one$1 = newOne;
      asyncEffectArray.forEach((fn2) => fn2());
      asyncEffectArray.length = 0;
    });
  }
}
const renderEffectArray1 = [];
const renderEffectArray2 = [];
let one = true;
function addRenderEffect(fn) {
  const renderEffectArray = one ? renderEffectArray1 : renderEffectArray2;
  const newOne = one ? false : true;
  renderEffectArray.push(fn);
  if (renderEffectArray.length === 1) {
    queueMicrotask(() => {
      one = newOne;
      renderEffectArray.forEach((fn2) => fn2());
      renderEffectArray.length = 0;
    });
  }
}
function sendSignal(effect, execute, fn, signal, depArray) {
  if (signal === "stale") {
    effect.staleStateValuesCount++;
    effect.falseAlarmSignalsCount++;
  } else if (signal === "fresh" || signal === "falseAlarm") {
    effect.staleStateValuesCount--;
    if (signal === "falseAlarm") {
      effect.falseAlarmSignalsCount--;
    }
    if (effect.staleStateValuesCount <= 0) {
      if (effect.falseAlarmSignalsCount > 0) {
        executeMap[effect.type](effect, execute, fn, depArray);
      }
      effect.falseAlarmSignalsCount = 0;
      effect.staleStateValuesCount = 0;
    }
  }
}
const executeMap = {
  sync: (effect, execute, fn, depArray) => execute(effect, fn, depArray),
  async: (effect, execute, fn, depArray) => addAsyncEffect(() => execute(effect, fn, depArray)),
  render: (effect, execute, fn, depArray) => addRenderEffect(() => execute(effect, fn, depArray))
};
function createEffect(type, tracking, fn, depArray) {
  const execute = executeFns[tracking];
  const effect = {
    //whether or not the effect hasn't been ran before
    firstRun: true,
    //whether the effect is async, sync or a render effect
    type,
    //how the effect is tracked (refer to the `tracking` variable above)
    tracking,
    //how many children the effect has
    childCount: 0,
    //the number "n" that shows that the effect is the "nth" child of its parent effect
    position: null,
    //how deeply nested the effect is (starting from level one)
    level: null,
    //tree-like map data structure that contains the cleanups for every effect in the effect tree
    cleanupTree: null,
    //array of digits that point to the effect's cleanup in the effect tree's cleanup tree
    cleanupTreeNodePointer: null,
    //subscription sets (async, sync, render, or memo) of every state currently tracking this effect
    observableSubscriptionSets: /* @__PURE__ */ new Set(),
    //used to track the number of state values of states currently tracking the effect that are stale
    staleStateValuesCount: 0,
    //used to track the number of state values of states currently tracking the effect that say they are stale
    //but are not actually stale
    falseAlarmSignalsCount: 0,
    //used to notify the effect when a state value of state currently tracking the effect turns
    //stale or freshens up after turning stale
    sendSignal: (signal) => sendSignal(effect, execute, fn, signal, depArray)
  };
  return [execute, effect];
}
function adaptSyncEffect(fn, depArray, options) {
  const tracking = typeof depArray === "undefined" ? "implicit" : "depArray";
  const [execute, effect] = createEffect("sync", tracking, fn, depArray);
  return execute(effect, fn, depArray, options);
}
class $ extends f$1 {
  // TODO: only allow directive use in the child position
  // TODO: find out why reconnection doesn't happen
  // TODO: perform prop diffing and stop unnecessary component initialization
  constructor(partInfo) {
    super(partInfo);
    this.props = {};
    this.cleanups = [];
  }
  disposeComponent() {
    this.cleanups.forEach((cleanup) => cleanup());
    this.cleanups = [];
  }
  disconnected() {
    this.disposeComponent();
  }
  initializeComponent(reconnected = false) {
    this.cleanups.push(adaptSyncEffect(() => {
      var _a2;
      this.htmlFn = (_a2 = this.Component) === null || _a2 === void 0 ? void 0 : _a2.call(this, this.props);
    }, []));
    let templateResult;
    let updateFromLit = true;
    const componentCleanup = adaptSyncEffect(() => {
      var _a2;
      templateResult = (_a2 = this.htmlFn) === null || _a2 === void 0 ? void 0 : _a2.call(this);
      if (updateFromLit === false || reconnected === true) {
        this.setValue(templateResult);
      }
    });
    updateFromLit = false;
    this.cleanups.push(componentCleanup);
    return templateResult;
  }
  reconnected() {
    this.initializeComponent(true);
  }
  render(Component, props) {
    for (const prop in props) {
      this.props[prop] = props[prop];
    }
    this.Component = Component;
    this.disposeComponent();
    const templateResult = this.initializeComponent();
    return templateResult;
  }
}
const h$1 = e$2($);
/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const t = globalThis, e$1 = t.ShadowRoot && (void 0 === t.ShadyCSS || t.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, s$1 = Symbol(), o$2 = /* @__PURE__ */ new WeakMap();
let n$2 = class n {
  constructor(t2, e2, o2) {
    if (this._$cssResult$ = true, o2 !== s$1) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = t2, this.t = e2;
  }
  get styleSheet() {
    let t2 = this.o;
    const s2 = this.t;
    if (e$1 && void 0 === t2) {
      const e2 = void 0 !== s2 && 1 === s2.length;
      e2 && (t2 = o$2.get(s2)), void 0 === t2 && ((this.o = t2 = new CSSStyleSheet()).replaceSync(this.cssText), e2 && o$2.set(s2, t2));
    }
    return t2;
  }
  toString() {
    return this.cssText;
  }
};
const r$2 = (t2) => new n$2("string" == typeof t2 ? t2 : t2 + "", void 0, s$1), S2 = (s2, o2) => {
  if (e$1) s2.adoptedStyleSheets = o2.map((t2) => t2 instanceof CSSStyleSheet ? t2 : t2.styleSheet);
  else for (const e2 of o2) {
    const o3 = document.createElement("style"), n3 = t.litNonce;
    void 0 !== n3 && o3.setAttribute("nonce", n3), o3.textContent = e2.cssText, s2.appendChild(o3);
  }
}, c$1 = e$1 ? (t2) => t2 : (t2) => t2 instanceof CSSStyleSheet ? ((t3) => {
  let e2 = "";
  for (const s2 of t3.cssRules) e2 += s2.cssText;
  return r$2(e2);
})(t2) : t2;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const { is: i$1, defineProperty: e, getOwnPropertyDescriptor: r$1, getOwnPropertyNames: h, getOwnPropertySymbols: o$1, getPrototypeOf: n$1 } = Object, a = globalThis, c = a.trustedTypes, l = c ? c.emptyScript : "", p = a.reactiveElementPolyfillSupport, d = (t2, s2) => t2, u = { toAttribute(t2, s2) {
  switch (s2) {
    case Boolean:
      t2 = t2 ? l : null;
      break;
    case Object:
    case Array:
      t2 = null == t2 ? t2 : JSON.stringify(t2);
  }
  return t2;
}, fromAttribute(t2, s2) {
  let i3 = t2;
  switch (s2) {
    case Boolean:
      i3 = null !== t2;
      break;
    case Number:
      i3 = null === t2 ? null : Number(t2);
      break;
    case Object:
    case Array:
      try {
        i3 = JSON.parse(t2);
      } catch (t3) {
        i3 = null;
      }
  }
  return i3;
} }, f2 = (t2, s2) => !i$1(t2, s2), y = { attribute: true, type: String, converter: u, reflect: false, hasChanged: f2 };
Symbol.metadata ?? (Symbol.metadata = Symbol("metadata")), a.litPropertyMetadata ?? (a.litPropertyMetadata = /* @__PURE__ */ new WeakMap());
class b extends HTMLElement {
  static addInitializer(t2) {
    this._$Ei(), (this.l ?? (this.l = [])).push(t2);
  }
  static get observedAttributes() {
    return this.finalize(), this._$Eh && [...this._$Eh.keys()];
  }
  static createProperty(t2, s2 = y) {
    if (s2.state && (s2.attribute = false), this._$Ei(), this.elementProperties.set(t2, s2), !s2.noAccessor) {
      const i3 = Symbol(), r2 = this.getPropertyDescriptor(t2, i3, s2);
      void 0 !== r2 && e(this.prototype, t2, r2);
    }
  }
  static getPropertyDescriptor(t2, s2, i3) {
    const { get: e2, set: h2 } = r$1(this.prototype, t2) ?? { get() {
      return this[s2];
    }, set(t3) {
      this[s2] = t3;
    } };
    return { get() {
      return e2 == null ? void 0 : e2.call(this);
    }, set(s3) {
      const r2 = e2 == null ? void 0 : e2.call(this);
      h2.call(this, s3), this.requestUpdate(t2, r2, i3);
    }, configurable: true, enumerable: true };
  }
  static getPropertyOptions(t2) {
    return this.elementProperties.get(t2) ?? y;
  }
  static _$Ei() {
    if (this.hasOwnProperty(d("elementProperties"))) return;
    const t2 = n$1(this);
    t2.finalize(), void 0 !== t2.l && (this.l = [...t2.l]), this.elementProperties = new Map(t2.elementProperties);
  }
  static finalize() {
    if (this.hasOwnProperty(d("finalized"))) return;
    if (this.finalized = true, this._$Ei(), this.hasOwnProperty(d("properties"))) {
      const t3 = this.properties, s2 = [...h(t3), ...o$1(t3)];
      for (const i3 of s2) this.createProperty(i3, t3[i3]);
    }
    const t2 = this[Symbol.metadata];
    if (null !== t2) {
      const s2 = litPropertyMetadata.get(t2);
      if (void 0 !== s2) for (const [t3, i3] of s2) this.elementProperties.set(t3, i3);
    }
    this._$Eh = /* @__PURE__ */ new Map();
    for (const [t3, s2] of this.elementProperties) {
      const i3 = this._$Eu(t3, s2);
      void 0 !== i3 && this._$Eh.set(i3, t3);
    }
    this.elementStyles = this.finalizeStyles(this.styles);
  }
  static finalizeStyles(s2) {
    const i3 = [];
    if (Array.isArray(s2)) {
      const e2 = new Set(s2.flat(1 / 0).reverse());
      for (const s3 of e2) i3.unshift(c$1(s3));
    } else void 0 !== s2 && i3.push(c$1(s2));
    return i3;
  }
  static _$Eu(t2, s2) {
    const i3 = s2.attribute;
    return false === i3 ? void 0 : "string" == typeof i3 ? i3 : "string" == typeof t2 ? t2.toLowerCase() : void 0;
  }
  constructor() {
    super(), this._$Ep = void 0, this.isUpdatePending = false, this.hasUpdated = false, this._$Em = null, this._$Ev();
  }
  _$Ev() {
    var _a2;
    this._$ES = new Promise((t2) => this.enableUpdating = t2), this._$AL = /* @__PURE__ */ new Map(), this._$E_(), this.requestUpdate(), (_a2 = this.constructor.l) == null ? void 0 : _a2.forEach((t2) => t2(this));
  }
  addController(t2) {
    var _a2;
    (this._$EO ?? (this._$EO = /* @__PURE__ */ new Set())).add(t2), void 0 !== this.renderRoot && this.isConnected && ((_a2 = t2.hostConnected) == null ? void 0 : _a2.call(t2));
  }
  removeController(t2) {
    var _a2;
    (_a2 = this._$EO) == null ? void 0 : _a2.delete(t2);
  }
  _$E_() {
    const t2 = /* @__PURE__ */ new Map(), s2 = this.constructor.elementProperties;
    for (const i3 of s2.keys()) this.hasOwnProperty(i3) && (t2.set(i3, this[i3]), delete this[i3]);
    t2.size > 0 && (this._$Ep = t2);
  }
  createRenderRoot() {
    const t2 = this.shadowRoot ?? this.attachShadow(this.constructor.shadowRootOptions);
    return S2(t2, this.constructor.elementStyles), t2;
  }
  connectedCallback() {
    var _a2;
    this.renderRoot ?? (this.renderRoot = this.createRenderRoot()), this.enableUpdating(true), (_a2 = this._$EO) == null ? void 0 : _a2.forEach((t2) => {
      var _a3;
      return (_a3 = t2.hostConnected) == null ? void 0 : _a3.call(t2);
    });
  }
  enableUpdating(t2) {
  }
  disconnectedCallback() {
    var _a2;
    (_a2 = this._$EO) == null ? void 0 : _a2.forEach((t2) => {
      var _a3;
      return (_a3 = t2.hostDisconnected) == null ? void 0 : _a3.call(t2);
    });
  }
  attributeChangedCallback(t2, s2, i3) {
    this._$AK(t2, i3);
  }
  _$EC(t2, s2) {
    var _a2;
    const i3 = this.constructor.elementProperties.get(t2), e2 = this.constructor._$Eu(t2, i3);
    if (void 0 !== e2 && true === i3.reflect) {
      const r2 = (void 0 !== ((_a2 = i3.converter) == null ? void 0 : _a2.toAttribute) ? i3.converter : u).toAttribute(s2, i3.type);
      this._$Em = t2, null == r2 ? this.removeAttribute(e2) : this.setAttribute(e2, r2), this._$Em = null;
    }
  }
  _$AK(t2, s2) {
    var _a2;
    const i3 = this.constructor, e2 = i3._$Eh.get(t2);
    if (void 0 !== e2 && this._$Em !== e2) {
      const t3 = i3.getPropertyOptions(e2), r2 = "function" == typeof t3.converter ? { fromAttribute: t3.converter } : void 0 !== ((_a2 = t3.converter) == null ? void 0 : _a2.fromAttribute) ? t3.converter : u;
      this._$Em = e2, this[e2] = r2.fromAttribute(s2, t3.type), this._$Em = null;
    }
  }
  requestUpdate(t2, s2, i3) {
    if (void 0 !== t2) {
      if (i3 ?? (i3 = this.constructor.getPropertyOptions(t2)), !(i3.hasChanged ?? f2)(this[t2], s2)) return;
      this.P(t2, s2, i3);
    }
    false === this.isUpdatePending && (this._$ES = this._$ET());
  }
  P(t2, s2, i3) {
    this._$AL.has(t2) || this._$AL.set(t2, s2), true === i3.reflect && this._$Em !== t2 && (this._$Ej ?? (this._$Ej = /* @__PURE__ */ new Set())).add(t2);
  }
  async _$ET() {
    this.isUpdatePending = true;
    try {
      await this._$ES;
    } catch (t3) {
      Promise.reject(t3);
    }
    const t2 = this.scheduleUpdate();
    return null != t2 && await t2, !this.isUpdatePending;
  }
  scheduleUpdate() {
    return this.performUpdate();
  }
  performUpdate() {
    var _a2;
    if (!this.isUpdatePending) return;
    if (!this.hasUpdated) {
      if (this.renderRoot ?? (this.renderRoot = this.createRenderRoot()), this._$Ep) {
        for (const [t4, s3] of this._$Ep) this[t4] = s3;
        this._$Ep = void 0;
      }
      const t3 = this.constructor.elementProperties;
      if (t3.size > 0) for (const [s3, i3] of t3) true !== i3.wrapped || this._$AL.has(s3) || void 0 === this[s3] || this.P(s3, this[s3], i3);
    }
    let t2 = false;
    const s2 = this._$AL;
    try {
      t2 = this.shouldUpdate(s2), t2 ? (this.willUpdate(s2), (_a2 = this._$EO) == null ? void 0 : _a2.forEach((t3) => {
        var _a3;
        return (_a3 = t3.hostUpdate) == null ? void 0 : _a3.call(t3);
      }), this.update(s2)) : this._$EU();
    } catch (s3) {
      throw t2 = false, this._$EU(), s3;
    }
    t2 && this._$AE(s2);
  }
  willUpdate(t2) {
  }
  _$AE(t2) {
    var _a2;
    (_a2 = this._$EO) == null ? void 0 : _a2.forEach((t3) => {
      var _a3;
      return (_a3 = t3.hostUpdated) == null ? void 0 : _a3.call(t3);
    }), this.hasUpdated || (this.hasUpdated = true, this.firstUpdated(t2)), this.updated(t2);
  }
  _$EU() {
    this._$AL = /* @__PURE__ */ new Map(), this.isUpdatePending = false;
  }
  get updateComplete() {
    return this.getUpdateComplete();
  }
  getUpdateComplete() {
    return this._$ES;
  }
  shouldUpdate(t2) {
    return true;
  }
  update(t2) {
    this._$Ej && (this._$Ej = this._$Ej.forEach((t3) => this._$EC(t3, this[t3]))), this._$EU();
  }
  updated(t2) {
  }
  firstUpdated(t2) {
  }
}
b.elementStyles = [], b.shadowRootOptions = { mode: "open" }, b[d("elementProperties")] = /* @__PURE__ */ new Map(), b[d("finalized")] = /* @__PURE__ */ new Map(), p == null ? void 0 : p({ ReactiveElement: b }), (a.reactiveElementVersions ?? (a.reactiveElementVersions = [])).push("2.0.4");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
class s extends b {
  constructor() {
    super(...arguments), this.renderOptions = { host: this }, this._$Do = void 0;
  }
  createRenderRoot() {
    var _a2;
    const t2 = super.createRenderRoot();
    return (_a2 = this.renderOptions).renderBefore ?? (_a2.renderBefore = t2.firstChild), t2;
  }
  update(t2) {
    const i3 = this.render();
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(t2), this._$Do = j(i3, this.renderRoot, this.renderOptions);
  }
  connectedCallback() {
    var _a2;
    super.connectedCallback(), (_a2 = this._$Do) == null ? void 0 : _a2.setConnected(true);
  }
  disconnectedCallback() {
    var _a2;
    super.disconnectedCallback(), (_a2 = this._$Do) == null ? void 0 : _a2.setConnected(false);
  }
  render() {
    return w;
  }
}
s._$litElement$ = true, s["finalized"] = true, (_a = globalThis.litElementHydrateSupport) == null ? void 0 : _a.call(globalThis, { LitElement: s });
const r = globalThis.litElementPolyfillSupport;
r == null ? void 0 : r({ LitElement: s });
(globalThis.litElementVersions ?? (globalThis.litElementVersions = [])).push("4.0.6");
function subscribe(state, effect) {
  const activeSubscriptions = state.activeSubscriptions;
  const type = effect.type;
  if (effect.tracking === "depArray")
    return;
  if (type === "async" || type === "render") {
    state.asyncAndRenderSubscriptions.add(effect);
    effect.observableSubscriptionSets.add(state.asyncAndRenderSubscriptions);
  } else {
    state[`${type}Subscriptions`][activeSubscriptions].add(effect);
    effect.observableSubscriptionSets.add(state[`${type}Subscriptions`][activeSubscriptions]);
  }
}
function get(state) {
  const currentEffect = effectContexts[effectContexts.length - 1];
  if (currentEffect) {
    subscribe(state, currentEffect);
  }
  return state.value;
}
function sendSignals(state, signalType) {
  if (signalType === "stale") {
    state.activeSubscriptions = state.activeSubscriptions === "one" ? "two" : "one";
  }
  const activeSubscriptions = state.activeSubscriptions === "one" ? "two" : "one";
  state.memoSubscriptions[activeSubscriptions].forEach((subscription) => {
    subscription.sendSignal(signalType);
  });
  state.syncSubscriptions[activeSubscriptions].forEach((subscription) => {
    subscription.sendSignal(signalType);
  });
  state.asyncAndRenderSubscriptions.forEach((subscription) => {
    subscription.sendSignal(signalType);
  });
}
const imperativeUpdate = Symbol("imperativeUpdate");
function set(state, nextValue) {
  const newStateValue = typeof nextValue === "function" ? nextValue(state.value) : nextValue;
  if (newStateValue === state.value && newStateValue !== imperativeUpdate) {
    return;
  }
  sendSignals(state, "stale");
  if (newStateValue !== imperativeUpdate) {
    state.value = newStateValue;
  }
  sendSignals(state, "fresh");
}
function adaptState(initialValue) {
  const state = {
    //one for sync effect subscriptions
    //use two sets to effectively manage synchronous subscriptions (prevents recursive filling
    //and running of effects resulting in stack overflow)
    syncSubscriptions: {
      one: /* @__PURE__ */ new Set(),
      two: /* @__PURE__ */ new Set()
    },
    //one for memo subscriptions
    //use two sets to effectively manage synchronous subscriptions (prevents recursive filling
    //and running of memos resulting in stack overflow)
    memoSubscriptions: {
      one: /* @__PURE__ */ new Set(),
      two: /* @__PURE__ */ new Set()
    },
    //one for async and render effect subscriptions
    //one set is enough to manage asynchronous effects
    asyncAndRenderSubscriptions: /* @__PURE__ */ new Set(),
    //use variable to effectively switch between subscription sets (for sync effects and memos)
    activeSubscriptions: "one",
    value: initialValue
  };
  const getter = () => get(state);
  const setter = (nextValue) => set(state, nextValue);
  return [getter, setter];
}
const Fragment = Symbol.for("promethium-js/jsx-runtime/fragment");
function jsx(intrinsicOrValueBasedElement, props) {
  if (intrinsicOrValueBasedElement === Fragment) {
    return props.children;
  }
  return h$1(intrinsicOrValueBasedElement, props);
}
/**
 * @license
 * Copyright 2018 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const n2 = "important", i2 = " !" + n2, o = e$2(class extends i$2 {
  constructor(t2) {
    var _a2;
    if (super(t2), t2.type !== t$1.ATTRIBUTE || "style" !== t2.name || ((_a2 = t2.strings) == null ? void 0 : _a2.length) > 2) throw Error("The `styleMap` directive must be used in the `style` attribute and must be the only part in the attribute.");
  }
  render(t2) {
    return Object.keys(t2).reduce((e2, r2) => {
      const s2 = t2[r2];
      return null == s2 ? e2 : e2 + `${r2 = r2.includes("-") ? r2 : r2.replace(/(?:^(webkit|moz|ms|o)|)(?=[A-Z])/g, "-$&").toLowerCase()}:${s2};`;
    }, "");
  }
  update(e2, [r2]) {
    const { style: s2 } = e2.element;
    if (void 0 === this.ft) return this.ft = new Set(Object.keys(r2)), this.render(r2);
    for (const t2 of this.ft) null == r2[t2] && (this.ft.delete(t2), t2.includes("-") ? s2.removeProperty(t2) : s2[t2] = null);
    for (const t2 in r2) {
      const e3 = r2[t2];
      if (null != e3) {
        this.ft.add(t2);
        const r3 = "string" == typeof e3 && e3.endsWith(i2);
        t2.includes("-") || r3 ? s2.setProperty(t2, r3 ? e3.slice(0, -11) : e3, r3 ? n2 : "") : s2[t2] = e3;
      }
    }
    return w;
  }
});
function App() {
  const [count, setCount] = adaptState(0);
  const fontStyles = {
    fontFamily: "sans-serif"
  };
  const containerStyles = {
    width: "100vw",
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column"
  };
  const headerStyles = {
    marginBottom: "10px"
  };
  const buttonStyles = {
    border: "2px solid black",
    borderRadius: "5px",
    backgroundColor: "#08759E",
    color: "white",
    width: "30px",
    height: "30px",
    cursor: "pointer",
    fontSize: "24px"
  };
  const textStyles = {
    margin: "15px",
    fontSize: "22px",
    fontWeight: "600"
  };
  return () => x`
    <div style=${o(containerStyles)}>
      <h1 style=${o({ ...fontStyles, ...headerStyles })}>Counter</h1>
      <div>
        <button
          style=${o({ ...fontStyles, ...buttonStyles })}
          @click=${() => setCount((count2) => count2 - 1)}
        >
          -
        </button>
        <span style=${o({ ...fontStyles, ...textStyles })}
          >${count()}</span
        >
        <button
          style=${o({ ...fontStyles, ...buttonStyles })}
          @click=${() => setCount((count2) => count2 + 1)}
        >
          +
        </button>
      </div>
    </div>
  `;
}
if (window.matchMedia) {
  if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
    document.documentElement.classList.add("sl-theme-dark");
  } else {
    document.documentElement.classList.remove("sl-theme-dark");
  }
  window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", () => {
    if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
      document.documentElement.classList.add("sl-theme-dark");
    } else {
      document.documentElement.classList.remove("sl-theme-dark");
    }
  });
}
j(/* @__PURE__ */ jsx(App, {}), document.body);
//# sourceMappingURL=index-BOqUp_ox.js.map
