import { baseApi } from "@/redux/api/baseApi";
import authReducer, { IAuthState } from "@/redux/features/auth/authSlice";
import { configureStore } from "@reduxjs/toolkit";
import { beforeEach, describe, expect, it, vi } from "vitest";
import paymentApi from "../paymentApi";

// Mock fetch globally
global.fetch = vi.fn();

// Mock payment response data
const createMockPaymentResponse = (overrides?: any) => ({
  success: true,
  message: "Payment initialized successfully",
  data: {
    paymentId: "payment-123",
    sessionId: "session-456",
    paymentUrl: "https://payment-gateway.com/pay/session-456",
    amount: 150,
    currency: "USD",
    appointmentId: "appointment-789",
    expiresAt: new Date(Date.now() + 15 * 60 * 1000).toISOString(), // 15 minutes from now
    ...overrides,
  },
});

const createMockPaymentStatus = (status: string, overrides?: any) => ({
  success: true,
  data: {
    paymentId: "payment-123",
    status,
    transactionId: status === "completed" ? "txn-123456" : null,
    amount: 150,
    currency: "USD",
    appointmentId: "appointment-789",
    paidAt: status === "completed" ? new Date().toISOString() : null,
    paymentMethod: status === "completed" ? "card" : null,
    ...overrides,
  },
});

// Test store setup
const createTestStore = (initialAuthState?: Partial<IAuthState>) => {
  const defaultAuthState: IAuthState = {
    user: {
      email: "patient@example.com",
      role: "PATIENT",
      iat: Date.now(),
      exp: Date.now() + 3600000,
    },
    token: "mock-patient-token",
    isAuthenticated: true,
  };

  return configureStore({
    reducer: {
      auth: authReducer,
      [baseApi.reducerPath]: baseApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: false,
      }).concat(baseApi.middleware),
    preloadedState: {
      auth: { ...defaultAuthState, ...initialAuthState },
    },
  });
};

