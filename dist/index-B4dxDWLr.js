import { o as Oe, b as ee, g as B, h as T, s as de, c as qn, p as te, r as wn, d as ue, e as cn, k as wr, i as _, l as Sr, q as Er, w as pn, m as ne, n as Ie, f as Qe, j as Cr, t as Ir, v as Dt, x as Tr } from "./index-A0MhmXAZ.js";
import { jsxs as Pr, jsx as Ar, Fragment as vr } from "react/jsx-runtime";
import { useState as $n, useEffect as zr } from "react";
function Lr(e, n) {
  const t = {};
  return (e[e.length - 1] === "" ? [...e, ""] : e).join(
    (t.padRight ? " " : "") + "," + (t.padLeft === !1 ? "" : " ")
  ).trim();
}
const Dr = /^[$_\p{ID_Start}][$_\u{200C}\u{200D}\p{ID_Continue}]*$/u, Or = /^[$_\p{ID_Start}][-$_\u{200C}\u{200D}\p{ID_Continue}]*$/u, _r = {};
function Wn(e, n) {
  return (_r.jsx ? Or : Dr).test(e);
}
const Rr = /[ \t\n\f\r]/g;
function Fr(e) {
  return typeof e == "object" ? e.type === "text" ? Yn(e.value) : !1 : Yn(e);
}
function Yn(e) {
  return e.replace(Rr, "") === "";
}
class Me {
  /**
   * @param {SchemaType['property']} property
   *   Property.
   * @param {SchemaType['normal']} normal
   *   Normal.
   * @param {Space | undefined} [space]
   *   Space.
   * @returns
   *   Schema.
   */
  constructor(n, t, r) {
    this.normal = t, this.property = n, r && (this.space = r);
  }
}
Me.prototype.normal = {};
Me.prototype.property = {};
Me.prototype.space = void 0;
function Ot(e, n) {
  const t = {}, r = {};
  for (const i of e)
    Object.assign(t, i.property), Object.assign(r, i.normal);
  return new Me(t, r, n);
}
function hn(e) {
  return e.toLowerCase();
}
class J {
  /**
   * @param {string} property
   *   Property.
   * @param {string} attribute
   *   Attribute.
   * @returns
   *   Info.
   */
  constructor(n, t) {
    this.attribute = t, this.property = n;
  }
}
J.prototype.attribute = "";
J.prototype.booleanish = !1;
J.prototype.boolean = !1;
J.prototype.commaOrSpaceSeparated = !1;
J.prototype.commaSeparated = !1;
J.prototype.defined = !1;
J.prototype.mustUseProperty = !1;
J.prototype.number = !1;
J.prototype.overloadedBoolean = !1;
J.prototype.property = "";
J.prototype.spaceSeparated = !1;
J.prototype.space = void 0;
let Nr = 0;
const P = be(), $ = be(), fn = be(), k = be(), N = be(), ke = be(), Z = be();
function be() {
  return 2 ** ++Nr;
}
const mn = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  boolean: P,
  booleanish: $,
  commaOrSpaceSeparated: Z,
  commaSeparated: ke,
  number: k,
  overloadedBoolean: fn,
  spaceSeparated: N
}, Symbol.toStringTag, { value: "Module" })), Ke = (
  /** @type {ReadonlyArray<keyof typeof types>} */
  Object.keys(mn)
);
class Sn extends J {
  /**
   * @constructor
   * @param {string} property
   *   Property.
   * @param {string} attribute
   *   Attribute.
   * @param {number | null | undefined} [mask]
   *   Mask.
   * @param {Space | undefined} [space]
   *   Space.
   * @returns
   *   Info.
   */
  constructor(n, t, r, i) {
    let l = -1;
    if (super(n, t), Xn(this, "space", i), typeof r == "number")
      for (; ++l < Ke.length; ) {
        const o = Ke[l];
        Xn(this, Ke[l], (r & mn[o]) === mn[o]);
      }
  }
}
Sn.prototype.defined = !0;
function Xn(e, n, t) {
  t && (e[n] = t);
}
function Te(e) {
  const n = {}, t = {};
  for (const [r, i] of Object.entries(e.properties)) {
    const l = new Sn(
      r,
      e.transform(e.attributes || {}, r),
      i,
      e.space
    );
    e.mustUseProperty && e.mustUseProperty.includes(r) && (l.mustUseProperty = !0), n[r] = l, t[hn(r)] = r, t[hn(l.attribute)] = r;
  }
  return new Me(n, t, e.space);
}
const _t = Te({
  properties: {
    ariaActiveDescendant: null,
    ariaAtomic: $,
    ariaAutoComplete: null,
    ariaBusy: $,
    ariaChecked: $,
    ariaColCount: k,
    ariaColIndex: k,
    ariaColSpan: k,
    ariaControls: N,
    ariaCurrent: null,
    ariaDescribedBy: N,
    ariaDetails: null,
    ariaDisabled: $,
    ariaDropEffect: N,
    ariaErrorMessage: null,
    ariaExpanded: $,
    ariaFlowTo: N,
    ariaGrabbed: $,
    ariaHasPopup: null,
    ariaHidden: $,
    ariaInvalid: null,
    ariaKeyShortcuts: null,
    ariaLabel: null,
    ariaLabelledBy: N,
    ariaLevel: k,
    ariaLive: null,
    ariaModal: $,
    ariaMultiLine: $,
    ariaMultiSelectable: $,
    ariaOrientation: null,
    ariaOwns: N,
    ariaPlaceholder: null,
    ariaPosInSet: k,
    ariaPressed: $,
    ariaReadOnly: $,
    ariaRelevant: null,
    ariaRequired: $,
    ariaRoleDescription: N,
    ariaRowCount: k,
    ariaRowIndex: k,
    ariaRowSpan: k,
    ariaSelected: $,
    ariaSetSize: k,
    ariaSort: null,
    ariaValueMax: k,
    ariaValueMin: k,
    ariaValueNow: k,
    ariaValueText: null,
    role: null
  },
  transform(e, n) {
    return n === "role" ? n : "aria-" + n.slice(4).toLowerCase();
  }
});
function Rt(e, n) {
  return n in e ? e[n] : n;
}
function Ft(e, n) {
  return Rt(e, n.toLowerCase());
}
const Mr = Te({
  attributes: {
    acceptcharset: "accept-charset",
    classname: "class",
    htmlfor: "for",
    httpequiv: "http-equiv"
  },
  mustUseProperty: ["checked", "multiple", "muted", "selected"],
  properties: {
    // Standard Properties.
    abbr: null,
    accept: ke,
    acceptCharset: N,
    accessKey: N,
    action: null,
    allow: null,
    allowFullScreen: P,
    allowPaymentRequest: P,
    allowUserMedia: P,
    alpha: P,
    alt: null,
    as: null,
    async: P,
    autoCapitalize: null,
    autoComplete: N,
    autoFocus: P,
    autoPlay: P,
    blocking: N,
    capture: null,
    charSet: null,
    checked: P,
    cite: null,
    className: N,
    closedBy: null,
    colorSpace: null,
    cols: k,
    colSpan: k,
    command: null,
    commandFor: null,
    content: null,
    contentEditable: $,
    controls: P,
    controlsList: N,
    coords: k | ke,
    crossOrigin: null,
    data: null,
    dateTime: null,
    decoding: null,
    default: P,
    defer: P,
    dir: null,
    dirName: null,
    disabled: P,
    download: fn,
    draggable: $,
    encType: null,
    enterKeyHint: null,
    fetchPriority: null,
    form: null,
    formAction: null,
    formEncType: null,
    formMethod: null,
    formNoValidate: P,
    formTarget: null,
    headers: N,
    height: k,
    hidden: fn,
    high: k,
    href: null,
    hrefLang: null,
    htmlFor: N,
    httpEquiv: N,
    id: null,
    imageSizes: null,
    imageSrcSet: null,
    inert: P,
    inputMode: null,
    integrity: null,
    is: null,
    isMap: P,
    itemId: null,
    itemProp: N,
    itemRef: N,
    itemScope: P,
    itemType: N,
    kind: null,
    label: null,
    lang: null,
    language: null,
    list: null,
    loading: null,
    loop: P,
    low: k,
    manifest: null,
    max: null,
    maxLength: k,
    media: null,
    method: null,
    min: null,
    minLength: k,
    multiple: P,
    muted: P,
    name: null,
    nonce: null,
    noModule: P,
    noValidate: P,
    onAbort: null,
    onAfterPrint: null,
    onAuxClick: null,
    onBeforeMatch: null,
    onBeforePrint: null,
    onBeforeToggle: null,
    onBeforeUnload: null,
    onBlur: null,
    onCancel: null,
    onCanPlay: null,
    onCanPlayThrough: null,
    onChange: null,
    onClick: null,
    onClose: null,
    onContextLost: null,
    onContextMenu: null,
    onContextRestored: null,
    onCopy: null,
    onCueChange: null,
    onCut: null,
    onDblClick: null,
    onDrag: null,
    onDragEnd: null,
    onDragEnter: null,
    onDragExit: null,
    onDragLeave: null,
    onDragOver: null,
    onDragStart: null,
    onDrop: null,
    onDurationChange: null,
    onEmptied: null,
    onEnded: null,
    onError: null,
    onFocus: null,
    onFormData: null,
    onHashChange: null,
    onInput: null,
    onInvalid: null,
    onKeyDown: null,
    onKeyPress: null,
    onKeyUp: null,
    onLanguageChange: null,
    onLoad: null,
    onLoadedData: null,
    onLoadedMetadata: null,
    onLoadEnd: null,
    onLoadStart: null,
    onMessage: null,
    onMessageError: null,
    onMouseDown: null,
    onMouseEnter: null,
    onMouseLeave: null,
    onMouseMove: null,
    onMouseOut: null,
    onMouseOver: null,
    onMouseUp: null,
    onOffline: null,
    onOnline: null,
    onPageHide: null,
    onPageShow: null,
    onPaste: null,
    onPause: null,
    onPlay: null,
    onPlaying: null,
    onPopState: null,
    onProgress: null,
    onRateChange: null,
    onRejectionHandled: null,
    onReset: null,
    onResize: null,
    onScroll: null,
    onScrollEnd: null,
    onSecurityPolicyViolation: null,
    onSeeked: null,
    onSeeking: null,
    onSelect: null,
    onSlotChange: null,
    onStalled: null,
    onStorage: null,
    onSubmit: null,
    onSuspend: null,
    onTimeUpdate: null,
    onToggle: null,
    onUnhandledRejection: null,
    onUnload: null,
    onVolumeChange: null,
    onWaiting: null,
    onWheel: null,
    open: P,
    optimum: k,
    pattern: null,
    ping: N,
    placeholder: null,
    playsInline: P,
    popover: null,
    popoverTarget: null,
    popoverTargetAction: null,
    poster: null,
    preload: null,
    readOnly: P,
    referrerPolicy: null,
    rel: N,
    required: P,
    reversed: P,
    rows: k,
    rowSpan: k,
    sandbox: N,
    scope: null,
    scoped: P,
    seamless: P,
    selected: P,
    shadowRootClonable: P,
    shadowRootCustomElementRegistry: P,
    shadowRootDelegatesFocus: P,
    shadowRootMode: null,
    shadowRootSerializable: P,
    shape: null,
    size: k,
    sizes: null,
    slot: null,
    span: k,
    spellCheck: $,
    src: null,
    srcDoc: null,
    srcLang: null,
    srcSet: null,
    start: k,
    step: null,
    style: null,
    tabIndex: k,
    target: null,
    title: null,
    translate: null,
    type: null,
    typeMustMatch: P,
    useMap: null,
    value: $,
    width: k,
    wrap: null,
    writingSuggestions: null,
    // Legacy.
    // See: https://html.spec.whatwg.org/#other-elements,-attributes-and-apis
    align: null,
    // Several. Use CSS `text-align` instead,
    aLink: null,
    // `<body>`. Use CSS `a:active {color}` instead
    archive: N,
    // `<object>`. List of URIs to archives
    axis: null,
    // `<td>` and `<th>`. Use `scope` on `<th>`
    background: null,
    // `<body>`. Use CSS `background-image` instead
    bgColor: null,
    // `<body>` and table elements. Use CSS `background-color` instead
    border: k,
    // `<table>`. Use CSS `border-width` instead,
    borderColor: null,
    // `<table>`. Use CSS `border-color` instead,
    bottomMargin: k,
    // `<body>`
    cellPadding: null,
    // `<table>`
    cellSpacing: null,
    // `<table>`
    char: null,
    // Several table elements. When `align=char`, sets the character to align on
    charOff: null,
    // Several table elements. When `char`, offsets the alignment
    classId: null,
    // `<object>`
    clear: null,
    // `<br>`. Use CSS `clear` instead
    code: null,
    // `<object>`
    codeBase: null,
    // `<object>`
    codeType: null,
    // `<object>`
    color: null,
    // `<font>` and `<hr>`. Use CSS instead
    compact: P,
    // Lists. Use CSS to reduce space between items instead
    declare: P,
    // `<object>`
    event: null,
    // `<script>`
    face: null,
    // `<font>`. Use CSS instead
    frame: null,
    // `<table>`
    frameBorder: null,
    // `<iframe>`. Use CSS `border` instead
    hSpace: k,
    // `<img>` and `<object>`
    leftMargin: k,
    // `<body>`
    link: null,
    // `<body>`. Use CSS `a:link {color: *}` instead
    longDesc: null,
    // `<frame>`, `<iframe>`, and `<img>`. Use an `<a>`
    lowSrc: null,
    // `<img>`. Use a `<picture>`
    marginHeight: k,
    // `<body>`
    marginWidth: k,
    // `<body>`
    noResize: P,
    // `<frame>`
    noHref: P,
    // `<area>`. Use no href instead of an explicit `nohref`
    noShade: P,
    // `<hr>`. Use background-color and height instead of borders
    noWrap: P,
    // `<td>` and `<th>`
    object: null,
    // `<applet>`
    profile: null,
    // `<head>`
    prompt: null,
    // `<isindex>`
    rev: null,
    // `<link>`
    rightMargin: k,
    // `<body>`
    rules: null,
    // `<table>`
    scheme: null,
    // `<meta>`
    scrolling: $,
    // `<frame>`. Use overflow in the child context
    standby: null,
    // `<object>`
    summary: null,
    // `<table>`
    text: null,
    // `<body>`. Use CSS `color` instead
    topMargin: k,
    // `<body>`
    valueType: null,
    // `<param>`
    version: null,
    // `<html>`. Use a doctype.
    vAlign: null,
    // Several. Use CSS `vertical-align` instead
    vLink: null,
    // `<body>`. Use CSS `a:visited {color}` instead
    vSpace: k,
    // `<img>` and `<object>`
    // Non-standard Properties.
    allowTransparency: null,
    autoCorrect: null,
    autoSave: null,
    credentialless: P,
    disablePictureInPicture: P,
    disableRemotePlayback: P,
    exportParts: ke,
    part: N,
    prefix: null,
    property: null,
    results: k,
    security: null,
    unselectable: null
  },
  space: "html",
  transform: Ft
}), Br = Te({
  attributes: {
    accentHeight: "accent-height",
    alignmentBaseline: "alignment-baseline",
    arabicForm: "arabic-form",
    baselineShift: "baseline-shift",
    capHeight: "cap-height",
    className: "class",
    clipPath: "clip-path",
    clipRule: "clip-rule",
    colorInterpolation: "color-interpolation",
    colorInterpolationFilters: "color-interpolation-filters",
    colorProfile: "color-profile",
    colorRendering: "color-rendering",
    crossOrigin: "crossorigin",
    dataType: "datatype",
    dominantBaseline: "dominant-baseline",
    enableBackground: "enable-background",
    fillOpacity: "fill-opacity",
    fillRule: "fill-rule",
    floodColor: "flood-color",
    floodOpacity: "flood-opacity",
    fontFamily: "font-family",
    fontSize: "font-size",
    fontSizeAdjust: "font-size-adjust",
    fontStretch: "font-stretch",
    fontStyle: "font-style",
    fontVariant: "font-variant",
    fontWeight: "font-weight",
    glyphName: "glyph-name",
    glyphOrientationHorizontal: "glyph-orientation-horizontal",
    glyphOrientationVertical: "glyph-orientation-vertical",
    hrefLang: "hreflang",
    horizAdvX: "horiz-adv-x",
    horizOriginX: "horiz-origin-x",
    horizOriginY: "horiz-origin-y",
    imageRendering: "image-rendering",
    letterSpacing: "letter-spacing",
    lightingColor: "lighting-color",
    markerEnd: "marker-end",
    markerMid: "marker-mid",
    markerStart: "marker-start",
    maskType: "mask-type",
    navDown: "nav-down",
    navDownLeft: "nav-down-left",
    navDownRight: "nav-down-right",
    navLeft: "nav-left",
    navNext: "nav-next",
    navPrev: "nav-prev",
    navRight: "nav-right",
    navUp: "nav-up",
    navUpLeft: "nav-up-left",
    navUpRight: "nav-up-right",
    onAbort: "onabort",
    onActivate: "onactivate",
    onAfterPrint: "onafterprint",
    onBeforePrint: "onbeforeprint",
    onBegin: "onbegin",
    onCancel: "oncancel",
    onCanPlay: "oncanplay",
    onCanPlayThrough: "oncanplaythrough",
    onChange: "onchange",
    onClick: "onclick",
    onClose: "onclose",
    onCopy: "oncopy",
    onCueChange: "oncuechange",
    onCut: "oncut",
    onDblClick: "ondblclick",
    onDrag: "ondrag",
    onDragEnd: "ondragend",
    onDragEnter: "ondragenter",
    onDragExit: "ondragexit",
    onDragLeave: "ondragleave",
    onDragOver: "ondragover",
    onDragStart: "ondragstart",
    onDrop: "ondrop",
    onDurationChange: "ondurationchange",
    onEmptied: "onemptied",
    onEnd: "onend",
    onEnded: "onended",
    onError: "onerror",
    onFocus: "onfocus",
    onFocusIn: "onfocusin",
    onFocusOut: "onfocusout",
    onHashChange: "onhashchange",
    onInput: "oninput",
    onInvalid: "oninvalid",
    onKeyDown: "onkeydown",
    onKeyPress: "onkeypress",
    onKeyUp: "onkeyup",
    onLoad: "onload",
    onLoadedData: "onloadeddata",
    onLoadedMetadata: "onloadedmetadata",
    onLoadStart: "onloadstart",
    onMessage: "onmessage",
    onMouseDown: "onmousedown",
    onMouseEnter: "onmouseenter",
    onMouseLeave: "onmouseleave",
    onMouseMove: "onmousemove",
    onMouseOut: "onmouseout",
    onMouseOver: "onmouseover",
    onMouseUp: "onmouseup",
    onMouseWheel: "onmousewheel",
    onOffline: "onoffline",
    onOnline: "ononline",
    onPageHide: "onpagehide",
    onPageShow: "onpageshow",
    onPaste: "onpaste",
    onPause: "onpause",
    onPlay: "onplay",
    onPlaying: "onplaying",
    onPopState: "onpopstate",
    onProgress: "onprogress",
    onRateChange: "onratechange",
    onRepeat: "onrepeat",
    onReset: "onreset",
    onResize: "onresize",
    onScroll: "onscroll",
    onSeeked: "onseeked",
    onSeeking: "onseeking",
    onSelect: "onselect",
    onShow: "onshow",
    onStalled: "onstalled",
    onStorage: "onstorage",
    onSubmit: "onsubmit",
    onSuspend: "onsuspend",
    onTimeUpdate: "ontimeupdate",
    onToggle: "ontoggle",
    onUnload: "onunload",
    onVolumeChange: "onvolumechange",
    onWaiting: "onwaiting",
    onZoom: "onzoom",
    overlinePosition: "overline-position",
    overlineThickness: "overline-thickness",
    paintOrder: "paint-order",
    panose1: "panose-1",
    pointerEvents: "pointer-events",
    referrerPolicy: "referrerpolicy",
    renderingIntent: "rendering-intent",
    shapeRendering: "shape-rendering",
    stopColor: "stop-color",
    stopOpacity: "stop-opacity",
    strikethroughPosition: "strikethrough-position",
    strikethroughThickness: "strikethrough-thickness",
    strokeDashArray: "stroke-dasharray",
    strokeDashOffset: "stroke-dashoffset",
    strokeLineCap: "stroke-linecap",
    strokeLineJoin: "stroke-linejoin",
    strokeMiterLimit: "stroke-miterlimit",
    strokeOpacity: "stroke-opacity",
    strokeWidth: "stroke-width",
    tabIndex: "tabindex",
    textAnchor: "text-anchor",
    textDecoration: "text-decoration",
    textRendering: "text-rendering",
    transformOrigin: "transform-origin",
    typeOf: "typeof",
    underlinePosition: "underline-position",
    underlineThickness: "underline-thickness",
    unicodeBidi: "unicode-bidi",
    unicodeRange: "unicode-range",
    unitsPerEm: "units-per-em",
    vAlphabetic: "v-alphabetic",
    vHanging: "v-hanging",
    vIdeographic: "v-ideographic",
    vMathematical: "v-mathematical",
    vectorEffect: "vector-effect",
    vertAdvY: "vert-adv-y",
    vertOriginX: "vert-origin-x",
    vertOriginY: "vert-origin-y",
    wordSpacing: "word-spacing",
    writingMode: "writing-mode",
    xHeight: "x-height",
    // These were camelcased in Tiny. Now lowercased in SVG 2
    playbackOrder: "playbackorder",
    timelineBegin: "timelinebegin"
  },
  properties: {
    about: Z,
    accentHeight: k,
    accumulate: null,
    additive: null,
    alignmentBaseline: null,
    alphabetic: k,
    amplitude: k,
    arabicForm: null,
    ascent: k,
    attributeName: null,
    attributeType: null,
    azimuth: k,
    bandwidth: null,
    baselineShift: null,
    baseFrequency: null,
    baseProfile: null,
    bbox: null,
    begin: null,
    bias: k,
    by: null,
    calcMode: null,
    capHeight: k,
    className: N,
    clip: null,
    clipPath: null,
    clipPathUnits: null,
    clipRule: null,
    color: null,
    colorInterpolation: null,
    colorInterpolationFilters: null,
    colorProfile: null,
    colorRendering: null,
    content: null,
    contentScriptType: null,
    contentStyleType: null,
    crossOrigin: null,
    cursor: null,
    cx: null,
    cy: null,
    d: null,
    dataType: null,
    defaultAction: null,
    descent: k,
    diffuseConstant: k,
    direction: null,
    display: null,
    dur: null,
    divisor: k,
    dominantBaseline: null,
    download: P,
    dx: null,
    dy: null,
    edgeMode: null,
    editable: null,
    elevation: k,
    enableBackground: null,
    end: null,
    event: null,
    exponent: k,
    externalResourcesRequired: null,
    fill: null,
    fillOpacity: k,
    fillRule: null,
    filter: null,
    filterRes: null,
    filterUnits: null,
    floodColor: null,
    floodOpacity: null,
    focusable: null,
    focusHighlight: null,
    fontFamily: null,
    fontSize: null,
    fontSizeAdjust: null,
    fontStretch: null,
    fontStyle: null,
    fontVariant: null,
    fontWeight: null,
    format: null,
    fr: null,
    from: null,
    fx: null,
    fy: null,
    g1: ke,
    g2: ke,
    glyphName: ke,
    glyphOrientationHorizontal: null,
    glyphOrientationVertical: null,
    glyphRef: null,
    gradientTransform: null,
    gradientUnits: null,
    handler: null,
    hanging: k,
    hatchContentUnits: null,
    hatchUnits: null,
    height: null,
    href: null,
    hrefLang: null,
    horizAdvX: k,
    horizOriginX: k,
    horizOriginY: k,
    id: null,
    ideographic: k,
    imageRendering: null,
    initialVisibility: null,
    in: null,
    in2: null,
    intercept: k,
    k,
    k1: k,
    k2: k,
    k3: k,
    k4: k,
    kernelMatrix: Z,
    kernelUnitLength: null,
    keyPoints: null,
    // SEMI_COLON_SEPARATED
    keySplines: null,
    // SEMI_COLON_SEPARATED
    keyTimes: null,
    // SEMI_COLON_SEPARATED
    kerning: null,
    lang: null,
    lengthAdjust: null,
    letterSpacing: null,
    lightingColor: null,
    limitingConeAngle: k,
    local: null,
    markerEnd: null,
    markerMid: null,
    markerStart: null,
    markerHeight: null,
    markerUnits: null,
    markerWidth: null,
    mask: null,
    maskContentUnits: null,
    maskType: null,
    maskUnits: null,
    mathematical: null,
    max: null,
    media: null,
    mediaCharacterEncoding: null,
    mediaContentEncodings: null,
    mediaSize: k,
    mediaTime: null,
    method: null,
    min: null,
    mode: null,
    name: null,
    navDown: null,
    navDownLeft: null,
    navDownRight: null,
    navLeft: null,
    navNext: null,
    navPrev: null,
    navRight: null,
    navUp: null,
    navUpLeft: null,
    navUpRight: null,
    numOctaves: null,
    observer: null,
    offset: null,
    onAbort: null,
    onActivate: null,
    onAfterPrint: null,
    onBeforePrint: null,
    onBegin: null,
    onCancel: null,
    onCanPlay: null,
    onCanPlayThrough: null,
    onChange: null,
    onClick: null,
    onClose: null,
    onCopy: null,
    onCueChange: null,
    onCut: null,
    onDblClick: null,
    onDrag: null,
    onDragEnd: null,
    onDragEnter: null,
    onDragExit: null,
    onDragLeave: null,
    onDragOver: null,
    onDragStart: null,
    onDrop: null,
    onDurationChange: null,
    onEmptied: null,
    onEnd: null,
    onEnded: null,
    onError: null,
    onFocus: null,
    onFocusIn: null,
    onFocusOut: null,
    onHashChange: null,
    onInput: null,
    onInvalid: null,
    onKeyDown: null,
    onKeyPress: null,
    onKeyUp: null,
    onLoad: null,
    onLoadedData: null,
    onLoadedMetadata: null,
    onLoadStart: null,
    onMessage: null,
    onMouseDown: null,
    onMouseEnter: null,
    onMouseLeave: null,
    onMouseMove: null,
    onMouseOut: null,
    onMouseOver: null,
    onMouseUp: null,
    onMouseWheel: null,
    onOffline: null,
    onOnline: null,
    onPageHide: null,
    onPageShow: null,
    onPaste: null,
    onPause: null,
    onPlay: null,
    onPlaying: null,
    onPopState: null,
    onProgress: null,
    onRateChange: null,
    onRepeat: null,
    onReset: null,
    onResize: null,
    onScroll: null,
    onSeeked: null,
    onSeeking: null,
    onSelect: null,
    onShow: null,
    onStalled: null,
    onStorage: null,
    onSubmit: null,
    onSuspend: null,
    onTimeUpdate: null,
    onToggle: null,
    onUnload: null,
    onVolumeChange: null,
    onWaiting: null,
    onZoom: null,
    opacity: null,
    operator: null,
    order: null,
    orient: null,
    orientation: null,
    origin: null,
    overflow: null,
    overlay: null,
    overlinePosition: k,
    overlineThickness: k,
    paintOrder: null,
    panose1: null,
    path: null,
    pathLength: k,
    patternContentUnits: null,
    patternTransform: null,
    patternUnits: null,
    phase: null,
    ping: N,
    pitch: null,
    playbackOrder: null,
    pointerEvents: null,
    points: null,
    pointsAtX: k,
    pointsAtY: k,
    pointsAtZ: k,
    preserveAlpha: null,
    preserveAspectRatio: null,
    primitiveUnits: null,
    propagate: null,
    property: Z,
    r: null,
    radius: null,
    referrerPolicy: null,
    refX: null,
    refY: null,
    rel: Z,
    rev: Z,
    renderingIntent: null,
    repeatCount: null,
    repeatDur: null,
    requiredExtensions: Z,
    requiredFeatures: Z,
    requiredFonts: Z,
    requiredFormats: Z,
    resource: null,
    restart: null,
    result: null,
    rotate: null,
    rx: null,
    ry: null,
    scale: null,
    seed: null,
    shapeRendering: null,
    side: null,
    slope: null,
    snapshotTime: null,
    specularConstant: k,
    specularExponent: k,
    spreadMethod: null,
    spacing: null,
    startOffset: null,
    stdDeviation: null,
    stemh: null,
    stemv: null,
    stitchTiles: null,
    stopColor: null,
    stopOpacity: null,
    strikethroughPosition: k,
    strikethroughThickness: k,
    string: null,
    stroke: null,
    strokeDashArray: Z,
    strokeDashOffset: null,
    strokeLineCap: null,
    strokeLineJoin: null,
    strokeMiterLimit: k,
    strokeOpacity: k,
    strokeWidth: null,
    style: null,
    surfaceScale: k,
    syncBehavior: null,
    syncBehaviorDefault: null,
    syncMaster: null,
    syncTolerance: null,
    syncToleranceDefault: null,
    systemLanguage: Z,
    tabIndex: k,
    tableValues: null,
    target: null,
    targetX: k,
    targetY: k,
    textAnchor: null,
    textDecoration: null,
    textRendering: null,
    textLength: null,
    timelineBegin: null,
    title: null,
    transformBehavior: null,
    type: null,
    typeOf: Z,
    to: null,
    transform: null,
    transformOrigin: null,
    u1: null,
    u2: null,
    underlinePosition: k,
    underlineThickness: k,
    unicode: null,
    unicodeBidi: null,
    unicodeRange: null,
    unitsPerEm: k,
    values: null,
    vAlphabetic: k,
    vMathematical: k,
    vectorEffect: null,
    vHanging: k,
    vIdeographic: k,
    version: null,
    vertAdvY: k,
    vertOriginX: k,
    vertOriginY: k,
    viewBox: null,
    viewTarget: null,
    visibility: null,
    width: null,
    widths: null,
    wordSpacing: null,
    writingMode: null,
    x: null,
    x1: null,
    x2: null,
    xChannelSelector: null,
    xHeight: k,
    y: null,
    y1: null,
    y2: null,
    yChannelSelector: null,
    z: null,
    zoomAndPan: null
  },
  space: "svg",
  transform: Rt
}), Nt = Te({
  properties: {
    xLinkActuate: null,
    xLinkArcRole: null,
    xLinkHref: null,
    xLinkRole: null,
    xLinkShow: null,
    xLinkTitle: null,
    xLinkType: null
  },
  space: "xlink",
  transform(e, n) {
    return "xlink:" + n.slice(5).toLowerCase();
  }
}), Mt = Te({
  attributes: { xmlnsxlink: "xmlns:xlink" },
  properties: { xmlnsXLink: null, xmlns: null },
  space: "xmlns",
  transform: Ft
}), Bt = Te({
  properties: { xmlBase: null, xmlLang: null, xmlSpace: null },
  space: "xml",
  transform(e, n) {
    return "xml:" + n.slice(3).toLowerCase();
  }
}), jr = {
  classId: "classID",
  dataType: "datatype",
  itemId: "itemID",
  strokeDashArray: "strokeDasharray",
  strokeDashOffset: "strokeDashoffset",
  strokeLineCap: "strokeLinecap",
  strokeLineJoin: "strokeLinejoin",
  strokeMiterLimit: "strokeMiterlimit",
  typeOf: "typeof",
  xLinkActuate: "xlinkActuate",
  xLinkArcRole: "xlinkArcrole",
  xLinkHref: "xlinkHref",
  xLinkRole: "xlinkRole",
  xLinkShow: "xlinkShow",
  xLinkTitle: "xlinkTitle",
  xLinkType: "xlinkType",
  xmlnsXLink: "xmlnsXlink"
}, Hr = /[A-Z]/g, Qn = /-[a-z]/g, Ur = /^data[-\w.:]+$/i;
function Vr(e, n) {
  const t = hn(n);
  let r = n, i = J;
  if (t in e.normal)
    return e.property[e.normal[t]];
  if (t.length > 4 && t.slice(0, 4) === "data" && Ur.test(n)) {
    if (n.charAt(4) === "-") {
      const l = n.slice(5).replace(Qn, $r);
      r = "data" + l.charAt(0).toUpperCase() + l.slice(1);
    } else {
      const l = n.slice(4);
      if (!Qn.test(l)) {
        let o = l.replace(Hr, qr);
        o.charAt(0) !== "-" && (o = "-" + o), n = "data" + o;
      }
    }
    i = Sn;
  }
  return new i(r, n);
}
function qr(e) {
  return "-" + e.toLowerCase();
}
function $r(e) {
  return e.charAt(1).toUpperCase();
}
const Wr = Ot([_t, Mr, Nt, Mt, Bt], "html"), En = Ot([_t, Br, Nt, Mt, Bt], "svg");
function Yr(e) {
  return e.join(" ").trim();
}
var We = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {};
function jt(e) {
  return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, "default") ? e.default : e;
}
var Cn = {}, Gn = /\/\*[^*]*\*+([^/*][^*]*\*+)*\//g, Xr = /\n/g, Qr = /^\s*/, Gr = /^(\*?[-#/*\\\w]+(\[[0-9a-z_-]+\])?)\s*/, Jr = /^:\s*/, Kr = /^((?:'(?:\\'|.)*?'|"(?:\\"|.)*?"|\([^)]*?\)|[^};])+)/, Zr = /^[;\s]*/, ei = /^\s+|\s+$/g, ni = `
`, Jn = "/", Kn = "*", xe = "", ti = "comment", ri = "declaration";
function ii(e, n) {
  if (typeof e != "string")
    throw new TypeError("First argument must be a string");
  if (!e) return [];
  n = n || {};
  var t = 1, r = 1;
  function i(x) {
    var b = x.match(Xr);
    b && (t += b.length);
    var A = x.lastIndexOf(ni);
    r = ~A ? x.length - A : r + x.length;
  }
  function l() {
    var x = { line: t, column: r };
    return function(b) {
      return b.position = new o(x), u(), b;
    };
  }
  function o(x) {
    this.start = x, this.end = { line: t, column: r }, this.source = n.source;
  }
  o.prototype.content = e;
  function a(x) {
    var b = new Error(
      n.source + ":" + t + ":" + r + ": " + x
    );
    if (b.reason = x, b.filename = n.source, b.line = t, b.column = r, b.source = e, !n.silent) throw b;
  }
  function c(x) {
    var b = x.exec(e);
    if (b) {
      var A = b[0];
      return i(A), e = e.slice(A.length), b;
    }
  }
  function u() {
    c(Qr);
  }
  function s(x) {
    var b;
    for (x = x || []; b = h(); )
      b !== !1 && x.push(b);
    return x;
  }
  function h() {
    var x = l();
    if (!(Jn != e.charAt(0) || Kn != e.charAt(1))) {
      for (var b = 2; xe != e.charAt(b) && (Kn != e.charAt(b) || Jn != e.charAt(b + 1)); )
        ++b;
      if (b += 2, xe === e.charAt(b - 1))
        return a("End of comment missing");
      var A = e.slice(2, b - 2);
      return r += 2, i(A), e = e.slice(b), r += 2, x({
        type: ti,
        comment: A
      });
    }
  }
  function d() {
    var x = l(), b = c(Gr);
    if (b) {
      if (h(), !c(Jr)) return a("property missing ':'");
      var A = c(Kr), S = x({
        type: ri,
        property: Zn(b[0].replace(Gn, xe)),
        value: A ? Zn(A[0].replace(Gn, xe)) : xe
      });
      return c(Zr), S;
    }
  }
  function p() {
    var x = [];
    s(x);
    for (var b; b = d(); )
      b !== !1 && (x.push(b), s(x));
    return x;
  }
  return u(), p();
}
function Zn(e) {
  return e ? e.replace(ei, xe) : xe;
}
var li = ii, oi = We && We.__importDefault || function(e) {
  return e && e.__esModule ? e : { default: e };
};
Object.defineProperty(Cn, "__esModule", { value: !0 });
Cn.default = ui;
const ai = oi(li);
function ui(e, n) {
  let t = null;
  if (!e || typeof e != "string")
    return t;
  const r = (0, ai.default)(e), i = typeof n == "function";
  return r.forEach((l) => {
    if (l.type !== "declaration")
      return;
    const { property: o, value: a } = l;
    i ? n(o, a, l) : a && (t = t || {}, t[o] = a);
  }), t;
}
var Ge = {};
Object.defineProperty(Ge, "__esModule", { value: !0 });
Ge.camelCase = void 0;
var si = /^--[a-zA-Z0-9_-]+$/, ci = /-([a-z])/g, pi = /^[^-]+$/, hi = /^-(webkit|moz|ms|o|khtml)-/, fi = /^-(ms)-/, mi = function(e) {
  return !e || pi.test(e) || si.test(e);
}, di = function(e, n) {
  return n.toUpperCase();
}, et = function(e, n) {
  return "".concat(n, "-");
}, gi = function(e, n) {
  return n === void 0 && (n = {}), mi(e) ? e : (e = e.toLowerCase(), n.reactCompat ? e = e.replace(fi, et) : e = e.replace(hi, et), e.replace(ci, di));
};
Ge.camelCase = gi;
var yi = We && We.__importDefault || function(e) {
  return e && e.__esModule ? e : { default: e };
}, xi = yi(Cn), ki = Ge;
function dn(e, n) {
  var t = {};
  return !e || typeof e != "string" || (0, xi.default)(e, function(r, i) {
    r && i && (t[(0, ki.camelCase)(r, n)] = i);
  }), t;
}
dn.default = dn;
var bi = dn;
const wi = /* @__PURE__ */ jt(bi), Ht = Ut("end"), In = Ut("start");
function Ut(e) {
  return n;
  function n(t) {
    const r = t && t.position && t.position[e] || {};
    if (typeof r.line == "number" && r.line > 0 && typeof r.column == "number" && r.column > 0)
      return {
        line: r.line,
        column: r.column,
        offset: typeof r.offset == "number" && r.offset > -1 ? r.offset : void 0
      };
  }
}
function Si(e) {
  const n = In(e), t = Ht(e);
  if (n && t)
    return { start: n, end: t };
}
function _e(e) {
  return !e || typeof e != "object" ? "" : "position" in e || "type" in e ? nt(e.position) : "start" in e || "end" in e ? nt(e) : "line" in e || "column" in e ? gn(e) : "";
}
function gn(e) {
  return tt(e && e.line) + ":" + tt(e && e.column);
}
function nt(e) {
  return gn(e && e.start) + "-" + gn(e && e.end);
}
function tt(e) {
  return e && typeof e == "number" ? e : 1;
}
class Q extends Error {
  /**
   * Create a message for `reason`.
   *
   * > 🪦 **Note**: also has obsolete signatures.
   *
   * @overload
   * @param {string} reason
   * @param {Options | null | undefined} [options]
   * @returns
   *
   * @overload
   * @param {string} reason
   * @param {Node | NodeLike | null | undefined} parent
   * @param {string | null | undefined} [origin]
   * @returns
   *
   * @overload
   * @param {string} reason
   * @param {Point | Position | null | undefined} place
   * @param {string | null | undefined} [origin]
   * @returns
   *
   * @overload
   * @param {string} reason
   * @param {string | null | undefined} [origin]
   * @returns
   *
   * @overload
   * @param {Error | VFileMessage} cause
   * @param {Node | NodeLike | null | undefined} parent
   * @param {string | null | undefined} [origin]
   * @returns
   *
   * @overload
   * @param {Error | VFileMessage} cause
   * @param {Point | Position | null | undefined} place
   * @param {string | null | undefined} [origin]
   * @returns
   *
   * @overload
   * @param {Error | VFileMessage} cause
   * @param {string | null | undefined} [origin]
   * @returns
   *
   * @param {Error | VFileMessage | string} causeOrReason
   *   Reason for message, should use markdown.
   * @param {Node | NodeLike | Options | Point | Position | string | null | undefined} [optionsOrParentOrPlace]
   *   Configuration (optional).
   * @param {string | null | undefined} [origin]
   *   Place in code where the message originates (example:
   *   `'my-package:my-rule'` or `'my-rule'`).
   * @returns
   *   Instance of `VFileMessage`.
   */
  // eslint-disable-next-line complexity
  constructor(n, t, r) {
    super(), typeof t == "string" && (r = t, t = void 0);
    let i = "", l = {}, o = !1;
    if (t && ("line" in t && "column" in t ? l = { place: t } : "start" in t && "end" in t ? l = { place: t } : "type" in t ? l = {
      ancestors: [t],
      place: t.position
    } : l = { ...t }), typeof n == "string" ? i = n : !l.cause && n && (o = !0, i = n.message, l.cause = n), !l.ruleId && !l.source && typeof r == "string") {
      const c = r.indexOf(":");
      c === -1 ? l.ruleId = r : (l.source = r.slice(0, c), l.ruleId = r.slice(c + 1));
    }
    if (!l.place && l.ancestors && l.ancestors) {
      const c = l.ancestors[l.ancestors.length - 1];
      c && (l.place = c.position);
    }
    const a = l.place && "start" in l.place ? l.place.start : l.place;
    this.ancestors = l.ancestors || void 0, this.cause = l.cause || void 0, this.column = a ? a.column : void 0, this.fatal = void 0, this.file = "", this.message = i, this.line = a ? a.line : void 0, this.name = _e(l.place) || "1:1", this.place = l.place || void 0, this.reason = this.message, this.ruleId = l.ruleId || void 0, this.source = l.source || void 0, this.stack = o && l.cause && typeof l.cause.stack == "string" ? l.cause.stack : "", this.actual = void 0, this.expected = void 0, this.note = void 0, this.url = void 0;
  }
}
Q.prototype.file = "";
Q.prototype.name = "";
Q.prototype.reason = "";
Q.prototype.message = "";
Q.prototype.stack = "";
Q.prototype.column = void 0;
Q.prototype.line = void 0;
Q.prototype.ancestors = void 0;
Q.prototype.cause = void 0;
Q.prototype.fatal = void 0;
Q.prototype.place = void 0;
Q.prototype.ruleId = void 0;
Q.prototype.source = void 0;
const Tn = {}.hasOwnProperty, Ei = /* @__PURE__ */ new Map(), Ci = /[A-Z]/g, Ii = /* @__PURE__ */ new Set(["table", "tbody", "thead", "tfoot", "tr"]), Ti = /* @__PURE__ */ new Set(["td", "th"]), Vt = "https://github.com/syntax-tree/hast-util-to-jsx-runtime";
function Pi(e, n) {
  if (!n || n.Fragment === void 0)
    throw new TypeError("Expected `Fragment` in options");
  const t = n.filePath || void 0;
  let r;
  if (n.development) {
    if (typeof n.jsxDEV != "function")
      throw new TypeError(
        "Expected `jsxDEV` in options when `development: true`"
      );
    r = Ri(t, n.jsxDEV);
  } else {
    if (typeof n.jsx != "function")
      throw new TypeError("Expected `jsx` in production options");
    if (typeof n.jsxs != "function")
      throw new TypeError("Expected `jsxs` in production options");
    r = _i(t, n.jsx, n.jsxs);
  }
  const i = {
    Fragment: n.Fragment,
    ancestors: [],
    components: n.components || {},
    create: r,
    elementAttributeNameCase: n.elementAttributeNameCase || "react",
    evaluater: n.createEvaluater ? n.createEvaluater() : void 0,
    filePath: t,
    ignoreInvalidStyle: n.ignoreInvalidStyle || !1,
    passKeys: n.passKeys !== !1,
    passNode: n.passNode || !1,
    schema: n.space === "svg" ? En : Wr,
    stylePropertyNameCase: n.stylePropertyNameCase || "dom",
    tableCellAlignToStyle: n.tableCellAlignToStyle !== !1
  }, l = qt(i, e, void 0);
  return l && typeof l != "string" ? l : i.create(
    e,
    i.Fragment,
    { children: l || void 0 },
    void 0
  );
}
function qt(e, n, t) {
  if (n.type === "element")
    return Ai(e, n, t);
  if (n.type === "mdxFlowExpression" || n.type === "mdxTextExpression")
    return vi(e, n);
  if (n.type === "mdxJsxFlowElement" || n.type === "mdxJsxTextElement")
    return Li(e, n, t);
  if (n.type === "mdxjsEsm")
    return zi(e, n);
  if (n.type === "root")
    return Di(e, n, t);
  if (n.type === "text")
    return Oi(e, n);
}
function Ai(e, n, t) {
  const r = e.schema;
  let i = r;
  n.tagName.toLowerCase() === "svg" && r.space === "html" && (i = En, e.schema = i), e.ancestors.push(n);
  const l = Wt(e, n.tagName, !1), o = Fi(e, n);
  let a = An(e, n);
  return Ii.has(n.tagName) && (a = a.filter(function(c) {
    return typeof c == "string" ? !Fr(c) : !0;
  })), $t(e, o, l, n), Pn(o, a), e.ancestors.pop(), e.schema = r, e.create(n, l, o, t);
}
function vi(e, n) {
  if (n.data && n.data.estree && e.evaluater) {
    const r = n.data.estree.body[0];
    return Oe(r.type === "ExpressionStatement"), /** @type {Child | undefined} */
    e.evaluater.evaluateExpression(r.expression);
  }
  Ne(e, n.position);
}
function zi(e, n) {
  if (n.data && n.data.estree && e.evaluater)
    return (
      /** @type {Child | undefined} */
      e.evaluater.evaluateProgram(n.data.estree)
    );
  Ne(e, n.position);
}
function Li(e, n, t) {
  const r = e.schema;
  let i = r;
  n.name === "svg" && r.space === "html" && (i = En, e.schema = i), e.ancestors.push(n);
  const l = n.name === null ? e.Fragment : Wt(e, n.name, !0), o = Ni(e, n), a = An(e, n);
  return $t(e, o, l, n), Pn(o, a), e.ancestors.pop(), e.schema = r, e.create(n, l, o, t);
}
function Di(e, n, t) {
  const r = {};
  return Pn(r, An(e, n)), e.create(n, e.Fragment, r, t);
}
function Oi(e, n) {
  return n.value;
}
function $t(e, n, t, r) {
  typeof t != "string" && t !== e.Fragment && e.passNode && (n.node = r);
}
function Pn(e, n) {
  if (n.length > 0) {
    const t = n.length > 1 ? n : n[0];
    t && (e.children = t);
  }
}
function _i(e, n, t) {
  return r;
  function r(i, l, o, a) {
    const u = Array.isArray(o.children) ? t : n;
    return a ? u(l, o, a) : u(l, o);
  }
}
function Ri(e, n) {
  return t;
  function t(r, i, l, o) {
    const a = Array.isArray(l.children), c = In(r);
    return n(
      i,
      l,
      o,
      a,
      {
        columnNumber: c ? c.column - 1 : void 0,
        fileName: e,
        lineNumber: c ? c.line : void 0
      },
      void 0
    );
  }
}
function Fi(e, n) {
  const t = {};
  let r, i;
  for (i in n.properties)
    if (i !== "children" && Tn.call(n.properties, i)) {
      const l = Mi(e, i, n.properties[i]);
      if (l) {
        const [o, a] = l;
        e.tableCellAlignToStyle && o === "align" && typeof a == "string" && Ti.has(n.tagName) ? r = a : t[o] = a;
      }
    }
  if (r) {
    const l = (
      /** @type {Style} */
      t.style || (t.style = {})
    );
    l[e.stylePropertyNameCase === "css" ? "text-align" : "textAlign"] = r;
  }
  return t;
}
function Ni(e, n) {
  const t = {};
  for (const r of n.attributes)
    if (r.type === "mdxJsxExpressionAttribute")
      if (r.data && r.data.estree && e.evaluater) {
        const l = r.data.estree.body[0];
        Oe(l.type === "ExpressionStatement");
        const o = l.expression;
        Oe(o.type === "ObjectExpression");
        const a = o.properties[0];
        Oe(a.type === "SpreadElement"), Object.assign(
          t,
          e.evaluater.evaluateExpression(a.argument)
        );
      } else
        Ne(e, n.position);
    else {
      const i = r.name;
      let l;
      if (r.value && typeof r.value == "object")
        if (r.value.data && r.value.data.estree && e.evaluater) {
          const a = r.value.data.estree.body[0];
          Oe(a.type === "ExpressionStatement"), l = e.evaluater.evaluateExpression(a.expression);
        } else
          Ne(e, n.position);
      else
        l = r.value === null ? !0 : r.value;
      t[i] = /** @type {Props[keyof Props]} */
      l;
    }
  return t;
}
function An(e, n) {
  const t = [];
  let r = -1;
  const i = e.passKeys ? /* @__PURE__ */ new Map() : Ei;
  for (; ++r < n.children.length; ) {
    const l = n.children[r];
    let o;
    if (e.passKeys) {
      const c = l.type === "element" ? l.tagName : l.type === "mdxJsxFlowElement" || l.type === "mdxJsxTextElement" ? l.name : void 0;
      if (c) {
        const u = i.get(c) || 0;
        o = c + "-" + u, i.set(c, u + 1);
      }
    }
    const a = qt(e, l, o);
    a !== void 0 && t.push(a);
  }
  return t;
}
function Mi(e, n, t) {
  const r = Vr(e.schema, n);
  if (!(t == null || typeof t == "number" && Number.isNaN(t))) {
    if (Array.isArray(t) && (t = r.commaSeparated ? Lr(t) : Yr(t)), r.property === "style") {
      let i = typeof t == "object" ? t : Bi(e, String(t));
      return e.stylePropertyNameCase === "css" && (i = ji(i)), ["style", i];
    }
    return [
      e.elementAttributeNameCase === "react" && r.space ? jr[r.property] || r.property : r.attribute,
      t
    ];
  }
}
function Bi(e, n) {
  try {
    return wi(n, { reactCompat: !0 });
  } catch (t) {
    if (e.ignoreInvalidStyle)
      return {};
    const r = (
      /** @type {Error} */
      t
    ), i = new Q("Cannot parse `style` attribute", {
      ancestors: e.ancestors,
      cause: r,
      ruleId: "style",
      source: "hast-util-to-jsx-runtime"
    });
    throw i.file = e.filePath || void 0, i.url = Vt + "#cannot-parse-style-attribute", i;
  }
}
function Wt(e, n, t) {
  let r;
  if (!t)
    r = { type: "Literal", value: n };
  else if (n.includes(".")) {
    const i = n.split(".");
    let l = -1, o;
    for (; ++l < i.length; ) {
      const a = Wn(i[l]) ? { type: "Identifier", name: i[l] } : { type: "Literal", value: i[l] };
      o = o ? {
        type: "MemberExpression",
        object: o,
        property: a,
        computed: !!(l && a.type === "Literal"),
        optional: !1
      } : a;
    }
    r = o;
  } else
    r = Wn(n) && !/^[a-z]/.test(n) ? { type: "Identifier", name: n } : { type: "Literal", value: n };
  if (r.type === "Literal") {
    const i = (
      /** @type {string | number} */
      r.value
    );
    return Tn.call(e.components, i) ? e.components[i] : i;
  }
  if (e.evaluater)
    return e.evaluater.evaluateExpression(r);
  Ne(e);
}
function Ne(e, n) {
  const t = new Q(
    "Cannot handle MDX estrees without `createEvaluater`",
    {
      ancestors: e.ancestors,
      place: n,
      ruleId: "mdx-estree",
      source: "hast-util-to-jsx-runtime"
    }
  );
  throw t.file = e.filePath || void 0, t.url = Vt + "#cannot-handle-mdx-estrees-without-createevaluater", t;
}
function ji(e) {
  const n = {};
  let t;
  for (t in e)
    Tn.call(e, t) && (n[Hi(t)] = e[t]);
  return n;
}
function Hi(e) {
  let n = e.replace(Ci, Ui);
  return n.slice(0, 3) === "ms-" && (n = "-" + n), n;
}
function Ui(e) {
  return "-" + e.toLowerCase();
}
const Ze = {
  action: ["form"],
  cite: ["blockquote", "del", "ins", "q"],
  data: ["object"],
  formAction: ["button", "input"],
  href: ["a", "area", "base", "link"],
  icon: ["menuitem"],
  itemId: null,
  manifest: ["html"],
  ping: ["a", "area"],
  poster: ["video"],
  src: [
    "audio",
    "embed",
    "iframe",
    "img",
    "input",
    "script",
    "source",
    "track",
    "video"
  ]
}, rt = document.createElement("i");
function vn(e) {
  const n = "&" + e + ";";
  rt.innerHTML = n;
  const t = rt.textContent;
  return t.charCodeAt(t.length - 1) === 59 && e !== "semi" || t === n ? !1 : t;
}
function Yt(e, n) {
  const t = Number.parseInt(e, n);
  return (
    // C0 except for HT, LF, FF, CR, space.
    t < 9 || t === 11 || t > 13 && t < 32 || // Control character (DEL) of C0, and C1 controls.
    t > 126 && t < 160 || // Lone high surrogates and low surrogates.
    t > 55295 && t < 57344 || // Noncharacters.
    t > 64975 && t < 65008 || /* eslint-disable no-bitwise */
    (t & 65535) === 65535 || (t & 65535) === 65534 || /* eslint-enable no-bitwise */
    // Out of range
    t > 1114111 ? "�" : String.fromCodePoint(t)
  );
}
function Pe(e) {
  const n = [];
  let t = -1, r = 0, i = 0;
  for (; ++t < e.length; ) {
    const l = e.charCodeAt(t);
    let o = "";
    if (l === 37 && ee(e.charCodeAt(t + 1)) && ee(e.charCodeAt(t + 2)))
      i = 2;
    else if (l < 128)
      /[!#$&-;=?-Z_a-z~]/.test(String.fromCharCode(l)) || (o = String.fromCharCode(l));
    else if (l > 55295 && l < 57344) {
      const a = e.charCodeAt(t + 1);
      l < 56320 && a > 56319 && a < 57344 ? (o = String.fromCharCode(l, a), i = 1) : o = "�";
    } else
      o = String.fromCharCode(l);
    o && (n.push(e.slice(r, t), encodeURIComponent(o)), r = t + i + 1, o = ""), i && (t += i, i = 0);
  }
  return n.join("") + e.slice(r);
}
const Vi = {
  tokenize: qi
};
function qi(e) {
  const n = e.attempt(this.parser.constructs.contentInitial, r, i);
  let t;
  return n;
  function r(a) {
    if (a === null) {
      e.consume(a);
      return;
    }
    return e.enter("lineEnding"), e.consume(a), e.exit("lineEnding"), B(e, n, "linePrefix");
  }
  function i(a) {
    return e.enter("paragraph"), l(a);
  }
  function l(a) {
    const c = e.enter("chunkText", {
      contentType: "text",
      previous: t
    });
    return t && (t.next = c), t = c, o(a);
  }
  function o(a) {
    if (a === null) {
      e.exit("chunkText"), e.exit("paragraph"), e.consume(a);
      return;
    }
    return T(a) ? (e.consume(a), e.exit("chunkText"), l) : (e.consume(a), o);
  }
}
const $i = {
  tokenize: Wi
}, it = {
  tokenize: Yi
};
function Wi(e) {
  const n = this, t = [];
  let r = 0, i, l, o;
  return a;
  function a(E) {
    if (r < t.length) {
      const j = t[r];
      return n.containerState = j[1], e.attempt(j[0].continuation, c, u)(E);
    }
    return u(E);
  }
  function c(E) {
    if (r++, n.containerState._closeFlow) {
      n.containerState._closeFlow = void 0, i && L();
      const j = n.events.length;
      let U = j, y;
      for (; U--; )
        if (n.events[U][0] === "exit" && n.events[U][1].type === "chunkFlow") {
          y = n.events[U][1].end;
          break;
        }
      S(r);
      let O = j;
      for (; O < n.events.length; )
        n.events[O][1].end = {
          ...y
        }, O++;
      return de(n.events, U + 1, 0, n.events.slice(j)), n.events.length = O, u(E);
    }
    return a(E);
  }
  function u(E) {
    if (r === t.length) {
      if (!i)
        return d(E);
      if (i.currentConstruct && i.currentConstruct.concrete)
        return x(E);
      n.interrupt = !!(i.currentConstruct && !i._gfmTableDynamicInterruptHack);
    }
    return n.containerState = {}, e.check(it, s, h)(E);
  }
  function s(E) {
    return i && L(), S(r), d(E);
  }
  function h(E) {
    return n.parser.lazy[n.now().line] = r !== t.length, o = n.now().offset, x(E);
  }
  function d(E) {
    return n.containerState = {}, e.attempt(it, p, x)(E);
  }
  function p(E) {
    return r++, t.push([n.currentConstruct, n.containerState]), d(E);
  }
  function x(E) {
    if (E === null) {
      i && L(), S(0), e.consume(E);
      return;
    }
    return i = i || n.parser.flow(n.now()), e.enter("chunkFlow", {
      _tokenizer: i,
      contentType: "flow",
      previous: l
    }), b(E);
  }
  function b(E) {
    if (E === null) {
      A(e.exit("chunkFlow"), !0), S(0), e.consume(E);
      return;
    }
    return T(E) ? (e.consume(E), A(e.exit("chunkFlow")), r = 0, n.interrupt = void 0, a) : (e.consume(E), b);
  }
  function A(E, j) {
    const U = n.sliceStream(E);
    if (j && U.push(null), E.previous = l, l && (l.next = E), l = E, i.defineSkip(E.start), i.write(U), n.parser.lazy[E.start.line]) {
      let y = i.events.length;
      for (; y--; )
        if (
          // The token starts before the line ending…
          i.events[y][1].start.offset < o && // …and either is not ended yet…
          (!i.events[y][1].end || // …or ends after it.
          i.events[y][1].end.offset > o)
        )
          return;
      const O = n.events.length;
      let V = O, R, M;
      for (; V--; )
        if (n.events[V][0] === "exit" && n.events[V][1].type === "chunkFlow") {
          if (R) {
            M = n.events[V][1].end;
            break;
          }
          R = !0;
        }
      for (S(r), y = O; y < n.events.length; )
        n.events[y][1].end = {
          ...M
        }, y++;
      de(n.events, V + 1, 0, n.events.slice(O)), n.events.length = y;
    }
  }
  function S(E) {
    let j = t.length;
    for (; j-- > E; ) {
      const U = t[j];
      n.containerState = U[1], U[0].exit.call(n, e);
    }
    t.length = E;
  }
  function L() {
    i.write([null]), l = void 0, i = void 0, n.containerState._closeFlow = void 0;
  }
}
function Yi(e, n, t) {
  return B(e, e.attempt(this.parser.constructs.document, n, t), "linePrefix", this.parser.constructs.disable.null.includes("codeIndented") ? void 0 : 4);
}
const yn = {
  name: "attention",
  resolveAll: Xi,
  tokenize: Qi
};
function Xi(e, n) {
  let t = -1, r, i, l, o, a, c, u, s;
  for (; ++t < e.length; )
    if (e[t][0] === "enter" && e[t][1].type === "attentionSequence" && e[t][1]._close) {
      for (r = t; r--; )
        if (e[r][0] === "exit" && e[r][1].type === "attentionSequence" && e[r][1]._open && // If the markers are the same:
        n.sliceSerialize(e[r][1]).charCodeAt(0) === n.sliceSerialize(e[t][1]).charCodeAt(0)) {
          if ((e[r][1]._close || e[t][1]._open) && (e[t][1].end.offset - e[t][1].start.offset) % 3 && !((e[r][1].end.offset - e[r][1].start.offset + e[t][1].end.offset - e[t][1].start.offset) % 3))
            continue;
          c = e[r][1].end.offset - e[r][1].start.offset > 1 && e[t][1].end.offset - e[t][1].start.offset > 1 ? 2 : 1;
          const h = {
            ...e[r][1].end
          }, d = {
            ...e[t][1].start
          };
          lt(h, -c), lt(d, c), o = {
            type: c > 1 ? "strongSequence" : "emphasisSequence",
            start: h,
            end: {
              ...e[r][1].end
            }
          }, a = {
            type: c > 1 ? "strongSequence" : "emphasisSequence",
            start: {
              ...e[t][1].start
            },
            end: d
          }, l = {
            type: c > 1 ? "strongText" : "emphasisText",
            start: {
              ...e[r][1].end
            },
            end: {
              ...e[t][1].start
            }
          }, i = {
            type: c > 1 ? "strong" : "emphasis",
            start: {
              ...o.start
            },
            end: {
              ...a.end
            }
          }, e[r][1].end = {
            ...o.start
          }, e[t][1].start = {
            ...a.end
          }, u = [], e[r][1].end.offset - e[r][1].start.offset && (u = te(u, [["enter", e[r][1], n], ["exit", e[r][1], n]])), u = te(u, [["enter", i, n], ["enter", o, n], ["exit", o, n], ["enter", l, n]]), u = te(u, wn(n.parser.constructs.insideSpan.null, e.slice(r + 1, t), n)), u = te(u, [["exit", l, n], ["enter", a, n], ["exit", a, n], ["exit", i, n]]), e[t][1].end.offset - e[t][1].start.offset ? (s = 2, u = te(u, [["enter", e[t][1], n], ["exit", e[t][1], n]])) : s = 0, de(e, r - 1, t - r + 3, u), t = r + u.length - s - 2;
          break;
        }
    }
  for (t = -1; ++t < e.length; )
    e[t][1].type === "attentionSequence" && (e[t][1].type = "data");
  return e;
}
function Qi(e, n) {
  const t = this.parser.constructs.attentionMarkers.null, r = this.previous, i = qn(r);
  let l;
  return o;
  function o(c) {
    return l = c, e.enter("attentionSequence"), a(c);
  }
  function a(c) {
    if (c === l)
      return e.consume(c), a;
    const u = e.exit("attentionSequence"), s = qn(c), h = !s || s === 2 && i || t.includes(c), d = !i || i === 2 && s || t.includes(r);
    return u._open = !!(l === 42 ? h : h && (i || !d)), u._close = !!(l === 42 ? d : d && (s || !h)), n(c);
  }
}
function lt(e, n) {
  e.column += n, e.offset += n, e._bufferIndex += n;
}
const Gi = {
  name: "autolink",
  tokenize: Ji
};
function Ji(e, n, t) {
  let r = 0;
  return i;
  function i(p) {
    return e.enter("autolink"), e.enter("autolinkMarker"), e.consume(p), e.exit("autolinkMarker"), e.enter("autolinkProtocol"), l;
  }
  function l(p) {
    return ue(p) ? (e.consume(p), o) : p === 64 ? t(p) : u(p);
  }
  function o(p) {
    return p === 43 || p === 45 || p === 46 || ee(p) ? (r = 1, a(p)) : u(p);
  }
  function a(p) {
    return p === 58 ? (e.consume(p), r = 0, c) : (p === 43 || p === 45 || p === 46 || ee(p)) && r++ < 32 ? (e.consume(p), a) : (r = 0, u(p));
  }
  function c(p) {
    return p === 62 ? (e.exit("autolinkProtocol"), e.enter("autolinkMarker"), e.consume(p), e.exit("autolinkMarker"), e.exit("autolink"), n) : p === null || p === 32 || p === 60 || cn(p) ? t(p) : (e.consume(p), c);
  }
  function u(p) {
    return p === 64 ? (e.consume(p), s) : wr(p) ? (e.consume(p), u) : t(p);
  }
  function s(p) {
    return ee(p) ? h(p) : t(p);
  }
  function h(p) {
    return p === 46 ? (e.consume(p), r = 0, s) : p === 62 ? (e.exit("autolinkProtocol").type = "autolinkEmail", e.enter("autolinkMarker"), e.consume(p), e.exit("autolinkMarker"), e.exit("autolink"), n) : d(p);
  }
  function d(p) {
    if ((p === 45 || ee(p)) && r++ < 63) {
      const x = p === 45 ? d : h;
      return e.consume(p), x;
    }
    return t(p);
  }
}
const Xt = {
  continuation: {
    tokenize: Zi
  },
  exit: el,
  name: "blockQuote",
  tokenize: Ki
};
function Ki(e, n, t) {
  const r = this;
  return i;
  function i(o) {
    if (o === 62) {
      const a = r.containerState;
      return a.open || (e.enter("blockQuote", {
        _container: !0
      }), a.open = !0), e.enter("blockQuotePrefix"), e.enter("blockQuoteMarker"), e.consume(o), e.exit("blockQuoteMarker"), l;
    }
    return t(o);
  }
  function l(o) {
    return _(o) ? (e.enter("blockQuotePrefixWhitespace"), e.consume(o), e.exit("blockQuotePrefixWhitespace"), e.exit("blockQuotePrefix"), n) : (e.exit("blockQuotePrefix"), n(o));
  }
}
function Zi(e, n, t) {
  const r = this;
  return i;
  function i(o) {
    return _(o) ? B(e, l, "linePrefix", r.parser.constructs.disable.null.includes("codeIndented") ? void 0 : 4)(o) : l(o);
  }
  function l(o) {
    return e.attempt(Xt, n, t)(o);
  }
}
function el(e) {
  e.exit("blockQuote");
}
const Qt = {
  name: "characterEscape",
  tokenize: nl
};
function nl(e, n, t) {
  return r;
  function r(l) {
    return e.enter("characterEscape"), e.enter("escapeMarker"), e.consume(l), e.exit("escapeMarker"), i;
  }
  function i(l) {
    return Sr(l) ? (e.enter("characterEscapeValue"), e.consume(l), e.exit("characterEscapeValue"), e.exit("characterEscape"), n) : t(l);
  }
}
const Gt = {
  name: "characterReference",
  tokenize: tl
};
function tl(e, n, t) {
  const r = this;
  let i = 0, l, o;
  return a;
  function a(h) {
    return e.enter("characterReference"), e.enter("characterReferenceMarker"), e.consume(h), e.exit("characterReferenceMarker"), c;
  }
  function c(h) {
    return h === 35 ? (e.enter("characterReferenceMarkerNumeric"), e.consume(h), e.exit("characterReferenceMarkerNumeric"), u) : (e.enter("characterReferenceValue"), l = 31, o = ee, s(h));
  }
  function u(h) {
    return h === 88 || h === 120 ? (e.enter("characterReferenceMarkerHexadecimal"), e.consume(h), e.exit("characterReferenceMarkerHexadecimal"), e.enter("characterReferenceValue"), l = 6, o = Er, s) : (e.enter("characterReferenceValue"), l = 7, o = pn, s(h));
  }
  function s(h) {
    if (h === 59 && i) {
      const d = e.exit("characterReferenceValue");
      return o === ee && !vn(r.sliceSerialize(d)) ? t(h) : (e.enter("characterReferenceMarker"), e.consume(h), e.exit("characterReferenceMarker"), e.exit("characterReference"), n);
    }
    return o(h) && i++ < l ? (e.consume(h), s) : t(h);
  }
}
const ot = {
  partial: !0,
  tokenize: il
}, at = {
  concrete: !0,
  name: "codeFenced",
  tokenize: rl
};
function rl(e, n, t) {
  const r = this, i = {
    partial: !0,
    tokenize: U
  };
  let l = 0, o = 0, a;
  return c;
  function c(y) {
    return u(y);
  }
  function u(y) {
    const O = r.events[r.events.length - 1];
    return l = O && O[1].type === "linePrefix" ? O[2].sliceSerialize(O[1], !0).length : 0, a = y, e.enter("codeFenced"), e.enter("codeFencedFence"), e.enter("codeFencedFenceSequence"), s(y);
  }
  function s(y) {
    return y === a ? (o++, e.consume(y), s) : o < 3 ? t(y) : (e.exit("codeFencedFenceSequence"), _(y) ? B(e, h, "whitespace")(y) : h(y));
  }
  function h(y) {
    return y === null || T(y) ? (e.exit("codeFencedFence"), r.interrupt ? n(y) : e.check(ot, b, j)(y)) : (e.enter("codeFencedFenceInfo"), e.enter("chunkString", {
      contentType: "string"
    }), d(y));
  }
  function d(y) {
    return y === null || T(y) ? (e.exit("chunkString"), e.exit("codeFencedFenceInfo"), h(y)) : _(y) ? (e.exit("chunkString"), e.exit("codeFencedFenceInfo"), B(e, p, "whitespace")(y)) : y === 96 && y === a ? t(y) : (e.consume(y), d);
  }
  function p(y) {
    return y === null || T(y) ? h(y) : (e.enter("codeFencedFenceMeta"), e.enter("chunkString", {
      contentType: "string"
    }), x(y));
  }
  function x(y) {
    return y === null || T(y) ? (e.exit("chunkString"), e.exit("codeFencedFenceMeta"), h(y)) : y === 96 && y === a ? t(y) : (e.consume(y), x);
  }
  function b(y) {
    return e.attempt(i, j, A)(y);
  }
  function A(y) {
    return e.enter("lineEnding"), e.consume(y), e.exit("lineEnding"), S;
  }
  function S(y) {
    return l > 0 && _(y) ? B(e, L, "linePrefix", l + 1)(y) : L(y);
  }
  function L(y) {
    return y === null || T(y) ? e.check(ot, b, j)(y) : (e.enter("codeFlowValue"), E(y));
  }
  function E(y) {
    return y === null || T(y) ? (e.exit("codeFlowValue"), L(y)) : (e.consume(y), E);
  }
  function j(y) {
    return e.exit("codeFenced"), n(y);
  }
  function U(y, O, V) {
    let R = 0;
    return M;
    function M(D) {
      return y.enter("lineEnding"), y.consume(D), y.exit("lineEnding"), I;
    }
    function I(D) {
      return y.enter("codeFencedFence"), _(D) ? B(y, C, "linePrefix", r.parser.constructs.disable.null.includes("codeIndented") ? void 0 : 4)(D) : C(D);
    }
    function C(D) {
      return D === a ? (y.enter("codeFencedFenceSequence"), H(D)) : V(D);
    }
    function H(D) {
      return D === a ? (R++, y.consume(D), H) : R >= o ? (y.exit("codeFencedFenceSequence"), _(D) ? B(y, q, "whitespace")(D) : q(D)) : V(D);
    }
    function q(D) {
      return D === null || T(D) ? (y.exit("codeFencedFence"), O(D)) : V(D);
    }
  }
}
function il(e, n, t) {
  const r = this;
  return i;
  function i(o) {
    return o === null ? t(o) : (e.enter("lineEnding"), e.consume(o), e.exit("lineEnding"), l);
  }
  function l(o) {
    return r.parser.lazy[r.now().line] ? t(o) : n(o);
  }
}
const en = {
  name: "codeIndented",
  tokenize: ol
}, ll = {
  partial: !0,
  tokenize: al
};
function ol(e, n, t) {
  const r = this;
  return i;
  function i(u) {
    return e.enter("codeIndented"), B(e, l, "linePrefix", 5)(u);
  }
  function l(u) {
    const s = r.events[r.events.length - 1];
    return s && s[1].type === "linePrefix" && s[2].sliceSerialize(s[1], !0).length >= 4 ? o(u) : t(u);
  }
  function o(u) {
    return u === null ? c(u) : T(u) ? e.attempt(ll, o, c)(u) : (e.enter("codeFlowValue"), a(u));
  }
  function a(u) {
    return u === null || T(u) ? (e.exit("codeFlowValue"), o(u)) : (e.consume(u), a);
  }
  function c(u) {
    return e.exit("codeIndented"), n(u);
  }
}
function al(e, n, t) {
  const r = this;
  return i;
  function i(o) {
    return r.parser.lazy[r.now().line] ? t(o) : T(o) ? (e.enter("lineEnding"), e.consume(o), e.exit("lineEnding"), i) : B(e, l, "linePrefix", 5)(o);
  }
  function l(o) {
    const a = r.events[r.events.length - 1];
    return a && a[1].type === "linePrefix" && a[2].sliceSerialize(a[1], !0).length >= 4 ? n(o) : T(o) ? i(o) : t(o);
  }
}
const ul = {
  name: "codeText",
  previous: cl,
  resolve: sl,
  tokenize: pl
};
function sl(e) {
  let n = e.length - 4, t = 3, r, i;
  if ((e[t][1].type === "lineEnding" || e[t][1].type === "space") && (e[n][1].type === "lineEnding" || e[n][1].type === "space")) {
    for (r = t; ++r < n; )
      if (e[r][1].type === "codeTextData") {
        e[t][1].type = "codeTextPadding", e[n][1].type = "codeTextPadding", t += 2, n -= 2;
        break;
      }
  }
  for (r = t - 1, n++; ++r <= n; )
    i === void 0 ? r !== n && e[r][1].type !== "lineEnding" && (i = r) : (r === n || e[r][1].type === "lineEnding") && (e[i][1].type = "codeTextData", r !== i + 2 && (e[i][1].end = e[r - 1][1].end, e.splice(i + 2, r - i - 2), n -= r - i - 2, r = i + 2), i = void 0);
  return e;
}
function cl(e) {
  return e !== 96 || this.events[this.events.length - 1][1].type === "characterEscape";
}
function pl(e, n, t) {
  let r = 0, i, l;
  return o;
  function o(h) {
    return e.enter("codeText"), e.enter("codeTextSequence"), a(h);
  }
  function a(h) {
    return h === 96 ? (e.consume(h), r++, a) : (e.exit("codeTextSequence"), c(h));
  }
  function c(h) {
    return h === null ? t(h) : h === 32 ? (e.enter("space"), e.consume(h), e.exit("space"), c) : h === 96 ? (l = e.enter("codeTextSequence"), i = 0, s(h)) : T(h) ? (e.enter("lineEnding"), e.consume(h), e.exit("lineEnding"), c) : (e.enter("codeTextData"), u(h));
  }
  function u(h) {
    return h === null || h === 32 || h === 96 || T(h) ? (e.exit("codeTextData"), c(h)) : (e.consume(h), u);
  }
  function s(h) {
    return h === 96 ? (e.consume(h), i++, s) : i === r ? (e.exit("codeTextSequence"), e.exit("codeText"), n(h)) : (l.type = "codeTextData", u(h));
  }
}
class hl {
  /**
   * @param {ReadonlyArray<T> | null | undefined} [initial]
   *   Initial items (optional).
   * @returns
   *   Splice buffer.
   */
  constructor(n) {
    this.left = n ? [...n] : [], this.right = [];
  }
  /**
   * Array access;
   * does not move the cursor.
   *
   * @param {number} index
   *   Index.
   * @return {T}
   *   Item.
   */
  get(n) {
    if (n < 0 || n >= this.left.length + this.right.length)
      throw new RangeError("Cannot access index `" + n + "` in a splice buffer of size `" + (this.left.length + this.right.length) + "`");
    return n < this.left.length ? this.left[n] : this.right[this.right.length - n + this.left.length - 1];
  }
  /**
   * The length of the splice buffer, one greater than the largest index in the
   * array.
   */
  get length() {
    return this.left.length + this.right.length;
  }
  /**
   * Remove and return `list[0]`;
   * moves the cursor to `0`.
   *
   * @returns {T | undefined}
   *   Item, optional.
   */
  shift() {
    return this.setCursor(0), this.right.pop();
  }
  /**
   * Slice the buffer to get an array;
   * does not move the cursor.
   *
   * @param {number} start
   *   Start.
   * @param {number | null | undefined} [end]
   *   End (optional).
   * @returns {Array<T>}
   *   Array of items.
   */
  slice(n, t) {
    const r = t ?? Number.POSITIVE_INFINITY;
    return r < this.left.length ? this.left.slice(n, r) : n > this.left.length ? this.right.slice(this.right.length - r + this.left.length, this.right.length - n + this.left.length).reverse() : this.left.slice(n).concat(this.right.slice(this.right.length - r + this.left.length).reverse());
  }
  /**
   * Mimics the behavior of Array.prototype.splice() except for the change of
   * interface necessary to avoid segfaults when patching in very large arrays.
   *
   * This operation moves cursor is moved to `start` and results in the cursor
   * placed after any inserted items.
   *
   * @param {number} start
   *   Start;
   *   zero-based index at which to start changing the array;
   *   negative numbers count backwards from the end of the array and values
   *   that are out-of bounds are clamped to the appropriate end of the array.
   * @param {number | null | undefined} [deleteCount=0]
   *   Delete count (default: `0`);
   *   maximum number of elements to delete, starting from start.
   * @param {Array<T> | null | undefined} [items=[]]
   *   Items to include in place of the deleted items (default: `[]`).
   * @return {Array<T>}
   *   Any removed items.
   */
  splice(n, t, r) {
    const i = t || 0;
    this.setCursor(Math.trunc(n));
    const l = this.right.splice(this.right.length - i, Number.POSITIVE_INFINITY);
    return r && Le(this.left, r), l.reverse();
  }
  /**
   * Remove and return the highest-numbered item in the array, so
   * `list[list.length - 1]`;
   * Moves the cursor to `length`.
   *
   * @returns {T | undefined}
   *   Item, optional.
   */
  pop() {
    return this.setCursor(Number.POSITIVE_INFINITY), this.left.pop();
  }
  /**
   * Inserts a single item to the high-numbered side of the array;
   * moves the cursor to `length`.
   *
   * @param {T} item
   *   Item.
   * @returns {undefined}
   *   Nothing.
   */
  push(n) {
    this.setCursor(Number.POSITIVE_INFINITY), this.left.push(n);
  }
  /**
   * Inserts many items to the high-numbered side of the array.
   * Moves the cursor to `length`.
   *
   * @param {Array<T>} items
   *   Items.
   * @returns {undefined}
   *   Nothing.
   */
  pushMany(n) {
    this.setCursor(Number.POSITIVE_INFINITY), Le(this.left, n);
  }
  /**
   * Inserts a single item to the low-numbered side of the array;
   * Moves the cursor to `0`.
   *
   * @param {T} item
   *   Item.
   * @returns {undefined}
   *   Nothing.
   */
  unshift(n) {
    this.setCursor(0), this.right.push(n);
  }
  /**
   * Inserts many items to the low-numbered side of the array;
   * moves the cursor to `0`.
   *
   * @param {Array<T>} items
   *   Items.
   * @returns {undefined}
   *   Nothing.
   */
  unshiftMany(n) {
    this.setCursor(0), Le(this.right, n.reverse());
  }
  /**
   * Move the cursor to a specific position in the array. Requires
   * time proportional to the distance moved.
   *
   * If `n < 0`, the cursor will end up at the beginning.
   * If `n > length`, the cursor will end up at the end.
   *
   * @param {number} n
   *   Position.
   * @return {undefined}
   *   Nothing.
   */
  setCursor(n) {
    if (!(n === this.left.length || n > this.left.length && this.right.length === 0 || n < 0 && this.left.length === 0))
      if (n < this.left.length) {
        const t = this.left.splice(n, Number.POSITIVE_INFINITY);
        Le(this.right, t.reverse());
      } else {
        const t = this.right.splice(this.left.length + this.right.length - n, Number.POSITIVE_INFINITY);
        Le(this.left, t.reverse());
      }
  }
}
function Le(e, n) {
  let t = 0;
  if (n.length < 1e4)
    e.push(...n);
  else
    for (; t < n.length; )
      e.push(...n.slice(t, t + 1e4)), t += 1e4;
}
function Jt(e) {
  const n = {};
  let t = -1, r, i, l, o, a, c, u;
  const s = new hl(e);
  for (; ++t < s.length; ) {
    for (; t in n; )
      t = n[t];
    if (r = s.get(t), t && r[1].type === "chunkFlow" && s.get(t - 1)[1].type === "listItemPrefix" && (c = r[1]._tokenizer.events, l = 0, l < c.length && c[l][1].type === "lineEndingBlank" && (l += 2), l < c.length && c[l][1].type === "content"))
      for (; ++l < c.length && c[l][1].type !== "content"; )
        c[l][1].type === "chunkText" && (c[l][1]._isInFirstContentOfListItem = !0, l++);
    if (r[0] === "enter")
      r[1].contentType && (Object.assign(n, fl(s, t)), t = n[t], u = !0);
    else if (r[1]._container) {
      for (l = t, i = void 0; l--; )
        if (o = s.get(l), o[1].type === "lineEnding" || o[1].type === "lineEndingBlank")
          o[0] === "enter" && (i && (s.get(i)[1].type = "lineEndingBlank"), o[1].type = "lineEnding", i = l);
        else if (!(o[1].type === "linePrefix" || o[1].type === "listItemIndent")) break;
      i && (r[1].end = {
        ...s.get(i)[1].start
      }, a = s.slice(i, t), a.unshift(r), s.splice(i, t - i + 1, a));
    }
  }
  return de(e, 0, Number.POSITIVE_INFINITY, s.slice(0)), !u;
}
function fl(e, n) {
  const t = e.get(n)[1], r = e.get(n)[2];
  let i = n - 1;
  const l = [];
  let o = t._tokenizer;
  o || (o = r.parser[t.contentType](t.start), t._contentTypeTextTrailing && (o._contentTypeTextTrailing = !0));
  const a = o.events, c = [], u = {};
  let s, h, d = -1, p = t, x = 0, b = 0;
  const A = [b];
  for (; p; ) {
    for (; e.get(++i)[1] !== p; )
      ;
    l.push(i), p._tokenizer || (s = r.sliceStream(p), p.next || s.push(null), h && o.defineSkip(p.start), p._isInFirstContentOfListItem && (o._gfmTasklistFirstContentOfListItem = !0), o.write(s), p._isInFirstContentOfListItem && (o._gfmTasklistFirstContentOfListItem = void 0)), h = p, p = p.next;
  }
  for (p = t; ++d < a.length; )
    // Find a void token that includes a break.
    a[d][0] === "exit" && a[d - 1][0] === "enter" && a[d][1].type === a[d - 1][1].type && a[d][1].start.line !== a[d][1].end.line && (b = d + 1, A.push(b), p._tokenizer = void 0, p.previous = void 0, p = p.next);
  for (o.events = [], p ? (p._tokenizer = void 0, p.previous = void 0) : A.pop(), d = A.length; d--; ) {
    const S = a.slice(A[d], A[d + 1]), L = l.pop();
    c.push([L, L + S.length - 1]), e.splice(L, 2, S);
  }
  for (c.reverse(), d = -1; ++d < c.length; )
    u[x + c[d][0]] = x + c[d][1], x += c[d][1] - c[d][0] - 1;
  return u;
}
const ml = {
  resolve: gl,
  tokenize: yl
}, dl = {
  partial: !0,
  tokenize: xl
};
function gl(e) {
  return Jt(e), e;
}
function yl(e, n) {
  let t;
  return r;
  function r(a) {
    return e.enter("content"), t = e.enter("chunkContent", {
      contentType: "content"
    }), i(a);
  }
  function i(a) {
    return a === null ? l(a) : T(a) ? e.check(dl, o, l)(a) : (e.consume(a), i);
  }
  function l(a) {
    return e.exit("chunkContent"), e.exit("content"), n(a);
  }
  function o(a) {
    return e.consume(a), e.exit("chunkContent"), t.next = e.enter("chunkContent", {
      contentType: "content",
      previous: t
    }), t = t.next, i;
  }
}
function xl(e, n, t) {
  const r = this;
  return i;
  function i(o) {
    return e.exit("chunkContent"), e.enter("lineEnding"), e.consume(o), e.exit("lineEnding"), B(e, l, "linePrefix");
  }
  function l(o) {
    if (o === null || T(o))
      return t(o);
    const a = r.events[r.events.length - 1];
    return !r.parser.constructs.disable.null.includes("codeIndented") && a && a[1].type === "linePrefix" && a[2].sliceSerialize(a[1], !0).length >= 4 ? n(o) : e.interrupt(r.parser.constructs.flow, t, n)(o);
  }
}
function Kt(e, n, t, r, i, l, o, a, c) {
  const u = c || Number.POSITIVE_INFINITY;
  let s = 0;
  return h;
  function h(S) {
    return S === 60 ? (e.enter(r), e.enter(i), e.enter(l), e.consume(S), e.exit(l), d) : S === null || S === 32 || S === 41 || cn(S) ? t(S) : (e.enter(r), e.enter(o), e.enter(a), e.enter("chunkString", {
      contentType: "string"
    }), b(S));
  }
  function d(S) {
    return S === 62 ? (e.enter(l), e.consume(S), e.exit(l), e.exit(i), e.exit(r), n) : (e.enter(a), e.enter("chunkString", {
      contentType: "string"
    }), p(S));
  }
  function p(S) {
    return S === 62 ? (e.exit("chunkString"), e.exit(a), d(S)) : S === null || S === 60 || T(S) ? t(S) : (e.consume(S), S === 92 ? x : p);
  }
  function x(S) {
    return S === 60 || S === 62 || S === 92 ? (e.consume(S), p) : p(S);
  }
  function b(S) {
    return !s && (S === null || S === 41 || ne(S)) ? (e.exit("chunkString"), e.exit(a), e.exit(o), e.exit(r), n(S)) : s < u && S === 40 ? (e.consume(S), s++, b) : S === 41 ? (e.consume(S), s--, b) : S === null || S === 32 || S === 40 || cn(S) ? t(S) : (e.consume(S), S === 92 ? A : b);
  }
  function A(S) {
    return S === 40 || S === 41 || S === 92 ? (e.consume(S), b) : b(S);
  }
}
function Zt(e, n, t, r, i, l) {
  const o = this;
  let a = 0, c;
  return u;
  function u(p) {
    return e.enter(r), e.enter(i), e.consume(p), e.exit(i), e.enter(l), s;
  }
  function s(p) {
    return a > 999 || p === null || p === 91 || p === 93 && !c || // To do: remove in the future once we’ve switched from
    // `micromark-extension-footnote` to `micromark-extension-gfm-footnote`,
    // which doesn’t need this.
    // Hidden footnotes hook.
    /* c8 ignore next 3 */
    p === 94 && !a && "_hiddenFootnoteSupport" in o.parser.constructs ? t(p) : p === 93 ? (e.exit(l), e.enter(i), e.consume(p), e.exit(i), e.exit(r), n) : T(p) ? (e.enter("lineEnding"), e.consume(p), e.exit("lineEnding"), s) : (e.enter("chunkString", {
      contentType: "string"
    }), h(p));
  }
  function h(p) {
    return p === null || p === 91 || p === 93 || T(p) || a++ > 999 ? (e.exit("chunkString"), s(p)) : (e.consume(p), c || (c = !_(p)), p === 92 ? d : h);
  }
  function d(p) {
    return p === 91 || p === 92 || p === 93 ? (e.consume(p), a++, h) : h(p);
  }
}
function er(e, n, t, r, i, l) {
  let o;
  return a;
  function a(d) {
    return d === 34 || d === 39 || d === 40 ? (e.enter(r), e.enter(i), e.consume(d), e.exit(i), o = d === 40 ? 41 : d, c) : t(d);
  }
  function c(d) {
    return d === o ? (e.enter(i), e.consume(d), e.exit(i), e.exit(r), n) : (e.enter(l), u(d));
  }
  function u(d) {
    return d === o ? (e.exit(l), c(o)) : d === null ? t(d) : T(d) ? (e.enter("lineEnding"), e.consume(d), e.exit("lineEnding"), B(e, u, "linePrefix")) : (e.enter("chunkString", {
      contentType: "string"
    }), s(d));
  }
  function s(d) {
    return d === o || d === null || T(d) ? (e.exit("chunkString"), u(d)) : (e.consume(d), d === 92 ? h : s);
  }
  function h(d) {
    return d === o || d === 92 ? (e.consume(d), s) : s(d);
  }
}
function Re(e, n) {
  let t;
  return r;
  function r(i) {
    return T(i) ? (e.enter("lineEnding"), e.consume(i), e.exit("lineEnding"), t = !0, r) : _(i) ? B(e, r, t ? "linePrefix" : "lineSuffix")(i) : n(i);
  }
}
const kl = {
  name: "definition",
  tokenize: wl
}, bl = {
  partial: !0,
  tokenize: Sl
};
function wl(e, n, t) {
  const r = this;
  let i;
  return l;
  function l(p) {
    return e.enter("definition"), o(p);
  }
  function o(p) {
    return Zt.call(
      r,
      e,
      a,
      // Note: we don’t need to reset the way `markdown-rs` does.
      t,
      "definitionLabel",
      "definitionLabelMarker",
      "definitionLabelString"
    )(p);
  }
  function a(p) {
    return i = Ie(r.sliceSerialize(r.events[r.events.length - 1][1]).slice(1, -1)), p === 58 ? (e.enter("definitionMarker"), e.consume(p), e.exit("definitionMarker"), c) : t(p);
  }
  function c(p) {
    return ne(p) ? Re(e, u)(p) : u(p);
  }
  function u(p) {
    return Kt(
      e,
      s,
      // Note: we don’t need to reset the way `markdown-rs` does.
      t,
      "definitionDestination",
      "definitionDestinationLiteral",
      "definitionDestinationLiteralMarker",
      "definitionDestinationRaw",
      "definitionDestinationString"
    )(p);
  }
  function s(p) {
    return e.attempt(bl, h, h)(p);
  }
  function h(p) {
    return _(p) ? B(e, d, "whitespace")(p) : d(p);
  }
  function d(p) {
    return p === null || T(p) ? (e.exit("definition"), r.parser.defined.push(i), n(p)) : t(p);
  }
}
function Sl(e, n, t) {
  return r;
  function r(a) {
    return ne(a) ? Re(e, i)(a) : t(a);
  }
  function i(a) {
    return er(e, l, t, "definitionTitle", "definitionTitleMarker", "definitionTitleString")(a);
  }
  function l(a) {
    return _(a) ? B(e, o, "whitespace")(a) : o(a);
  }
  function o(a) {
    return a === null || T(a) ? n(a) : t(a);
  }
}
const El = {
  name: "hardBreakEscape",
  tokenize: Cl
};
function Cl(e, n, t) {
  return r;
  function r(l) {
    return e.enter("hardBreakEscape"), e.consume(l), i;
  }
  function i(l) {
    return T(l) ? (e.exit("hardBreakEscape"), n(l)) : t(l);
  }
}
const Il = {
  name: "headingAtx",
  resolve: Tl,
  tokenize: Pl
};
function Tl(e, n) {
  let t = e.length - 2, r = 3, i, l;
  return e[r][1].type === "whitespace" && (r += 2), t - 2 > r && e[t][1].type === "whitespace" && (t -= 2), e[t][1].type === "atxHeadingSequence" && (r === t - 1 || t - 4 > r && e[t - 2][1].type === "whitespace") && (t -= r + 1 === t ? 2 : 4), t > r && (i = {
    type: "atxHeadingText",
    start: e[r][1].start,
    end: e[t][1].end
  }, l = {
    type: "chunkText",
    start: e[r][1].start,
    end: e[t][1].end,
    contentType: "text"
  }, de(e, r, t - r + 1, [["enter", i, n], ["enter", l, n], ["exit", l, n], ["exit", i, n]])), e;
}
function Pl(e, n, t) {
  let r = 0;
  return i;
  function i(s) {
    return e.enter("atxHeading"), l(s);
  }
  function l(s) {
    return e.enter("atxHeadingSequence"), o(s);
  }
  function o(s) {
    return s === 35 && r++ < 6 ? (e.consume(s), o) : s === null || ne(s) ? (e.exit("atxHeadingSequence"), a(s)) : t(s);
  }
  function a(s) {
    return s === 35 ? (e.enter("atxHeadingSequence"), c(s)) : s === null || T(s) ? (e.exit("atxHeading"), n(s)) : _(s) ? B(e, a, "whitespace")(s) : (e.enter("atxHeadingText"), u(s));
  }
  function c(s) {
    return s === 35 ? (e.consume(s), c) : (e.exit("atxHeadingSequence"), a(s));
  }
  function u(s) {
    return s === null || s === 35 || ne(s) ? (e.exit("atxHeadingText"), a(s)) : (e.consume(s), u);
  }
}
const Al = [
  "address",
  "article",
  "aside",
  "base",
  "basefont",
  "blockquote",
  "body",
  "caption",
  "center",
  "col",
  "colgroup",
  "dd",
  "details",
  "dialog",
  "dir",
  "div",
  "dl",
  "dt",
  "fieldset",
  "figcaption",
  "figure",
  "footer",
  "form",
  "frame",
  "frameset",
  "h1",
  "h2",
  "h3",
  "h4",
  "h5",
  "h6",
  "head",
  "header",
  "hr",
  "html",
  "iframe",
  "legend",
  "li",
  "link",
  "main",
  "menu",
  "menuitem",
  "nav",
  "noframes",
  "ol",
  "optgroup",
  "option",
  "p",
  "param",
  "search",
  "section",
  "summary",
  "table",
  "tbody",
  "td",
  "tfoot",
  "th",
  "thead",
  "title",
  "tr",
  "track",
  "ul"
], ut = ["pre", "script", "style", "textarea"], vl = {
  concrete: !0,
  name: "htmlFlow",
  resolveTo: Dl,
  tokenize: Ol
}, zl = {
  partial: !0,
  tokenize: Rl
}, Ll = {
  partial: !0,
  tokenize: _l
};
function Dl(e) {
  let n = e.length;
  for (; n-- && !(e[n][0] === "enter" && e[n][1].type === "htmlFlow"); )
    ;
  return n > 1 && e[n - 2][1].type === "linePrefix" && (e[n][1].start = e[n - 2][1].start, e[n + 1][1].start = e[n - 2][1].start, e.splice(n - 2, 2)), e;
}
function Ol(e, n, t) {
  const r = this;
  let i, l, o, a, c;
  return u;
  function u(m) {
    return s(m);
  }
  function s(m) {
    return e.enter("htmlFlow"), e.enter("htmlFlowData"), e.consume(m), h;
  }
  function h(m) {
    return m === 33 ? (e.consume(m), d) : m === 47 ? (e.consume(m), l = !0, b) : m === 63 ? (e.consume(m), i = 3, r.interrupt ? n : f) : ue(m) ? (e.consume(m), o = String.fromCharCode(m), A) : t(m);
  }
  function d(m) {
    return m === 45 ? (e.consume(m), i = 2, p) : m === 91 ? (e.consume(m), i = 5, a = 0, x) : ue(m) ? (e.consume(m), i = 4, r.interrupt ? n : f) : t(m);
  }
  function p(m) {
    return m === 45 ? (e.consume(m), r.interrupt ? n : f) : t(m);
  }
  function x(m) {
    const le = "CDATA[";
    return m === le.charCodeAt(a++) ? (e.consume(m), a === le.length ? r.interrupt ? n : C : x) : t(m);
  }
  function b(m) {
    return ue(m) ? (e.consume(m), o = String.fromCharCode(m), A) : t(m);
  }
  function A(m) {
    if (m === null || m === 47 || m === 62 || ne(m)) {
      const le = m === 47, ge = o.toLowerCase();
      return !le && !l && ut.includes(ge) ? (i = 1, r.interrupt ? n(m) : C(m)) : Al.includes(o.toLowerCase()) ? (i = 6, le ? (e.consume(m), S) : r.interrupt ? n(m) : C(m)) : (i = 7, r.interrupt && !r.parser.lazy[r.now().line] ? t(m) : l ? L(m) : E(m));
    }
    return m === 45 || ee(m) ? (e.consume(m), o += String.fromCharCode(m), A) : t(m);
  }
  function S(m) {
    return m === 62 ? (e.consume(m), r.interrupt ? n : C) : t(m);
  }
  function L(m) {
    return _(m) ? (e.consume(m), L) : M(m);
  }
  function E(m) {
    return m === 47 ? (e.consume(m), M) : m === 58 || m === 95 || ue(m) ? (e.consume(m), j) : _(m) ? (e.consume(m), E) : M(m);
  }
  function j(m) {
    return m === 45 || m === 46 || m === 58 || m === 95 || ee(m) ? (e.consume(m), j) : U(m);
  }
  function U(m) {
    return m === 61 ? (e.consume(m), y) : _(m) ? (e.consume(m), U) : E(m);
  }
  function y(m) {
    return m === null || m === 60 || m === 61 || m === 62 || m === 96 ? t(m) : m === 34 || m === 39 ? (e.consume(m), c = m, O) : _(m) ? (e.consume(m), y) : V(m);
  }
  function O(m) {
    return m === c ? (e.consume(m), c = null, R) : m === null || T(m) ? t(m) : (e.consume(m), O);
  }
  function V(m) {
    return m === null || m === 34 || m === 39 || m === 47 || m === 60 || m === 61 || m === 62 || m === 96 || ne(m) ? U(m) : (e.consume(m), V);
  }
  function R(m) {
    return m === 47 || m === 62 || _(m) ? E(m) : t(m);
  }
  function M(m) {
    return m === 62 ? (e.consume(m), I) : t(m);
  }
  function I(m) {
    return m === null || T(m) ? C(m) : _(m) ? (e.consume(m), I) : t(m);
  }
  function C(m) {
    return m === 45 && i === 2 ? (e.consume(m), X) : m === 60 && i === 1 ? (e.consume(m), W) : m === 62 && i === 4 ? (e.consume(m), ie) : m === 63 && i === 3 ? (e.consume(m), f) : m === 93 && i === 5 ? (e.consume(m), se) : T(m) && (i === 6 || i === 7) ? (e.exit("htmlFlowData"), e.check(zl, ce, H)(m)) : m === null || T(m) ? (e.exit("htmlFlowData"), H(m)) : (e.consume(m), C);
  }
  function H(m) {
    return e.check(Ll, q, ce)(m);
  }
  function q(m) {
    return e.enter("lineEnding"), e.consume(m), e.exit("lineEnding"), D;
  }
  function D(m) {
    return m === null || T(m) ? H(m) : (e.enter("htmlFlowData"), C(m));
  }
  function X(m) {
    return m === 45 ? (e.consume(m), f) : C(m);
  }
  function W(m) {
    return m === 47 ? (e.consume(m), o = "", re) : C(m);
  }
  function re(m) {
    if (m === 62) {
      const le = o.toLowerCase();
      return ut.includes(le) ? (e.consume(m), ie) : C(m);
    }
    return ue(m) && o.length < 8 ? (e.consume(m), o += String.fromCharCode(m), re) : C(m);
  }
  function se(m) {
    return m === 93 ? (e.consume(m), f) : C(m);
  }
  function f(m) {
    return m === 62 ? (e.consume(m), ie) : m === 45 && i === 2 ? (e.consume(m), f) : C(m);
  }
  function ie(m) {
    return m === null || T(m) ? (e.exit("htmlFlowData"), ce(m)) : (e.consume(m), ie);
  }
  function ce(m) {
    return e.exit("htmlFlow"), n(m);
  }
}
function _l(e, n, t) {
  const r = this;
  return i;
  function i(o) {
    return T(o) ? (e.enter("lineEnding"), e.consume(o), e.exit("lineEnding"), l) : t(o);
  }
  function l(o) {
    return r.parser.lazy[r.now().line] ? t(o) : n(o);
  }
}
function Rl(e, n, t) {
  return r;
  function r(i) {
    return e.enter("lineEnding"), e.consume(i), e.exit("lineEnding"), e.attempt(Qe, n, t);
  }
}
const Fl = {
  name: "htmlText",
  tokenize: Nl
};
function Nl(e, n, t) {
  const r = this;
  let i, l, o;
  return a;
  function a(f) {
    return e.enter("htmlText"), e.enter("htmlTextData"), e.consume(f), c;
  }
  function c(f) {
    return f === 33 ? (e.consume(f), u) : f === 47 ? (e.consume(f), U) : f === 63 ? (e.consume(f), E) : ue(f) ? (e.consume(f), V) : t(f);
  }
  function u(f) {
    return f === 45 ? (e.consume(f), s) : f === 91 ? (e.consume(f), l = 0, x) : ue(f) ? (e.consume(f), L) : t(f);
  }
  function s(f) {
    return f === 45 ? (e.consume(f), p) : t(f);
  }
  function h(f) {
    return f === null ? t(f) : f === 45 ? (e.consume(f), d) : T(f) ? (o = h, W(f)) : (e.consume(f), h);
  }
  function d(f) {
    return f === 45 ? (e.consume(f), p) : h(f);
  }
  function p(f) {
    return f === 62 ? X(f) : f === 45 ? d(f) : h(f);
  }
  function x(f) {
    const ie = "CDATA[";
    return f === ie.charCodeAt(l++) ? (e.consume(f), l === ie.length ? b : x) : t(f);
  }
  function b(f) {
    return f === null ? t(f) : f === 93 ? (e.consume(f), A) : T(f) ? (o = b, W(f)) : (e.consume(f), b);
  }
  function A(f) {
    return f === 93 ? (e.consume(f), S) : b(f);
  }
  function S(f) {
    return f === 62 ? X(f) : f === 93 ? (e.consume(f), S) : b(f);
  }
  function L(f) {
    return f === null || f === 62 ? X(f) : T(f) ? (o = L, W(f)) : (e.consume(f), L);
  }
  function E(f) {
    return f === null ? t(f) : f === 63 ? (e.consume(f), j) : T(f) ? (o = E, W(f)) : (e.consume(f), E);
  }
  function j(f) {
    return f === 62 ? X(f) : E(f);
  }
  function U(f) {
    return ue(f) ? (e.consume(f), y) : t(f);
  }
  function y(f) {
    return f === 45 || ee(f) ? (e.consume(f), y) : O(f);
  }
  function O(f) {
    return T(f) ? (o = O, W(f)) : _(f) ? (e.consume(f), O) : X(f);
  }
  function V(f) {
    return f === 45 || ee(f) ? (e.consume(f), V) : f === 47 || f === 62 || ne(f) ? R(f) : t(f);
  }
  function R(f) {
    return f === 47 ? (e.consume(f), X) : f === 58 || f === 95 || ue(f) ? (e.consume(f), M) : T(f) ? (o = R, W(f)) : _(f) ? (e.consume(f), R) : X(f);
  }
  function M(f) {
    return f === 45 || f === 46 || f === 58 || f === 95 || ee(f) ? (e.consume(f), M) : I(f);
  }
  function I(f) {
    return f === 61 ? (e.consume(f), C) : T(f) ? (o = I, W(f)) : _(f) ? (e.consume(f), I) : R(f);
  }
  function C(f) {
    return f === null || f === 60 || f === 61 || f === 62 || f === 96 ? t(f) : f === 34 || f === 39 ? (e.consume(f), i = f, H) : T(f) ? (o = C, W(f)) : _(f) ? (e.consume(f), C) : (e.consume(f), q);
  }
  function H(f) {
    return f === i ? (e.consume(f), i = void 0, D) : f === null ? t(f) : T(f) ? (o = H, W(f)) : (e.consume(f), H);
  }
  function q(f) {
    return f === null || f === 34 || f === 39 || f === 60 || f === 61 || f === 96 ? t(f) : f === 47 || f === 62 || ne(f) ? R(f) : (e.consume(f), q);
  }
  function D(f) {
    return f === 47 || f === 62 || ne(f) ? R(f) : t(f);
  }
  function X(f) {
    return f === 62 ? (e.consume(f), e.exit("htmlTextData"), e.exit("htmlText"), n) : t(f);
  }
  function W(f) {
    return e.exit("htmlTextData"), e.enter("lineEnding"), e.consume(f), e.exit("lineEnding"), re;
  }
  function re(f) {
    return _(f) ? B(e, se, "linePrefix", r.parser.constructs.disable.null.includes("codeIndented") ? void 0 : 4)(f) : se(f);
  }
  function se(f) {
    return e.enter("htmlTextData"), o(f);
  }
}
const zn = {
  name: "labelEnd",
  resolveAll: Hl,
  resolveTo: Ul,
  tokenize: Vl
}, Ml = {
  tokenize: ql
}, Bl = {
  tokenize: $l
}, jl = {
  tokenize: Wl
};
function Hl(e) {
  let n = -1;
  const t = [];
  for (; ++n < e.length; ) {
    const r = e[n][1];
    if (t.push(e[n]), r.type === "labelImage" || r.type === "labelLink" || r.type === "labelEnd") {
      const i = r.type === "labelImage" ? 4 : 2;
      r.type = "data", n += i;
    }
  }
  return e.length !== t.length && de(e, 0, e.length, t), e;
}
function Ul(e, n) {
  let t = e.length, r = 0, i, l, o, a;
  for (; t--; )
    if (i = e[t][1], l) {
      if (i.type === "link" || i.type === "labelLink" && i._inactive)
        break;
      e[t][0] === "enter" && i.type === "labelLink" && (i._inactive = !0);
    } else if (o) {
      if (e[t][0] === "enter" && (i.type === "labelImage" || i.type === "labelLink") && !i._balanced && (l = t, i.type !== "labelLink")) {
        r = 2;
        break;
      }
    } else i.type === "labelEnd" && (o = t);
  const c = {
    type: e[l][1].type === "labelLink" ? "link" : "image",
    start: {
      ...e[l][1].start
    },
    end: {
      ...e[e.length - 1][1].end
    }
  }, u = {
    type: "label",
    start: {
      ...e[l][1].start
    },
    end: {
      ...e[o][1].end
    }
  }, s = {
    type: "labelText",
    start: {
      ...e[l + r + 2][1].end
    },
    end: {
      ...e[o - 2][1].start
    }
  };
  return a = [["enter", c, n], ["enter", u, n]], a = te(a, e.slice(l + 1, l + r + 3)), a = te(a, [["enter", s, n]]), a = te(a, wn(n.parser.constructs.insideSpan.null, e.slice(l + r + 4, o - 3), n)), a = te(a, [["exit", s, n], e[o - 2], e[o - 1], ["exit", u, n]]), a = te(a, e.slice(o + 1)), a = te(a, [["exit", c, n]]), de(e, l, e.length, a), e;
}
function Vl(e, n, t) {
  const r = this;
  let i = r.events.length, l, o;
  for (; i--; )
    if ((r.events[i][1].type === "labelImage" || r.events[i][1].type === "labelLink") && !r.events[i][1]._balanced) {
      l = r.events[i][1];
      break;
    }
  return a;
  function a(d) {
    return l ? l._inactive ? h(d) : (o = r.parser.defined.includes(Ie(r.sliceSerialize({
      start: l.end,
      end: r.now()
    }))), e.enter("labelEnd"), e.enter("labelMarker"), e.consume(d), e.exit("labelMarker"), e.exit("labelEnd"), c) : t(d);
  }
  function c(d) {
    return d === 40 ? e.attempt(Ml, s, o ? s : h)(d) : d === 91 ? e.attempt(Bl, s, o ? u : h)(d) : o ? s(d) : h(d);
  }
  function u(d) {
    return e.attempt(jl, s, h)(d);
  }
  function s(d) {
    return n(d);
  }
  function h(d) {
    return l._balanced = !0, t(d);
  }
}
function ql(e, n, t) {
  return r;
  function r(h) {
    return e.enter("resource"), e.enter("resourceMarker"), e.consume(h), e.exit("resourceMarker"), i;
  }
  function i(h) {
    return ne(h) ? Re(e, l)(h) : l(h);
  }
  function l(h) {
    return h === 41 ? s(h) : Kt(e, o, a, "resourceDestination", "resourceDestinationLiteral", "resourceDestinationLiteralMarker", "resourceDestinationRaw", "resourceDestinationString", 32)(h);
  }
  function o(h) {
    return ne(h) ? Re(e, c)(h) : s(h);
  }
  function a(h) {
    return t(h);
  }
  function c(h) {
    return h === 34 || h === 39 || h === 40 ? er(e, u, t, "resourceTitle", "resourceTitleMarker", "resourceTitleString")(h) : s(h);
  }
  function u(h) {
    return ne(h) ? Re(e, s)(h) : s(h);
  }
  function s(h) {
    return h === 41 ? (e.enter("resourceMarker"), e.consume(h), e.exit("resourceMarker"), e.exit("resource"), n) : t(h);
  }
}
function $l(e, n, t) {
  const r = this;
  return i;
  function i(a) {
    return Zt.call(r, e, l, o, "reference", "referenceMarker", "referenceString")(a);
  }
  function l(a) {
    return r.parser.defined.includes(Ie(r.sliceSerialize(r.events[r.events.length - 1][1]).slice(1, -1))) ? n(a) : t(a);
  }
  function o(a) {
    return t(a);
  }
}
function Wl(e, n, t) {
  return r;
  function r(l) {
    return e.enter("reference"), e.enter("referenceMarker"), e.consume(l), e.exit("referenceMarker"), i;
  }
  function i(l) {
    return l === 93 ? (e.enter("referenceMarker"), e.consume(l), e.exit("referenceMarker"), e.exit("reference"), n) : t(l);
  }
}
const Yl = {
  name: "labelStartImage",
  resolveAll: zn.resolveAll,
  tokenize: Xl
};
function Xl(e, n, t) {
  const r = this;
  return i;
  function i(a) {
    return e.enter("labelImage"), e.enter("labelImageMarker"), e.consume(a), e.exit("labelImageMarker"), l;
  }
  function l(a) {
    return a === 91 ? (e.enter("labelMarker"), e.consume(a), e.exit("labelMarker"), e.exit("labelImage"), o) : t(a);
  }
  function o(a) {
    return a === 94 && "_hiddenFootnoteSupport" in r.parser.constructs ? t(a) : n(a);
  }
}
const Ql = {
  name: "labelStartLink",
  resolveAll: zn.resolveAll,
  tokenize: Gl
};
function Gl(e, n, t) {
  const r = this;
  return i;
  function i(o) {
    return e.enter("labelLink"), e.enter("labelMarker"), e.consume(o), e.exit("labelMarker"), e.exit("labelLink"), l;
  }
  function l(o) {
    return o === 94 && "_hiddenFootnoteSupport" in r.parser.constructs ? t(o) : n(o);
  }
}
const nn = {
  name: "lineEnding",
  tokenize: Jl
};
function Jl(e, n) {
  return t;
  function t(r) {
    return e.enter("lineEnding"), e.consume(r), e.exit("lineEnding"), B(e, n, "linePrefix");
  }
}
const qe = {
  name: "thematicBreak",
  tokenize: Kl
};
function Kl(e, n, t) {
  let r = 0, i;
  return l;
  function l(u) {
    return e.enter("thematicBreak"), o(u);
  }
  function o(u) {
    return i = u, a(u);
  }
  function a(u) {
    return u === i ? (e.enter("thematicBreakSequence"), c(u)) : r >= 3 && (u === null || T(u)) ? (e.exit("thematicBreak"), n(u)) : t(u);
  }
  function c(u) {
    return u === i ? (e.consume(u), r++, c) : (e.exit("thematicBreakSequence"), _(u) ? B(e, a, "whitespace")(u) : a(u));
  }
}
const G = {
  continuation: {
    tokenize: to
  },
  exit: io,
  name: "list",
  tokenize: no
}, Zl = {
  partial: !0,
  tokenize: lo
}, eo = {
  partial: !0,
  tokenize: ro
};
function no(e, n, t) {
  const r = this, i = r.events[r.events.length - 1];
  let l = i && i[1].type === "linePrefix" ? i[2].sliceSerialize(i[1], !0).length : 0, o = 0;
  return a;
  function a(p) {
    const x = r.containerState.type || (p === 42 || p === 43 || p === 45 ? "listUnordered" : "listOrdered");
    if (x === "listUnordered" ? !r.containerState.marker || p === r.containerState.marker : pn(p)) {
      if (r.containerState.type || (r.containerState.type = x, e.enter(x, {
        _container: !0
      })), x === "listUnordered")
        return e.enter("listItemPrefix"), p === 42 || p === 45 ? e.check(qe, t, u)(p) : u(p);
      if (!r.interrupt || p === 49)
        return e.enter("listItemPrefix"), e.enter("listItemValue"), c(p);
    }
    return t(p);
  }
  function c(p) {
    return pn(p) && ++o < 10 ? (e.consume(p), c) : (!r.interrupt || o < 2) && (r.containerState.marker ? p === r.containerState.marker : p === 41 || p === 46) ? (e.exit("listItemValue"), u(p)) : t(p);
  }
  function u(p) {
    return e.enter("listItemMarker"), e.consume(p), e.exit("listItemMarker"), r.containerState.marker = r.containerState.marker || p, e.check(
      Qe,
      // Can’t be empty when interrupting.
      r.interrupt ? t : s,
      e.attempt(Zl, d, h)
    );
  }
  function s(p) {
    return r.containerState.initialBlankLine = !0, l++, d(p);
  }
  function h(p) {
    return _(p) ? (e.enter("listItemPrefixWhitespace"), e.consume(p), e.exit("listItemPrefixWhitespace"), d) : t(p);
  }
  function d(p) {
    return r.containerState.size = l + r.sliceSerialize(e.exit("listItemPrefix"), !0).length, n(p);
  }
}
function to(e, n, t) {
  const r = this;
  return r.containerState._closeFlow = void 0, e.check(Qe, i, l);
  function i(a) {
    return r.containerState.furtherBlankLines = r.containerState.furtherBlankLines || r.containerState.initialBlankLine, B(e, n, "listItemIndent", r.containerState.size + 1)(a);
  }
  function l(a) {
    return r.containerState.furtherBlankLines || !_(a) ? (r.containerState.furtherBlankLines = void 0, r.containerState.initialBlankLine = void 0, o(a)) : (r.containerState.furtherBlankLines = void 0, r.containerState.initialBlankLine = void 0, e.attempt(eo, n, o)(a));
  }
  function o(a) {
    return r.containerState._closeFlow = !0, r.interrupt = void 0, B(e, e.attempt(G, n, t), "linePrefix", r.parser.constructs.disable.null.includes("codeIndented") ? void 0 : 4)(a);
  }
}
function ro(e, n, t) {
  const r = this;
  return B(e, i, "listItemIndent", r.containerState.size + 1);
  function i(l) {
    const o = r.events[r.events.length - 1];
    return o && o[1].type === "listItemIndent" && o[2].sliceSerialize(o[1], !0).length === r.containerState.size ? n(l) : t(l);
  }
}
function io(e) {
  e.exit(this.containerState.type);
}
function lo(e, n, t) {
  const r = this;
  return B(e, i, "listItemPrefixWhitespace", r.parser.constructs.disable.null.includes("codeIndented") ? void 0 : 5);
  function i(l) {
    const o = r.events[r.events.length - 1];
    return !_(l) && o && o[1].type === "listItemPrefixWhitespace" ? n(l) : t(l);
  }
}
const st = {
  name: "setextUnderline",
  resolveTo: oo,
  tokenize: ao
};
function oo(e, n) {
  let t = e.length, r, i, l;
  for (; t--; )
    if (e[t][0] === "enter") {
      if (e[t][1].type === "content") {
        r = t;
        break;
      }
      e[t][1].type === "paragraph" && (i = t);
    } else
      e[t][1].type === "content" && e.splice(t, 1), !l && e[t][1].type === "definition" && (l = t);
  const o = {
    type: "setextHeading",
    start: {
      ...e[r][1].start
    },
    end: {
      ...e[e.length - 1][1].end
    }
  };
  return e[i][1].type = "setextHeadingText", l ? (e.splice(i, 0, ["enter", o, n]), e.splice(l + 1, 0, ["exit", e[r][1], n]), e[r][1].end = {
    ...e[l][1].end
  }) : e[r][1] = o, e.push(["exit", o, n]), e;
}
function ao(e, n, t) {
  const r = this;
  let i;
  return l;
  function l(u) {
    let s = r.events.length, h;
    for (; s--; )
      if (r.events[s][1].type !== "lineEnding" && r.events[s][1].type !== "linePrefix" && r.events[s][1].type !== "content") {
        h = r.events[s][1].type === "paragraph";
        break;
      }
    return !r.parser.lazy[r.now().line] && (r.interrupt || h) ? (e.enter("setextHeadingLine"), i = u, o(u)) : t(u);
  }
  function o(u) {
    return e.enter("setextHeadingLineSequence"), a(u);
  }
  function a(u) {
    return u === i ? (e.consume(u), a) : (e.exit("setextHeadingLineSequence"), _(u) ? B(e, c, "lineSuffix")(u) : c(u));
  }
  function c(u) {
    return u === null || T(u) ? (e.exit("setextHeadingLine"), n(u)) : t(u);
  }
}
const uo = {
  tokenize: so
};
function so(e) {
  const n = this, t = e.attempt(
    // Try to parse a blank line.
    Qe,
    r,
    // Try to parse initial flow (essentially, only code).
    e.attempt(this.parser.constructs.flowInitial, i, B(e, e.attempt(this.parser.constructs.flow, i, e.attempt(ml, i)), "linePrefix"))
  );
  return t;
  function r(l) {
    if (l === null) {
      e.consume(l);
      return;
    }
    return e.enter("lineEndingBlank"), e.consume(l), e.exit("lineEndingBlank"), n.currentConstruct = void 0, t;
  }
  function i(l) {
    if (l === null) {
      e.consume(l);
      return;
    }
    return e.enter("lineEnding"), e.consume(l), e.exit("lineEnding"), n.currentConstruct = void 0, t;
  }
}
const co = {
  resolveAll: tr()
}, po = nr("string"), ho = nr("text");
function nr(e) {
  return {
    resolveAll: tr(e === "text" ? fo : void 0),
    tokenize: n
  };
  function n(t) {
    const r = this, i = this.parser.constructs[e], l = t.attempt(i, o, a);
    return o;
    function o(s) {
      return u(s) ? l(s) : a(s);
    }
    function a(s) {
      if (s === null) {
        t.consume(s);
        return;
      }
      return t.enter("data"), t.consume(s), c;
    }
    function c(s) {
      return u(s) ? (t.exit("data"), l(s)) : (t.consume(s), c);
    }
    function u(s) {
      if (s === null)
        return !0;
      const h = i[s];
      let d = -1;
      if (h)
        for (; ++d < h.length; ) {
          const p = h[d];
          if (!p.previous || p.previous.call(r, r.previous))
            return !0;
        }
      return !1;
    }
  }
}
function tr(e) {
  return n;
  function n(t, r) {
    let i = -1, l;
    for (; ++i <= t.length; )
      l === void 0 ? t[i] && t[i][1].type === "data" && (l = i, i++) : (!t[i] || t[i][1].type !== "data") && (i !== l + 2 && (t[l][1].end = t[i - 1][1].end, t.splice(l + 2, i - l - 2), i = l + 2), l = void 0);
    return e ? e(t, r) : t;
  }
}
function fo(e, n) {
  let t = 0;
  for (; ++t <= e.length; )
    if ((t === e.length || e[t][1].type === "lineEnding") && e[t - 1][1].type === "data") {
      const r = e[t - 1][1], i = n.sliceStream(r);
      let l = i.length, o = -1, a = 0, c;
      for (; l--; ) {
        const u = i[l];
        if (typeof u == "string") {
          for (o = u.length; u.charCodeAt(o - 1) === 32; )
            a++, o--;
          if (o) break;
          o = -1;
        } else if (u === -2)
          c = !0, a++;
        else if (u !== -1) {
          l++;
          break;
        }
      }
      if (n._contentTypeTextTrailing && t === e.length && (a = 0), a) {
        const u = {
          type: t === e.length || c || a < 2 ? "lineSuffix" : "hardBreakTrailing",
          start: {
            _bufferIndex: l ? o : r.start._bufferIndex + o,
            _index: r.start._index + l,
            line: r.end.line,
            column: r.end.column - a,
            offset: r.end.offset - a
          },
          end: {
            ...r.end
          }
        };
        r.end = {
          ...u.start
        }, r.start.offset === r.end.offset ? Object.assign(r, u) : (e.splice(t, 0, ["enter", u, n], ["exit", u, n]), t += 2);
      }
      t++;
    }
  return e;
}
const mo = {
  42: G,
  43: G,
  45: G,
  48: G,
  49: G,
  50: G,
  51: G,
  52: G,
  53: G,
  54: G,
  55: G,
  56: G,
  57: G,
  62: Xt
}, go = {
  91: kl
}, yo = {
  [-2]: en,
  [-1]: en,
  32: en
}, xo = {
  35: Il,
  42: qe,
  45: [st, qe],
  60: vl,
  61: st,
  95: qe,
  96: at,
  126: at
}, ko = {
  38: Gt,
  92: Qt
}, bo = {
  [-5]: nn,
  [-4]: nn,
  [-3]: nn,
  33: Yl,
  38: Gt,
  42: yn,
  60: [Gi, Fl],
  91: Ql,
  92: [El, Qt],
  93: zn,
  95: yn,
  96: ul
}, wo = {
  null: [yn, co]
}, So = {
  null: [42, 95]
}, Eo = {
  null: []
}, Co = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  attentionMarkers: So,
  contentInitial: go,
  disable: Eo,
  document: mo,
  flow: xo,
  flowInitial: yo,
  insideSpan: wo,
  string: ko,
  text: bo
}, Symbol.toStringTag, { value: "Module" }));
function Io(e, n, t) {
  let r = {
    _bufferIndex: -1,
    _index: 0,
    line: t && t.line || 1,
    column: t && t.column || 1,
    offset: t && t.offset || 0
  };
  const i = {}, l = [];
  let o = [], a = [];
  const c = {
    attempt: O(U),
    check: O(y),
    consume: L,
    enter: E,
    exit: j,
    interrupt: O(y, {
      interrupt: !0
    })
  }, u = {
    code: null,
    containerState: {},
    defineSkip: b,
    events: [],
    now: x,
    parser: e,
    previous: null,
    sliceSerialize: d,
    sliceStream: p,
    write: h
  };
  let s = n.tokenize.call(u, c);
  return n.resolveAll && l.push(n), u;
  function h(I) {
    return o = te(o, I), A(), o[o.length - 1] !== null ? [] : (V(n, 0), u.events = wn(l, u.events, u), u.events);
  }
  function d(I, C) {
    return Po(p(I), C);
  }
  function p(I) {
    return To(o, I);
  }
  function x() {
    const {
      _bufferIndex: I,
      _index: C,
      line: H,
      column: q,
      offset: D
    } = r;
    return {
      _bufferIndex: I,
      _index: C,
      line: H,
      column: q,
      offset: D
    };
  }
  function b(I) {
    i[I.line] = I.column, M();
  }
  function A() {
    let I;
    for (; r._index < o.length; ) {
      const C = o[r._index];
      if (typeof C == "string")
        for (I = r._index, r._bufferIndex < 0 && (r._bufferIndex = 0); r._index === I && r._bufferIndex < C.length; )
          S(C.charCodeAt(r._bufferIndex));
      else
        S(C);
    }
  }
  function S(I) {
    s = s(I);
  }
  function L(I) {
    T(I) ? (r.line++, r.column = 1, r.offset += I === -3 ? 2 : 1, M()) : I !== -1 && (r.column++, r.offset++), r._bufferIndex < 0 ? r._index++ : (r._bufferIndex++, r._bufferIndex === // Points w/ non-negative `_bufferIndex` reference
    // strings.
    /** @type {string} */
    o[r._index].length && (r._bufferIndex = -1, r._index++)), u.previous = I;
  }
  function E(I, C) {
    const H = C || {};
    return H.type = I, H.start = x(), u.events.push(["enter", H, u]), a.push(H), H;
  }
  function j(I) {
    const C = a.pop();
    return C.end = x(), u.events.push(["exit", C, u]), C;
  }
  function U(I, C) {
    V(I, C.from);
  }
  function y(I, C) {
    C.restore();
  }
  function O(I, C) {
    return H;
    function H(q, D, X) {
      let W, re, se, f;
      return Array.isArray(q) ? (
        /* c8 ignore next 1 */
        ce(q)
      ) : "tokenize" in q ? (
        // Looks like a construct.
        ce([
          /** @type {Construct} */
          q
        ])
      ) : ie(q);
      function ie(Y) {
        return Ae;
        function Ae(fe) {
          const we = fe !== null && Y[fe], Se = fe !== null && Y.null, je = [
            // To do: add more extension tests.
            /* c8 ignore next 2 */
            ...Array.isArray(we) ? we : we ? [we] : [],
            ...Array.isArray(Se) ? Se : Se ? [Se] : []
          ];
          return ce(je)(fe);
        }
      }
      function ce(Y) {
        return W = Y, re = 0, Y.length === 0 ? X : m(Y[re]);
      }
      function m(Y) {
        return Ae;
        function Ae(fe) {
          return f = R(), se = Y, Y.partial || (u.currentConstruct = Y), Y.name && u.parser.constructs.disable.null.includes(Y.name) ? ge() : Y.tokenize.call(
            // If we do have fields, create an object w/ `context` as its
            // prototype.
            // This allows a “live binding”, which is needed for `interrupt`.
            C ? Object.assign(Object.create(u), C) : u,
            c,
            le,
            ge
          )(fe);
        }
      }
      function le(Y) {
        return I(se, f), D;
      }
      function ge(Y) {
        return f.restore(), ++re < W.length ? m(W[re]) : X;
      }
    }
  }
  function V(I, C) {
    I.resolveAll && !l.includes(I) && l.push(I), I.resolve && de(u.events, C, u.events.length - C, I.resolve(u.events.slice(C), u)), I.resolveTo && (u.events = I.resolveTo(u.events, u));
  }
  function R() {
    const I = x(), C = u.previous, H = u.currentConstruct, q = u.events.length, D = Array.from(a);
    return {
      from: q,
      restore: X
    };
    function X() {
      r = I, u.previous = C, u.currentConstruct = H, u.events.length = q, a = D, M();
    }
  }
  function M() {
    r.line in i && r.column < 2 && (r.column = i[r.line], r.offset += i[r.line] - 1);
  }
}
function To(e, n) {
  const t = n.start._index, r = n.start._bufferIndex, i = n.end._index, l = n.end._bufferIndex;
  let o;
  if (t === i)
    o = [e[t].slice(r, l)];
  else {
    if (o = e.slice(t, i), r > -1) {
      const a = o[0];
      typeof a == "string" ? o[0] = a.slice(r) : o.shift();
    }
    l > 0 && o.push(e[i].slice(0, l));
  }
  return o;
}
function Po(e, n) {
  let t = -1;
  const r = [];
  let i;
  for (; ++t < e.length; ) {
    const l = e[t];
    let o;
    if (typeof l == "string")
      o = l;
    else switch (l) {
      case -5: {
        o = "\r";
        break;
      }
      case -4: {
        o = `
`;
        break;
      }
      case -3: {
        o = `\r
`;
        break;
      }
      case -2: {
        o = n ? " " : "	";
        break;
      }
      case -1: {
        if (!n && i) continue;
        o = " ";
        break;
      }
      default:
        o = String.fromCharCode(l);
    }
    i = l === -2, r.push(o);
  }
  return r.join("");
}
function Ao(e) {
  const r = {
    constructs: (
      /** @type {FullNormalizedExtension} */
      Cr([Co, ...(e || {}).extensions || []])
    ),
    content: i(Vi),
    defined: [],
    document: i($i),
    flow: i(uo),
    lazy: {},
    string: i(po),
    text: i(ho)
  };
  return r;
  function i(l) {
    return o;
    function o(a) {
      return Io(r, l, a);
    }
  }
}
function vo(e) {
  for (; !Jt(e); )
    ;
  return e;
}
const ct = /[\0\t\n\r]/g;
function zo() {
  let e = 1, n = "", t = !0, r;
  return i;
  function i(l, o, a) {
    const c = [];
    let u, s, h, d, p;
    for (l = n + (typeof l == "string" ? l.toString() : new TextDecoder(o || void 0).decode(l)), h = 0, n = "", t && (l.charCodeAt(0) === 65279 && h++, t = void 0); h < l.length; ) {
      if (ct.lastIndex = h, u = ct.exec(l), d = u && u.index !== void 0 ? u.index : l.length, p = l.charCodeAt(d), !u) {
        n = l.slice(h);
        break;
      }
      if (p === 10 && h === d && r)
        c.push(-3), r = void 0;
      else
        switch (r && (c.push(-5), r = void 0), h < d && (c.push(l.slice(h, d)), e += d - h), p) {
          case 0: {
            c.push(65533), e++;
            break;
          }
          case 9: {
            for (s = Math.ceil(e / 4) * 4, c.push(-2); e++ < s; ) c.push(-1);
            break;
          }
          case 10: {
            c.push(-4), e = 1;
            break;
          }
          default:
            r = !0, e = 1;
        }
      h = d + 1;
    }
    return a && (r && c.push(-5), n && c.push(n), c.push(null)), c;
  }
}
const Lo = /\\([!-/:-@[-`{-~])|&(#(?:\d{1,7}|x[\da-f]{1,6})|[\da-z]{1,31});/gi;
function Do(e) {
  return e.replace(Lo, Oo);
}
function Oo(e, n, t) {
  if (n)
    return n;
  if (t.charCodeAt(0) === 35) {
    const i = t.charCodeAt(1), l = i === 120 || i === 88;
    return Yt(t.slice(l ? 2 : 1), l ? 16 : 10);
  }
  return vn(t) || e;
}
const rr = {}.hasOwnProperty;
function _o(e, n, t) {
  return n && typeof n == "object" && (t = n, n = void 0), Ro(t)(vo(Ao(t).document().write(zo()(e, n, !0))));
}
function Ro(e) {
  const n = {
    transforms: [],
    canContainEols: ["emphasis", "fragment", "heading", "paragraph", "strong"],
    enter: {
      autolink: l(Un),
      autolinkProtocol: R,
      autolinkEmail: R,
      atxHeading: l(Bn),
      blockQuote: l(Se),
      characterEscape: R,
      characterReference: R,
      codeFenced: l(je),
      codeFencedFenceInfo: o,
      codeFencedFenceMeta: o,
      codeIndented: l(je, o),
      codeText: l(hr, o),
      codeTextData: R,
      data: R,
      codeFlowValue: R,
      definition: l(fr),
      definitionDestinationString: o,
      definitionLabelString: o,
      definitionTitleString: o,
      emphasis: l(mr),
      hardBreakEscape: l(jn),
      hardBreakTrailing: l(jn),
      htmlFlow: l(Hn, o),
      htmlFlowData: R,
      htmlText: l(Hn, o),
      htmlTextData: R,
      image: l(dr),
      label: o,
      link: l(Un),
      listItem: l(gr),
      listItemValue: d,
      listOrdered: l(Vn, h),
      listUnordered: l(Vn),
      paragraph: l(yr),
      reference: m,
      referenceString: o,
      resourceDestinationString: o,
      resourceTitleString: o,
      setextHeading: l(Bn),
      strong: l(xr),
      thematicBreak: l(br)
    },
    exit: {
      atxHeading: c(),
      atxHeadingSequence: U,
      autolink: c(),
      autolinkEmail: we,
      autolinkProtocol: fe,
      blockQuote: c(),
      characterEscapeValue: M,
      characterReferenceMarkerHexadecimal: ge,
      characterReferenceMarkerNumeric: ge,
      characterReferenceValue: Y,
      characterReference: Ae,
      codeFenced: c(A),
      codeFencedFence: b,
      codeFencedFenceInfo: p,
      codeFencedFenceMeta: x,
      codeFlowValue: M,
      codeIndented: c(S),
      codeText: c(D),
      codeTextData: M,
      data: M,
      definition: c(),
      definitionDestinationString: j,
      definitionLabelString: L,
      definitionTitleString: E,
      emphasis: c(),
      hardBreakEscape: c(C),
      hardBreakTrailing: c(C),
      htmlFlow: c(H),
      htmlFlowData: M,
      htmlText: c(q),
      htmlTextData: M,
      image: c(W),
      label: se,
      labelText: re,
      lineEnding: I,
      link: c(X),
      listItem: c(),
      listOrdered: c(),
      listUnordered: c(),
      paragraph: c(),
      referenceString: le,
      resourceDestinationString: f,
      resourceTitleString: ie,
      resource: ce,
      setextHeading: c(V),
      setextHeadingLineSequence: O,
      setextHeadingText: y,
      strong: c(),
      thematicBreak: c()
    }
  };
  ir(n, (e || {}).mdastExtensions || []);
  const t = {};
  return r;
  function r(g) {
    let w = {
      type: "root",
      children: []
    };
    const v = {
      stack: [w],
      tokenStack: [],
      config: n,
      enter: a,
      exit: u,
      buffer: o,
      resume: s,
      data: t
    }, z = [];
    let F = -1;
    for (; ++F < g.length; )
      if (g[F][1].type === "listOrdered" || g[F][1].type === "listUnordered")
        if (g[F][0] === "enter")
          z.push(F);
        else {
          const oe = z.pop();
          F = i(g, oe, F);
        }
    for (F = -1; ++F < g.length; ) {
      const oe = n[g[F][0]];
      rr.call(oe, g[F][1].type) && oe[g[F][1].type].call(Object.assign({
        sliceSerialize: g[F][2].sliceSerialize
      }, v), g[F][1]);
    }
    if (v.tokenStack.length > 0) {
      const oe = v.tokenStack[v.tokenStack.length - 1];
      (oe[1] || pt).call(v, void 0, oe[0]);
    }
    for (w.position = {
      start: me(g.length > 0 ? g[0][1].start : {
        line: 1,
        column: 1,
        offset: 0
      }),
      end: me(g.length > 0 ? g[g.length - 2][1].end : {
        line: 1,
        column: 1,
        offset: 0
      })
    }, F = -1; ++F < n.transforms.length; )
      w = n.transforms[F](w) || w;
    return w;
  }
  function i(g, w, v) {
    let z = w - 1, F = -1, oe = !1, ye, pe, ve, ze;
    for (; ++z <= v; ) {
      const K = g[z];
      switch (K[1].type) {
        case "listUnordered":
        case "listOrdered":
        case "blockQuote": {
          K[0] === "enter" ? F++ : F--, ze = void 0;
          break;
        }
        case "lineEndingBlank": {
          K[0] === "enter" && (ye && !ze && !F && !ve && (ve = z), ze = void 0);
          break;
        }
        case "linePrefix":
        case "listItemValue":
        case "listItemMarker":
        case "listItemPrefix":
        case "listItemPrefixWhitespace":
          break;
        default:
          ze = void 0;
      }
      if (!F && K[0] === "enter" && K[1].type === "listItemPrefix" || F === -1 && K[0] === "exit" && (K[1].type === "listUnordered" || K[1].type === "listOrdered")) {
        if (ye) {
          let Ee = z;
          for (pe = void 0; Ee--; ) {
            const he = g[Ee];
            if (he[1].type === "lineEnding" || he[1].type === "lineEndingBlank") {
              if (he[0] === "exit") continue;
              pe && (g[pe][1].type = "lineEndingBlank", oe = !0), he[1].type = "lineEnding", pe = Ee;
            } else if (!(he[1].type === "linePrefix" || he[1].type === "blockQuotePrefix" || he[1].type === "blockQuotePrefixWhitespace" || he[1].type === "blockQuoteMarker" || he[1].type === "listItemIndent")) break;
          }
          ve && (!pe || ve < pe) && (ye._spread = !0), ye.end = Object.assign({}, pe ? g[pe][1].start : K[1].end), g.splice(pe || z, 0, ["exit", ye, K[2]]), z++, v++;
        }
        if (K[1].type === "listItemPrefix") {
          const Ee = {
            type: "listItem",
            _spread: !1,
            start: Object.assign({}, K[1].start),
            // @ts-expect-error: we’ll add `end` in a second.
            end: void 0
          };
          ye = Ee, g.splice(z, 0, ["enter", Ee, K[2]]), z++, v++, ve = void 0, ze = !0;
        }
      }
    }
    return g[w][1]._spread = oe, v;
  }
  function l(g, w) {
    return v;
    function v(z) {
      a.call(this, g(z), z), w && w.call(this, z);
    }
  }
  function o() {
    this.stack.push({
      type: "fragment",
      children: []
    });
  }
  function a(g, w, v) {
    this.stack[this.stack.length - 1].children.push(g), this.stack.push(g), this.tokenStack.push([w, v || void 0]), g.position = {
      start: me(w.start),
      // @ts-expect-error: `end` will be patched later.
      end: void 0
    };
  }
  function c(g) {
    return w;
    function w(v) {
      g && g.call(this, v), u.call(this, v);
    }
  }
  function u(g, w) {
    const v = this.stack.pop(), z = this.tokenStack.pop();
    if (z)
      z[0].type !== g.type && (w ? w.call(this, g, z[0]) : (z[1] || pt).call(this, g, z[0]));
    else throw new Error("Cannot close `" + g.type + "` (" + _e({
      start: g.start,
      end: g.end
    }) + "): it’s not open");
    v.position.end = me(g.end);
  }
  function s() {
    return Ir(this.stack.pop());
  }
  function h() {
    this.data.expectingFirstListItemValue = !0;
  }
  function d(g) {
    if (this.data.expectingFirstListItemValue) {
      const w = this.stack[this.stack.length - 2];
      w.start = Number.parseInt(this.sliceSerialize(g), 10), this.data.expectingFirstListItemValue = void 0;
    }
  }
  function p() {
    const g = this.resume(), w = this.stack[this.stack.length - 1];
    w.lang = g;
  }
  function x() {
    const g = this.resume(), w = this.stack[this.stack.length - 1];
    w.meta = g;
  }
  function b() {
    this.data.flowCodeInside || (this.buffer(), this.data.flowCodeInside = !0);
  }
  function A() {
    const g = this.resume(), w = this.stack[this.stack.length - 1];
    w.value = g.replace(/^(\r?\n|\r)|(\r?\n|\r)$/g, ""), this.data.flowCodeInside = void 0;
  }
  function S() {
    const g = this.resume(), w = this.stack[this.stack.length - 1];
    w.value = g.replace(/(\r?\n|\r)$/g, "");
  }
  function L(g) {
    const w = this.resume(), v = this.stack[this.stack.length - 1];
    v.label = w, v.identifier = Ie(this.sliceSerialize(g)).toLowerCase();
  }
  function E() {
    const g = this.resume(), w = this.stack[this.stack.length - 1];
    w.title = g;
  }
  function j() {
    const g = this.resume(), w = this.stack[this.stack.length - 1];
    w.url = g;
  }
  function U(g) {
    const w = this.stack[this.stack.length - 1];
    if (!w.depth) {
      const v = this.sliceSerialize(g).length;
      w.depth = v;
    }
  }
  function y() {
    this.data.setextHeadingSlurpLineEnding = !0;
  }
  function O(g) {
    const w = this.stack[this.stack.length - 1];
    w.depth = this.sliceSerialize(g).codePointAt(0) === 61 ? 1 : 2;
  }
  function V() {
    this.data.setextHeadingSlurpLineEnding = void 0;
  }
  function R(g) {
    const v = this.stack[this.stack.length - 1].children;
    let z = v[v.length - 1];
    (!z || z.type !== "text") && (z = kr(), z.position = {
      start: me(g.start),
      // @ts-expect-error: we’ll add `end` later.
      end: void 0
    }, v.push(z)), this.stack.push(z);
  }
  function M(g) {
    const w = this.stack.pop();
    w.value += this.sliceSerialize(g), w.position.end = me(g.end);
  }
  function I(g) {
    const w = this.stack[this.stack.length - 1];
    if (this.data.atHardBreak) {
      const v = w.children[w.children.length - 1];
      v.position.end = me(g.end), this.data.atHardBreak = void 0;
      return;
    }
    !this.data.setextHeadingSlurpLineEnding && n.canContainEols.includes(w.type) && (R.call(this, g), M.call(this, g));
  }
  function C() {
    this.data.atHardBreak = !0;
  }
  function H() {
    const g = this.resume(), w = this.stack[this.stack.length - 1];
    w.value = g;
  }
  function q() {
    const g = this.resume(), w = this.stack[this.stack.length - 1];
    w.value = g;
  }
  function D() {
    const g = this.resume(), w = this.stack[this.stack.length - 1];
    w.value = g;
  }
  function X() {
    const g = this.stack[this.stack.length - 1];
    if (this.data.inReference) {
      const w = this.data.referenceType || "shortcut";
      g.type += "Reference", g.referenceType = w, delete g.url, delete g.title;
    } else
      delete g.identifier, delete g.label;
    this.data.referenceType = void 0;
  }
  function W() {
    const g = this.stack[this.stack.length - 1];
    if (this.data.inReference) {
      const w = this.data.referenceType || "shortcut";
      g.type += "Reference", g.referenceType = w, delete g.url, delete g.title;
    } else
      delete g.identifier, delete g.label;
    this.data.referenceType = void 0;
  }
  function re(g) {
    const w = this.sliceSerialize(g), v = this.stack[this.stack.length - 2];
    v.label = Do(w), v.identifier = Ie(w).toLowerCase();
  }
  function se() {
    const g = this.stack[this.stack.length - 1], w = this.resume(), v = this.stack[this.stack.length - 1];
    if (this.data.inReference = !0, v.type === "link") {
      const z = g.children;
      v.children = z;
    } else
      v.alt = w;
  }
  function f() {
    const g = this.resume(), w = this.stack[this.stack.length - 1];
    w.url = g;
  }
  function ie() {
    const g = this.resume(), w = this.stack[this.stack.length - 1];
    w.title = g;
  }
  function ce() {
    this.data.inReference = void 0;
  }
  function m() {
    this.data.referenceType = "collapsed";
  }
  function le(g) {
    const w = this.resume(), v = this.stack[this.stack.length - 1];
    v.label = w, v.identifier = Ie(this.sliceSerialize(g)).toLowerCase(), this.data.referenceType = "full";
  }
  function ge(g) {
    this.data.characterReferenceType = g.type;
  }
  function Y(g) {
    const w = this.sliceSerialize(g), v = this.data.characterReferenceType;
    let z;
    v ? (z = Yt(w, v === "characterReferenceMarkerNumeric" ? 10 : 16), this.data.characterReferenceType = void 0) : z = vn(w);
    const F = this.stack[this.stack.length - 1];
    F.value += z;
  }
  function Ae(g) {
    const w = this.stack.pop();
    w.position.end = me(g.end);
  }
  function fe(g) {
    M.call(this, g);
    const w = this.stack[this.stack.length - 1];
    w.url = this.sliceSerialize(g);
  }
  function we(g) {
    M.call(this, g);
    const w = this.stack[this.stack.length - 1];
    w.url = "mailto:" + this.sliceSerialize(g);
  }
  function Se() {
    return {
      type: "blockquote",
      children: []
    };
  }
  function je() {
    return {
      type: "code",
      lang: null,
      meta: null,
      value: ""
    };
  }
  function hr() {
    return {
      type: "inlineCode",
      value: ""
    };
  }
  function fr() {
    return {
      type: "definition",
      identifier: "",
      label: null,
      title: null,
      url: ""
    };
  }
  function mr() {
    return {
      type: "emphasis",
      children: []
    };
  }
  function Bn() {
    return {
      type: "heading",
      // @ts-expect-error `depth` will be set later.
      depth: 0,
      children: []
    };
  }
  function jn() {
    return {
      type: "break"
    };
  }
  function Hn() {
    return {
      type: "html",
      value: ""
    };
  }
  function dr() {
    return {
      type: "image",
      title: null,
      url: "",
      alt: null
    };
  }
  function Un() {
    return {
      type: "link",
      title: null,
      url: "",
      children: []
    };
  }
  function Vn(g) {
    return {
      type: "list",
      ordered: g.type === "listOrdered",
      start: null,
      spread: g._spread,
      children: []
    };
  }
  function gr(g) {
    return {
      type: "listItem",
      spread: g._spread,
      checked: null,
      children: []
    };
  }
  function yr() {
    return {
      type: "paragraph",
      children: []
    };
  }
  function xr() {
    return {
      type: "strong",
      children: []
    };
  }
  function kr() {
    return {
      type: "text",
      value: ""
    };
  }
  function br() {
    return {
      type: "thematicBreak"
    };
  }
}
function me(e) {
  return {
    line: e.line,
    column: e.column,
    offset: e.offset
  };
}
function ir(e, n) {
  let t = -1;
  for (; ++t < n.length; ) {
    const r = n[t];
    Array.isArray(r) ? ir(e, r) : Fo(e, r);
  }
}
function Fo(e, n) {
  let t;
  for (t in n)
    if (rr.call(n, t))
      switch (t) {
        case "canContainEols": {
          const r = n[t];
          r && e[t].push(...r);
          break;
        }
        case "transforms": {
          const r = n[t];
          r && e[t].push(...r);
          break;
        }
        case "enter":
        case "exit": {
          const r = n[t];
          r && Object.assign(e[t], r);
          break;
        }
      }
}
function pt(e, n) {
  throw e ? new Error("Cannot close `" + e.type + "` (" + _e({
    start: e.start,
    end: e.end
  }) + "): a different token (`" + n.type + "`, " + _e({
    start: n.start,
    end: n.end
  }) + ") is open") : new Error("Cannot close document, a token (`" + n.type + "`, " + _e({
    start: n.start,
    end: n.end
  }) + ") is still open");
}
function No(e) {
  const n = this;
  n.parser = t;
  function t(r) {
    return _o(r, {
      ...n.data("settings"),
      ...e,
      // Note: these options are not in the readme.
      // The goal is for them to be set by plugins on `data` instead of being
      // passed by users.
      extensions: n.data("micromarkExtensions") || [],
      mdastExtensions: n.data("fromMarkdownExtensions") || []
    });
  }
}
function Mo(e, n) {
  const t = {
    type: "element",
    tagName: "blockquote",
    properties: {},
    children: e.wrap(e.all(n), !0)
  };
  return e.patch(n, t), e.applyData(n, t);
}
function Bo(e, n) {
  const t = { type: "element", tagName: "br", properties: {}, children: [] };
  return e.patch(n, t), [e.applyData(n, t), { type: "text", value: `
` }];
}
function jo(e, n) {
  const t = n.value ? n.value + `
` : "", r = {}, i = n.lang ? n.lang.split(/\s+/) : [];
  i.length > 0 && (r.className = ["language-" + i[0]]);
  let l = {
    type: "element",
    tagName: "code",
    properties: r,
    children: [{ type: "text", value: t }]
  };
  return n.meta && (l.data = { meta: n.meta }), e.patch(n, l), l = e.applyData(n, l), l = { type: "element", tagName: "pre", properties: {}, children: [l] }, e.patch(n, l), l;
}
function Ho(e, n) {
  const t = {
    type: "element",
    tagName: "del",
    properties: {},
    children: e.all(n)
  };
  return e.patch(n, t), e.applyData(n, t);
}
function Uo(e, n) {
  const t = {
    type: "element",
    tagName: "em",
    properties: {},
    children: e.all(n)
  };
  return e.patch(n, t), e.applyData(n, t);
}
function Vo(e, n) {
  const t = typeof e.options.clobberPrefix == "string" ? e.options.clobberPrefix : "user-content-", r = String(n.identifier).toUpperCase(), i = Pe(r.toLowerCase()), l = e.footnoteOrder.indexOf(r);
  let o, a = e.footnoteCounts.get(r);
  a === void 0 ? (a = 0, e.footnoteOrder.push(r), o = e.footnoteOrder.length) : o = l + 1, a += 1, e.footnoteCounts.set(r, a);
  const c = {
    type: "element",
    tagName: "a",
    properties: {
      href: "#" + t + "fn-" + i,
      id: t + "fnref-" + i + (a > 1 ? "-" + a : ""),
      dataFootnoteRef: !0,
      ariaDescribedBy: ["footnote-label"]
    },
    children: [{ type: "text", value: String(o) }]
  };
  e.patch(n, c);
  const u = {
    type: "element",
    tagName: "sup",
    properties: {},
    children: [c]
  };
  return e.patch(n, u), e.applyData(n, u);
}
function qo(e, n) {
  const t = {
    type: "element",
    tagName: "h" + n.depth,
    properties: {},
    children: e.all(n)
  };
  return e.patch(n, t), e.applyData(n, t);
}
function $o(e, n) {
  if (e.options.allowDangerousHtml) {
    const t = { type: "raw", value: n.value };
    return e.patch(n, t), e.applyData(n, t);
  }
}
function lr(e, n) {
  const t = n.referenceType;
  let r = "]";
  if (t === "collapsed" ? r += "[]" : t === "full" && (r += "[" + (n.label || n.identifier) + "]"), n.type === "imageReference")
    return [{ type: "text", value: "![" + n.alt + r }];
  const i = e.all(n), l = i[0];
  l && l.type === "text" ? l.value = "[" + l.value : i.unshift({ type: "text", value: "[" });
  const o = i[i.length - 1];
  return o && o.type === "text" ? o.value += r : i.push({ type: "text", value: r }), i;
}
function Wo(e, n) {
  const t = String(n.identifier).toUpperCase(), r = e.definitionById.get(t);
  if (!r)
    return lr(e, n);
  const i = { src: Pe(r.url || ""), alt: n.alt };
  r.title !== null && r.title !== void 0 && (i.title = r.title);
  const l = { type: "element", tagName: "img", properties: i, children: [] };
  return e.patch(n, l), e.applyData(n, l);
}
function Yo(e, n) {
  const t = { src: Pe(n.url) };
  n.alt !== null && n.alt !== void 0 && (t.alt = n.alt), n.title !== null && n.title !== void 0 && (t.title = n.title);
  const r = { type: "element", tagName: "img", properties: t, children: [] };
  return e.patch(n, r), e.applyData(n, r);
}
function Xo(e, n) {
  const t = { type: "text", value: n.value.replace(/\r?\n|\r/g, " ") };
  e.patch(n, t);
  const r = {
    type: "element",
    tagName: "code",
    properties: {},
    children: [t]
  };
  return e.patch(n, r), e.applyData(n, r);
}
function Qo(e, n) {
  const t = String(n.identifier).toUpperCase(), r = e.definitionById.get(t);
  if (!r)
    return lr(e, n);
  const i = { href: Pe(r.url || "") };
  r.title !== null && r.title !== void 0 && (i.title = r.title);
  const l = {
    type: "element",
    tagName: "a",
    properties: i,
    children: e.all(n)
  };
  return e.patch(n, l), e.applyData(n, l);
}
function Go(e, n) {
  const t = { href: Pe(n.url) };
  n.title !== null && n.title !== void 0 && (t.title = n.title);
  const r = {
    type: "element",
    tagName: "a",
    properties: t,
    children: e.all(n)
  };
  return e.patch(n, r), e.applyData(n, r);
}
function Jo(e, n, t) {
  const r = e.all(n), i = t ? Ko(t) : or(n), l = {}, o = [];
  if (typeof n.checked == "boolean") {
    const s = r[0];
    let h;
    s && s.type === "element" && s.tagName === "p" ? h = s : (h = { type: "element", tagName: "p", properties: {}, children: [] }, r.unshift(h)), h.children.length > 0 && h.children.unshift({ type: "text", value: " " }), h.children.unshift({
      type: "element",
      tagName: "input",
      properties: { type: "checkbox", checked: n.checked, disabled: !0 },
      children: []
    }), l.className = ["task-list-item"];
  }
  let a = -1;
  for (; ++a < r.length; ) {
    const s = r[a];
    (i || a !== 0 || s.type !== "element" || s.tagName !== "p") && o.push({ type: "text", value: `
` }), s.type === "element" && s.tagName === "p" && !i ? o.push(...s.children) : o.push(s);
  }
  const c = r[r.length - 1];
  c && (i || c.type !== "element" || c.tagName !== "p") && o.push({ type: "text", value: `
` });
  const u = { type: "element", tagName: "li", properties: l, children: o };
  return e.patch(n, u), e.applyData(n, u);
}
function Ko(e) {
  let n = !1;
  if (e.type === "list") {
    n = e.spread || !1;
    const t = e.children;
    let r = -1;
    for (; !n && ++r < t.length; )
      n = or(t[r]);
  }
  return n;
}
function or(e) {
  const n = e.spread;
  return n ?? e.children.length > 1;
}
function Zo(e, n) {
  const t = {}, r = e.all(n);
  let i = -1;
  for (typeof n.start == "number" && n.start !== 1 && (t.start = n.start); ++i < r.length; ) {
    const o = r[i];
    if (o.type === "element" && o.tagName === "li" && o.properties && Array.isArray(o.properties.className) && o.properties.className.includes("task-list-item")) {
      t.className = ["contains-task-list"];
      break;
    }
  }
  const l = {
    type: "element",
    tagName: n.ordered ? "ol" : "ul",
    properties: t,
    children: e.wrap(r, !0)
  };
  return e.patch(n, l), e.applyData(n, l);
}
function ea(e, n) {
  const t = {
    type: "element",
    tagName: "p",
    properties: {},
    children: e.all(n)
  };
  return e.patch(n, t), e.applyData(n, t);
}
function na(e, n) {
  const t = { type: "root", children: e.wrap(e.all(n)) };
  return e.patch(n, t), e.applyData(n, t);
}
function ta(e, n) {
  const t = {
    type: "element",
    tagName: "strong",
    properties: {},
    children: e.all(n)
  };
  return e.patch(n, t), e.applyData(n, t);
}
function ra(e, n) {
  const t = e.all(n), r = t.shift(), i = [];
  if (r) {
    const o = {
      type: "element",
      tagName: "thead",
      properties: {},
      children: e.wrap([r], !0)
    };
    e.patch(n.children[0], o), i.push(o);
  }
  if (t.length > 0) {
    const o = {
      type: "element",
      tagName: "tbody",
      properties: {},
      children: e.wrap(t, !0)
    }, a = In(n.children[1]), c = Ht(n.children[n.children.length - 1]);
    a && c && (o.position = { start: a, end: c }), i.push(o);
  }
  const l = {
    type: "element",
    tagName: "table",
    properties: {},
    children: e.wrap(i, !0)
  };
  return e.patch(n, l), e.applyData(n, l);
}
function ia(e, n, t) {
  const r = t ? t.children : void 0, l = (r ? r.indexOf(n) : 1) === 0 ? "th" : "td", o = t && t.type === "table" ? t.align : void 0, a = o ? o.length : n.children.length;
  let c = -1;
  const u = [];
  for (; ++c < a; ) {
    const h = n.children[c], d = {}, p = o ? o[c] : void 0;
    p && (d.align = p);
    let x = { type: "element", tagName: l, properties: d, children: [] };
    h && (x.children = e.all(h), e.patch(h, x), x = e.applyData(h, x)), u.push(x);
  }
  const s = {
    type: "element",
    tagName: "tr",
    properties: {},
    children: e.wrap(u, !0)
  };
  return e.patch(n, s), e.applyData(n, s);
}
function la(e, n) {
  const t = {
    type: "element",
    tagName: "td",
    // Assume body cell.
    properties: {},
    children: e.all(n)
  };
  return e.patch(n, t), e.applyData(n, t);
}
const ht = 9, ft = 32;
function oa(e) {
  const n = String(e), t = /\r?\n|\r/g;
  let r = t.exec(n), i = 0;
  const l = [];
  for (; r; )
    l.push(
      mt(n.slice(i, r.index), i > 0, !0),
      r[0]
    ), i = r.index + r[0].length, r = t.exec(n);
  return l.push(mt(n.slice(i), i > 0, !1)), l.join("");
}
function mt(e, n, t) {
  let r = 0, i = e.length;
  if (n) {
    let l = e.codePointAt(r);
    for (; l === ht || l === ft; )
      r++, l = e.codePointAt(r);
  }
  if (t) {
    let l = e.codePointAt(i - 1);
    for (; l === ht || l === ft; )
      i--, l = e.codePointAt(i - 1);
  }
  return i > r ? e.slice(r, i) : "";
}
function aa(e, n) {
  const t = { type: "text", value: oa(String(n.value)) };
  return e.patch(n, t), e.applyData(n, t);
}
function ua(e, n) {
  const t = {
    type: "element",
    tagName: "hr",
    properties: {},
    children: []
  };
  return e.patch(n, t), e.applyData(n, t);
}
const sa = {
  blockquote: Mo,
  break: Bo,
  code: jo,
  delete: Ho,
  emphasis: Uo,
  footnoteReference: Vo,
  heading: qo,
  html: $o,
  imageReference: Wo,
  image: Yo,
  inlineCode: Xo,
  linkReference: Qo,
  link: Go,
  listItem: Jo,
  list: Zo,
  paragraph: ea,
  // @ts-expect-error: root is different, but hard to type.
  root: na,
  strong: ta,
  table: ra,
  tableCell: la,
  tableRow: ia,
  text: aa,
  thematicBreak: ua,
  toml: He,
  yaml: He,
  definition: He,
  footnoteDefinition: He
};
function He() {
}
const ar = -1, Je = 0, Fe = 1, Ye = 2, Ln = 3, Dn = 4, On = 5, _n = 6, ur = 7, sr = 8, ca = typeof self == "object" ? self : globalThis, dt = (e, n) => {
  switch (e) {
    case "Function":
    case "SharedWorker":
    case "Worker":
    case "eval":
    case "setInterval":
    case "setTimeout":
      throw new TypeError("unable to deserialize " + e);
  }
  return new ca[e](n);
}, pa = (e, n) => {
  const t = (i, l) => (e.set(l, i), i), r = (i) => {
    if (e.has(i))
      return e.get(i);
    const [l, o] = n[i];
    switch (l) {
      case Je:
      case ar:
        return t(o, i);
      case Fe: {
        const a = t([], i);
        for (const c of o)
          a.push(r(c));
        return a;
      }
      case Ye: {
        const a = t({}, i);
        for (const [c, u] of o)
          a[r(c)] = r(u);
        return a;
      }
      case Ln:
        return t(new Date(o), i);
      case Dn: {
        const { source: a, flags: c } = o;
        return t(new RegExp(a, c), i);
      }
      case On: {
        const a = t(/* @__PURE__ */ new Map(), i);
        for (const [c, u] of o)
          a.set(r(c), r(u));
        return a;
      }
      case _n: {
        const a = t(/* @__PURE__ */ new Set(), i);
        for (const c of o)
          a.add(r(c));
        return a;
      }
      case ur: {
        const { name: a, message: c } = o;
        return t(dt(a, c), i);
      }
      case sr:
        return t(BigInt(o), i);
      case "BigInt":
        return t(Object(BigInt(o)), i);
      case "ArrayBuffer":
        return t(new Uint8Array(o).buffer, o);
      case "DataView": {
        const { buffer: a } = new Uint8Array(o);
        return t(new DataView(a), o);
      }
    }
    return t(dt(l, o), i);
  };
  return r;
}, gt = (e) => pa(/* @__PURE__ */ new Map(), e)(0), Ce = "", { toString: ha } = {}, { keys: fa } = Object, De = (e) => {
  const n = typeof e;
  if (n !== "object" || !e)
    return [Je, n];
  const t = ha.call(e).slice(8, -1);
  switch (t) {
    case "Array":
      return [Fe, Ce];
    case "Object":
      return [Ye, Ce];
    case "Date":
      return [Ln, Ce];
    case "RegExp":
      return [Dn, Ce];
    case "Map":
      return [On, Ce];
    case "Set":
      return [_n, Ce];
    case "DataView":
      return [Fe, t];
  }
  return t.includes("Array") ? [Fe, t] : t.includes("Error") ? [ur, t] : [Ye, t];
}, Ue = ([e, n]) => e === Je && (n === "function" || n === "symbol"), ma = (e, n, t, r) => {
  const i = (o, a) => {
    const c = r.push(o) - 1;
    return t.set(a, c), c;
  }, l = (o) => {
    if (t.has(o))
      return t.get(o);
    let [a, c] = De(o);
    switch (a) {
      case Je: {
        let s = o;
        switch (c) {
          case "bigint":
            a = sr, s = o.toString();
            break;
          case "function":
          case "symbol":
            if (e)
              throw new TypeError("unable to serialize " + c);
            s = null;
            break;
          case "undefined":
            return i([ar], o);
        }
        return i([a, s], o);
      }
      case Fe: {
        if (c) {
          let d = o;
          return c === "DataView" ? d = new Uint8Array(o.buffer) : c === "ArrayBuffer" && (d = new Uint8Array(o)), i([c, [...d]], o);
        }
        const s = [], h = i([a, s], o);
        for (const d of o)
          s.push(l(d));
        return h;
      }
      case Ye: {
        if (c)
          switch (c) {
            case "BigInt":
              return i([c, o.toString()], o);
            case "Boolean":
            case "Number":
            case "String":
              return i([c, o.valueOf()], o);
          }
        if (n && "toJSON" in o)
          return l(o.toJSON());
        const s = [], h = i([a, s], o);
        for (const d of fa(o))
          (e || !Ue(De(o[d]))) && s.push([l(d), l(o[d])]);
        return h;
      }
      case Ln:
        return i([a, o.toISOString()], o);
      case Dn: {
        const { source: s, flags: h } = o;
        return i([a, { source: s, flags: h }], o);
      }
      case On: {
        const s = [], h = i([a, s], o);
        for (const [d, p] of o)
          (e || !(Ue(De(d)) || Ue(De(p)))) && s.push([l(d), l(p)]);
        return h;
      }
      case _n: {
        const s = [], h = i([a, s], o);
        for (const d of o)
          (e || !Ue(De(d))) && s.push(l(d));
        return h;
      }
    }
    const { message: u } = o;
    return i([a, { name: c, message: u }], o);
  };
  return l;
}, yt = (e, { json: n, lossy: t } = {}) => {
  const r = [];
  return ma(!(n || t), !!n, /* @__PURE__ */ new Map(), r)(e), r;
}, Xe = typeof structuredClone == "function" ? (
  /* c8 ignore start */
  (e, n) => n && ("json" in n || "lossy" in n) ? gt(yt(e, n)) : structuredClone(e)
) : (e, n) => gt(yt(e, n));
function da(e, n) {
  const t = [{ type: "text", value: "↩" }];
  return n > 1 && t.push({
    type: "element",
    tagName: "sup",
    properties: {},
    children: [{ type: "text", value: String(n) }]
  }), t;
}
function ga(e, n) {
  return "Back to reference " + (e + 1) + (n > 1 ? "-" + n : "");
}
function ya(e) {
  const n = typeof e.options.clobberPrefix == "string" ? e.options.clobberPrefix : "user-content-", t = e.options.footnoteBackContent || da, r = e.options.footnoteBackLabel || ga, i = e.options.footnoteLabel || "Footnotes", l = e.options.footnoteLabelTagName || "h2", o = e.options.footnoteLabelProperties || {
    className: ["sr-only"]
  }, a = [];
  let c = -1;
  for (; ++c < e.footnoteOrder.length; ) {
    const u = e.footnoteById.get(
      e.footnoteOrder[c]
    );
    if (!u)
      continue;
    const s = e.all(u), h = String(u.identifier).toUpperCase(), d = Pe(h.toLowerCase());
    let p = 0;
    const x = [], b = e.footnoteCounts.get(h);
    for (; b !== void 0 && ++p <= b; ) {
      x.length > 0 && x.push({ type: "text", value: " " });
      let L = typeof t == "string" ? t : t(c, p);
      typeof L == "string" && (L = { type: "text", value: L }), x.push({
        type: "element",
        tagName: "a",
        properties: {
          href: "#" + n + "fnref-" + d + (p > 1 ? "-" + p : ""),
          dataFootnoteBackref: "",
          ariaLabel: typeof r == "string" ? r : r(c, p),
          className: ["data-footnote-backref"]
        },
        children: Array.isArray(L) ? L : [L]
      });
    }
    const A = s[s.length - 1];
    if (A && A.type === "element" && A.tagName === "p") {
      const L = A.children[A.children.length - 1];
      L && L.type === "text" ? L.value += " " : A.children.push({ type: "text", value: " " }), A.children.push(...x);
    } else
      s.push(...x);
    const S = {
      type: "element",
      tagName: "li",
      properties: { id: n + "fn-" + d },
      children: e.wrap(s, !0)
    };
    e.patch(u, S), a.push(S);
  }
  if (a.length !== 0)
    return {
      type: "element",
      tagName: "section",
      properties: { dataFootnotes: !0, className: ["footnotes"] },
      children: [
        {
          type: "element",
          tagName: l,
          properties: {
            ...Xe(o),
            id: "footnote-label"
          },
          children: [{ type: "text", value: i }]
        },
        { type: "text", value: `
` },
        {
          type: "element",
          tagName: "ol",
          properties: {},
          children: e.wrap(a, !0)
        },
        { type: "text", value: `
` }
      ]
    };
}
const xn = {}.hasOwnProperty, xa = {};
function ka(e, n) {
  const t = n || xa, r = /* @__PURE__ */ new Map(), i = /* @__PURE__ */ new Map(), l = /* @__PURE__ */ new Map(), o = { ...sa, ...t.handlers }, a = {
    all: u,
    applyData: wa,
    definitionById: r,
    footnoteById: i,
    footnoteCounts: l,
    footnoteOrder: [],
    handlers: o,
    one: c,
    options: t,
    patch: ba,
    wrap: Ea
  };
  return Dt(e, function(s) {
    if (s.type === "definition" || s.type === "footnoteDefinition") {
      const h = s.type === "definition" ? r : i, d = String(s.identifier).toUpperCase();
      h.has(d) || h.set(d, s);
    }
  }), a;
  function c(s, h) {
    const d = s.type, p = a.handlers[d];
    if (xn.call(a.handlers, d) && p)
      return p(a, s, h);
    if (a.options.passThrough && a.options.passThrough.includes(d)) {
      if ("children" in s) {
        const { children: b, ...A } = s, S = Xe(A);
        return S.children = a.all(s), S;
      }
      return Xe(s);
    }
    return (a.options.unknownHandler || Sa)(a, s, h);
  }
  function u(s) {
    const h = [];
    if ("children" in s) {
      const d = s.children;
      let p = -1;
      for (; ++p < d.length; ) {
        const x = a.one(d[p], s);
        if (x) {
          if (p && d[p - 1].type === "break" && (!Array.isArray(x) && x.type === "text" && (x.value = xt(x.value)), !Array.isArray(x) && x.type === "element")) {
            const b = x.children[0];
            b && b.type === "text" && (b.value = xt(b.value));
          }
          Array.isArray(x) ? h.push(...x) : h.push(x);
        }
      }
    }
    return h;
  }
}
function ba(e, n) {
  e.position && (n.position = Si(e));
}
function wa(e, n) {
  let t = n;
  if (e && e.data) {
    const r = e.data.hName, i = e.data.hChildren, l = e.data.hProperties;
    if (typeof r == "string")
      if (t.type === "element")
        t.tagName = r;
      else {
        const o = "children" in t ? t.children : [t];
        t = { type: "element", tagName: r, properties: {}, children: o };
      }
    t.type === "element" && l && Object.assign(t.properties, Xe(l)), "children" in t && t.children && i !== null && i !== void 0 && (t.children = i);
  }
  return t;
}
function Sa(e, n) {
  const t = n.data || {}, r = "value" in n && !(xn.call(t, "hProperties") || xn.call(t, "hChildren")) ? { type: "text", value: n.value } : {
    type: "element",
    tagName: "div",
    properties: {},
    children: e.all(n)
  };
  return e.patch(n, r), e.applyData(n, r);
}
function Ea(e, n) {
  const t = [];
  let r = -1;
  for (n && t.push({ type: "text", value: `
` }); ++r < e.length; )
    r && t.push({ type: "text", value: `
` }), t.push(e[r]);
  return n && e.length > 0 && t.push({ type: "text", value: `
` }), t;
}
function xt(e) {
  let n = 0, t = e.charCodeAt(n);
  for (; t === 9 || t === 32; )
    n++, t = e.charCodeAt(n);
  return e.slice(n);
}
function kt(e, n) {
  const t = ka(e, n), r = t.one(e, void 0), i = ya(t), l = Array.isArray(r) ? { type: "root", children: r } : r || { type: "root", children: [] };
  return i && l.children.push({ type: "text", value: `
` }, i), l;
}
function Ca(e, n) {
  return e && "run" in e ? async function(t, r) {
    const i = (
      /** @type {HastRoot} */
      kt(t, { file: r, ...n })
    );
    await e.run(i, r);
  } : function(t, r) {
    return (
      /** @type {HastRoot} */
      kt(t, { file: r, ...e || n })
    );
  };
}
function bt(e) {
  if (e)
    throw e;
}
var $e = Object.prototype.hasOwnProperty, cr = Object.prototype.toString, wt = Object.defineProperty, St = Object.getOwnPropertyDescriptor, Et = function(n) {
  return typeof Array.isArray == "function" ? Array.isArray(n) : cr.call(n) === "[object Array]";
}, Ct = function(n) {
  if (!n || cr.call(n) !== "[object Object]")
    return !1;
  var t = $e.call(n, "constructor"), r = n.constructor && n.constructor.prototype && $e.call(n.constructor.prototype, "isPrototypeOf");
  if (n.constructor && !t && !r)
    return !1;
  var i;
  for (i in n)
    ;
  return typeof i > "u" || $e.call(n, i);
}, It = function(n, t) {
  wt && t.name === "__proto__" ? wt(n, t.name, {
    enumerable: !0,
    configurable: !0,
    value: t.newValue,
    writable: !0
  }) : n[t.name] = t.newValue;
}, Tt = function(n, t) {
  if (t === "__proto__")
    if ($e.call(n, t)) {
      if (St)
        return St(n, t).value;
    } else return;
  return n[t];
}, Ia = function e() {
  var n, t, r, i, l, o, a = arguments[0], c = 1, u = arguments.length, s = !1;
  for (typeof a == "boolean" && (s = a, a = arguments[1] || {}, c = 2), (a == null || typeof a != "object" && typeof a != "function") && (a = {}); c < u; ++c)
    if (n = arguments[c], n != null)
      for (t in n)
        r = Tt(a, t), i = Tt(n, t), a !== i && (s && i && (Ct(i) || (l = Et(i))) ? (l ? (l = !1, o = r && Et(r) ? r : []) : o = r && Ct(r) ? r : {}, It(a, { name: t, newValue: e(s, o, i) })) : typeof i < "u" && It(a, { name: t, newValue: i }));
  return a;
};
const tn = /* @__PURE__ */ jt(Ia);
function kn(e) {
  if (typeof e != "object" || e === null)
    return !1;
  const n = Object.getPrototypeOf(e);
  return (n === null || n === Object.prototype || Object.getPrototypeOf(n) === null) && !(Symbol.toStringTag in e) && !(Symbol.iterator in e);
}
function Ta() {
  const e = [], n = { run: t, use: r };
  return n;
  function t(...i) {
    let l = -1;
    const o = i.pop();
    if (typeof o != "function")
      throw new TypeError("Expected function as last argument, not " + o);
    a(null, ...i);
    function a(c, ...u) {
      const s = e[++l];
      let h = -1;
      if (c) {
        o(c);
        return;
      }
      for (; ++h < i.length; )
        (u[h] === null || u[h] === void 0) && (u[h] = i[h]);
      i = u, s ? Pa(s, a)(...u) : o(null, ...u);
    }
  }
  function r(i) {
    if (typeof i != "function")
      throw new TypeError(
        "Expected `middelware` to be a function, not " + i
      );
    return e.push(i), n;
  }
}
function Pa(e, n) {
  let t;
  return r;
  function r(...o) {
    const a = e.length > o.length;
    let c;
    a && o.push(i);
    try {
      c = e.apply(this, o);
    } catch (u) {
      const s = (
        /** @type {Error} */
        u
      );
      if (a && t)
        throw s;
      return i(s);
    }
    a || (c && c.then && typeof c.then == "function" ? c.then(l, i) : c instanceof Error ? i(c) : l(c));
  }
  function i(o, ...a) {
    t || (t = !0, n(o, ...a));
  }
  function l(o) {
    i(null, o);
  }
}
const ae = { basename: Aa, dirname: va, extname: za, join: La, sep: "/" };
function Aa(e, n) {
  if (n !== void 0 && typeof n != "string")
    throw new TypeError('"ext" argument must be a string');
  Be(e);
  let t = 0, r = -1, i = e.length, l;
  if (n === void 0 || n.length === 0 || n.length > e.length) {
    for (; i--; )
      if (e.codePointAt(i) === 47) {
        if (l) {
          t = i + 1;
          break;
        }
      } else r < 0 && (l = !0, r = i + 1);
    return r < 0 ? "" : e.slice(t, r);
  }
  if (n === e)
    return "";
  let o = -1, a = n.length - 1;
  for (; i--; )
    if (e.codePointAt(i) === 47) {
      if (l) {
        t = i + 1;
        break;
      }
    } else
      o < 0 && (l = !0, o = i + 1), a > -1 && (e.codePointAt(i) === n.codePointAt(a--) ? a < 0 && (r = i) : (a = -1, r = o));
  return t === r ? r = o : r < 0 && (r = e.length), e.slice(t, r);
}
function va(e) {
  if (Be(e), e.length === 0)
    return ".";
  let n = -1, t = e.length, r;
  for (; --t; )
    if (e.codePointAt(t) === 47) {
      if (r) {
        n = t;
        break;
      }
    } else r || (r = !0);
  return n < 0 ? e.codePointAt(0) === 47 ? "/" : "." : n === 1 && e.codePointAt(0) === 47 ? "//" : e.slice(0, n);
}
function za(e) {
  Be(e);
  let n = e.length, t = -1, r = 0, i = -1, l = 0, o;
  for (; n--; ) {
    const a = e.codePointAt(n);
    if (a === 47) {
      if (o) {
        r = n + 1;
        break;
      }
      continue;
    }
    t < 0 && (o = !0, t = n + 1), a === 46 ? i < 0 ? i = n : l !== 1 && (l = 1) : i > -1 && (l = -1);
  }
  return i < 0 || t < 0 || // We saw a non-dot character immediately before the dot.
  l === 0 || // The (right-most) trimmed path component is exactly `..`.
  l === 1 && i === t - 1 && i === r + 1 ? "" : e.slice(i, t);
}
function La(...e) {
  let n = -1, t;
  for (; ++n < e.length; )
    Be(e[n]), e[n] && (t = t === void 0 ? e[n] : t + "/" + e[n]);
  return t === void 0 ? "." : Da(t);
}
function Da(e) {
  Be(e);
  const n = e.codePointAt(0) === 47;
  let t = Oa(e, !n);
  return t.length === 0 && !n && (t = "."), t.length > 0 && e.codePointAt(e.length - 1) === 47 && (t += "/"), n ? "/" + t : t;
}
function Oa(e, n) {
  let t = "", r = 0, i = -1, l = 0, o = -1, a, c;
  for (; ++o <= e.length; ) {
    if (o < e.length)
      a = e.codePointAt(o);
    else {
      if (a === 47)
        break;
      a = 47;
    }
    if (a === 47) {
      if (!(i === o - 1 || l === 1)) if (i !== o - 1 && l === 2) {
        if (t.length < 2 || r !== 2 || t.codePointAt(t.length - 1) !== 46 || t.codePointAt(t.length - 2) !== 46) {
          if (t.length > 2) {
            if (c = t.lastIndexOf("/"), c !== t.length - 1) {
              c < 0 ? (t = "", r = 0) : (t = t.slice(0, c), r = t.length - 1 - t.lastIndexOf("/")), i = o, l = 0;
              continue;
            }
          } else if (t.length > 0) {
            t = "", r = 0, i = o, l = 0;
            continue;
          }
        }
        n && (t = t.length > 0 ? t + "/.." : "..", r = 2);
      } else
        t.length > 0 ? t += "/" + e.slice(i + 1, o) : t = e.slice(i + 1, o), r = o - i - 1;
      i = o, l = 0;
    } else a === 46 && l > -1 ? l++ : l = -1;
  }
  return t;
}
function Be(e) {
  if (typeof e != "string")
    throw new TypeError(
      "Path must be a string. Received " + JSON.stringify(e)
    );
}
const _a = { cwd: Ra };
function Ra() {
  return "/";
}
function bn(e) {
  return !!(e !== null && typeof e == "object" && "href" in e && e.href && "protocol" in e && e.protocol && // @ts-expect-error: indexing is fine.
  e.auth === void 0);
}
function Fa(e) {
  if (typeof e == "string")
    e = new URL(e);
  else if (!bn(e)) {
    const n = new TypeError(
      'The "path" argument must be of type string or an instance of URL. Received `' + e + "`"
    );
    throw n.code = "ERR_INVALID_ARG_TYPE", n;
  }
  if (e.protocol !== "file:") {
    const n = new TypeError("The URL must be of scheme file");
    throw n.code = "ERR_INVALID_URL_SCHEME", n;
  }
  return Na(e);
}
function Na(e) {
  if (e.hostname !== "") {
    const r = new TypeError(
      'File URL host must be "localhost" or empty on darwin'
    );
    throw r.code = "ERR_INVALID_FILE_URL_HOST", r;
  }
  const n = e.pathname;
  let t = -1;
  for (; ++t < n.length; )
    if (n.codePointAt(t) === 37 && n.codePointAt(t + 1) === 50) {
      const r = n.codePointAt(t + 2);
      if (r === 70 || r === 102) {
        const i = new TypeError(
          "File URL path must not include encoded / characters"
        );
        throw i.code = "ERR_INVALID_FILE_URL_PATH", i;
      }
    }
  return decodeURIComponent(n);
}
const rn = (
  /** @type {const} */
  [
    "history",
    "path",
    "basename",
    "stem",
    "extname",
    "dirname"
  ]
);
class pr {
  /**
   * Create a new virtual file.
   *
   * `options` is treated as:
   *
   * *   `string` or `Uint8Array` — `{value: options}`
   * *   `URL` — `{path: options}`
   * *   `VFile` — shallow copies its data over to the new file
   * *   `object` — all fields are shallow copied over to the new file
   *
   * Path related fields are set in the following order (least specific to
   * most specific): `history`, `path`, `basename`, `stem`, `extname`,
   * `dirname`.
   *
   * You cannot set `dirname` or `extname` without setting either `history`,
   * `path`, `basename`, or `stem` too.
   *
   * @param {Compatible | null | undefined} [value]
   *   File value.
   * @returns
   *   New instance.
   */
  constructor(n) {
    let t;
    n ? bn(n) ? t = { path: n } : typeof n == "string" || Ma(n) ? t = { value: n } : t = n : t = {}, this.cwd = "cwd" in t ? "" : _a.cwd(), this.data = {}, this.history = [], this.messages = [], this.value, this.map, this.result, this.stored;
    let r = -1;
    for (; ++r < rn.length; ) {
      const l = rn[r];
      l in t && t[l] !== void 0 && t[l] !== null && (this[l] = l === "history" ? [...t[l]] : t[l]);
    }
    let i;
    for (i in t)
      rn.includes(i) || (this[i] = t[i]);
  }
  /**
   * Get the basename (including extname) (example: `'index.min.js'`).
   *
   * @returns {string | undefined}
   *   Basename.
   */
  get basename() {
    return typeof this.path == "string" ? ae.basename(this.path) : void 0;
  }
  /**
   * Set basename (including extname) (`'index.min.js'`).
   *
   * Cannot contain path separators (`'/'` on unix, macOS, and browsers, `'\'`
   * on windows).
   * Cannot be nullified (use `file.path = file.dirname` instead).
   *
   * @param {string} basename
   *   Basename.
   * @returns {undefined}
   *   Nothing.
   */
  set basename(n) {
    on(n, "basename"), ln(n, "basename"), this.path = ae.join(this.dirname || "", n);
  }
  /**
   * Get the parent path (example: `'~'`).
   *
   * @returns {string | undefined}
   *   Dirname.
   */
  get dirname() {
    return typeof this.path == "string" ? ae.dirname(this.path) : void 0;
  }
  /**
   * Set the parent path (example: `'~'`).
   *
   * Cannot be set if there’s no `path` yet.
   *
   * @param {string | undefined} dirname
   *   Dirname.
   * @returns {undefined}
   *   Nothing.
   */
  set dirname(n) {
    Pt(this.basename, "dirname"), this.path = ae.join(n || "", this.basename);
  }
  /**
   * Get the extname (including dot) (example: `'.js'`).
   *
   * @returns {string | undefined}
   *   Extname.
   */
  get extname() {
    return typeof this.path == "string" ? ae.extname(this.path) : void 0;
  }
  /**
   * Set the extname (including dot) (example: `'.js'`).
   *
   * Cannot contain path separators (`'/'` on unix, macOS, and browsers, `'\'`
   * on windows).
   * Cannot be set if there’s no `path` yet.
   *
   * @param {string | undefined} extname
   *   Extname.
   * @returns {undefined}
   *   Nothing.
   */
  set extname(n) {
    if (ln(n, "extname"), Pt(this.dirname, "extname"), n) {
      if (n.codePointAt(0) !== 46)
        throw new Error("`extname` must start with `.`");
      if (n.includes(".", 1))
        throw new Error("`extname` cannot contain multiple dots");
    }
    this.path = ae.join(this.dirname, this.stem + (n || ""));
  }
  /**
   * Get the full path (example: `'~/index.min.js'`).
   *
   * @returns {string}
   *   Path.
   */
  get path() {
    return this.history[this.history.length - 1];
  }
  /**
   * Set the full path (example: `'~/index.min.js'`).
   *
   * Cannot be nullified.
   * You can set a file URL (a `URL` object with a `file:` protocol) which will
   * be turned into a path with `url.fileURLToPath`.
   *
   * @param {URL | string} path
   *   Path.
   * @returns {undefined}
   *   Nothing.
   */
  set path(n) {
    bn(n) && (n = Fa(n)), on(n, "path"), this.path !== n && this.history.push(n);
  }
  /**
   * Get the stem (basename w/o extname) (example: `'index.min'`).
   *
   * @returns {string | undefined}
   *   Stem.
   */
  get stem() {
    return typeof this.path == "string" ? ae.basename(this.path, this.extname) : void 0;
  }
  /**
   * Set the stem (basename w/o extname) (example: `'index.min'`).
   *
   * Cannot contain path separators (`'/'` on unix, macOS, and browsers, `'\'`
   * on windows).
   * Cannot be nullified (use `file.path = file.dirname` instead).
   *
   * @param {string} stem
   *   Stem.
   * @returns {undefined}
   *   Nothing.
   */
  set stem(n) {
    on(n, "stem"), ln(n, "stem"), this.path = ae.join(this.dirname || "", n + (this.extname || ""));
  }
  // Normal prototypal methods.
  /**
   * Create a fatal message for `reason` associated with the file.
   *
   * The `fatal` field of the message is set to `true` (error; file not usable)
   * and the `file` field is set to the current file path.
   * The message is added to the `messages` field on `file`.
   *
   * > 🪦 **Note**: also has obsolete signatures.
   *
   * @overload
   * @param {string} reason
   * @param {MessageOptions | null | undefined} [options]
   * @returns {never}
   *
   * @overload
   * @param {string} reason
   * @param {Node | NodeLike | null | undefined} parent
   * @param {string | null | undefined} [origin]
   * @returns {never}
   *
   * @overload
   * @param {string} reason
   * @param {Point | Position | null | undefined} place
   * @param {string | null | undefined} [origin]
   * @returns {never}
   *
   * @overload
   * @param {string} reason
   * @param {string | null | undefined} [origin]
   * @returns {never}
   *
   * @overload
   * @param {Error | VFileMessage} cause
   * @param {Node | NodeLike | null | undefined} parent
   * @param {string | null | undefined} [origin]
   * @returns {never}
   *
   * @overload
   * @param {Error | VFileMessage} cause
   * @param {Point | Position | null | undefined} place
   * @param {string | null | undefined} [origin]
   * @returns {never}
   *
   * @overload
   * @param {Error | VFileMessage} cause
   * @param {string | null | undefined} [origin]
   * @returns {never}
   *
   * @param {Error | VFileMessage | string} causeOrReason
   *   Reason for message, should use markdown.
   * @param {Node | NodeLike | MessageOptions | Point | Position | string | null | undefined} [optionsOrParentOrPlace]
   *   Configuration (optional).
   * @param {string | null | undefined} [origin]
   *   Place in code where the message originates (example:
   *   `'my-package:my-rule'` or `'my-rule'`).
   * @returns {never}
   *   Never.
   * @throws {VFileMessage}
   *   Message.
   */
  fail(n, t, r) {
    const i = this.message(n, t, r);
    throw i.fatal = !0, i;
  }
  /**
   * Create an info message for `reason` associated with the file.
   *
   * The `fatal` field of the message is set to `undefined` (info; change
   * likely not needed) and the `file` field is set to the current file path.
   * The message is added to the `messages` field on `file`.
   *
   * > 🪦 **Note**: also has obsolete signatures.
   *
   * @overload
   * @param {string} reason
   * @param {MessageOptions | null | undefined} [options]
   * @returns {VFileMessage}
   *
   * @overload
   * @param {string} reason
   * @param {Node | NodeLike | null | undefined} parent
   * @param {string | null | undefined} [origin]
   * @returns {VFileMessage}
   *
   * @overload
   * @param {string} reason
   * @param {Point | Position | null | undefined} place
   * @param {string | null | undefined} [origin]
   * @returns {VFileMessage}
   *
   * @overload
   * @param {string} reason
   * @param {string | null | undefined} [origin]
   * @returns {VFileMessage}
   *
   * @overload
   * @param {Error | VFileMessage} cause
   * @param {Node | NodeLike | null | undefined} parent
   * @param {string | null | undefined} [origin]
   * @returns {VFileMessage}
   *
   * @overload
   * @param {Error | VFileMessage} cause
   * @param {Point | Position | null | undefined} place
   * @param {string | null | undefined} [origin]
   * @returns {VFileMessage}
   *
   * @overload
   * @param {Error | VFileMessage} cause
   * @param {string | null | undefined} [origin]
   * @returns {VFileMessage}
   *
   * @param {Error | VFileMessage | string} causeOrReason
   *   Reason for message, should use markdown.
   * @param {Node | NodeLike | MessageOptions | Point | Position | string | null | undefined} [optionsOrParentOrPlace]
   *   Configuration (optional).
   * @param {string | null | undefined} [origin]
   *   Place in code where the message originates (example:
   *   `'my-package:my-rule'` or `'my-rule'`).
   * @returns {VFileMessage}
   *   Message.
   */
  info(n, t, r) {
    const i = this.message(n, t, r);
    return i.fatal = void 0, i;
  }
  /**
   * Create a message for `reason` associated with the file.
   *
   * The `fatal` field of the message is set to `false` (warning; change may be
   * needed) and the `file` field is set to the current file path.
   * The message is added to the `messages` field on `file`.
   *
   * > 🪦 **Note**: also has obsolete signatures.
   *
   * @overload
   * @param {string} reason
   * @param {MessageOptions | null | undefined} [options]
   * @returns {VFileMessage}
   *
   * @overload
   * @param {string} reason
   * @param {Node | NodeLike | null | undefined} parent
   * @param {string | null | undefined} [origin]
   * @returns {VFileMessage}
   *
   * @overload
   * @param {string} reason
   * @param {Point | Position | null | undefined} place
   * @param {string | null | undefined} [origin]
   * @returns {VFileMessage}
   *
   * @overload
   * @param {string} reason
   * @param {string | null | undefined} [origin]
   * @returns {VFileMessage}
   *
   * @overload
   * @param {Error | VFileMessage} cause
   * @param {Node | NodeLike | null | undefined} parent
   * @param {string | null | undefined} [origin]
   * @returns {VFileMessage}
   *
   * @overload
   * @param {Error | VFileMessage} cause
   * @param {Point | Position | null | undefined} place
   * @param {string | null | undefined} [origin]
   * @returns {VFileMessage}
   *
   * @overload
   * @param {Error | VFileMessage} cause
   * @param {string | null | undefined} [origin]
   * @returns {VFileMessage}
   *
   * @param {Error | VFileMessage | string} causeOrReason
   *   Reason for message, should use markdown.
   * @param {Node | NodeLike | MessageOptions | Point | Position | string | null | undefined} [optionsOrParentOrPlace]
   *   Configuration (optional).
   * @param {string | null | undefined} [origin]
   *   Place in code where the message originates (example:
   *   `'my-package:my-rule'` or `'my-rule'`).
   * @returns {VFileMessage}
   *   Message.
   */
  message(n, t, r) {
    const i = new Q(
      // @ts-expect-error: the overloads are fine.
      n,
      t,
      r
    );
    return this.path && (i.name = this.path + ":" + i.name, i.file = this.path), i.fatal = !1, this.messages.push(i), i;
  }
  /**
   * Serialize the file.
   *
   * > **Note**: which encodings are supported depends on the engine.
   * > For info on Node.js, see:
   * > <https://nodejs.org/api/util.html#whatwg-supported-encodings>.
   *
   * @param {string | null | undefined} [encoding='utf8']
   *   Character encoding to understand `value` as when it’s a `Uint8Array`
   *   (default: `'utf-8'`).
   * @returns {string}
   *   Serialized file.
   */
  toString(n) {
    return this.value === void 0 ? "" : typeof this.value == "string" ? this.value : new TextDecoder(n || void 0).decode(this.value);
  }
}
function ln(e, n) {
  if (e && e.includes(ae.sep))
    throw new Error(
      "`" + n + "` cannot be a path: did not expect `" + ae.sep + "`"
    );
}
function on(e, n) {
  if (!e)
    throw new Error("`" + n + "` cannot be empty");
}
function Pt(e, n) {
  if (!e)
    throw new Error("Setting `" + n + "` requires `path` to be set too");
}
function Ma(e) {
  return !!(e && typeof e == "object" && "byteLength" in e && "byteOffset" in e);
}
const Ba = (
  /**
   * @type {new <Parameters extends Array<unknown>, Result>(property: string | symbol) => (...parameters: Parameters) => Result}
   */
  /** @type {unknown} */
  /**
   * @this {Function}
   * @param {string | symbol} property
   * @returns {(...parameters: Array<unknown>) => unknown}
   */
  function(e) {
    const r = (
      /** @type {Record<string | symbol, Function>} */
      // Prototypes do exist.
      // type-coverage:ignore-next-line
      this.constructor.prototype
    ), i = r[e], l = function() {
      return i.apply(l, arguments);
    };
    return Object.setPrototypeOf(l, r), l;
  }
), ja = {}.hasOwnProperty;
class Rn extends Ba {
  /**
   * Create a processor.
   */
  constructor() {
    super("copy"), this.Compiler = void 0, this.Parser = void 0, this.attachers = [], this.compiler = void 0, this.freezeIndex = -1, this.frozen = void 0, this.namespace = {}, this.parser = void 0, this.transformers = Ta();
  }
  /**
   * Copy a processor.
   *
   * @deprecated
   *   This is a private internal method and should not be used.
   * @returns {Processor<ParseTree, HeadTree, TailTree, CompileTree, CompileResult>}
   *   New *unfrozen* processor ({@linkcode Processor}) that is
   *   configured to work the same as its ancestor.
   *   When the descendant processor is configured in the future it does not
   *   affect the ancestral processor.
   */
  copy() {
    const n = (
      /** @type {Processor<ParseTree, HeadTree, TailTree, CompileTree, CompileResult>} */
      new Rn()
    );
    let t = -1;
    for (; ++t < this.attachers.length; ) {
      const r = this.attachers[t];
      n.use(...r);
    }
    return n.data(tn(!0, {}, this.namespace)), n;
  }
  /**
   * Configure the processor with info available to all plugins.
   * Information is stored in an object.
   *
   * Typically, options can be given to a specific plugin, but sometimes it
   * makes sense to have information shared with several plugins.
   * For example, a list of HTML elements that are self-closing, which is
   * needed during all phases.
   *
   * > **Note**: setting information cannot occur on *frozen* processors.
   * > Call the processor first to create a new unfrozen processor.
   *
   * > **Note**: to register custom data in TypeScript, augment the
   * > {@linkcode Data} interface.
   *
   * @example
   *   This example show how to get and set info:
   *
   *   ```js
   *   import {unified} from 'unified'
   *
   *   const processor = unified().data('alpha', 'bravo')
   *
   *   processor.data('alpha') // => 'bravo'
   *
   *   processor.data() // => {alpha: 'bravo'}
   *
   *   processor.data({charlie: 'delta'})
   *
   *   processor.data() // => {charlie: 'delta'}
   *   ```
   *
   * @template {keyof Data} Key
   *
   * @overload
   * @returns {Data}
   *
   * @overload
   * @param {Data} dataset
   * @returns {Processor<ParseTree, HeadTree, TailTree, CompileTree, CompileResult>}
   *
   * @overload
   * @param {Key} key
   * @returns {Data[Key]}
   *
   * @overload
   * @param {Key} key
   * @param {Data[Key]} value
   * @returns {Processor<ParseTree, HeadTree, TailTree, CompileTree, CompileResult>}
   *
   * @param {Data | Key} [key]
   *   Key to get or set, or entire dataset to set, or nothing to get the
   *   entire dataset (optional).
   * @param {Data[Key]} [value]
   *   Value to set (optional).
   * @returns {unknown}
   *   The current processor when setting, the value at `key` when getting, or
   *   the entire dataset when getting without key.
   */
  data(n, t) {
    return typeof n == "string" ? arguments.length === 2 ? (sn("data", this.frozen), this.namespace[n] = t, this) : ja.call(this.namespace, n) && this.namespace[n] || void 0 : n ? (sn("data", this.frozen), this.namespace = n, this) : this.namespace;
  }
  /**
   * Freeze a processor.
   *
   * Frozen processors are meant to be extended and not to be configured
   * directly.
   *
   * When a processor is frozen it cannot be unfrozen.
   * New processors working the same way can be created by calling the
   * processor.
   *
   * It’s possible to freeze processors explicitly by calling `.freeze()`.
   * Processors freeze automatically when `.parse()`, `.run()`, `.runSync()`,
   * `.stringify()`, `.process()`, or `.processSync()` are called.
   *
   * @returns {Processor<ParseTree, HeadTree, TailTree, CompileTree, CompileResult>}
   *   The current processor.
   */
  freeze() {
    if (this.frozen)
      return this;
    const n = (
      /** @type {Processor} */
      /** @type {unknown} */
      this
    );
    for (; ++this.freezeIndex < this.attachers.length; ) {
      const [t, ...r] = this.attachers[this.freezeIndex];
      if (r[0] === !1)
        continue;
      r[0] === !0 && (r[0] = void 0);
      const i = t.call(n, ...r);
      typeof i == "function" && this.transformers.use(i);
    }
    return this.frozen = !0, this.freezeIndex = Number.POSITIVE_INFINITY, this;
  }
  /**
   * Parse text to a syntax tree.
   *
   * > **Note**: `parse` freezes the processor if not already *frozen*.
   *
   * > **Note**: `parse` performs the parse phase, not the run phase or other
   * > phases.
   *
   * @param {Compatible | undefined} [file]
   *   file to parse (optional); typically `string` or `VFile`; any value
   *   accepted as `x` in `new VFile(x)`.
   * @returns {ParseTree extends undefined ? Node : ParseTree}
   *   Syntax tree representing `file`.
   */
  parse(n) {
    this.freeze();
    const t = Ve(n), r = this.parser || this.Parser;
    return an("parse", r), r(String(t), t);
  }
  /**
   * Process the given file as configured on the processor.
   *
   * > **Note**: `process` freezes the processor if not already *frozen*.
   *
   * > **Note**: `process` performs the parse, run, and stringify phases.
   *
   * @overload
   * @param {Compatible | undefined} file
   * @param {ProcessCallback<VFileWithOutput<CompileResult>>} done
   * @returns {undefined}
   *
   * @overload
   * @param {Compatible | undefined} [file]
   * @returns {Promise<VFileWithOutput<CompileResult>>}
   *
   * @param {Compatible | undefined} [file]
   *   File (optional); typically `string` or `VFile`]; any value accepted as
   *   `x` in `new VFile(x)`.
   * @param {ProcessCallback<VFileWithOutput<CompileResult>> | undefined} [done]
   *   Callback (optional).
   * @returns {Promise<VFile> | undefined}
   *   Nothing if `done` is given.
   *   Otherwise a promise, rejected with a fatal error or resolved with the
   *   processed file.
   *
   *   The parsed, transformed, and compiled value is available at
   *   `file.value` (see note).
   *
   *   > **Note**: unified typically compiles by serializing: most
   *   > compilers return `string` (or `Uint8Array`).
   *   > Some compilers, such as the one configured with
   *   > [`rehype-react`][rehype-react], return other values (in this case, a
   *   > React tree).
   *   > If you’re using a compiler that doesn’t serialize, expect different
   *   > result values.
   *   >
   *   > To register custom results in TypeScript, add them to
   *   > {@linkcode CompileResultMap}.
   *
   *   [rehype-react]: https://github.com/rehypejs/rehype-react
   */
  process(n, t) {
    const r = this;
    return this.freeze(), an("process", this.parser || this.Parser), un("process", this.compiler || this.Compiler), t ? i(void 0, t) : new Promise(i);
    function i(l, o) {
      const a = Ve(n), c = (
        /** @type {HeadTree extends undefined ? Node : HeadTree} */
        /** @type {unknown} */
        r.parse(a)
      );
      r.run(c, a, function(s, h, d) {
        if (s || !h || !d)
          return u(s);
        const p = (
          /** @type {CompileTree extends undefined ? Node : CompileTree} */
          /** @type {unknown} */
          h
        ), x = r.stringify(p, d);
        Va(x) ? d.value = x : d.result = x, u(
          s,
          /** @type {VFileWithOutput<CompileResult>} */
          d
        );
      });
      function u(s, h) {
        s || !h ? o(s) : l ? l(h) : t(void 0, h);
      }
    }
  }
  /**
   * Process the given file as configured on the processor.
   *
   * An error is thrown if asynchronous transforms are configured.
   *
   * > **Note**: `processSync` freezes the processor if not already *frozen*.
   *
   * > **Note**: `processSync` performs the parse, run, and stringify phases.
   *
   * @param {Compatible | undefined} [file]
   *   File (optional); typically `string` or `VFile`; any value accepted as
   *   `x` in `new VFile(x)`.
   * @returns {VFileWithOutput<CompileResult>}
   *   The processed file.
   *
   *   The parsed, transformed, and compiled value is available at
   *   `file.value` (see note).
   *
   *   > **Note**: unified typically compiles by serializing: most
   *   > compilers return `string` (or `Uint8Array`).
   *   > Some compilers, such as the one configured with
   *   > [`rehype-react`][rehype-react], return other values (in this case, a
   *   > React tree).
   *   > If you’re using a compiler that doesn’t serialize, expect different
   *   > result values.
   *   >
   *   > To register custom results in TypeScript, add them to
   *   > {@linkcode CompileResultMap}.
   *
   *   [rehype-react]: https://github.com/rehypejs/rehype-react
   */
  processSync(n) {
    let t = !1, r;
    return this.freeze(), an("processSync", this.parser || this.Parser), un("processSync", this.compiler || this.Compiler), this.process(n, i), vt("processSync", "process", t), r;
    function i(l, o) {
      t = !0, bt(l), r = o;
    }
  }
  /**
   * Run *transformers* on a syntax tree.
   *
   * > **Note**: `run` freezes the processor if not already *frozen*.
   *
   * > **Note**: `run` performs the run phase, not other phases.
   *
   * @overload
   * @param {HeadTree extends undefined ? Node : HeadTree} tree
   * @param {RunCallback<TailTree extends undefined ? Node : TailTree>} done
   * @returns {undefined}
   *
   * @overload
   * @param {HeadTree extends undefined ? Node : HeadTree} tree
   * @param {Compatible | undefined} file
   * @param {RunCallback<TailTree extends undefined ? Node : TailTree>} done
   * @returns {undefined}
   *
   * @overload
   * @param {HeadTree extends undefined ? Node : HeadTree} tree
   * @param {Compatible | undefined} [file]
   * @returns {Promise<TailTree extends undefined ? Node : TailTree>}
   *
   * @param {HeadTree extends undefined ? Node : HeadTree} tree
   *   Tree to transform and inspect.
   * @param {(
   *   RunCallback<TailTree extends undefined ? Node : TailTree> |
   *   Compatible
   * )} [file]
   *   File associated with `node` (optional); any value accepted as `x` in
   *   `new VFile(x)`.
   * @param {RunCallback<TailTree extends undefined ? Node : TailTree>} [done]
   *   Callback (optional).
   * @returns {Promise<TailTree extends undefined ? Node : TailTree> | undefined}
   *   Nothing if `done` is given.
   *   Otherwise, a promise rejected with a fatal error or resolved with the
   *   transformed tree.
   */
  run(n, t, r) {
    At(n), this.freeze();
    const i = this.transformers;
    return !r && typeof t == "function" && (r = t, t = void 0), r ? l(void 0, r) : new Promise(l);
    function l(o, a) {
      const c = Ve(t);
      i.run(n, c, u);
      function u(s, h, d) {
        const p = (
          /** @type {TailTree extends undefined ? Node : TailTree} */
          h || n
        );
        s ? a(s) : o ? o(p) : r(void 0, p, d);
      }
    }
  }
  /**
   * Run *transformers* on a syntax tree.
   *
   * An error is thrown if asynchronous transforms are configured.
   *
   * > **Note**: `runSync` freezes the processor if not already *frozen*.
   *
   * > **Note**: `runSync` performs the run phase, not other phases.
   *
   * @param {HeadTree extends undefined ? Node : HeadTree} tree
   *   Tree to transform and inspect.
   * @param {Compatible | undefined} [file]
   *   File associated with `node` (optional); any value accepted as `x` in
   *   `new VFile(x)`.
   * @returns {TailTree extends undefined ? Node : TailTree}
   *   Transformed tree.
   */
  runSync(n, t) {
    let r = !1, i;
    return this.run(n, t, l), vt("runSync", "run", r), i;
    function l(o, a) {
      bt(o), i = a, r = !0;
    }
  }
  /**
   * Compile a syntax tree.
   *
   * > **Note**: `stringify` freezes the processor if not already *frozen*.
   *
   * > **Note**: `stringify` performs the stringify phase, not the run phase
   * > or other phases.
   *
   * @param {CompileTree extends undefined ? Node : CompileTree} tree
   *   Tree to compile.
   * @param {Compatible | undefined} [file]
   *   File associated with `node` (optional); any value accepted as `x` in
   *   `new VFile(x)`.
   * @returns {CompileResult extends undefined ? Value : CompileResult}
   *   Textual representation of the tree (see note).
   *
   *   > **Note**: unified typically compiles by serializing: most compilers
   *   > return `string` (or `Uint8Array`).
   *   > Some compilers, such as the one configured with
   *   > [`rehype-react`][rehype-react], return other values (in this case, a
   *   > React tree).
   *   > If you’re using a compiler that doesn’t serialize, expect different
   *   > result values.
   *   >
   *   > To register custom results in TypeScript, add them to
   *   > {@linkcode CompileResultMap}.
   *
   *   [rehype-react]: https://github.com/rehypejs/rehype-react
   */
  stringify(n, t) {
    this.freeze();
    const r = Ve(t), i = this.compiler || this.Compiler;
    return un("stringify", i), At(n), i(n, r);
  }
  /**
   * Configure the processor to use a plugin, a list of usable values, or a
   * preset.
   *
   * If the processor is already using a plugin, the previous plugin
   * configuration is changed based on the options that are passed in.
   * In other words, the plugin is not added a second time.
   *
   * > **Note**: `use` cannot be called on *frozen* processors.
   * > Call the processor first to create a new unfrozen processor.
   *
   * @example
   *   There are many ways to pass plugins to `.use()`.
   *   This example gives an overview:
   *
   *   ```js
   *   import {unified} from 'unified'
   *
   *   unified()
   *     // Plugin with options:
   *     .use(pluginA, {x: true, y: true})
   *     // Passing the same plugin again merges configuration (to `{x: true, y: false, z: true}`):
   *     .use(pluginA, {y: false, z: true})
   *     // Plugins:
   *     .use([pluginB, pluginC])
   *     // Two plugins, the second with options:
   *     .use([pluginD, [pluginE, {}]])
   *     // Preset with plugins and settings:
   *     .use({plugins: [pluginF, [pluginG, {}]], settings: {position: false}})
   *     // Settings only:
   *     .use({settings: {position: false}})
   *   ```
   *
   * @template {Array<unknown>} [Parameters=[]]
   * @template {Node | string | undefined} [Input=undefined]
   * @template [Output=Input]
   *
   * @overload
   * @param {Preset | null | undefined} [preset]
   * @returns {Processor<ParseTree, HeadTree, TailTree, CompileTree, CompileResult>}
   *
   * @overload
   * @param {PluggableList} list
   * @returns {Processor<ParseTree, HeadTree, TailTree, CompileTree, CompileResult>}
   *
   * @overload
   * @param {Plugin<Parameters, Input, Output>} plugin
   * @param {...(Parameters | [boolean])} parameters
   * @returns {UsePlugin<ParseTree, HeadTree, TailTree, CompileTree, CompileResult, Input, Output>}
   *
   * @param {PluggableList | Plugin | Preset | null | undefined} value
   *   Usable value.
   * @param {...unknown} parameters
   *   Parameters, when a plugin is given as a usable value.
   * @returns {Processor<ParseTree, HeadTree, TailTree, CompileTree, CompileResult>}
   *   Current processor.
   */
  use(n, ...t) {
    const r = this.attachers, i = this.namespace;
    if (sn("use", this.frozen), n != null) if (typeof n == "function")
      c(n, t);
    else if (typeof n == "object")
      Array.isArray(n) ? a(n) : o(n);
    else
      throw new TypeError("Expected usable value, not `" + n + "`");
    return this;
    function l(u) {
      if (typeof u == "function")
        c(u, []);
      else if (typeof u == "object")
        if (Array.isArray(u)) {
          const [s, ...h] = (
            /** @type {PluginTuple<Array<unknown>>} */
            u
          );
          c(s, h);
        } else
          o(u);
      else
        throw new TypeError("Expected usable value, not `" + u + "`");
    }
    function o(u) {
      if (!("plugins" in u) && !("settings" in u))
        throw new Error(
          "Expected usable value but received an empty preset, which is probably a mistake: presets typically come with `plugins` and sometimes with `settings`, but this has neither"
        );
      a(u.plugins), u.settings && (i.settings = tn(!0, i.settings, u.settings));
    }
    function a(u) {
      let s = -1;
      if (u != null) if (Array.isArray(u))
        for (; ++s < u.length; ) {
          const h = u[s];
          l(h);
        }
      else
        throw new TypeError("Expected a list of plugins, not `" + u + "`");
    }
    function c(u, s) {
      let h = -1, d = -1;
      for (; ++h < r.length; )
        if (r[h][0] === u) {
          d = h;
          break;
        }
      if (d === -1)
        r.push([u, ...s]);
      else if (s.length > 0) {
        let [p, ...x] = s;
        const b = r[d][1];
        kn(b) && kn(p) && (p = tn(!0, b, p)), r[d] = [u, p, ...x];
      }
    }
  }
}
const Ha = new Rn().freeze();
function an(e, n) {
  if (typeof n != "function")
    throw new TypeError("Cannot `" + e + "` without `parser`");
}
function un(e, n) {
  if (typeof n != "function")
    throw new TypeError("Cannot `" + e + "` without `compiler`");
}
function sn(e, n) {
  if (n)
    throw new Error(
      "Cannot call `" + e + "` on a frozen processor.\nCreate a new processor first, by calling it: use `processor()` instead of `processor`."
    );
}
function At(e) {
  if (!kn(e) || typeof e.type != "string")
    throw new TypeError("Expected node, got `" + e + "`");
}
function vt(e, n, t) {
  if (!t)
    throw new Error(
      "`" + e + "` finished async. Use `" + n + "` instead"
    );
}
function Ve(e) {
  return Ua(e) ? e : new pr(e);
}
function Ua(e) {
  return !!(e && typeof e == "object" && "message" in e && "messages" in e);
}
function Va(e) {
  return typeof e == "string" || qa(e);
}
function qa(e) {
  return !!(e && typeof e == "object" && "byteLength" in e && "byteOffset" in e);
}
const $a = "https://github.com/remarkjs/react-markdown/blob/main/changelog.md", zt = [], Lt = { allowDangerousHtml: !0 }, Wa = /^(https?|ircs?|mailto|xmpp)$/i, Ya = [
  { from: "astPlugins", id: "remove-buggy-html-in-markdown-parser" },
  { from: "allowDangerousHtml", id: "remove-buggy-html-in-markdown-parser" },
  {
    from: "allowNode",
    id: "replace-allownode-allowedtypes-and-disallowedtypes",
    to: "allowElement"
  },
  {
    from: "allowedTypes",
    id: "replace-allownode-allowedtypes-and-disallowedtypes",
    to: "allowedElements"
  },
  { from: "className", id: "remove-classname" },
  {
    from: "disallowedTypes",
    id: "replace-allownode-allowedtypes-and-disallowedtypes",
    to: "disallowedElements"
  },
  { from: "escapeHtml", id: "remove-buggy-html-in-markdown-parser" },
  { from: "includeElementIndex", id: "#remove-includeelementindex" },
  {
    from: "includeNodeIndex",
    id: "change-includenodeindex-to-includeelementindex"
  },
  { from: "linkTarget", id: "remove-linktarget" },
  { from: "plugins", id: "change-plugins-to-remarkplugins", to: "remarkPlugins" },
  { from: "rawSourcePos", id: "#remove-rawsourcepos" },
  { from: "renderers", id: "change-renderers-to-components", to: "components" },
  { from: "source", id: "change-source-to-children", to: "children" },
  { from: "sourcePos", id: "#remove-sourcepos" },
  { from: "transformImageUri", id: "#add-urltransform", to: "urlTransform" },
  { from: "transformLinkUri", id: "#add-urltransform", to: "urlTransform" }
];
function Ka(e) {
  const n = Fn(e), t = Nn(e);
  return Mn(n.runSync(n.parse(t), t), e);
}
async function Za(e) {
  const n = Fn(e), t = Nn(e), r = await n.run(n.parse(t), t);
  return Mn(r, e);
}
function eu(e) {
  const n = Fn(e), [t, r] = $n(
    /** @type {Error | undefined} */
    void 0
  ), [i, l] = $n(
    /** @type {Root | undefined} */
    void 0
  );
  if (zr(
    function() {
      let o = !1;
      const a = Nn(e);
      return n.run(n.parse(a), a, function(c, u) {
        o || (r(c), l(u));
      }), function() {
        o = !0;
      };
    },
    [
      e.children,
      e.rehypePlugins,
      e.remarkPlugins,
      e.remarkRehypeOptions
    ]
  ), t) throw t;
  return i ? Mn(i, e) : e.fallback;
}
function Fn(e) {
  const n = e.rehypePlugins || zt, t = e.remarkPlugins || zt, r = e.remarkRehypeOptions ? { ...e.remarkRehypeOptions, ...Lt } : Lt;
  return Ha().use(No).use(t).use(Ca, r).use(n);
}
function Nn(e) {
  const n = e.children || "", t = new pr();
  return typeof n == "string" && (t.value = n), t;
}
function Mn(e, n) {
  const t = n.allowedElements, r = n.allowElement, i = n.components, l = n.disallowedElements, o = n.skipHtml, a = n.unwrapDisallowed, c = n.urlTransform || Xa;
  for (const s of Ya)
    Object.hasOwn(n, s.from) && Tr(
      "Unexpected `" + s.from + "` prop, " + (s.to ? "use `" + s.to + "` instead" : "remove it") + " (see <" + $a + "#" + s.id + "> for more info)"
    );
  return Dt(e, u), Pi(e, {
    Fragment: vr,
    components: i,
    ignoreInvalidStyle: !0,
    jsx: Ar,
    jsxs: Pr,
    passKeys: !0,
    passNode: !0
  });
  function u(s, h, d) {
    if (s.type === "raw" && d && typeof h == "number")
      return o ? d.children.splice(h, 1) : d.children[h] = { type: "text", value: s.value }, h;
    if (s.type === "element") {
      let p;
      for (p in Ze)
        if (Object.hasOwn(Ze, p) && Object.hasOwn(s.properties, p)) {
          const x = s.properties[p], b = Ze[p];
          (b === null || b.includes(s.tagName)) && (s.properties[p] = c(String(x || ""), p, s));
        }
    }
    if (s.type === "element") {
      let p = t ? !t.includes(s.tagName) : l ? l.includes(s.tagName) : !1;
      if (!p && r && typeof h == "number" && (p = !r(s, h, d)), p && d && typeof h == "number")
        return a && s.children ? d.children.splice(h, 1, ...s.children) : d.children.splice(h, 1), h;
    }
  }
}
function Xa(e) {
  const n = e.indexOf(":"), t = e.indexOf("?"), r = e.indexOf("#"), i = e.indexOf("/");
  return (
    // If there is no protocol, it’s relative.
    n === -1 || // If the first colon is after a `?`, `#`, or `/`, it’s not a protocol.
    i !== -1 && n > i || t !== -1 && n > t || r !== -1 && n > r || // It is a protocol, it should be allowed.
    Wa.test(e.slice(0, n)) ? e : ""
  );
}
export {
  Za as MarkdownAsync,
  eu as MarkdownHooks,
  Ka as default,
  Xa as defaultUrlTransform
};
