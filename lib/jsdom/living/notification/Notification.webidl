[Exposed=(Window,Worker)]
interface Notification : EventTarget {
  constructor(DOMString title, optional NotificationOptions options = {});

  static readonly attribute NotificationPermission permission;
  [Exposed=Window] static Promise<NotificationPermission> requestPermission(optional NotificationPermissionCallback deprecatedCallback);

  static readonly attribute unsigned long maxActions;

  attribute EventHandler onclick;
  attribute EventHandler onshow;
  attribute EventHandler onerror;
  attribute EventHandler onclose;

  readonly attribute DOMString title;
  readonly attribute NotificationDirection dir;
  readonly attribute DOMString lang;
  readonly attribute DOMString body;
  readonly attribute DOMString tag;
  readonly attribute USVString image;
  readonly attribute USVString icon;
  readonly attribute USVString badge;
  [SameObject] readonly attribute FrozenArray<unsigned long> vibrate;
  readonly attribute EpochTimeStamp timestamp;
  readonly attribute boolean renotify;
  readonly attribute boolean? silent;
  readonly attribute boolean requireInteraction;
  [SameObject] readonly attribute any data;
  [SameObject] readonly attribute FrozenArray<NotificationAction> actions;

  undefined close();
};

enum NotificationDirection {
  "auto",
  "ltr",
  "rtl"
};

enum NotificationPermission {
  "default",
  "denied",
  "granted"
};

dictionary NotificationOptions {
  NotificationDirection dir = "auto";
  DOMString lang = "";
  DOMString body = "";
  DOMString tag = "";
  USVString image;
  USVString icon;
  USVString badge;
  VibratePattern vibrate;
  EpochTimeStamp timestamp;
  boolean renotify = false;
  boolean? silent = null;
  boolean requireInteraction = false;
  any data = null;
  sequence<NotificationAction> actions = [];
};

callback NotificationPermissionCallback = undefined (NotificationPermission permission);

dictionary NotificationAction {
  required DOMString action;
  required DOMString title;
  USVString icon;
};