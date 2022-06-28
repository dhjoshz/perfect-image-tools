export class CommonsUtil {
  public static convertHexToRGBA(hexCode: string, opacity = 1) {
    let hex = hexCode.replace('#', '');
    if (hex.length === 3) {
      hex = `${hex[0]}${hex[0]}${hex[1]}${hex[1]}${hex[2]}${hex[2]}`;
    }
    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);
    if (hex.length === 8) {
      opacity = parseInt(hex.substring(6, 8), 16);
    }
    if (opacity > 1 && opacity <= 100) {
      opacity = opacity / 100;
    }
    return {
      r: r,
      b: b,
      g: g,
      alpha: opacity,
    };
  }
}
