export class StringUtils {
  static trimAndRemoveLineWrapper(text: string): string {
    if (typeof text === 'string') {
      return text.split('\n').map(x => x.trim()).join('').trim();
    }
    return text;
  }

  static removeLineWrapper(text: string): string {
    if (typeof text === 'string') {
      return text.split('\n').map(x => {
        return x.replace(/\s+/g, ' ');
      }).join('');
    }
    return text;
  }

  static isIdFromDigest(id: string): boolean {
    return /^[a-z0-9]{40}$/.test(id);
  }
}