export default () => {
  apos.util.widgetPlayers['embed-widget'] = {
    selector: '[data-embed-ext-widget]',
    player: function(el) {
      const embedUrl = el.getAttribute('data-embed-ext-url');
      let queryResult;

      if (!embedUrl) {
        return;
      }

      queryAndPlay(el, {
        url: embedUrl
      });

      function queryAndPlay(el, options) {
        apos.util.removeClass(el, 'apos-oembed-invalid');
        apos.util.addClass(el, 'apos-oembed-busy');
        if (!options.url) {
          return fail('undefined');
        }
        return query(options, function(err, result) {
          queryResult = result;
          if (err || (options.type && (result.type !== options.type))) {
            return fail(err || 'inappropriate');
          }
          apos.util.removeClass(el, 'apos-oembed-busy');
          return play(el, result);
        });
      }

      function query(options, callback) {
        const opts = {
          qs: {
            url: options.url
          }
        };
        return apos.http.get('/api/v1/@apostrophecms/oembed/query', opts, callback);
      }

      function play(el, result) {
        const shaker = document.createElement('div');
        shaker.innerHTML = result.html;
        const inner = shaker.firstChild;
        el.innerHTML = '';
        if (!inner) {
          return;
        }
        // The following adjustments are for general embeds, not just videos
        el.append(inner);
        // Adjust styles or scripts if needed for the specific embed type
      }

      function fail(err) {
        apos.util.removeClass(el, 'apos-oembed-busy');
        apos.util.addClass(el, 'apos-oembed-invalid');
        console.error(err);
        if (err !== 'undefined') {
          el.innerHTML = '<p>Error loading content</p>';
        } else {
          el.innerHTML = '';
        }
      }
    }
  };
};
