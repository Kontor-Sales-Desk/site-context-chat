const k = (
  // Note: overloads in JSDoc can’t yet use different `@template`s.
  /**
   * @type {(
   *   (<Condition extends string>(test: Condition) => (node: unknown, index?: number | null | undefined, parent?: Parent | null | undefined, context?: unknown) => node is Node & {type: Condition}) &
   *   (<Condition extends Props>(test: Condition) => (node: unknown, index?: number | null | undefined, parent?: Parent | null | undefined, context?: unknown) => node is Node & Condition) &
   *   (<Condition extends TestFunction>(test: Condition) => (node: unknown, index?: number | null | undefined, parent?: Parent | null | undefined, context?: unknown) => node is Node & Predicate<Condition, Node>) &
   *   ((test?: null | undefined) => (node?: unknown, index?: number | null | undefined, parent?: Parent | null | undefined, context?: unknown) => node is Node) &
   *   ((test?: Test) => Check)
   * )}
   */
  /**
   * @param {Test} [test]
   * @returns {Check}
   */
  function(n) {
    if (n == null)
      return P;
    if (typeof n == "function")
      return a(n);
    if (typeof n == "object")
      return Array.isArray(n) ? E(n) : (
        // Cast because `ReadonlyArray` goes into the above but `isArray`
        // narrows to `Array`.
        N(
          /** @type {Props} */
          n
        )
      );
    if (typeof n == "string")
      return F(n);
    throw new Error("Expected function, string, or object as test");
  }
);
function E(n) {
  const e = [];
  let t = -1;
  for (; ++t < n.length; )
    e[t] = k(n[t]);
  return a(r);
  function r(...o) {
    let c = -1;
    for (; ++c < e.length; )
      if (e[c].apply(this, o)) return !0;
    return !1;
  }
}
function N(n) {
  const e = (
    /** @type {Record<string, unknown>} */
    n
  );
  return a(t);
  function t(r) {
    const o = (
      /** @type {Record<string, unknown>} */
      /** @type {unknown} */
      r
    );
    let c;
    for (c in n)
      if (o[c] !== e[c]) return !1;
    return !0;
  }
}
function F(n) {
  return a(e);
  function e(t) {
    return t && t.type === n;
  }
}
function a(n) {
  return e;
  function e(t, r, o) {
    return !!(x(t) && n.call(
      this,
      t,
      typeof r == "number" ? r : void 0,
      o || void 0
    ));
  }
}
function P() {
  return !0;
}
function x(n) {
  return n !== null && typeof n == "object" && "type" in n;
}
const A = [], I = !0, b = !1, R = "skip";
function T(n, e, t, r) {
  let o;
  typeof e == "function" && typeof t != "function" ? (r = t, t = e) : o = e;
  const c = k(o), d = r ? -1 : 1;
  h(n, void 0, [])();
  function h(i, j, p) {
    const l = (
      /** @type {Record<string, unknown>} */
      i && typeof i == "object" ? i : {}
    );
    if (typeof l.type == "string") {
      const f = (
        // `hast`
        typeof l.tagName == "string" ? l.tagName : (
          // `xast`
          typeof l.name == "string" ? l.name : void 0
        )
      );
      Object.defineProperty(g, "name", {
        value: "node (" + (i.type + (f ? "<" + f + ">" : "")) + ")"
      });
    }
    return g;
    function g() {
      let f = A, y, u, m;
      if ((!e || c(i, j, p[p.length - 1] || void 0)) && (f = O(t(i, p)), f[0] === b))
        return f;
      if ("children" in i && i.children) {
        const s = (
          /** @type {UnistParent} */
          i
        );
        if (s.children && f[0] !== R)
          for (u = (r ? s.children.length : -1) + d, m = p.concat(s); u > -1 && u < s.children.length; ) {
            const w = s.children[u];
            if (y = h(w, u, m)(), y[0] === b)
              return y;
            u = typeof y[1] == "number" ? y[1] : u + d;
          }
      }
      return f;
    }
  }
}
function O(n) {
  return Array.isArray(n) ? n : typeof n == "number" ? [I, n] : n == null ? A : [n];
}
export {
  b as E,
  k as c,
  T as v
};
