import caches from "./caches"
import auth from "./auth"
import router from "./router"

const june = {
  caches, auth, router, init() {
    auth.init()
    router.init()
  }
}
june.init()

export default june