// User Roles for Union Bank Trade Operations
export const UserRoles = {
  MAKER: "Maker",
  CHECKER: "Checker",
  SUPERVISOR: "Supervisor",
  BRANCH_MANAGER: "Branch Manager",
  COMPLIANCE_OFFICER: "Compliance Officer",
  TRADE_OFFICER: "Trade Officer",
  RELATIONSHIP_MANAGER: "Relationship Manager",
  ADMIN: "Administrator",
  SUPER_ADMIN: "Super Administrator",
} as const;

export type UserRole = (typeof UserRoles)[keyof typeof UserRoles];

// Granular Permissions
export const Permissions = {
  // Form M Operations
  FORM_M_VIEW: "form_m:view",
  FORM_M_CREATE: "form_m:create",
  FORM_M_EDIT: "form_m:edit",
  FORM_M_APPROVE: "form_m:approve",
  FORM_M_DELETE: "form_m:delete",

  // Form A Operations
  FORM_A_VIEW: "form_a:view",
  FORM_A_CREATE: "form_a:create",
  FORM_A_EDIT: "form_a:edit",
  FORM_A_APPROVE: "form_a:approve",
  FORM_A_DELETE: "form_a:delete",

  // Form NXP Operations
  FORM_NXP_VIEW: "form_nxp:view",
  FORM_NXP_CREATE: "form_nxp:create",
  FORM_NXP_EDIT: "form_nxp:edit",
  FORM_NXP_APPROVE: "form_nxp:approve",
  FORM_NXP_DELETE: "form_nxp:delete",

  // Letter of Credit Operations
  LC_VIEW: "lc:view",
  LC_CREATE: "lc:create",
  LC_EDIT: "lc:edit",
  LC_APPROVE: "lc:approve",
  LC_DELETE: "lc:delete",

  // FX Trading Operations
  FX_VIEW: "fx:view",
  FX_CREATE: "fx:create",
  FX_EDIT: "fx:edit",
  FX_APPROVE: "fx:approve",
  FX_DELETE: "fx:delete",

  // Payment Operations
  PAYMENT_VIEW: "payment:view",
  PAYMENT_CREATE: "payment:create",
  PAYMENT_EDIT: "payment:edit",
  PAYMENT_APPROVE: "payment:approve",
  PAYMENT_DELETE: "payment:delete",

  // User Management
  USERS_VIEW: "users:view",
  USERS_CREATE: "users:create",
  USERS_EDIT: "users:edit",
  USERS_DELETE: "users:delete",
  USERS_ASSIGN_ROLES: "users:assign_roles",

  // Customer Management
  CUSTOMERS_VIEW: "customers:view",
  CUSTOMERS_CREATE: "customers:create",
  CUSTOMERS_EDIT: "customers:edit",
  CUSTOMERS_DELETE: "customers:delete",

  // Reports
  REPORTS_VIEW: "reports:view",
  REPORTS_EXPORT: "reports:export",
  REPORTS_REGULATORY: "reports:regulatory",
  REPORTS_CBN: "reports:cbn",

  // Checker Queue
  QUEUE_VIEW: "queue:view",
  QUEUE_APPROVE: "queue:approve",
  QUEUE_REJECT: "queue:reject",
  QUEUE_SEND_BACK: "queue:send_back",

  // Compliance
  COMPLIANCE_VIEW: "compliance:view",
  COMPLIANCE_MANAGE: "compliance:manage",

  // Settings
  SETTINGS_VIEW: "settings:view",
  SETTINGS_MANAGE: "settings:manage",
} as const;

export type Permission = (typeof Permissions)[keyof typeof Permissions];

