(ns reddio-dev.server
  (:require [clojure.string :as str]
            [ring.middleware.resource :refer [wrap-resource]]))

(defn- wrap-default-index [next-handler]
  (fn [request]
    (next-handler
     (if (or (str/includes? (:uri request) "/css/")
             (str/includes? (:uri request) "/js/"))
       request
       (assoc request :uri "/index.html")))))

(def handler
  (-> (fn [_] {:status 404 :body "static asset not found"})
      (wrap-resource "public")
      wrap-default-index))
