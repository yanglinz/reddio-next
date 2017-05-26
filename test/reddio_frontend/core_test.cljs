(ns reddio-frontend.core-test
  (:require [cljs.test :refer-macros [async deftest is testing]]))

(deftest dummy-test
  (is (= 1.0 1))
  (.startsWith "foo" "f"))