// Role-Permission Mapping
export const RolePermissions: Record<UserRole, Permission[]> = {
  [UserRoles.MAKER]: [
    Permissions.FORM_M_VIEW,
    Permissions.FORM_M_CREATE,
    Permissions.FORM_M_EDIT,
    Permissions.FORM_A_VIEW,
    Permissions.FORM_A_CREATE,
    Permissions.FORM_A_EDIT,
    Permissions.FORM_NXP_VIEW,
    Permissions.FORM_NXP_CREATE,
    Permissions.FORM_NXP_EDIT,
    Permissions.LC_VIEW,
    Permissions.LC_CREATE,
    Permissions.LC_EDIT,
    Permissions.FX_VIEW,
    Permissions.FX_CREATE,
    Permissions.FX_EDIT,
    Permissions.PAYMENT_VIEW,
    Permissions.PAYMENT_CREATE,
    Permissions.PAYMENT_EDIT,
    Permissions.CUSTOMERS_VIEW,
    Permissions.REPORTS_VIEW,
  ],
  [UserRoles.CHECKER]: [
    Permissions.FORM_M_VIEW,
    Permissions.FORM_M_APPROVE,
    Permissions.FORM_A_VIEW,
    Permissions.FORM_A_APPROVE,
    Permissions.FORM_NXP_VIEW,
    Permissions.FORM_NXP_APPROVE,
    Permissions.LC_VIEW,
    Permissions.LC_APPROVE,
    Permissions.FX_VIEW,
    Permissions.FX_APPROVE,
    Permissions.PAYMENT_VIEW,
    Permissions.PAYMENT_APPROVE,
    Permissions.CUSTOMERS_VIEW,
    Permissions.REPORTS_VIEW,
    Permissions.QUEUE_VIEW,
    Permissions.QUEUE_APPROVE,
    Permissions.QUEUE_REJECT,
    Permissions.QUEUE_SEND_BACK,
  ],
  [UserRoles.SUPERVISOR]: [
    Permissions.FORM_M_VIEW,
    Permissions.FORM_M_CREATE,
    Permissions.FORM_M_EDIT,
    Permissions.FORM_M_APPROVE,
    Permissions.FORM_A_VIEW,
    Permissions.FORM_A_CREATE,
    Permissions.FORM_A_EDIT,
    Permissions.FORM_A_APPROVE,
    Permissions.FORM_NXP_VIEW,
    Permissions.FORM_NXP_CREATE,
    Permissions.FORM_NXP_EDIT,
    Permissions.FORM_NXP_APPROVE,
    Permissions.LC_VIEW,
    Permissions.LC_CREATE,
    Permissions.LC_EDIT,
    Permissions.LC_APPROVE,
    Permissions.FX_VIEW,
    Permissions.FX_CREATE,
    Permissions.FX_EDIT,
    Permissions.FX_APPROVE,
    Permissions.PAYMENT_VIEW,
    Permissions.PAYMENT_CREATE,
    Permissions.PAYMENT_EDIT,
    Permissions.PAYMENT_APPROVE,
    Permissions.CUSTOMERS_VIEW,
    Permissions.CUSTOMERS_CREATE,
    Permissions.CUSTOMERS_EDIT,
    Permissions.REPORTS_VIEW,
    Permissions.REPORTS_EXPORT,
    Permissions.QUEUE_VIEW,
    Permissions.QUEUE_APPROVE,
    Permissions.QUEUE_REJECT,
    Permissions.QUEUE_SEND_BACK,
    Permissions.COMPLIANCE_VIEW,
  ],
  [UserRoles.BRANCH_MANAGER]: [
    Permissions.FORM_M_VIEW,
    Permissions.FORM_M_APPROVE,
    Permissions.FORM_A_VIEW,
    Permissions.FORM_A_APPROVE,
    Permissions.FORM_NXP_VIEW,
    Permissions.FORM_NXP_APPROVE,
    Permissions.LC_VIEW,
    Permissions.LC_APPROVE,
    Permissions.FX_VIEW,
    Permissions.FX_APPROVE,
    Permissions.PAYMENT_VIEW,
    Permissions.PAYMENT_APPROVE,
    Permissions.CUSTOMERS_VIEW,
    Permissions.CUSTOMERS_EDIT,
    Permissions.REPORTS_VIEW,
    Permissions.REPORTS_EXPORT,
    Permissions.QUEUE_VIEW,
    Permissions.QUEUE_APPROVE,
    Permissions.QUEUE_REJECT,
    Permissions.QUEUE_SEND_BACK,
    Permissions.COMPLIANCE_VIEW,
    Permissions.USERS_VIEW,
  ],
  [UserRoles.COMPLIANCE_OFFICER]: [
    Permissions.FORM_M_VIEW,
    Permissions.FORM_A_VIEW,
    Permissions.FORM_NXP_VIEW,
    Permissions.LC_VIEW,
    Permissions.FX_VIEW,
    Permissions.PAYMENT_VIEW,
    Permissions.CUSTOMERS_VIEW,
    Permissions.REPORTS_VIEW,
    Permissions.REPORTS_EXPORT,
    Permissions.REPORTS_REGULATORY,
    Permissions.QUEUE_VIEW,
    Permissions.COMPLIANCE_VIEW,
    Permissions.COMPLIANCE_MANAGE,
  ],
  [UserRoles.TRADE_OFFICER]: [
    Permissions.FORM_M_VIEW,
    Permissions.FORM_M_CREATE,
    Permissions.FORM_M_EDIT,
    Permissions.FORM_A_VIEW,
    Permissions.FORM_A_CREATE,
    Permissions.FORM_A_EDIT,
    Permissions.FORM_NXP_VIEW,
    Permissions.FORM_NXP_CREATE,
    Permissions.FORM_NXP_EDIT,
    Permissions.LC_VIEW,
    Permissions.LC_CREATE,
    Permissions.LC_EDIT,
    Permissions.FX_VIEW,
    Permissions.FX_CREATE,
    Permissions.FX_EDIT,
    Permissions.PAYMENT_VIEW,
    Permissions.PAYMENT_CREATE,
    Permissions.PAYMENT_EDIT,
    Permissions.CUSTOMERS_VIEW,
    Permissions.CUSTOMERS_CREATE,
    Permissions.CUSTOMERS_EDIT,
    Permissions.REPORTS_VIEW,
    Permissions.REPORTS_EXPORT,
    Permissions.QUEUE_VIEW,
  ],
  [UserRoles.RELATIONSHIP_MANAGER]: [
    Permissions.FORM_M_VIEW,
    Permissions.FORM_M_CREATE,
    Permissions.FORM_A_VIEW,
    Permissions.FORM_A_CREATE,
    Permissions.FORM_NXP_VIEW,
    Permissions.FORM_NXP_CREATE,
    Permissions.LC_VIEW,
    Permissions.LC_CREATE,
    Permissions.FX_VIEW,
    Permissions.FX_CREATE,
    Permissions.PAYMENT_VIEW,
    Permissions.PAYMENT_CREATE,
    Permissions.CUSTOMERS_VIEW,
    Permissions.CUSTOMERS_CREATE,
    Permissions.CUSTOMERS_EDIT,
    Permissions.REPORTS_VIEW,
  ],
  [UserRoles.ADMIN]: [
    ...Object.values(Permissions).filter(
      (p) => !p.startsWith("settings:manage")
    ),
  ],
  [UserRoles.SUPER_ADMIN]: Object.values(Permissions),
};

