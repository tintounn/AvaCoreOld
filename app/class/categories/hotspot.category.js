class HotSpotCategory {
  static import(device) {
    let actions = [
      {
        type: 'text',
        method: 'play',
        prop: 'url'
      },
      {
        type: 'button',
        method: 'stop'
      },
    ];

    let props = {
      url: ''
    };

    Array.prototype.push.apply(device.actions, actions);
    Object.assign(device.props, props);
  }
}

module.exports = HotSpotCategory;