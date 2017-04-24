(ns reddio-frontend.components.thumbnail
  (:require))

(defn thumbnail [image options]
  (let [{width :width height :height} options
        w (or width 100)
        h (or height 100)]
    [:div.thumbnail {:style {:width w
                             :height h}}
     [:img {:src image
            :width (str w "px")
            :height (str h "px")}]]))
