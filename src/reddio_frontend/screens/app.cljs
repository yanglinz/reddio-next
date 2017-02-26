(ns reddio-frontend.screens.app
  (:require [reddio-frontend.bridge :as bridge]
            [reddio-frontend.screens.shared.header :refer [header]]
            [reddio-frontend.screens.listings.listings :refer [listings]]))

(defn app []
  [:> bridge/root-provider
   [:div.app
    [header]
    [listings {:url-path "/r/listentothis"}]]])
