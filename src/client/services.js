import Bottle from "bottlejs";

import "whatwg-fetch";

import firebase from "firebase";

import config from "./config";
import CookieService from "services/cookie";
import AuthService from "services/auth";
import ProfileService from "services/profile";
import FileService from "services/file";
import YoutubeService from "services/youtube";

const kernel = new Bottle();

kernel.service("config", () => config);
kernel.service("location", () => window.location);
kernel.service("history", () => window.history);
kernel.service("fetch", () => fetch.bind(window));
kernel.service("document", () => document);

kernel.service("firebase", () => {
  const service = firebase.initializeApp(config.firebase);
  service.firestore().settings(config.firestore);
  return firebase;
});

kernel.service("storageService", () => window.localStorage); //TODO: fallback?

kernel.service("cookieService", CookieService, "config", "document");
kernel.service("authService", AuthService, "config", "firebase");
kernel.service("profileService", ProfileService, "config", "firebase");
kernel.service("fileService", FileService, "config", "firebase");
kernel.service("youtubeService", YoutubeService, "config", "fetch");

export default kernel.container;