// Permission Groups for UI Display
export const PermissionGroups = {
  "Trade Finance": [
    { key: "form_m", label: "Form M", permissions: ["view", "create", "edit", "approve", "delete"] },
    { key: "form_a", label: "Form A", permissions: ["view", "create", "edit", "approve", "delete"] },
    { key: "form_nxp", label: "Form NXP", permissions: ["view", "create", "edit", "approve", "delete"] },
    { key: "lc", label: "Letter of Credit", permissions: ["view", "create", "edit", "approve", "delete"] },
  ],
  "Treasury": [
    { key: "fx", label: "FX Trading", permissions: ["view", "create", "edit", "approve", "delete"] },
  ],
  "Payments": [
    { key: "payment", label: "Payments", permissions: ["view", "create", "edit", "approve", "delete"] },
  ],
  "Administration": [
    { key: "users", label: "User Management", permissions: ["view", "create", "edit", "delete", "assign_roles"] },
    { key: "customers", label: "Customer Management", permissions: ["view", "create", "edit", "delete"] },
    { key: "reports", label: "Reports", permissions: ["view", "export", "regulatory", "cbn"] },
    { key: "queue", label: "Checker Queue", permissions: ["view", "approve", "reject", "send_back"] },
    { key: "compliance", label: "Compliance", permissions: ["view", "manage"] },
    { key: "settings", label: "Settings", permissions: ["view", "manage"] },
  ],
};

// Department options for Union Bank
export const Departments = [
  "Trade Finance",
  "Treasury Operations",
  "Foreign Exchange",
  "Compliance",
  "Risk Management",
  "Corporate Banking",
  "Retail Banking",
  "Operations",
  "Information Technology",
  "Internal Audit",
] as const;

// Branch options
export const Branches = [
  "Head Office - Stallion Plaza",
  "Marina Branch",
  "Victoria Island Branch",
  "Ikeja Branch",
  "Apapa Branch",
  "Port Harcourt Branch",
  "Abuja Branch",
  "Kano Branch",
  "Ibadan Branch",
  "Kaduna Branch",
  "Benin Branch",
  "Enugu Branch",
] as const;

// Status options for users
export const UserStatuses = {
  ACTIVE: "Active",
  INACTIVE: "Inactive",
  SUSPENDED: "Suspended",
  PENDING_ACTIVATION: "Pending Activation",
} as const;

export type UserStatus = (typeof UserStatuses)[keyof typeof UserStatuses];

// Helper function to check if a role has a permission
export function hasPermission(role: UserRole, permission: Permission): boolean {
  return RolePermissions[role]?.includes(permission) ?? false;
}

// Helper function to get all permissions for a role
export function getRolePermissions(role: UserRole): Permission[] {
  return RolePermissions[role] ?? [];
}
