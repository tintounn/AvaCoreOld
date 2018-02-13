class RGBCategory {
  static import(device) {
    let actions = [
      {
        type: 'color',
        method: 'setColor',
      },
      {
        type: 'button',
        method: 'on'
      },
      {
        type: 'button',
        method: 'off'
      }
    ];

    let props = {
      color: {r: 0, g: 0, b: 0}
    };

    Array.prototype.push.apply(device.actions, actions);
    Object.assign(device.props, props);
  }
}

module.exports = RGBCategory;