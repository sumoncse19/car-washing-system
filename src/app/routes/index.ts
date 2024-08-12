import { Router } from "express";
import { UserRoutes } from "../modules/user/user.routes";
import { ServiceRoutes } from "../modules/service/service.routes";
import { SlotRoutes } from "../modules/slot/slot.routes";

const router = Router();

const moduleRoutes = [
  {
    path: "/auth",
    route: UserRoutes,
  },
  {
    path: "/services",
    route: ServiceRoutes,
  },
  {
    path: "/slots",
    route: SlotRoutes,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
