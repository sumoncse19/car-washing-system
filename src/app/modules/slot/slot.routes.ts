import express from 'express'

// import { Roles } from "../shared/user.enumeration";
// import requireAuth from "../../middleware/requireAuth";
import { SlotControllers } from './slot.controller'
// import validateRequest from "../../middleware/validateRequest";
// import { slotSchema } from "./slot.schema";

const router = express.Router()

// router.post(
//   "/",
//   requireAuth(Roles.ADMIN),
//   validateRequest(slotSchema),
//   SlotControllers.createSlot
// );
router.get('/availability', SlotControllers.getAvailableSlots)

export const SlotRoutes = router