describe("paymentApi", () => {
  let store: ReturnType<typeof createTestStore>;
  const mockFetch = fetch as vi.MockedFunction<typeof fetch>;

  beforeEach(() => {
    store = createTestStore();
    vi.clearAllMocks();
  });

  describe("initialPayment", () => {
    it("should initialize payment successfully", async () => {
      const appointmentId = "appointment-123";
      const mockResponse = createMockPaymentResponse({
        appointmentId,
      });

      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => mockResponse,
      } as Response);

      const result = await store.dispatch(
        paymentApi.endpoints.initialPayment.initiate(appointmentId),
      );

      expect(result.data?.success).toBe(true);
      expect(result.data?.data.appointmentId).toBe(appointmentId);
      expect(result.data?.data.paymentUrl).toContain("payment-gateway.com");
      expect(result.data?.data.amount).toBe(150);

      expect(mockFetch).toHaveBeenCalledWith(
        expect.stringContaining(`/payment/init-payment/${appointmentId}`),
        expect.objectContaining({
          method: "POST",
        }),
      );
    });

    it("should handle payment initialization with custom amount", async () => {
      const appointmentId = "appointment-123";
      const customAmount = 250;
      const mockResponse = createMockPaymentResponse({
        appointmentId,
        amount: customAmount,
      });

      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => mockResponse,
      } as Response);

      const result = await store.dispatch(
        paymentApi.endpoints.initialPayment.initiate(appointmentId),
      );

      expect(result.data?.data.amount).toBe(customAmount);
    });

    it("should handle appointment not found error", async () => {
      const appointmentId = "non-existent-appointment";

      mockFetch.mockResolvedValueOnce({
        ok: false,
        status: 404,
        json: async () => ({
          success: false,
          message: "Appointment not found",
          error: "APPOINTMENT_NOT_FOUND",
        }),
      } as Response);

      const result = await store.dispatch(
        paymentApi.endpoints.initialPayment.initiate(appointmentId),
      );

      expect(result.isError).toBe(true);
      expect(result.error).toBeDefined();
    });

    it("should handle payment already processed error", async () => {
      const appointmentId = "appointment-123";

      mockFetch.mockResolvedValueOnce({
        ok: false,
        status: 400,
        json: async () => ({
          success: false,
          message: "Payment already processed for this appointment",
          error: "PAYMENT_ALREADY_EXISTS",
        }),
      } as Response);

      const result = await store.dispatch(
        paymentApi.endpoints.initialPayment.initiate(appointmentId),
      );

      expect(result.isError).toBe(true);
      expect(result.error).toBeDefined();
    });

    it("should handle insufficient appointment fee error", async () => {
      const appointmentId = "appointment-123";

      mockFetch.mockResolvedValueOnce({
        ok: false,
        status: 400,
        json: async () => ({
          success: false,
          message: "Doctor appointment fee not set",
          error: "INVALID_APPOINTMENT_FEE",
        }),
      } as Response);

      const result = await store.dispatch(
        paymentApi.endpoints.initialPayment.initiate(appointmentId),
      );

      expect(result.isError).toBe(true);
      expect(result.error).toBeDefined();
    });

    it("should handle unauthorized access", async () => {
      const appointmentId = "appointment-123";

      mockFetch.mockResolvedValueOnce({
        ok: false,
        status: 403,
        json: async () => ({
          success: false,
          message: "Not authorized to pay for this appointment",
          error: "UNAUTHORIZED_PAYMENT",
        }),
      } as Response);

      const result = await store.dispatch(
        paymentApi.endpoints.initialPayment.initiate(appointmentId),
      );

      expect(result.isError).toBe(true);
      expect(result.error).toBeDefined();
    });

    it("should handle payment gateway errors", async () => {
      const appointmentId = "appointment-123";

      mockFetch.mockResolvedValueOnce({
        ok: false,
        status: 502,
        json: async () => ({
          success: false,
          message: "Payment gateway temporarily unavailable",
          error: "GATEWAY_ERROR",
        }),
      } as Response);

      const result = await store.dispatch(
        paymentApi.endpoints.initialPayment.initiate(appointmentId),
      );

      expect(result.isError).toBe(true);
      expect(result.error).toBeDefined();
    });

    it("should handle network errors", async () => {
      const appointmentId = "appointment-123";

      mockFetch.mockRejectedValueOnce(new Error("Network error"));

      const result = await store.dispatch(
        paymentApi.endpoints.initialPayment.initiate(appointmentId),
      );

      expect(result.isError).toBe(true);
      expect(result.error).toBeDefined();
    });

    it("should include authentication headers", async () => {
      const appointmentId = "appointment-123";
      const mockResponse = createMockPaymentResponse();

      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => mockResponse,
      } as Response);

      await store.dispatch(
        paymentApi.endpoints.initialPayment.initiate(appointmentId),
      );

      expect(mockFetch).toHaveBeenCalledWith(
        expect.any(String),
        expect.objectContaining({
          headers: expect.objectContaining({
            authorization: "mock-patient-token",
          }),
        }),
      );
    });

    it("should handle malformed JSON response", async () => {
      const appointmentId = "appointment-123";

      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => {
          throw new Error("Invalid JSON");
        },
      } as Response);

      const result = await store.dispatch(
        paymentApi.endpoints.initialPayment.initiate(appointmentId),
      );

      expect(result.isError).toBe(true);
      expect(result.error).toBeDefined();
    });
  });

  describe("Cache invalidation and tags", () => {
    it("should invalidate payment tags on successful payment initialization", () => {
      const endpoint = paymentApi.endpoints.initialPayment;
      expect(endpoint.invalidatesTags).toEqual(["payment"]);
    });

    it("should be a mutation endpoint", () => {
      const endpoint = paymentApi.endpoints.initialPayment;
      expect(endpoint.type).toBe("mutation");
    });
  });

  describe("Hook generation", () => {
    it("should generate correct mutation hook", () => {
      expect(paymentApi.useInitialPaymentMutation).toBeDefined();
      expect(typeof paymentApi.useInitialPaymentMutation).toBe("function");
    });
  });

  describe("Payment flow integration scenarios", () => {
    it("should handle successful payment flow", async () => {
      const appointmentId = "appointment-123";

      // Step 1: Initialize payment
      const initResponse = createMockPaymentResponse({ appointmentId });
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => initResponse,
      } as Response);

      const initResult = await store.dispatch(
        paymentApi.endpoints.initialPayment.initiate(appointmentId),
      );

      expect(initResult.data?.success).toBe(true);
      expect(initResult.data?.data.paymentUrl).toBeDefined();
      expect(initResult.data?.data.sessionId).toBeDefined();
    });

    it("should handle payment timeout scenarios", async () => {
      const appointmentId = "appointment-123";

      // Mock expired payment session
      const expiredResponse = createMockPaymentResponse({
        appointmentId,
        expiresAt: new Date(Date.now() - 1000).toISOString(), // Already expired
      });

      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => expiredResponse,
      } as Response);

      const result = await store.dispatch(
        paymentApi.endpoints.initialPayment.initiate(appointmentId),
      );

      // Should still return the response, but client should handle expiration
      expect(result.data?.data.expiresAt).toBeDefined();
      const expiresAt = new Date(result.data?.data.expiresAt);
      expect(expiresAt.getTime()).toBeLessThan(Date.now());
    });

    it("should handle concurrent payment attempts", async () => {
      const appointmentId = "appointment-123";

      // First request succeeds
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => createMockPaymentResponse({ appointmentId }),
      } as Response);

      // Second request fails due to existing payment
      mockFetch.mockResolvedValueOnce({
        ok: false,
        status: 409,
        json: async () => ({
          success: false,
          message: "Payment session already active",
          error: "CONCURRENT_PAYMENT_ATTEMPT",
        }),
      } as Response);

      // Make concurrent requests
      const [result1, result2] = await Promise.all([
        store.dispatch(
          paymentApi.endpoints.initialPayment.initiate(appointmentId),
        ),
        store.dispatch(
          paymentApi.endpoints.initialPayment.initiate(appointmentId),
        ),
      ]);

      expect(result1.data?.success).toBe(true);
      expect(result2.isError).toBe(true);
    });
  });

  describe("Payment security and validation", () => {
    it("should validate appointment ownership", async () => {
      const appointmentId = "other-user-appointment";

      mockFetch.mockResolvedValueOnce({
        ok: false,
        status: 403,
        json: async () => ({
          success: false,
          message: "You can only pay for your own appointments",
          error: "APPOINTMENT_OWNERSHIP_VIOLATION",
        }),
      } as Response);

      const result = await store.dispatch(
        paymentApi.endpoints.initialPayment.initiate(appointmentId),
      );

      expect(result.isError).toBe(true);
      expect(result.error).toBeDefined();
    });

    it("should handle appointment status validation", async () => {
      const appointmentId = "cancelled-appointment";

      mockFetch.mockResolvedValueOnce({
        ok: false,
        status: 400,
        json: async () => ({
          success: false,
          message: "Cannot pay for cancelled appointment",
          error: "INVALID_APPOINTMENT_STATUS",
        }),
      } as Response);

      const result = await store.dispatch(
        paymentApi.endpoints.initialPayment.initiate(appointmentId),
      );

      expect(result.isError).toBe(true);
      expect(result.error).toBeDefined();
    });

    it("should handle rate limiting", async () => {
      const appointmentId = "appointment-123";

      mockFetch.mockResolvedValueOnce({
        ok: false,
        status: 429,
        json: async () => ({
          success: false,
          message: "Too many payment attempts. Please try again later.",
          error: "RATE_LIMIT_EXCEEDED",
          retryAfter: 60,
        }),
      } as Response);

      const result = await store.dispatch(
        paymentApi.endpoints.initialPayment.initiate(appointmentId),
      );

      expect(result.isError).toBe(true);
      expect(result.error).toBeDefined();
    });
  });

  describe("Error response handling", () => {
    it("should handle detailed validation errors", async () => {
      const appointmentId = "appointment-123";

      mockFetch.mockResolvedValueOnce({
        ok: false,
        status: 422,
        json: async () => ({
          success: false,
          message: "Validation failed",
          errors: {
            appointmentId: "Invalid appointment ID format",
            amount: "Amount must be greater than 0",
          },
        }),
      } as Response);

      const result = await store.dispatch(
        paymentApi.endpoints.initialPayment.initiate(appointmentId),
      );

      expect(result.isError).toBe(true);
      expect(result.error).toBeDefined();
    });

    it("should handle server maintenance errors", async () => {
      const appointmentId = "appointment-123";

      mockFetch.mockResolvedValueOnce({
        ok: false,
        status: 503,
        json: async () => ({
          success: false,
          message: "Payment system is under maintenance",
          error: "SERVICE_UNAVAILABLE",
          maintenanceUntil: new Date(Date.now() + 3600000).toISOString(),
        }),
      } as Response);

      const result = await store.dispatch(
        paymentApi.endpoints.initialPayment.initiate(appointmentId),
      );

      expect(result.isError).toBe(true);
      expect(result.error).toBeDefined();
    });
  });

  describe("Authentication integration", () => {
    it("should handle unauthenticated requests", async () => {
      const storeWithoutAuth = createTestStore({
        token: null,
        isAuthenticated: false,
        user: null,
      });

      const appointmentId = "appointment-123";

      mockFetch.mockResolvedValueOnce({
        ok: false,
        status: 401,
        json: async () => ({
          success: false,
          message: "Authentication required",
          error: "UNAUTHENTICATED",
        }),
      } as Response);

      const result = await storeWithoutAuth.dispatch(
        paymentApi.endpoints.initialPayment.initiate(appointmentId),
      );

      expect(result.isError).toBe(true);
      expect(result.error).toBeDefined();
    });

    it("should handle expired token scenarios", async () => {
      const storeWithExpiredToken = createTestStore({
        user: {
          email: "patient@example.com",
          role: "PATIENT",
          iat: Date.now() - 7200000, // 2 hours ago
          exp: Date.now() - 3600000, // 1 hour ago (expired)
        },
        token: "expired-token",
        isAuthenticated: true,
      });

      const appointmentId = "appointment-123";

      mockFetch.mockResolvedValueOnce({
        ok: false,
        status: 401,
        json: async () => ({
          success: false,
          message: "Token expired",
          error: "TOKEN_EXPIRED",
        }),
      } as Response);

      const result = await storeWithExpiredToken.dispatch(
        paymentApi.endpoints.initialPayment.initiate(appointmentId),
      );

      expect(result.isError).toBe(true);
      expect(result.error).toBeDefined();
    });
  });

  describe("Edge cases and boundary conditions", () => {
    it("should handle empty appointment ID", async () => {
      const appointmentId = "";

      mockFetch.mockResolvedValueOnce({
        ok: false,
        status: 400,
        json: async () => ({
          success: false,
          message: "Appointment ID is required",
          error: "MISSING_APPOINTMENT_ID",
        }),
      } as Response);

      const result = await store.dispatch(
        paymentApi.endpoints.initialPayment.initiate(appointmentId),
      );

      expect(result.isError).toBe(true);
      expect(result.error).toBeDefined();
    });

    it("should handle very long appointment ID", async () => {
      const appointmentId = "a".repeat(1000); // Very long ID

      mockFetch.mockResolvedValueOnce({
        ok: false,
        status: 400,
        json: async () => ({
          success: false,
          message: "Appointment ID too long",
          error: "INVALID_APPOINTMENT_ID_LENGTH",
        }),
      } as Response);

      const result = await store.dispatch(
        paymentApi.endpoints.initialPayment.initiate(appointmentId),
      );

      expect(result.isError).toBe(true);
      expect(result.error).toBeDefined();
    });

    it("should handle special characters in appointment ID", async () => {
      const appointmentId = "appointment-123!@#$%";

      // Should still make the request - server will validate
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => createMockPaymentResponse({ appointmentId }),
      } as Response);

      const result = await store.dispatch(
        paymentApi.endpoints.initialPayment.initiate(appointmentId),
      );

      expect(mockFetch).toHaveBeenCalledWith(
        expect.stringContaining(`/payment/init-payment/${appointmentId}`),
        expect.any(Object),
      );
    });
  });
});
