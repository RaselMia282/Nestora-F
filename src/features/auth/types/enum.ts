export enum Role {
  OWNER = "OWNER",
  TENANT = "TENANT",
  MANAGER = "MANAGER",
  ADMIN = "ADMIN",
}

export enum AuthProvider {
  GOOGLE = "GOOGLE",
  CREDENTIAL = "CREDENTIAL",
}

export enum Gender {
  MALE = "MALE",
  FEMALE = "FEMALE",
  OTHER = "OTHER",
}

export enum RoomStatus {
  AVAILABLE = "AVAILABLE",
  RESERVED = "RESERVED",
  OCCUPIED = "OCCUPIED",
}

export enum ApplicationStatus {
  PENDING = "PENDING",
  APPROVED = "APPROVED",
  REJECTED = "REJECTED",
  CANCELLED = "CANCELLED",
}

export enum PaymentStatus {
  PENDING = "PENDING",
  COMPLETED = "COMPLETED",
  FAILED = "FAILED",
}

export enum UserStatus {
  ACTIVE = "ACTIVE",
  BLOCKED = "BLOCKED",
  SUSPENDED = "SUSPENDED",
  DELETED = "DELETED",
}

export enum PropertyType {
  APARTMENT = "APARTMENT",
  HOUSE = "HOUSE",
  CONDO = "CONDO",
  VILLA = "VILLA",
  TOWNHOUSE = "TOWNHOUSE",
  DUPLEX = "DUPLEX",
}

export enum RoomType {
  SINGLE = "SINGLE",
  DOUBLE = "DOUBLE",
  MASTER = "MASTER",
  SHARED = "SHARED",
}

export enum VerificationStatus {
  PENDING = "PENDING",
  VERIFIED = "VERIFIED",
  REJECTED = "REJECTED",
}

export enum LeaseStatus {
  ACTIVE = "ACTIVE",
  TERMINATED = "TERMINATED",
}

export enum PaymentMethod {
  CREDIT_CARD = "CREDIT_CARD",
  SSLCOMMERZ = "SSLCOMMERZ",
  BKASH = "BKASH",
  CASH_ON_DELIVERY = "CASH_ON_DELIVERY",
  STRIPE = "STRIPE",
}