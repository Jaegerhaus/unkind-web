
class YoutubeService {

  constructor(config, fetch) {
    this._key = config.firebase.apiKey;
    this._fetch = fetch;
  }

  parseYoutubeId (url) {
    const host = url.match(/^(https?:\/\/(www\.)?youtu(be\.com|\.be))\/(.+)/);
    if (!host) return;
    const param = url.match(/v(\/|=)([^=\/\?\&]{8,16})/);
    if (param) return param[2];
    const path = url.match(/([^\/]+)$/);
    if (path) return path[1];
  }

  getDetails(url) {
    const videoId = this.parseYoutubeId(url);
    if (!videoId)
      return Promise.reject();
    return fetch(`https://www.googleapis.com/youtube/v3/videos?part=snippet&key=${this._key}&id=${videoId}`)
      .then(response =>
        response.ok
          ? response.json()
          : Promise.reject(response)
      )
      .then(details => {
        if (!details.items.length)
          return null;
        const {
          title,
          description,
          thumbnails: {
            standard: {
              url: thumbnail,
            },
          },
          channelTitle: channel,
        } = details.items[0].snippet;
        return {
          url,
          title,
          description,
          thumbnail,
          channel,
        };
      });
  }

}

export default YoutubeService;
