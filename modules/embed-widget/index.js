module.exports = {
  extend: '@apostrophecms/widget-type',
  options: {
    label: 'embed:embed',
    className: false,
    icon: 'web-icon',
    placeholder: true,
    placeholderClass: false,
    placeholderUrl: 'https://infogram.com/1tpqd0vkeemqrpc6rd873mwdv7c3vkp3d7w'
  },
  i18n: {
    ourTeamUI: {
      browser: true
    }
  },
  fields: {
    add: {
      embed: {
        type: 'oembed',
        name: 'embed',
        oembedType: 'rich',
        label: 'embed:embedUrl',
        help: 'embed:embedUrlHelp',
        required: true
      }
    }
  }
};
