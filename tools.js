class Tools {
  static escapeRegExp(string) {
    return string.replace(/([.*+?^=!:${}()|\[\]\/\\])/g, "\\$1");
  }

  static replaceAll(string, find, replace) {
    return string.replace(new RegExp(Tools.escapeRegExp(find), 'g'), replace);
  }
}

module.exports = Tools;