(ns reddio-frontend.screens.app
  (:require [reddio-frontend.bridge :as bridge]
            [reddio-frontend.screens.listings.listings :as listings]))

(defn app []
  [:> bridge/root-provider
   [:div.app
    [listings/listings {:url-path "/r/listentothis"}]]])
