import Bottle from "bottlejs";

import "whatwg-fetch";

import config from "./config";
import CookieService from "services/cookie";
import AuthService from "services/auth";

const kernel = new Bottle();

kernel.service("config", () => config);
kernel.service("location", () => window.location);
kernel.service("history", () => window.history);
kernel.service("fetch", () => fetch.bind(window));
kernel.service("document", () => document);

kernel.service("firebase", () => window.firebase);

kernel.service("storageService", () => window.localStorage); //TODO: fallback?

kernel.service("cookieService", CookieService, "config", "document");
kernel.service("authService", AuthService, "config", "firebase");

export default kernel.container;
