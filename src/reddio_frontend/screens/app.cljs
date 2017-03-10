(ns reddio-frontend.screens.app
  (:require [re-frame.core :as rf]
            [reddio-frontend.bridge :as bridge]
            [reddio-frontend.screens.shared.header :as header]
            [reddio-frontend.screens.home.top-subreddits :as top-subreddits]))

(defn app []
  [:> bridge/root-provider
   [:div.app
    [header/main]
    [top-subreddits/main {:url-path "/r/listentothis"}]]])
