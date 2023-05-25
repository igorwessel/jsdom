"use strict";

const EventTargetImpl = require("../events/EventTarget-impl").implementation;
const {
  documentBaseURL,
  parseURLToResultingURLRecord,
} = require("../helpers/document-base-url");

class NotificationAction {
  constructor(name, title, icon, document) {
    this.name = name;
    this.title = title;

    if (icon) {
      this._iconURL = parseURLToResultingURLRecord(icon, document);
    }
  }

  get name() {
    return this.name;
  }

  get title() {
    return this.title;
  }

  get icon() {
    return this._iconURL;
  }
}
class Notification extends EventTargetImpl {
  constructor(globalObject, args, privateData) {
    super(globalObject, args, privateData);
    this._globalObject = globalObject;
    this._document = privateData.document;

    const [title, options] = args;

    if (options?.silent === true && options?.vibrate) {
      throw new TypeError("Not can pass options.silent when pass vibrate.");
    }

    if (options?.renotify === true && options?.tag) {
      throw new TypeError("Not can pass options.renotify when tag is empty.");
    }
    this.title = title;
    this.direction = options?.dir;
    this.language = options?.language;
    this.body = options?.body;
    this.tag = options?.tag;

    // Not implemented: use of entry settings object's API base URL. Instead we just use the document base URL. The
    // difference matters in the case of cross-frame calls.
    this._baseURL = documentBaseURL(this._document);

    if (options?.image) {
      this._imageURL = parseURLToResultingURLRecord(
        options.image,
        this._document
      );
    }
    if (options?.icon) {
      this._iconURL = parseURLToResultingURLRecord(
        options.icon,
        this._document
      );
    }
    if (options?.badge) {
      this._badgeURL = parseURLToResultingURLRecord(
        options.image,
        this._document
      );
    }

    this.timestamp = options.timestamp ?? Math.round(Date.now() / 1000);
    this.renotify = options?.renotify;
    this.silent = options?.silent;
    this.requireInteraction = options?.requireInteraction;
    this.actions = [];

    options?.actions.forEach((entry) => {
      if (!entry) {
        return;
      }

      this.actions.push(
        new NotificationAction(
          entry?.action,
          entry?.title,
          entry?.icon,
          this._document
        )
      );
    });
  }

  get image() {
    return this._imageURL;
  }

  get icon() {
    return this._iconURL;
  }

  get badge() {
    return this._badgeURL;
  }
}

module.exports = {
  implementation: Notification,
};
