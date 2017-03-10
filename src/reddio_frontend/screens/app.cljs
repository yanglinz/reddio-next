(ns reddio-frontend.screens.app
  (:require [re-frame.core :as rf]
            [reddio-frontend.bridge :as bridge]
            [reddio-frontend.screens.shared.header :as header]
            [reddio-frontend.screens.home.top-subreddits :as top-subreddits]))

(defn app []
  (let [route @(rf/subscribe [:route])]
    [:> bridge/root-provider
     [:div.app
      [header/main]
      (when (= route "/")
        [top-subreddits/main {:url-path "/r/listentothis"}])]]))
