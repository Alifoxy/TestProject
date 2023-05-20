import { SetMetadata } from "@nestjs/common";
import { Delete } from "../core/enums/delete.permission.enum";
export const PERMISSIONS_KEY = "permissions";
export const Permissions = (...permissions: Delete[]) =>
  SetMetadata(PERMISSIONS_KEY, permissions);
