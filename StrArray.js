class StrArray {
  static getPrefix(strar) {
    if (!strar || strar.length == 0) {
      return null;
    }
    let res = strar[0];
    for (let i = 1; i < strar.length; i++) {
      const s2 = strar[i];
      const len = Math.min(res.length, s2.length);
      for (let j = 0; j < len; j++) {
        if (res[j] != s2[j]) {
          res = res.substring(0, j);
          break;
        }
      }
    }
    return res;
  }
  static isUnique(strar) {
    for (let i = 0; i < strar.length - 1; i++) {
      for (let j = i + 1; j < strar.length; j++) {
        if (strar[i] == strar[j]) {
          return false;
        }
      }
    }
    return true;
  }
  static getNotUnique(strar) {
    const res = [];
    for (let i = 0; i < strar.length - 1; i++) {
      for (let j = i + 1; j < strar.length; j++) {
        if (strar[i] == strar[j]) {
          res.push(strar[i]);
        }
      }
    }
    return res;
  }
  static getUniqueLength(strar) {
    let level = strar[0].length;
    for (let i = level; i > 0; i--) {
      const d = strar.map(s => s.substring(0, i));
      if (!this.isUnique(d)) {
        return i + 1;
      }
    }
    return 0;
  }
  static getUnique(strar, s) {
    let max = 0;
    A: for (const s2 of strar) {
      if (s == s2) {
        continue;
      }
      const len = Math.min(s.length, s2.length);
      for (let j = 0; j < len; j++) {
        if (s[j] != s2[j]) {
          if (j > max) {
            max = j;
            continue A;
          }
          break;
        }
      }
    }
    return s.substring(0, max + 1);
  }
}

export { StrArray };
