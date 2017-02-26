(ns reddio-frontend.screens.app
  (:require [reddio-frontend.bridge :as bridge]
            [reddio-frontend.screens.shared.header :as header]
            [reddio-frontend.screens.listings.listings :as listings]))

(defn app []
  [:> bridge/root-provider
   [:div.app
    [header/main]
    [listings/main {:url-path "/r/listentothis"}]]])
