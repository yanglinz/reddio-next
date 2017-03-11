(ns reddio-frontend.screens.player.player
  (:require [reagent.core :as r]
            [reddio-frontend.bridge :as bridge]))

(def react-player-adapter (r/adapt-react-class bridge/react-player))

(defn main [data]
  [:div.player
   [react-player-adapter data]])
