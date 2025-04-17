import { SetMetadata } from "@nestjs/common";
import { ORGANIZATION_KEY } from "src/common/constants";

export const AdminAccess = () => SetMetadata(ORGANIZATION_KEY, true);