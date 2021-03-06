import express from "express";
import userCtrl from "../controllers/user.controller";
import authCtrl from "../controllers/auth.controller";

const router = express.Router();

router.route("api/user")
    .get(userCtrl.list)
    .post(userCtrl.create);

router.route("api/user/:userId")
    .get(userCtrl.read)
    .put(userCtrl.update)
    .delete(userCtrl.remove);

router.param("UserId", userCtrl.userByID);

router.route("api/user").post(userCtrl.create);
router.route('/api/user').get(userCtrl.list);
router.param('userId', userCtrl.userByID);
router.route('/api/user/:userId').get(userCtrl.read);
router.route('/api/user/:userId').put(userCtrl.update);
router.route('/api/user/:userId').delete(userCtrl.remove);

router.route('/api/user/:userId')
    .get(authCtrl.requireSignin, userCtrl.read)
    .put(authCtrl.requireSignin, authCtrl.hasAuthorization,
        userCtrl.update)
    .delete(authCtrl.requireSignin, authCtrl.hasAuthorization,
        userCtrl.remove);

export default router;