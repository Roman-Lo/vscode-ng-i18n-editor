class _EMPTY_ARRAY_CLASS {
  constructor() {
  }
}

export class ObjectUtils {
  static clone<T>(o: T, deep: boolean = true): T {
    if (ObjectUtils.isNotAnObject(o)) {
      return o;
    }
    if (!deep) {
      if (Array.isArray(o)) {
        const cloned: any = o.map(i => ObjectUtils.clone(i, false));
        return cloned;
      }
      if (o instanceof Date) {
        return new Date(o) as any;
      }
      return Object.assign({}, o);
    }
    return ObjectUtils.deepClone(o);
  }

  static diff<T extends Object>(a: T, b: T): {
    path: string, a: any, b: any
  }[] {
    const typeofa: string = typeof a;
    if (typeofa !== typeof b) {
      throw new Error(`cannot execute diff for different types of object`);
    }
    if (typeofa !== 'object' || a instanceof Date) {
      throw new Error(`cannot execute diff for non-object values`);
    }
    const aFlattened = ObjectUtils.flatten(ObjectUtils.deepClone(a));
    const bFlattened = ObjectUtils.flatten(ObjectUtils.deepClone(b));
    const bItemByPath = bFlattened.reduce<{ [path: string]: { path: string, val: any } }>((d, v) => {
      d[v.path] = v;
      return d;
    }, {});
    const diffResult: {
      path: string, a: any, b: any
    }[] = [];
    aFlattened.forEach(aItem => {
      const bItem = bItemByPath[aItem.path];
      if (!bItem) {
        diffResult.push({
          path: aItem.path, a: aItem.val, b: undefined
        });
      } else {
        let isTheSame = false;
        if (bItem.val instanceof Date && aItem.val instanceof Date) {
          isTheSame = bItem.val.getTime() === aItem.val.getTime();
        } else if (bItem.val instanceof _EMPTY_ARRAY_CLASS && aItem.val instanceof _EMPTY_ARRAY_CLASS || bItem.val === aItem.val) {
          isTheSame = true;
        }
        if (!isTheSame) {
          diffResult.push({
            path: aItem.path, a: aItem.val, b: bItem.val
          });
        }
        delete bItemByPath[aItem.path];
        ;
      }
    });
    Object.values(bItemByPath).forEach(bItem => {
      diffResult.push({
        path: bItem.path, a: undefined, b: bItem.val
      });
    });
    return diffResult;
  }

  private static flatten(o: Object, base: string = '', ctx: { path: string, val: any }[] = []): { path: string, val: any }[] {
    if (ObjectUtils.isNotAnObject(o)) {
      ctx.push({path: base, val: o});
    } else if (Array.isArray(o)) {
      if (o.length === 0) {
        ctx.push({path: base, val: new _EMPTY_ARRAY_CLASS()});
      } else {
        base = ObjectUtils.getObjectPathPrefix(base);
        o.forEach((val, idx) => {
          ObjectUtils.flatten(val, `${base}-:[${idx}]`, ctx);
        });
      }
    } else if (o instanceof Date) {
      ctx.push({path: base, val: o});
    } else {
      base = ObjectUtils.getObjectPathPrefix(base);
      for (const key in o) {
        if (o.hasOwnProperty(key)) {
          const val = (o as any)[key];
          ObjectUtils.flatten(val, `${base}${key}`, ctx);
        }
      }
    }
    return ctx;
  }

  private static getObjectPathPrefix(base: string) {
    if (base === '') {
      return '';
    }
    return base + '.';
  }

  private static deepClone<T>(o: T): T {
    if (ObjectUtils.isNotAnObject(o)) {
      return o;
    } else if (Array.isArray(o)) {
      // deep clone app
      return o.map(i => ObjectUtils.deepClone(i)) as any;
    } else if (o instanceof Date) {
      return new Date(o) as any;
    } else {
      // o is an object
      const cloned: any = {};
      for (const key in o) {
        if ((o as Object).hasOwnProperty(key)) {
          const val = o[key];
          const clonedVal = ObjectUtils.deepClone(val);
          cloned[key] = clonedVal;
        }
      }
      return cloned;
    }
  }

  private static isNotAnObject(o: any) {
    return typeof o !== 'object' || o === null;
  }
}