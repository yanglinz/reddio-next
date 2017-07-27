(ns reddio-frontend.components.thumbnail.core
  (:require [clojure.string :as string]
            [reagent.core :as r]))

(defn rand-color []
  (rand-nth ["#ef9a9a"
             "#f48fb1"
             "#ce93d8"
             "#b39ddb"
             "#9fa8da"
             "#90caf9"
             "#81d4fa"
             "#80deea"
             "#80cbc4"
             "#a5d6a7"
             "#c5e1a5"
             "#e6ee9c"
             "#fff59d"
             "#ffe082"
             "#ffcc80"
             "#ffab91"
             "#bcaaa4"
             "#eeeeee"
             "#b0bec5"]))

(def all-loading-errors (r/atom {}))

(defn thumbnail [image options]
  (let [all-errors @all-loading-errors
        error? (get all-errors image)
        placeholder-color (rand-color)
        {width :width height :height} options
        w (or width "100%")
        h (or height "100%")]
    [:div.thumbnail {:style {:width w :height h}}
     (if (or error? (not image))
       [:div.thumbnail-error {:style {:backgroundColor placeholder-color}}]
       [:img {:src (string/replace-first image "http://" "https://")
              :on-error #(reset! all-loading-errors
                                 (assoc all-errors image true))}])]))
